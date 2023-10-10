/* const buttonNewPost = document.querySelector('#buttonNewPost');
const body = document.querySelector('body');

buttonNewPost.addEventListener('click', () => {
    function renderModal(){
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
        <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                New post
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <!-- MODAL BODY -->
            <div class="modal-body">
              <!-- TITLE -->
              <div id="modalTitle">
                <label for="inputTitle">Title:</label>
                <input type="text" id="inputTitle" class="form-control" />
              </div>
              <!-- BODY -->
              <div id="modalBody">
                <label for="inputBody">Body:</label>
                <textarea
                  name=""
                  id="inputBody"
                  class="form-control"
                  cols="30"
                  rows="5"
                ></textarea>
              </div>
              <!-- MEIDA -->
              <div id="modalMedia">
                <label for="inputMedia">Image (url):</label>
                <input type="text" id="inputMedia" class="form-control" />
              </div>
              <!-- TAGS -->
              <div id="modalTags">
                <label for="inputTags"
                  >Make your post easier to find for others, you can use
                  more than one tag by adding space between the
                  tags</label
                >
                <input type="text" id="inputTags" class="form-control" />
              </div>
            </div>
            <!-- SUBMIT -->
            <div class="modal-footer">
              <button
                type="sumbit"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
        `
    }
    renderModal();
}) */

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
/* ADD NEW POST */
const postURL = "https://api.noroff.dev/api/v1/social/posts/";
const buttonNewPost = document.querySelector("#buttonNewPost");
const inputTitle = document.querySelector("#inputTitle");
const inputBody = document.querySelector("#inputBody");
const inputMedia = document.querySelector("#inputMedia");
const inputTags = document.querySelector("#inputTags");

async function newPost(token) {
  const inputPost = {
    title: inputTitle.value,
    body: inputBody.value,
    media: inputMedia.value,
    tags: inputTags.value,
  };

  const res = await fetch(postURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(inputPost),
  });
  console.log(res);
  const postData = await res.json();
  console.log(postData);
}
