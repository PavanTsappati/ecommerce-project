async function loadCart() {

  if(!localStorage.getItem("userId")) {
    window.location.href = "login.html";
  }


  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  // show username or email inside popup
  const user =
    localStorage.getItem("username") ||
    localStorage.getItem("email") ||
    localStorage.getItem("user") ||
    "User";

  document.getElementById("popupUser").innerText = user;

  // fetch cart
  const res = await fetch(`http://localhost:8080/api/cart?userId=${userId}`);
  const cart = await res.json();

  const div = document.getElementById("cartItems");

  if (!cart || cart.length === 0) {
    div.innerHTML = `
      <center style="color:#aaa;font-size:20px;padding:20px;">
        Cart is empty 🛒
      </center>`;
    return;
  }

  div.innerHTML = cart.map(c => `
    <div class="cart-card">
      <div class="cart-left">
        <b>${c.product.name}</b>
        <span>₹ ${c.product.price} × ${c.quantity}</span>
      </div>
      <button class="remove-btn" onclick="removeItem(${c.id})">Remove</button>
    </div>
  `).join("");
}


async function removeItem(id) {
  await fetch(`http://localhost:8080/api/cart/${id}`, {
    method: "DELETE"
  });
  loadCart();
}


async function placeOrder() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Please login first");
    return;
  }

  const res = await fetch(`http://localhost:8080/api/orders/place?userId=${userId}`, {
    method: "POST"
  });

  if (!res.ok) {
    alert(await res.text());
    return;
  }

  window.location.href = "orders.html";
}


/* NAVIGATION */
function goHome() { location.href = "home.html"; }
function goOrders() { location.href = "orders.html"; }

/* PROFILE POPUP */
function toggleProfile() {
  const p = document.getElementById("profilePopup");
  const o = document.getElementById("overlay");
  const show = p.style.display !== "block";
  p.style.display = show ? "block" : "none";
  o.style.display = show ? "block" : "none";
}

/* LOGOUT */
function logout() {
  localStorage.clear();
  location.href = "login.html";
}
