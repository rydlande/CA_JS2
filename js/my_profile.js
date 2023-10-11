/* PROFILE INFO */
import renderProfile from "./modules/renderMyProfile.mjs";

const url = "https://api.noroff.dev/api/v1/social/profiles/";
const token = localStorage.getItem("token");
const name = localStorage.getItem("name");

async function getProfile() {
  const res = await fetch(
    url + name + "?_followers=true&_following=true&_posts=true",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  document.title = `My profile (@${name}) | The Garden`;
  renderProfile(data);
  getPosts();
}
getProfile();

/* USERS POSTS */
import renderCard from "./modules/renderCard.mjs";

const containerPosts = document.querySelector("#root-posts");
const buttonMorePosts = document.querySelector("#buttonMorePosts");

const postsPerPage = 10;
let startIndex = 0;

async function getPosts() {
  const res = await fetch(
    url + name + "/posts?_author=true&_reactions=true&_comments=true",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const usersPosts = await res.json();
  console.log(usersPosts);
  const slicedPosts = usersPosts.slice(startIndex, startIndex + postsPerPage);
  slicedPosts.forEach((item) => {
    containerPosts.append(renderCard(item));
  });
}

buttonMorePosts.addEventListener("click", () => {
  startIndex += postsPerPage;
  getPosts();
});

/* CREATE POST */
import createPost from "./modules/createPost.mjs";

const response = document.querySelector("#response");
const buttonPostNewPost = document.getElementById("buttonPostNewPost");

buttonPostNewPost.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("inputTitle").value;
  if (!title) {
    response.style.color = "red";
    response.innerText = `Title is required`;
  } else {
    createPost();
  }
});

/* UPDATE PROFILE - method: PUT */
