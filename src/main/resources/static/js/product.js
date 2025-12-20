async function loadProduct(){

  if(!localStorage.getItem("userId")) {
    window.location.href = "login.html";
  }

  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const res = await fetch(`http://localhost:8080/api/products/${id}`);
  const p = await res.json();

  document.getElementById("product").innerHTML = `
    <div class="product-wrapper">
      <div class="product-img">
        <img src="${p.imageUrl || ''}" alt="${p.name}">
      </div>

      <div class="infoBox">
        <div class="title">${p.name}</div>
        <div class="sub">Premium Edition</div>
        <div class="desc">${p.description || "High quality product with premium build and performance."}</div>
        <div class="price">₹ ${p.price}</div>
        <button class="addBtn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  `;
}

async function addToCart(productId){
  const userId = localStorage.getItem("userId");
  if(!userId){
    alert("Please login first");
    return;
  }

  await fetch(
    `http://localhost:8080/api/cart/add?userId=${userId}&productId=${productId}`,
    { method:"POST" }
  );

  alert("Product added to cart");
}

/* NAV */
function goHome(){ location.href="home.html"; }
function goCart(){ location.href="cart.html"; }
function goOrders(){ location.href="orders.html"; }

/* PROFILE */
function toggleProfile(){
  const o=document.getElementById("overlay");
  const p=document.getElementById("profilePopup");
  const show=p.style.display!=="block";
  if(show){
    document.getElementById("popupUser").innerText =
      localStorage.getItem("username") || "User";
  }
  o.style.display=show?"block":"none";
  p.style.display=show?"block":"none";
}

function logoutUser(){
  localStorage.clear();
  location.href="login.html";
}
