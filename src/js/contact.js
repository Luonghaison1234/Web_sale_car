// Get the contact form
const form = document.getElementById("contactForm");

// Only run if we are on the contact page
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop page reload

    // Get required fields
    const name = form
      .querySelector('input[placeholder="Your Name"]')
      .value.trim();
    const email = form
      .querySelector('input[placeholder="Your Email"]')
      .value.trim();
    const message = form.querySelector("textarea").value.trim();

    // Check if required fields are filled
    if (name === "" || email === "" || message === "") {
      alert("Please fill in your name, email, and message.");
      return;
    }

    // Check email format
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Success
    alert("Your message has been sent successfully!");
    form.reset(); // Clear the form
  });
}
