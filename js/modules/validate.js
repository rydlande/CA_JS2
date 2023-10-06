export async function validateUser() {
  const url = "https://api.noroff.dev/api/v1/social/posts";
  let token = localStorage.getItem("token");
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  if (data.statusCode === 500) {
    window.location.href = "../../auth/login.html";
  }
}
validateUser();

/* import { validateUser } from './validate.js'; */
