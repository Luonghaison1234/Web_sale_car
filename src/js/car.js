// ============================
// CAR DATABASE
// ============================
const carList = [
  {
    brand: "Honda",
    model: "Civic",
    price: "$24,000",
    type: "Sedan",
    image: "img/download (4).webp",
  },
  {
    brand: "Honda",
    model: "CR-V",
    price: "$32,000",
    type: "SUV",
    image: "img/download (5).webp",
  },
  {
    brand: "Mercedes",
    model: "C-Class",
    price: "$42,000",
    type: "Sedan",
    image: "img/download (6).webp",
  },
  {
    brand: "Mercedes",
    model: "GLE",
    price: "$65,000",
    type: "SUV",
    image: "img/download (7).webp",
  },
  {
    brand: "Hyundai",
    model: "Elantra",
    price: "$22,500",
    type: "Sedan",
    image: "img/download (8).webp",
  },
  {
    brand: "Hyundai",
    model: "Tucson",
    price: "$30,000",
    type: "SUV",
    image: "img/download (9).webp",
  },
  {
    brand: "Kia",
    model: "Sportage",
    price: "$29,000",
    type: "SUV",
    image: "img/download (10).webp",
  },
  {
    brand: "Chevrolet",
    model: "Camaro",
    price: "$35,000",
    type: "Sports",
    image: "img/download (11).webp",
  },
  {
    brand: "Nissan",
    model: "Altima",
    price: "$26,000",
    type: "Sedan",
    image: "img/download (12).webp",
  },
  {
    brand: "Nissan",
    model: "Rogue",
    price: "$31,000",
    type: "SUV",
    image: "img/download (13).webp",
  },

  {
    brand: "Tesla",
    model: "Model S",
    price: "$89,990",
    type: "Electric",
    image: "img/tesla_model_s.webp",
  },
  {
    brand: "Tesla",
    model: "Model 3",
    price: "$39,990",
    type: "Electric",
    image: "img/download.webp",
  },
  {
    brand: "BMW",
    model: "X5",
    price: "$61,000",
    type: "SUV",
    image: "img/OIP.webp",
  },
  {
    brand: "BMW",
    model: "i8",
    price: "$147,500",
    type: "Hybrid",
    image: "img/OIP (1).webp",
  },
  {
    brand: "Audi",
    model: "A4",
    price: "$40,300",
    type: "Sedan",
    image: "img/Audi.webp",
  },
  {
    brand: "Audi",
    model: "Q7",
    price: "$58,000",
    type: "SUV",
    image: "img/OIP (2).webp",
  },
  {
    brand: "Toyota",
    model: "Corolla",
    price: "$21,900",
    type: "Sedan",
    image: "img/OIP (3).webp",
  },
  {
    brand: "Toyota",
    model: "RAV4",
    price: "$28,000",
    type: "SUV",
    image: "img/download (1).webp",
  },
  {
    brand: "Ford",
    model: "Mustang",
    price: "$27,000",
    type: "Sports",
    image: "img/download (2).webp",
  },
  {
    brand: "Ford",
    model: "Explorer",
    price: "$36,000",
    type: "SUV",
    image: "img/download (3).webp",
  },
];

// ============================
// GET ELEMENTS FROM THE PAGE
// ============================
const brandSelect = document.querySelectorAll(".search select")[0]; // Brand dropdown
const modelSelect = document.querySelectorAll(".search select")[1]; // Model dropdown
const priceSelect = document.querySelectorAll(".search select")[2]; // Price range dropdown
const searchInput = document.getElementById("search"); // Search text box

// ============================
// FILL BRAND & MODEL DROPDOWNS
// ============================
function fillDropdowns() {
  // Get unique brands
  const brands = [...new Set(carList.map((c) => c.brand))];

  // Get unique models
  const models = [...new Set(carList.map((c) => c.model))];

  // Add brands to brand dropdown
  brands.forEach((b) => {
    const opt = document.createElement("option");
    opt.textContent = b;
    brandSelect.appendChild(opt);
  });

  // Add models to model dropdown
  models.forEach((m) => {
    const opt = document.createElement("option");
    opt.textContent = m;
    modelSelect.appendChild(opt);
  });
}

// ============================
// DISPLAY CARS ON THE PAGE
// ============================
function showCars(list) {
  const container = document.getElementById("cars");
  container.innerHTML = "";

  //create a card for each car
  list.forEach((car) => {
    container.innerHTML += `
      <div class="card">
        <img src="${car.image}">
        <h3>${car.brand} ${car.model}</h3>
        <p>${car.type}</p>
        <p><strong>${car.price}</strong></p>
        <button onclick='addToCart(${JSON.stringify(car)})'>Add to Cart</button>


      </div>
    `;
  });
}

// ============================
// CONVERT PRICE TEXT TO NUMBER
// ============================
function getPriceNumber(price) {
  // "$39,990" → "39990" → 39990
  return parseInt(price.replace("$", "").replace(",", ""));
}
function buyCar(name, price) {
  window.location.href = `buy.html?car=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
}
function addToCart(car) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if car already in cart
  const exists = cart.find(
    (item) => item.brand === car.brand && item.model === car.model,
  );

  if (exists) {
    exists.qty += 1;
  } else {
    cart.push({
      brand: car.brand,
      model: car.model,
      price: car.price,
      image: car.image,
      qty: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(car.brand + " " + car.model + " added to cart!");
}

// ============================
// FILTER CARS BASED ON SEARCH
// ============================
function filterCars() {
  const brand = brandSelect.value;
  const model = modelSelect.value;
  const price = priceSelect.value;
  const text = searchInput.value.toLowerCase();

  const filtered = carList.filter((car) => {
    const carPrice = getPriceNumber(car.price);
    let ok = true;

    // Filter by brand
    if (brand !== "Brands" && car.brand !== brand) ok = false;

    // Filter by model
    if (model !== "Models" && car.model !== model) ok = false;

    // Filter by price range
    if (price === "$20,000 - $40,000" && (carPrice < 20000 || carPrice > 40000))
      ok = false;
    if (price === "$40,000 - $60,000" && (carPrice < 40000 || carPrice > 60000))
      ok = false;
    if (price === "$60,000 - $80,000" && (carPrice < 60000 || carPrice > 80000))
      ok = false;
    if (
      price === "$80,000 - $100,000" &&
      (carPrice < 80000 || carPrice > 100000)
    )
      ok = false;
    if (price === "$100,000+" && carPrice < 100000) ok = false;

    // Filter by search text
    if (
      text &&
      !car.brand.toLowerCase().includes(text) &&
      !car.model.toLowerCase().includes(text)
    )
      ok = false;

    return ok; // Only show cars that pass all tests
  });

  showCars(filtered);
}

// ============================
// RUN FILTER WHEN BUTTON CLICKED
// ============================
document.querySelector(".search button").addEventListener("click", filterCars);

// ============================
// INITIALIZE WEBSITE
// ============================
fillDropdowns(); // Fill dropdown menus
showCars(carList); // Show all cars on load
