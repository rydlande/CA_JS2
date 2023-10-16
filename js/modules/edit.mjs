import renderCard from "./modules/renderCard.mjs";
renderCard();

/* edit */
export default function editDeletePost() {
  const options = querySelector("#options");
  options.querySelector("#editPostModal").addEventListener("click", (e) => {
    const editPostModal = document.querySelector("#editPostModal");
    editPostModal.classList.add("modal");
    const postId = e.target.getAttribute("data-post-id");
    editPostModal.dataset.postId = postId;
    editPostModal.style.display = "block";
  });

  options.querySelector("#deletePost").addEventListener("click", (e) => {
    const postId = e.target.getAttribute("data-post-id");
    deletePost(postId, accessToken);
    options.remove();
  });
  document
    .querySelector("#clodeEditPostButton")
    .addEventListener("click", () => {
      const editPostModal = document.querySelector("#editPostModal");
      editPostModal.style.display = "none";
    });
  document
    .querySelector("#saveEditPostButton")
    .addEventListener("click", () => {
      const editPostModal = document.querySelector("#editPostModal");
      const postId = editPostModal.dataset.postId;

      const updatedPostData = {
        title: document.querySelector("#editTitleInput").value,
        body: document.querySelector("#editBodyInput").value,
        tags: document.querySelector("#editTagsInput").value.split(" "),
        media: document.querySelector("#editMediaInput").value,
      };

      editPostModal(postId, updatedPostData);
      editPostModal.style.display = "none";
    });
}
