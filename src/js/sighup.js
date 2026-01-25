document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorDiv = document.getElementById("error");

    errorDiv.textContent = "";

    if (!username || !email || !password || !confirmPassword) {
      errorDiv.textContent = "Vui lòng điền đầy đủ thông tin";
      return;
    }

    if (password !== confirmPassword) {
      errorDiv.textContent = "Mật khẩu không khớp";
      return;
    }

    // 👉 LẤY DANH SÁCH USER (NẾU CHƯA CÓ → MẢNG RỖNG)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // 👉 KIỂM TRA EMAIL TRÙNG
    const isExist = users.some(user => user.email === email);
    if (isExist) {
      errorDiv.textContent = "Email đã tồn tại";
      return;
    }

    // 👉 THÊM USER MỚI
    users.push({
      username,
      email,
      password,
    });

    // 👉 LƯU LẠI VÀO LOCALSTORAGE
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("registerForm").reset();

    alert("Đăng ký thành công!");
    window.location.href = "sighin.html";
  });
