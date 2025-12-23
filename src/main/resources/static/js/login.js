async function loginUser() {
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Enter username & password");
    return;
  }

  try {
    const res = await fetch("/api/auth/login", {
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

    const role = (data.role || "").toUpperCase();

    localStorage.setItem("userId", data.userId);
    localStorage.setItem("username", data.username || username);
    localStorage.setItem("role", role);

    if (role === "ADMIN") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "home.html";
    }

  } catch (e) {
    alert("Server not reachable");
    console.error(e);
  }
}
