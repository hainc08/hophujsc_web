<?php
/**
 * Nhận form "Nhận báo giá" và gửi email cho bộ phận kinh doanh.
 *
 * - Cấu hình (email nhận, nơi lưu bản sao) đặt trong api/config.php trên máy chủ, KHÔNG commit.
 *   Mẫu: api/config.example.php.
 * - Kiểm tra dữ liệu phía máy chủ, không tin dữ liệu từ trình duyệt.
 * - Chống spam: trường bẫy "website", kiểm tra Origin, giới hạn số lần gửi theo IP.
 * - Mỗi yêu cầu được ghi thêm một dòng vào file CSV ngoài thư mục web, để không mất yêu cầu nếu email lỗi.
 *
 * Phản hồi JSON: { ok: true } hoặc { ok: false, code: "..." } kèm mã HTTP phù hợp.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'code' => 'method_not_allowed']);
}

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    respond(503, ['ok' => false, 'code' => 'not_configured']);
}
$config = require $configFile;
$recipient = $config['recipient'] ?? '';
if (!filter_var($recipient, FILTER_VALIDATE_EMAIL)) {
    respond(503, ['ok' => false, 'code' => 'not_configured']);
}

// Chỉ nhận yêu cầu gửi từ chính website (chặn form giả từ trang khác).
$allowedHosts = $config['allowed_hosts'] ?? [];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && $allowedHosts) {
    $host = parse_url($origin, PHP_URL_HOST) ?: '';
    if (!in_array($host, $allowedHosts, true)) {
        respond(403, ['ok' => false, 'code' => 'forbidden']);
    }
}

// Trường bẫy: người dùng thật không nhìn thấy nên để trống. Bot điền vào thì giả vờ thành công.
if (trim((string)($_POST['website'] ?? '')) !== '') {
    respond(200, ['ok' => true]);
}

// Giới hạn tần suất: tối đa N yêu cầu mỗi giờ cho một IP.
$storage = rtrim((string)($config['storage_dir'] ?? ''), '/');
$limit = (int)($config['max_per_hour'] ?? 5);
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if ($storage !== '' && (is_dir($storage) || @mkdir($storage, 0700, true))) {
    $rateFile = $storage . '/rate-' . hash('sha256', $ip) . '.json';
    $now = time();
    $hits = is_file($rateFile) ? (json_decode((string)file_get_contents($rateFile), true) ?: []) : [];
    $hits = array_values(array_filter($hits, fn($t) => $t > $now - 3600));
    if (count($hits) >= $limit) {
        respond(429, ['ok' => false, 'code' => 'rate_limited']);
    }
    $hits[] = $now;
    file_put_contents($rateFile, json_encode($hits), LOCK_EX);
}

/** Lấy chuỗi, bỏ ký tự điều khiển, giới hạn độ dài. */
function field(string $name, int $max): string
{
    $v = (string)($_POST[$name] ?? '');
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    $v = trim($v);
    return mb_substr($v, 0, $max);
}

// TODO: File upload mẫu/bản vẽ (HP-10): cần triển khai hạ tầng lưu trữ bảo mật (S3/thư mục ngoài web),
// kiểm tra MIME type thực tế, giới hạn 10MB và quét mã độc trước khi kích hoạt tải file.
$data = [
    'name' => field('name', 120),
    'phone' => field('phone', 20),
    'email' => field('email', 160),
    'company' => field('company', 160),
    'product' => field('product', 60),
    'quantity' => field('quantity', 120),
    'message' => field('message', 3000),
    'consent' => field('consent', 10),
    'lang' => field('lang', 2) === 'en' ? 'en' : 'vi',
];

$errors = [];
if ($data['name'] === '') $errors[] = 'name';
if (!preg_match('/^[0-9+ .()\-]{9,16}$/', $data['phone'])) $errors[] = 'phone';
if ($data['email'] !== '' && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if ($data['message'] === '') $errors[] = 'message';
if ($data['consent'] !== 'yes') $errors[] = 'consent';
if ($errors) {
    respond(422, ['ok' => false, 'code' => 'invalid', 'fields' => $errors]);
}

// Một dòng tiêu đề email không được chứa xuống dòng (chống chèn header).
$oneLine = fn(string $s) => str_replace(["\r", "\n"], ' ', $s);

$labels = [
    'name' => 'Họ tên', 'phone' => 'Số điện thoại', 'email' => 'Email', 'company' => 'Công ty', 'product' => 'Loại bao bì',
    'quantity' => 'Số lượng dự kiến', 'message' => 'Yêu cầu chi tiết', 'lang' => 'Ngôn ngữ trang',
];
$lines = [];
foreach ($labels as $key => $label) {
    $lines[] = $label . ': ' . ($data[$key] !== '' ? $data[$key] : '(trống)');
}
$lines[] = 'Thời gian: ' . date('Y-m-d H:i:s');
$lines[] = 'Trang gửi: ' . $oneLine((string)($_SERVER['HTTP_REFERER'] ?? ''));

// Ghi bản sao trước khi gửi email.
if ($storage !== '' && is_dir($storage)) {
    $csv = $storage . '/quote-requests.csv';
    $isNew = !is_file($csv);
    $fh = @fopen($csv, 'a');
    if ($fh) {
        flock($fh, LOCK_EX);
        if ($isNew) fputcsv($fh, ['time', 'name', 'phone', 'email', 'company', 'product', 'quantity', 'message', 'lang', 'ip']);
        fputcsv($fh, [date('c'), $data['name'], $data['phone'], $data['email'], $data['company'], $data['product'], $data['quantity'], $data['message'], $data['lang'], $ip]);
        flock($fh, LOCK_UN);
        fclose($fh);
    }
}

$subject = '=?UTF-8?B?' . base64_encode('Yêu cầu báo giá: ' . $oneLine($data['name']) . ($data['company'] ? ' - ' . $oneLine($data['company']) : '')) . '?=';
$from = $config['from'] ?? ('no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'localhost'));
$headers = [
    'From: ' . $oneLine($from),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
];

$sent = @mail($recipient, $subject, implode("\n", $lines), implode("\r\n", $headers));
if (!$sent) {
    // Yêu cầu đã được lưu trong CSV (nếu có cấu hình), nhưng vẫn báo lỗi để khách gọi hotline.
    respond(502, ['ok' => false, 'code' => 'mail_failed']);
}

respond(200, ['ok' => true]);
