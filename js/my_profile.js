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
  const data = await res.json();
  console.log(data);
  getProfile(data);
  getCount(data);
  getPosts(name, token);
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

/* POSTS */
const buttonMorePosts = document.querySelector("#buttonMorePosts");

const postsPerPage = 10;
const startIndex = 0;

async function getPosts(name, token) {
  const res = await fetch(url + name + "/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const usersPosts = await res.json();
  console.log(usersPosts);
  const slicedPosts = usersPosts.slice(startIndex, startIndex + postsPerPage);
  console.log(slicedPosts);
  renderPosts(slicedPosts);
}

/* KAN DENNE BRUKES SOM MODUL? */
async function renderPosts(slicedPosts) {
  const containerPosts = document.querySelector("#containerPosts");
  slicedPosts.forEach((obj) => {
    console.log(obj);
    const { id, title, body, tags, media, created, updated } = obj;
    if (!id) {
      containerPosts.innerHTML = `
          Looks like you don't have any posts yet.
          Create your first post now!`;
    } else {
      containerPosts.append(createPost(title, body, media));
    }
  });
}

function createPost(title, body, media) {
  const cardPost = document.createElement("div");
  const titlePost = document.createElement("h2");
  const bodyPost = document.createElement("p");

  cardPost.classList.add("cardPost");
  titlePost.innerText = title;
  bodyPost.innerText = body;
  cardPost.append(titlePost, bodyPost);
  if (media) {
    const mediaPost = document.createElement("img");
    mediaPost.src = media;
    cardPost.appendChild(mediaPost);
  }
  return cardPost;
}

buttonMorePosts.addEventListener("click", () => {
  startIndex += postsPerPage;
  renderPosts();
});

/* ADD NEW POST */
const postURL = "https://api.noroff.dev/api/v1/social/posts/";
const buttonNewPost = document.querySelector("#buttonNewPost");
const inputTitle = document.querySelector("#inputTitle");
const inputBody = document.querySelector("#inputBody");
const inputMedia = document.querySelector("#inputMedia");
const inputTags = document.querySelector("#inputTags");

// async function newPost(token) {
//   /* const inputPost = {
//     title: inputTitle.value,
//     body: inputBody.value,
//     media: inputMedia.value,
//     tags: inputTags.value,
//   }; */

//   const res = await fetch(postURL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(inputPost),
//   });
//   console.log(res);
//   const postData = await res.json();
//   console.log(postData);
// }
