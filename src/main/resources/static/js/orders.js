
async function loadOrders(){

  if(!localStorage.getItem("userId")) {
    window.location.href = "login.html";
  }


  const userId = localStorage.getItem("userId");

  const email =
    localStorage.getItem("email") ||
    localStorage.getItem("username") ||
    localStorage.getItem("user");

  if(email){
    document.getElementById("popupUser").innerText = email;
  }

  const res = await fetch(`http://localhost:8080/api/orders?userId=${userId}`);
  const orders = await res.json();

  const div = document.getElementById("orders");

  if(orders.length === 0){
    div.innerHTML = "<p style='color:#d4a017;font-size:22px'>No Orders Found</p>";
    return;
  }

  div.innerHTML = orders.map(o => `
    <div class="order-card">

      <div class="order-header">
        <div class="order-title">Order #${o.id}</div>
        <div class="order-status">ORDER PLACED</div>
      </div>

      <div class="order-details">
        <div class="detail-box">
          <div class="detail-label">Total Amount</div>
          <div class="detail-value">₹${o.totalAmount}</div>
        </div>

        <div class="detail-box">
          <div class="detail-label">Order Date</div>
          <div class="detail-value">
            ${o.orderDate.replace("T"," ").slice(0,16)}
          </div>
        </div>
      </div>

      <div class="items-box">
        <div class="items-title">Items</div>
        ${o.items.map(i => `
          <div class="item-line">• ${i.productName} × ${i.quantity}</div>
        `).join("")}
      </div>

    </div>
  `).join("");
}

function goHome(){ location.href="home.html"; }
function goCart(){ location.href="cart.html"; }

function toggleProfile(){
  const p = document.getElementById("profilePopup");
  const o = document.getElementById("overlay");
  const show = p.style.display !== "block";
  p.style.display = show ? "block" : "none";
  o.style.display = show ? "block" : "none";
}

function logout(){
  localStorage.clear();
  location.href="login.html";
}

