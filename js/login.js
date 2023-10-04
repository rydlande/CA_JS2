const url = "https://api.noroff.dev/api/v1/social/auth/login";
const button = document.querySelector("button");
const email = document.querySelector("#input-email");
const password = document.querySelector("#input-password");
const response = document.querySelector("#response");

button.addEventListener("click", (e) => {
  e.preventDefault();
  login();
});

async function login() {
  const user = {
    email: email.value,
    password: password.value,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await res.json();
  console.log(data);
  localStorage.setItem("token", data.accessToken);
  if (data.status === "Bad Request") {
    response.style.color = "red";
    response.innerText = `Email or password is incorrect`;
  } else if (data.status === "Unauthorized") {
    response.style.color = "red";
    response.innerText = `Email or password is incorrect`;
  } else {
    setTimeout(() => {
      window.location.href = "../public/feed";
    }, 1000);
  }
}
