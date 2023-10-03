const url = "https://api.noroff.dev/api/v1/social/auth/login";
const button = document.querySelector("button");
const email = document.querySelector("#input-email");
const password = document.querySelector("#input-password");

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
  //   location.href = "../public/feed/";
}
