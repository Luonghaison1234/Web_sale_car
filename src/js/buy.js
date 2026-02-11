const params = new URLSearchParams(window.location.search);
const cartData = params.get("cart");
const total = params.get("total");

let cart = [];

if (cartData) {
  cart = JSON.parse(decodeURIComponent(cartData));

  let list = "";
  cart.forEach((c) => {
    list += `${c.brand} ${c.model} × ${c.qty}\n`;
  });

  document.getElementById("carName").innerText = "Your Cars:";
  document.getElementById("carPrice").innerText =
    list + "\nTotal: $" + Number(total).toLocaleString();
}

function submitOrder() {
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  if (email === "" || phone === "" || address === "") {
    alert("Please fill all fields!");
    return;
  }

  let summary = "";
  cart.forEach((c) => {
    summary += `${c.brand} ${c.model} × ${c.qty}\n`;
  });

  alert(
    "Order Successful!\n\n" +
      "Cars:\n" +
      summary +
      "\nTotal: $" +
      Number(total).toLocaleString() +
      "\n\nEmail: " +
      email +
      "\nPhone: " +
      phone +
      "\nAddress: " +
      address,
  );

  // Clear cart
  localStorage.removeItem("cart");

  // Back to cart
  window.location.href = "cart.html";
}

function goBack() {
  window.location.href = "cart.html";
}
