import renderProfile from "./modules/sosRenderProfileInfo.mjs";

const container = document.getElementById("sosProfile");
const SOSurl = "../../testing/JSON/profiles.json";

export default async function sosToken() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  console.log(token);
  console.log(name);
  const res = await fetch(SOSurl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
  const data = await res.json();
  console.log(data[0]);
  data.forEach((user) => {
    if (user.name === name) {
      renderProfile(user);
    } else {
      window.location.href = "../../../auth/login.html";
    }
  });
  // renderProfile(data);
}
sosToken();
