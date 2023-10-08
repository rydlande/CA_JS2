import renderCard from "./modules/renderCard.mjs";

const url = "https://api.noroff.dev/api/v1/social/profiles/";
const token = localStorage.getItem("token");
const name = localStorage.getItem("name");

/* FETCH PROFILE INFO */
async function getToken() {
  const res = await fetch(url + name, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log(data);
  getProfile(data);
  getCount(data);
  getPosts();
  // newPost(token);
}
getToken();

/* AVATAR AND NAME (add inn banner later) */
async function getProfile(data) {
  //AVATAR
  const containerAvatar = document.querySelector("#containerAvatar");
  const { name, banner, avatar } = data;
  if (!avatar) {
    containerAvatar.innerHTML = `
    <img class=" profile-image-element rounded-circle" src="../../media/ian-dooley-hpTH5b6mo2s-unsplash.jpg">`;
  } else {
    containerAvatar.innerHTML = `
    <img class=" profile-image-element rounded-circle" src="${avatar}">`;
  }
  //USERNAME
  const containerName = document.querySelector("#containerName");
  containerName.innerHTML = `
  <h1 class="p-4 text-secondary text-nowrap font-monospace">${name} 
  <small class="text-muted font-normal identifier">(Me)</small></h1>`;
}

/* NUMBER OF POSTS, FOLLOWING AND FOLLOWERS */
async function getCount(data) {
  const containerCount = document.querySelector("#containerCount");
  const usersCount = data._count;
  const { posts, following, followers } = usersCount;
  console.log(usersCount);
  containerCount.innerHTML = `
    <div class="col w-100 gap-4 d-flex align-items-center justify-content-center flex-column">
      <i class="bi bi-collection-fill icon-complimentary fa-lg"></i>
      <p class="text-nobreak count">${posts}</p>
    </div>

    <div class="col w-100 gap-4 d-flex align-items-center justify-content-center flex-column">
      <i class="bi bi-person-heart icon-complimentary fa-lg"></i>
      <p class="text-nobreak count">${following}</p>
    </div>

    <div class="col w-100 gap-4 d-flex align-items-center justify-content-center flex-column">
      <i class="bi bi-people-fill icon-complimentary fa-lg"></i>
      <p class="text-nobreak count" id="postsCount">${followers}</p>
    </div>
  `;
}

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

buttonPostNewPost.addEventListener("click", () => {});
