document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      if (username === "AdminS" && password === "123") {
        window.location.href = "admin-panel.html";
      } else {
        alert("Invalid username or password. Please try again.");
      }
    });
  } else {
    console.error("Login form not found");
  }
});

function login(type) {
  if (type === "user") {
    window.location.href = "user.html";
  }
}

function adminLogin() {
  window.location.href = "admin-login.html";
}
