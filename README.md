# Nhà Máy – Quản lý nước đá

Đây là một ứng dụng **Next.js** sử dụng **Mantine**, **Zustand** và **Supabase** để hỗ trợ quản lý đơn hàng cho cơ sở sản xuất nước đá. Ứng dụng hướng tới người dùng lớn tuổi với giao diện đơn giản, trực quan, dễ sử dụng trên thiết bị di động.

## Tính năng chính

- **Ghi nhận đơn hàng:** Nhập tên khách hàng, loại đá (đá cây, đá mi, đá xay, đá cắt), số lượng và trạng thái nợ. Giá được tính tự động dựa trên bảng giá mẫu.
- **Danh sách đơn hàng:** Hiển thị toàn bộ đơn hàng đã nhập với thông tin khách hàng, loại đá, số lượng, thành tiền và trạng thái (nợ hoặc trả tiền).
- **Quản lý trạng thái nợ:** Đánh dấu đơn hàng là nợ để thu tiền vào thời điểm khác.
- **Lưu trữ với Supabase:** Tất cả đơn hàng được lưu trên cơ sở dữ liệu Supabase, cho phép đồng bộ dữ liệu giữa nhiều thiết bị.

> **Lưu ý:** Mẫu dự án này chưa bao gồm các tính năng quản lý nhân viên, hỗ trợ offline hay bảo mật nâng cao. Bạn có thể mở rộng thêm theo nhu cầu.

## Cấu trúc dự án

```
nhamay/
├─ lib/
│  └─ supabaseClient.ts    # Khởi tạo client Supabase
├─ store/
│  └─ useOrderStore.ts      # Zustan store quản lý đơn hàng
├─ pages/
│  ├─ _app.tsx             # Thiết lập MantineProvider và giao diện chung
│  └─ index.tsx           # Trang chính ghi nhận và hiển thị đơn hàng
├─ next.config.js          # Cấu hình Next.js
├─ package.json            # Danh sách phụ thuộc và script
├─ tsconfig.json           # Cấu hình TypeScript
└─ README.md               # Hướng dẫn sử dụng
```

## Thiết lập Supabase

1. Tạo một [dự án Supabase](https://app.supabase.com/).
2. Trong dự án, tạo bảng `orders` với các cột:
   - `id`: *serial*, primary key, auto increment.
   - `customer_name`: *text*.
   - `type`: *text*.
   - `quantity`: *integer*.
   - `price`: *numeric* (hoặc *integer* tuỳ nhu cầu).
   - `date`: *timestamp with time zone*.
   - `is_debt`: *boolean*.
3. Lấy `Supabase URL` và `Anon Key` từ phần cài đặt dự án Supabase.
4. Tạo file `.env.local` trong thư mục gốc và thêm:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## Chạy dự án cục bộ

1. Cài đặt các gói phụ thuộc:

   ```bash
   npm install
   ```

2. Chạy server phát triển:

   ```bash
   npm run dev
   ```

3. Truy cập `http://localhost:3000` trên trình duyệt để sử dụng ứng dụng.

## Đóng góp

Bạn có thể fork repository và gửi pull request để đóng góp tính năng mới hoặc cải thiện giao diện. Vui lòng mô tả rõ ràng thay đổi của bạn trong phần mô tả pull request.
