/* if localStorage accesstoken validate
 */
const url = "https://api.noroff.dev/api/v1/social/profiles/";

async function getToken() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const res = await fetch(url + name, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
  const data = await res.json();
  console.log(data);
}
getToken();
