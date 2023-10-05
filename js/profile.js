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

  const containerPosts = document.querySelector("#containerPosts");
  const buttonNewPost = document.createElement("button");
  buttonNewPost.textContent = "New post";
  buttonNewPost.classList.add(
    "btn",
    "btn-custom-new-post",
    "d-flex",
    "align-items-center",
    "justify-content-center"
  );
  const { id, title, body, tags, media, created, updated } = usersPosts;
  if (!id) {
    containerPosts.innerHTML = `
    Looks like you don't have any posts yet.
    Create your first post now!`;
    containerPosts.appendChild(buttonNewPost);
  } else if (!media) {
    /* LEGG INN RIKTIG CARD-STYLING PÅ POST UTEN BILDE HER */
    containerPosts.innerHTML = `
    <div class="cardPost">
      <h2>${title}</h2>
      <p>${body}</p>
    </div>`;
  } else {
    /* LEGG INN RIKTIG CARD-STYLING PÅ POST MED BILDE HER */
    containerPosts.innerHTML = `
    <div class="cardPost">
      <h2>${title}</h2>
      <div class="postMedia">
        <img src="${media}" alt="Picture from post titled: ${title}" />
      </div>
    </div>`;
  }
}
