# 📚 Library Management System

## 📖 Giới thiệu

**Library Management System** là ứng dụng quản lý thư viện được xây dựng nhằm hỗ trợ quản lý sách, tài khoản người dùng và hoạt động mượn/trả sách trong thư viện.

Hệ thống được phát triển theo mô hình **Frontend - Backend - Database**, trong đó Frontend cung cấp giao diện tương tác với người dùng, Backend xử lý nghiệp vụ và cung cấp REST API, còn MongoDB được sử dụng để lưu trữ dữ liệu.

Đây là đồ án môn **Công nghệ phần mềm**.

---

## 🎯 Mục tiêu của đề tài

Đề tài được thực hiện với các mục tiêu:

* Xây dựng một hệ thống quản lý thư viện trên nền tảng Web.
* Quản lý thông tin sách trong thư viện.
* Quản lý tài khoản người dùng.
* Phân quyền người dùng theo từng vai trò.
* Hỗ trợ chức năng mượn và trả sách.
* Theo dõi trạng thái mượn sách.
* Kiểm tra sách quá hạn.
* Tính tiền phạt khi trả sách quá hạn.
* Xây dựng giao diện trực quan, dễ sử dụng.
* Áp dụng kiến thức về phân tích, thiết kế và phát triển phần mềm.

---

## ✨ Chức năng chính

### 🔐 1. Xác thực và quản lý người dùng

Hệ thống hỗ trợ:

* Đăng ký tài khoản.
* Đăng nhập.
* Xác thực người dùng.
* Mã hóa mật khẩu.
* Phân quyền người dùng.
* Quản lý trạng thái tài khoản.

Hệ thống gồm 3 vai trò:

| Vai trò       | Mô tả                              |
| ------------- | ---------------------------------- |
| **ADMIN**     | Quản trị toàn bộ hệ thống          |
| **LIBRARIAN** | Quản lý sách và hoạt động mượn/trả |
| **MEMBER**    | Thành viên sử dụng thư viện        |

---

### 📚 2. Quản lý sách

Hệ thống hỗ trợ:

* Xem danh sách sách.
* Xem thông tin chi tiết sách.
* Thêm sách.
* Cập nhật thông tin sách.
* Quản lý số lượng sách.
* Theo dõi số lượng sách có thể mượn.
* Quản lý trạng thái sách.
* Hiển thị thông tin tác giả, ISBN, thể loại, nhà xuất bản và năm xuất bản.

---

### 📖 3. Quản lý mượn sách

Hệ thống hỗ trợ:

* Mượn sách.
* Kiểm tra số lượng sách còn lại.
* Kiểm tra người dùng có đang hoạt động hay không.
* Kiểm tra sách có đang hoạt động hay không.
* Theo dõi ngày mượn.
* Theo dõi ngày đến hạn.
* Theo dõi trạng thái mượn.
* Xem danh sách sách đang mượn.
* Xem lịch sử mượn sách.

---

### 🔄 4. Quản lý trả sách

Người dùng có thể thực hiện trả sách.

Sau khi trả:

* Cập nhật ngày trả.
* Cập nhật trạng thái phiếu mượn.
* Cập nhật lại số lượng sách có sẵn.
* Kiểm tra sách có trả quá hạn hay không.
* Tính tiền phạt nếu trả quá hạn.

---

### 💰 5. Tính tiền phạt

Hệ thống hỗ trợ tính tiền phạt đối với sách được trả sau ngày đến hạn.

Thông tin tiền phạt được lưu cùng với thông tin phiếu mượn/trả sách.

---

## 🛠️ Công nghệ sử dụng

### Frontend

* **React.js**
* **Vite**
* **React Router**
* **JavaScript**
* **HTML5**
* **CSS3**

### Backend

* **Node.js**
* **Express.js**
* **REST API**
* **JWT Authentication**
* **bcrypt**

### Database

* **MongoDB**
* **Mongoose**

### Công cụ phát triển

* **Visual Studio Code**
* **Git**
* **GitHub**
* **Postman**

---

## 🏗️ Kiến trúc hệ thống

Hệ thống được xây dựng theo mô hình:

```text
┌──────────────────────────────┐
│          FRONTEND            │
│       React + Vite           │
│                              │
│      http://localhost:5173   │
└──────────────┬───────────────┘
               │
               │ HTTP / REST API
               ▼
┌──────────────────────────────┐
│           BACKEND            │
│      Node.js + Express       │
│                              │
│      http://localhost:5000   │
└──────────────┬───────────────┘
               │
               │ Mongoose
               ▼
┌──────────────────────────────┐
│           MONGODB            │
│           Database           │
└──────────────────────────────┘
```

---

## 📂 Cấu trúc thư mục

```text
library-management/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── README.md
└── package.json
```

> Lưu ý: cấu trúc thư mục có thể thay đổi tùy theo quá trình phát triển dự án.

---

# ⚙️ Cài đặt môi trường

## 1. Yêu cầu

Trước khi chạy dự án, cần cài đặt:

* Node.js
* npm
* MongoDB hoặc MongoDB Atlas
* Git
* Visual Studio Code

Kiểm tra Node.js:

```bash
node -v
```

Kiểm tra npm:

```bash
npm -v
```

Kiểm tra Git:

```bash
git --version
```

---

# 🚀 Hướng dẫn chạy Backend

## Bước 1: Mở Terminal

Di chuyển đến thư mục backend:

```bash
cd D:\library-management\backend
```

## Bước 2: Cài đặt thư viện

```bash
npm install
```

## Bước 3: Cấu hình biến môi trường

Tạo file:

```text
.env
```

Trong thư mục:

```text
backend/.env
```

Ví dụ:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### ⚠️ Lưu ý bảo mật

Không được đưa thông tin thật của:

* MongoDB connection string
* JWT Secret
* Password
* API Key

lên GitHub.

File `.env` nên được thêm vào `.gitignore`.

---

## Bước 4: Chạy Backend

Nếu project sử dụng nodemon:

```bash
npm run dev
```

Hoặc:

```bash
npm start
```

Backend mặc định chạy tại:

```text
http://localhost:5000
```

---

# 🚀 Hướng dẫn chạy Frontend

Mở một Terminal mới.

Di chuyển đến thư mục frontend:

```bash
cd D:\library-management\frontend
```

Cài đặt thư viện:

```bash
npm install
```

Chạy Frontend:

```bash
npm run dev
```

Sau khi chạy thành công, Vite sẽ cung cấp địa chỉ:

```text
http://localhost:5173
```

Mở trình duyệt và truy cập:

```text
http://localhost:5173
```

---

# 🔄 Quy trình chạy toàn bộ hệ thống

Để chạy hệ thống, cần mở **2 Terminal**.

### Terminal 1 – Backend

```bash
cd D:\library-management\backend
npm run dev
```

### Terminal 2 – Frontend

```bash
cd D:\library-management\frontend
npm run dev
```

Sau đó mở:

```text
http://localhost:5173
```

---

# 🧪 Kiểm thử API

API Backend có thể được kiểm thử bằng **Postman**.

## Authentication

Các chức năng chính:

```text
POST /api/auth/register
POST /api/auth/login
```

## Books

Các chức năng chính:

```text
GET    /api/books
GET    /api/books/:id
POST   /api/books
PUT    /api/books/:id
DELETE /api/books/:id
```

## Borrowings

Các chức năng chính:

```text
POST /api/borrowings
GET  /api/borrowings
GET  /api/borrowings/my
POST /api/borrowings/:id/return
```

> Đường dẫn API thực tế có thể thay đổi tùy theo cấu hình route trong Backend.

---

# 🔐 Authentication và Authorization

Hệ thống sử dụng cơ chế xác thực để bảo vệ các API.

Quy trình:

```text
User
 │
 ▼
Login
 │
 ▼
Backend kiểm tra email + password
 │
 ▼
JWT Token
 │
 ▼
Client lưu Token
 │
 ▼
Gửi Token trong Request
 │
 ▼
Authentication Middleware
 │
 ▼
Authorization Middleware
 │
 ▼
Cho phép / Từ chối truy cập
```

Mỗi người dùng được phân quyền dựa trên role:

```text
ADMIN
LIBRARIAN
MEMBER
```

---

# 👥 Phân quyền

| Chức năng          | ADMIN | LIBRARIAN | MEMBER |
| ------------------ | :---: | :-------: | :----: |
| Đăng nhập          |   ✅   |     ✅     |    ✅   |
| Xem sách           |   ✅   |     ✅     |    ✅   |
| Xem chi tiết sách  |   ✅   |     ✅     |    ✅   |
| Quản lý sách       |   ✅   |     ✅     |    ❌   |
| Mượn sách          |   ✅   |     ✅     |    ✅   |
| Xem phiếu mượn     |   ✅   |     ✅     |    ❌   |
| Xem sách đang mượn |   ❌   |     ❌     |    ✅   |
| Trả sách           |   ✅   |     ✅     |    ✅   |
| Tính tiền phạt     |   ✅   |     ✅     |    ✅   |

---

# 🖥️ Các trang giao diện

Frontend bao gồm các trang chính:

```text
Login
Register
Unauthorized
Member Dashboard
Librarian Dashboard
Admin Dashboard
Books
Book Detail
My Borrowings
```

---

# 📊 Luồng hoạt động chính

## Luồng đăng nhập

```text
Người dùng
    │
    ▼
Nhập Email + Password
    │
    ▼
Frontend gửi Request
    │
    ▼
Backend kiểm tra tài khoản
    │
    ▼
Kiểm tra Password
    │
    ▼
Tạo JWT
    │
    ▼
Frontend nhận Token
    │
    ▼
Truy cập hệ thống
```

## Luồng mượn sách

```text
Member
   │
   ▼
Chọn sách
   │
   ▼
Xem chi tiết sách
   │
   ▼
Nhấn "Borrow"
   │
   ▼
Backend kiểm tra
   │
   ├── User tồn tại?
   ├── User đang hoạt động?
   ├── Book tồn tại?
   ├── Book đang hoạt động?
   └── Còn sách?
          │
          ▼
      Tạo Borrowing
          │
          ▼
   Cập nhật số lượng sách
```

## Luồng trả sách

```text
Member
   │
   ▼
My Borrowings
   │
   ▼
Chọn sách cần trả
   │
   ▼
Return Book
   │
   ▼
Backend kiểm tra ngày đến hạn
   │
   ├── Đúng hạn
   │
   └── Quá hạn
          │
          ▼
      Tính tiền phạt
          │
          ▼
   Cập nhật trạng thái
          │
          ▼
      RETURNED
```

---

# 📌 Trạng thái dự án

## Đã hoàn thành

* [x] Xây dựng Backend
* [x] Xây dựng Frontend
* [x] Kết nối MongoDB
* [x] Đăng ký tài khoản
* [x] Đăng nhập
* [x] Authentication
* [x] Authorization
* [x] Phân quyền người dùng
* [x] Quản lý sách
* [x] Xem chi tiết sách
* [x] Mượn sách
* [x] Trả sách
* [x] Tính tiền phạt
* [x] Xem sách đang mượn
* [x] Kiểm thử API bằng Postman

## Đang phát triển

* [ ] Hoàn thiện giao diện người dùng
* [ ] Bổ sung chức năng thống kê
* [ ] Hoàn thiện tài liệu đồ án
* [ ] Deploy hệ thống lên môi trường Internet
* [ ] Bổ sung các chức năng nâng cao

---

# 🧪 Kết quả kiểm thử

Hệ thống đã được kiểm thử các chức năng chính:

* Đăng ký tài khoản.
* Đăng nhập.
* Xác thực JWT.
* Phân quyền ADMIN, LIBRARIAN và MEMBER.
* Thêm sách.
* Cập nhật sách.
* Xem danh sách sách.
* Xem chi tiết sách.
* Mượn sách.
* Trả sách.
* Kiểm tra sách quá hạn.
* Tính tiền phạt.

Các API được kiểm thử bằng **Postman** trước khi tích hợp với Frontend.

---

# 🔧 Git và GitHub

Sau khi chỉnh sửa code, sử dụng các lệnh sau để cập nhật project lên GitHub:

```bash
git status
git add .
git commit -m "update project"
git push
```

Ví dụ:

```bash
git add .
git commit -m "feat: update book management"
git push
```

---

# 📝 Quy ước Commit

Có thể sử dụng các tiền tố:

```text
feat:    Thêm chức năng mới
fix:     Sửa lỗi
docs:    Cập nhật tài liệu
style:   Thay đổi giao diện / format
refactor: Tái cấu trúc code
test:    Thêm hoặc sửa kiểm thử
chore:   Công việc cấu hình / bảo trì
```

Ví dụ:

```bash
git commit -m "feat: add book management"
```

```bash
git commit -m "fix: fix borrowing return button"
```

```bash
git commit -m "docs: update README"
```

---

# ⚠️ Lưu ý

Không commit các file chứa thông tin bí mật lên GitHub.

Ví dụ:

```text
.env
node_modules/
```

Nên khai báo trong `.gitignore`:

```gitignore
node_modules/
.env
```

---

# 🎓 Thông tin đề tài

**Tên đề tài:** Xây dựng ứng dụng quản lý thư viện

**Môn học:** Công nghệ phần mềm

**Loại dự án:** Đồ án kết thúc môn

**Nền tảng:** Web Application

**Frontend:** React + Vite

**Backend:** Node.js + Express

**Database:** MongoDB

---

# 👨‍💻 Tác giả

**Nguyễn Bùi Thiếu Gia**

Đồ án môn **Công nghệ phần mềm**

---

## 📄 License

Dự án được xây dựng nhằm mục đích học tập và phục vụ đồ án môn Công nghệ phần mềm.
