console.log("Admin JS Loaded");

let editId = null;

function initAdmin() {
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (!userId) {
        alert("Please login first");
        return location.href = "login.html";
    }

    if (role !== "ADMIN") {
        alert("You are not authorized");
        return location.href = "home.html";
    }

    loadProducts();
}

async function loadProducts() {
    const res = await fetch("http://localhost:8080/api/products");
    const products = await res.json();

    document.getElementById("productList").innerHTML = products.map(p => `
        <div class="item">
            <b>${p.name}</b> - ₹${p.price}
            <div>
                <button class="btn-small" onclick='startEdit(${JSON.stringify(p)})'>Edit</button>
                <button class="btn-small delete-btn" onclick='deleteProduct(${p.id})'>Delete</button>
            </div>
        </div>
    `).join("");
}

function startEdit(p) {
    editId = p.id;
    document.getElementById("formTitle").innerText = "Edit Product";
    document.getElementById("name").value = p.name;
    document.getElementById("desc").value = p.description ?? "";
    document.getElementById("price").value = p.price;
    document.getElementById("img").value = p.imageUrl ?? "";
}

async function saveProduct() {

    const body = {
        name: document.getElementById("name").value.trim(),
        description: document.getElementById("desc").value.trim(),
        price: Number(document.getElementById("price").value),
        imageUrl: document.getElementById("img").value.trim()
    };

    if (!body.name || !body.price) {
        alert("Name & Price are required");
        return;
    }

    let url = "http://localhost:8080/api/products";
    let method = "POST";

    if (editId) {
        url += "/" + editId;
        method = "PUT";
    }

    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        alert("Error while saving product");
        return;
    }

    alert(editId ? "Updated Successfully!" : "Product Added!");
    editId = null;

    document.getElementById("formTitle").innerText = "Add New Product";
    document.getElementById("name").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("price").value = "";
    document.getElementById("img").value = "";

    loadProducts();
}

async function deleteProduct(id) {
    if (!confirm("Are you sure?")) return;

    const res = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) {
        alert("Delete Failed");
        return;
    }

    alert("Deleted!");
    loadProducts();
}

function logout() {
    localStorage.clear();
    location.href = "login.html";
}
