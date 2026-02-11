// Login check
if (localStorage.getItem("isLoggedIn") !== "true") {
  alert("Please log in first");
  window.location.href = "sighin.html";
}

// Weather
const apiKey = "6592d484b5e740207018ada506fb0c1b"; // replace this
const city = "Hanoi";
const result = document.getElementById("result");

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city},VN&units=metric&appid=${apiKey}`,
)
  .then((res) => res.json())
  .then((data) => {
    // If API error
    if (data.cod !== 200) {
      result.innerHTML = `<p style="color:red;">${data.message}</p>`;
      return;
    }

    // If success
    result.innerHTML = `
      <h3>${data.name}</h3>
      <p>🌡 Temperature: ${data.main.temp} °C</p>
      <p>☁ Weather: ${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind: ${data.wind.speed} m/s</p>
    `;
  })
  .catch((err) => {
    result.innerHTML = "<p>Failed to load weather</p>";
    console.error(err);
  });
