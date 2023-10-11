import renderCard from "./modules/renderCard.mjs";
import renderProfile from "./modules/renderProfileInfo.mjs";

const url = "https://api.noroff.dev/api/v1/social/profiles/";
const token = localStorage.getItem("token");
const name = localStorage.getItem("name");

/* FETCH PROFILE INFO */
async function getToken() {
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
  console.log(data);
  renderProfile(data);
  getCount(data);
  getPosts();
  // newPost(token);
}
getToken();

/* USERS POSTS */
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
    console.log(item);
    newPost(item);
  });
}

buttonMorePosts.addEventListener("click", () => {
  startIndex += postsPerPage;
  getPosts();
});

/* NEW POST */

const postURL = "https://api.noroff.dev/api/v1/social/posts/slutt";
const buttonPostNewPost = document.querySelector("#buttonPostNewPost");
const inputTitle = document.querySelector("#inputTitle");
const inputBody = document.querySelector("#inputBody");
const inputMedia = document.querySelector("#inputMedia");
const inputTags = document.querySelector("#inputTags");

async function newPost(item) {
  const inputPost = {
    title: inputTitle.value,
    body: inputBody.value,
    media: inputMedia.value,
    // tags: inputTags.value,       Se på senere: må være en string [], får "Bad Request".
  };

  const res = await fetch(postURL, {
    method: "POST",
    body: JSON.stringify(inputPost),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const postData = await res.json();
  console.log(postData);
}

// buttonPostNewPost.addEventListener("click", () => {
//   function renderModal() {
//     const modal = document.createElement("div");
//   }
// });
