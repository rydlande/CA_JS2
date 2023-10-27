const urlFUF = "https://api.noroff.dev/api/v1/social/profiles/";
const url = "https://api.noroff.dev/api/v1/social/profiles/";
const token = localStorage.getItem("token");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const author = params.get("author");

const buttonFUF = document.querySelector("#buttonFUF");

let followers;

async function renderUserFUF() {
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
  let following;
  const usersFollowers = data.followers;
    usersFollowers.forEach(({ name }) => {
      followers = name;
      if (name === localStorage.getItem("name")) {
        console.log("following")
        following = true
      }
    });
  console.log(usersFollowers)
  buttonFUF.addEventListener("click", () => {
    console.log(usersFollowers);
    if (following === true) {
      unfollow();
      buttonFUF.classList.remove("btn-custom-follow-following");
      buttonFUF.classList.add("btn-custom-follow-not-following");
    } else {
      follow();
      buttonFUF.classList.add("btn-custom-follow-following");
      buttonFUF.classList.remove("btn-custom-follow-not-following");
    }
  });

}
renderUserFUF();


async function follow() {
  const res = await fetch(urlFUF + author + "/follow", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const resData = await res.json();
  window.location.reload();
}

async function unfollow() {
  const res = await fetch(urlFUF + author + "/unfollow", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const resultData = await res.json();
  window.location.reload();
}