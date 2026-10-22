<?php
// Sao chép file này thành api/config.php TRÊN MÁY CHỦ rồi điền giá trị thật.
// api/config.php nằm trong .gitignore và bị chặn truy cập trực tiếp bằng .htaccess.
return [
    // Email nhận yêu cầu báo giá (bắt buộc). Chưa điền thì form trả về "chưa cấu hình".
    'recipient' => '',

    // Địa chỉ gửi. Nên dùng email thuộc tên miền đang chạy website để không bị đánh dấu spam,
    // ví dụ no-reply@hopphujsc.com. Để trống: no-reply@<tên máy chủ>.
    'from' => '',

    // Thư mục lưu bản sao các yêu cầu (CSV) và bộ đếm chống spam.
    // Đặt NGOÀI thư mục web, ví dụ /home/<user>/quote-data
    'storage_dir' => '',

    // Chỉ nhận form gửi từ các tên miền này (để trống mảng để bỏ qua kiểm tra).
    'allowed_hosts' => ['hopphujsc.com', 'www.hopphujsc.com'],

    // Số yêu cầu tối đa mỗi giờ cho một địa chỉ IP.
    'max_per_hour' => 5,
];
