document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("error");

  errorDiv.textContent = "";

  if (!email || !password || !username) {
    errorDiv.textContent = "Vui lòng nhập đầy đủ thông tin";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // 👉 TÌM USER PHÙ HỢP
  const user = users.find((u) => u.email === email && u.password === password && u.username === username);

  if (!user) {
    errorDiv.textContent = "Sai username, email hoặc mật khẩu";
    return;
  }

  // 👉 LƯU USER ĐANG ĐĂNG NHẬP
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", JSON.stringify(user));

  alert("Đăng nhập thành công!");
  window.location.replace("home.html");


  window.addEventListener("load", function () {
    document.getElementById("loginForm").reset();
  });
});
