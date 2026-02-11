function clearCart() {
  if (!confirm("Are you sure you want to remove all cars?")) return;

  localStorage.removeItem("cart");
  location.reload();
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart");
let total = 0;

cart.forEach((car, index) => {
  total += parseInt(car.price.replace("$", "").replace(",", "")) * car.qty;

  container.innerHTML += `
<div class="item">
  <img src="${car.image}">
  
  <div class="info">
    <h3>${car.brand} ${car.model}</h3>

    <div class="qty-box">
      <input type="number" value="${car.qty}" min="1" onchange="setQty(${index}, this.value)">
    </div>

    <div class="price">${car.price}</div>

    <button class="remove" onclick="removeItem(${index})">Remove</button>
  </div>
</div>

  `;
});

document.getElementById("total").innerText =
  "Total: $" + total.toLocaleString();

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
function changeQty(index, change) {
  if (cart[index].qty + change < 1) return;

  cart[index].qty += change;
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function setQty(index, value) {
  value = parseInt(value);
  if (value < 1 || isNaN(value)) value = 1;

  cart[index].qty = value;
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Convert cart to URL safe string
  const cartData = encodeURIComponent(JSON.stringify(cart));

  // Calculate total
  let total = 0;
  cart.forEach((car) => {
    total += parseInt(car.price.replace("$", "").replace(",", "")) * car.qty;
  });

  window.location.href = `buy.html?cart=${cartData}&total=${total}`;
}
