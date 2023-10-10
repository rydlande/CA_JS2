const url = "https://api.noroff.dev/api/v1/social/profiles/";
const queryString = document.location.search;
console.log(queryString);
const params = new URLSearchParams(queryString);
console.log(params);
const name = params.get("author");
console.log(name);

async function renderUsers() {
  const root = document.getElementById("root-single-post");
  //   const name =
  const token = localStorage.getItem("token");
  const res = await fetch(
    url /* + name + "?__following=true&_followers=true&_posts=true" */,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  console.log(data);
}
