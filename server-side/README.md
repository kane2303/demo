# Server-side (Volunteer Management System)

Hướng dẫn chạy server Node.js (Express) cho dự án trong thư mục `demo/Volunteer-Management-System/server-side`.

## Yêu cầu
- Node.js 18+ và npm
- Tài khoản MongoDB (Atlas) hoặc MongoDB local

## Cấu hình môi trường
1. Tạo file `.env` từ mẫu:
   - Sao chép file `.env.example` thành `.env`
   - Điền các giá trị thật cho:
     - `ACCESS_TOKEN_SECRET`: chuỗi bí mật dài, ngẫu nhiên (JWT)
     - `DB_USER`, `DB_PASS`: thông tin MongoDB Atlas (nếu dùng Atlas)
     - (Tuỳ chọn) `PORT`: mặc định 5000

2. Nếu dùng MongoDB local, thay đổi URI trong `index.js` từ dạng `mongodb+srv://...` sang `mongodb://localhost:27017` và cập nhật tên DB nếu cần.

## Cài đặt và chạy (PowerShell trên Windows)
```powershell
# Di chuyển tới thư mục server-side
cd "c:/Users/quang/OneDrive/Documents/duan/Web_Dev/doc/demo/Volunteer-Management-System/server-side"

# Cài đặt dependencies
npm install

# Chạy dev với tự động reload
npm run dev
# hoặc chạy production
# npm start
```

- Server sẽ chạy tại `http://localhost:5000` (hoặc cổng bạn cấu hình).
- CORS đã mở cho:
  - `http://localhost:5173`
  - `https://volunteer-management-sys-66dad.web.app`
  Cần thêm origin khác? Cập nhật mảng `origin` trong `index.js`.

## Các endpoint chính
- `POST /jwt` tạo JWT và set cookie `token`
- `GET /logout` hoặc `POST /logout` xoá cookie `token`
- `GET /volunteers` (giới hạn 6 bản ghi, sort theo `deadline`)
- `GET /need-volunteers?search=...` (tìm theo `post_title`)
- `POST /add-volunteer-post`
- `GET /get-volunteer-post/:email` (yêu cầu cookie JWT, so khớp email)
- `PUT /update-volunteer-count/:id`
- `PUT /update-volunteer-post/:id`
- `DELETE /my-volunteer-post/:id`
- `POST /request-volunteer`
- `GET /get-volunteer-request/:email` (yêu cầu cookie JWT)
- `DELETE /my-volunteer-request/:id`
- `GET /post/:id`

## Lỗi thường gặp
- `Unauthorized access` khi gọi các route cần JWT: đảm bảo đã gọi `POST /jwt` và cookie `token` tồn tại. Với môi trường production, cookie có `SameSite=None; Secure`.
- Không kết nối được MongoDB Atlas: kiểm tra `DB_USER`, `DB_PASS`, IP whitelist và chuỗi kết nối.
- CORS: nếu frontend chạy ở origin khác, thêm vào `corsOptions.origin` trong `index.js`.
