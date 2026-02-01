// Get the register form from the page
const registerForm = document.getElementById("registerForm");

// Only run this code if we are on the register page
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop the page from refreshing

    // Get user input values
    const username = regUsername.value.trim();
    const email = regEmail.value.trim();
    const password = regPassword.value;
    const confirm = confirmPassword.value;

    // Clear any old error messages
    regError.textContent = "";

    // Check if all fields are filled
    if (!username || !email || !password || !confirm) {
      regError.textContent = "Please fill in all fields";
      return;
    }

    // Check if passwords match
    if (password !== confirm) {
      regError.textContent = "Passwords do not match";
      return;
    }

    // Get saved users from localStorage (or empty array if none)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    if (users.some((u) => u.email === email)) {
      regError.textContent = "Email already exists";
      return;
    }

    // Add new user to array
    users.push({ username, email, password });

    // Save updated users array to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Show success message and go to login page
    alert("Registration successful!");
    window.location.href = "sighin.html";
  });
}
