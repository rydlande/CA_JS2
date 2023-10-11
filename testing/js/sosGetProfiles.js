import renderProfile from "./modules/sosRenderProfileInfo.mjs";

const container = document.getElementById("sosProfile");
const SOSurl = "../../testing/JSON/profiles.json";

export default async function sosToken() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  console.log(token);
  console.log(name);
  console.log(SOSurl + `?name=${name}`);
  const res = await fetch(SOSurl + `?name=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
  const data = await res.json();
  console.log(data);
  renderProfile(data);
}
sosToken();
