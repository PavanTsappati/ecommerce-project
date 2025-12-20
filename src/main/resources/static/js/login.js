async function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log("Login request:", { username, password });

  const res = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    const err = await res.text();
    alert("Login failed: " + err);
    return;
  }

  const data = await res.json();

  alert(data.message);

  console.log("FULL RESPONSE:", data);
  console.log("User ID:", data.userId);
  console.log("Role Received:", data.role);

  localStorage.setItem("userId", data.userId);
  localStorage.setItem("username", data.username);
  localStorage.setItem("role", data.role);

  if (data.role && data.role.toUpperCase() === "ADMIN") {
    console.log("Redirecting to ADMIN dashboard...");
    window.location.href = "admin.html";
  } else {
    console.log("Redirecting to USER home...");
    window.location.href = "home.html";
  }
}
