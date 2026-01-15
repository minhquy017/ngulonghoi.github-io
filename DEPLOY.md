# 🚀 Hướng dẫn Đưa Website lên GitHub Pages

Tài liệu này sẽ hướng dẫn bạn cách đưa trang web **HueUni Connect** lên mạng để mọi người cùng truy cập, và cách cập nhật nó dễ dàng.

## PHẦN 1: Lần đầu tiên (First Time Setup)

Nếu đây là lần đầu tiên bạn đưa code này lên GitHub, hãy làm theo các bước sau:

### Bước 1: Tạo Repository trên GitHub
1. Truy cập [GitHub](https://github.com/) và đăng nhập.
2. Nhấn vào dấu **+** ở góc trên bên phải -> chọn **New repository**.
3. Đặt tên Repository (ví dụ: `hueuni-connect`).
4. Chọn **Public**.
5. **QUAN TRỌNG:** Không chọn "Add a README file" hay "gitignore". Để repo trống.
6. Nhấn **Create repository**.

### Bước 2: Đẩy code lên GitHub
Mở Terminal trong VS Code (`Ctrl + J` hoặc `Ctrl + ` `) và chạy lần lượt các lệnh sau (copy và paste từng dòng):

```bash
git init
git add .
git commit -m "First commit - HueUni Connect v1.0"
git branch -M main
```

Lệnh cuối cùng cần thay đường dẫn của bạn vào:
```bash
git remote add origin https://github.com/USERNAME/TEN-REPO.git
git push -u origin main
```
*(Thay `USERNAME` bằng tên GitHub của bạn, `TEN-REPO` bằng tên bạn vừa đặt)*

### Bước 3: Bật GitHub Pages
1. Vào trang Repository của bạn trên GitHub.
2. Chọn tab **Settings** -> menu bên trái chọn **Pages**.
3. Ở mục **Build and deployment** > **Branch**:
   - Chọn `main`.
   - Chọn folder `/ (root)`.
   - Nhấn **Save**.
4. Đợi khoảng 1-2 phút, reload trang. Bạn sẽ thấy link website ở trên đầu (ví dụ: `https://username.github.io/hueuni-connect/`).

---

## PHẦN 2: Cách cập nhật website (Update)

Mỗi khi bạn sửa code xong và muốn cập nhật lên web, mình đã tạo sẵn một công cụ tự động cho bạn.

### Cách 1: Dùng Tool tự động (Khuyên dùng)
1. Trong thư mục dự án, tìm file `update_web.bat`.
2. **Double click (nhấn đúp chuột)** vào file đó.
3. Nhập nội dung bạn vừa sửa (ví dụ: "Sửa lỗi nút Lưu") rồi nhấn Enter.
4. Tool sẽ tự động đẩy code lên GitHub. Web sẽ tự cập nhật sau 1-2 phút!

### Cách 2: Dùng lệnh thủ công
Nếu muốn dùng lệnh, bạn mở Terminal và gõ:

```bash
git add .
git commit -m "Noi dung thay doi"
git push
```
