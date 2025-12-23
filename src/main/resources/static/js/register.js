async function registerUser() {
  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Enter username & password");
    return;
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      const err = await res.text();
      alert("Register failed: " + err);
      return;
    }

    const data = await res.json();
    alert(data.message);
    window.location.href = "login.html";

  } catch (e) {
    alert("Server not reachable");
    console.error(e);
  }
}
