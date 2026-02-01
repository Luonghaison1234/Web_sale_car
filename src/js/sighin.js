// Get the login form from the page
const loginForm = document.getElementById("loginForm");
localStorage.setItem("isLoggedIn", "false");

// Only run this code if we are on the login page
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop page reload

    // Get user input values
    const username = loginUsername.value;
    const email = loginEmail.value;
    const password = loginPassword.value;

    // Clear old error messages
    loginError.textContent = "";

    // Get users list from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find a matching user
    const user = users.find(
      (u) =>
        u.username === username && u.email === email && u.password === password,
    );

    // If user not found, show error
    if (!user) {
      loginError.textContent = "Invalid login details";
      return;
    }

    // Save login state
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Redirect to home page
    window.location.href = "home.html";
  });
}
