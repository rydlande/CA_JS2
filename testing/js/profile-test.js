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

function createPost() {
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
