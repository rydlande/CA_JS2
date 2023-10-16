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
  const usersFollowers = data.followers;
  usersFollowers.forEach(({ name }) => {
    followers = name;
  });

  buttonFUF.addEventListener("click", () => {
    console.log(usersFollowers);
    if (author === followers) {
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

async function follow(usersFollowers) {
  const res = await fetch(urlFUF + author + "/follow", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(usersFollowers),
  });
  const resData = await res.json();
}

async function unfollow(usersFollowers) {
  const res = await fetch(urlFUF + author + "/unfollow", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(usersFollowers),
  });
  const resultData = await res.json();
}
