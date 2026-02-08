// home.js

// Check login state
const isLoggedIn = localStorage.getItem("isLoggedIn");

// If not logged in, send back to login
if (isLoggedIn !== "true") {
    alert('Please log in first')
  window.location.href = "sighin.html";
}
