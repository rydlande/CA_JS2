/* import sosToken from "../testing/sosTest";
console.log(sosToken); */

const url = "https://api.noroff.dev/api/v1/social/profiles/";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const author = params.get("author");
console.log(author);

async function renderUsers() {
  const root = document.getElementById("root-single-post");
  const token = localStorage.getItem("token");
  const res = await fetch(
    url + author + "?_followers=true&_following=true&_posts=true",
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
  document.title = `${author} | The Garden`;
}

renderUsers();
