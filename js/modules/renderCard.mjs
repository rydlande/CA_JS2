const username = localStorage.getItem("name");
const token = localStorage.getItem("accessToken");
import { putReaction } from "./putReaction.js";
import editPost from "./putPost.mjs";
import deletePost from "./deletePost.mjs";

export default function renderCard(data) {
  const card = document.createElement("div");
  card.classList.add("card");

  let { title, body, id, media, author, comments, reactions } = data;
  console.log(author.name);

  /* post author and timestamp */
  const cardContent = document.createElement("a");
  cardContent.classList.add("cardContent");
  //image
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("imageContainer");
  const postImage = document.createElement("img");
  //timestamp
  const timestamp = document.createElement("p");
  timestamp.classList.add("timestamp");
  const minutesAgo = Math.floor((new Date() - new Date(data.created)) / 60000);
  if (minutesAgo > 59 && minutesAgo < 1440) {
    timestamp.innerText = `${Math.floor(minutesAgo / 60)} hours ago`;
  } else if (minutesAgo > 1439 && minutesAgo < 43800) {
    timestamp.innerText = `${Math.floor(minutesAgo / 60 / 24)} days ago`;
  } else if (minutesAgo > 10079 && minutesAgo < 43799) {
    timestamp.innerText = `${Math.floor(minutesAgo / 60 / 24 / 7)} weeks ago`;
  } else if (minutesAgo > 43800) {
    timestamp.innerText = `${Math.floor(minutesAgo / 60 / 24 / 30)} months ago`;
  } else if (minutesAgo < 1) {
    timestamp.innerText = `Now`;
  } else {
    timestamp.innerText = `${minutesAgo} minutes ago`;
  }
  //creator
  const creator = document.createElement("a");
  creator.classList.add("creator");
  //avatar
  const creatorImage = document.createElement("img");
  creatorImage.src = author.avatar;
  creatorImage.classList.add("creatorImage");
  const creatorImageContainer = document.createElement("div");
  creatorImageContainer.classList.add("creatorImageContainer");
  creatorImageContainer.append(creatorImage);
  creator.append(creatorImageContainer, author.name);
  if (!author.avatar) {
    creatorImage.style.display = "none";
  }
  creator.href = `../../public/profile/?author=${author.name}`;
  const cardTop = document.createElement("div");
  cardTop.classList.add("cardTop");
  cardTop.append(creator, timestamp);

  /* post title, body and image */
  const cardTitle = document.createElement("h5");
  cardTitle.innerHTML =
    title || `<p class="no-text-title">The post has no title</p>`;
  if (!media) {
    imageContainer.style.display = "none";
  }
  postImage.src = media;
  cardContent.href = `../../public/posts/?id=${id}`;
  imageContainer.append(postImage);
  const cardBody = document.createElement("div");
  cardBody.classList.add("cardBody");
  cardBody.innerHTML =
    body || `<p class="no-text-body">The post has no text</p>`;
  cardContent.append(cardTitle, cardBody, imageContainer);

  /* reactions, comments and edit/delete */
  const cardBottom = document.createElement("div");
  cardBottom.classList.add("cardBottom");
  //comments
  const commentsShow = document.createElement("a");
  commentsShow.href = `../../public/posts/?id=${id}`;
  commentsShow.innerText = `${data._count.comments} comments`;
  commentsShow.classList.add("comments");
  //reactions
  const reactionsShow = document.createElement("a");
  reactionsShow.classList.add("reactions");
  const reactionContainer = document.createElement("div");
  reactions.forEach((item) => {
    const reaction = document.createElement("div");
    reaction.classList.add("reaction-item");

    const reactionSymbol = document.createElement("p");
    reactionSymbol.classList.add("reaction_symbol");
    reactionSymbol.textContent = item.symbol;

    const reactionCount = document.createElement("p");
    reactionCount.classList.add("reaction_count");
    reactionCount.textContent = item.count;
    reaction.appendChild(reactionSymbol);
    reaction.appendChild(reactionCount);
    reaction.classList.add("reaction_container");
    reactionContainer.appendChild(reaction);
  });

  const react = document.createElement("dropdown-container");
  const dropdownReact = document.createElement("div");
  dropdownReact.classList.add("dropdown-react");

  const dropdownToggle = document.createElement("a");
  dropdownToggle.classList.add("btn");
  dropdownToggle.classList.add("btn-secondary");
  dropdownToggle.classList.add("e-caret-hide");
  dropdownToggle.classList.add("button-dropdown-react");
  dropdownToggle.href = "#";
  dropdownToggle.role = "button";
  dropdownToggle.setAttribute("data-bs-toggle", "dropdown");
  dropdownToggle.setAttribute("aria-expanded", "false");

  const plusIcon = document.createElement("i");
  plusIcon.classList.add("bi");
  plusIcon.classList.add("bi-plus-lg");

  dropdownToggle.appendChild(plusIcon);
  dropdownReact.appendChild(dropdownToggle);

  const dropdownMenu = document.createElement("ul");
  dropdownMenu.classList.add("dropdown-menu");
  dropdownMenu.classList.add("react-ul");

  const reactionsList = [
    "❤️",
    "👌",
    "👍",
    "🤩",
    "😎",
    "😂",
    "😍",
    "😀",
    "😆",
    "👽",
    "👻",
    "👹",
  ];
  reactionsList.forEach((reaction) => {
    const listItem = document.createElement("li");
    listItem.classList.add("react-element");
    listItem.id = reaction;
    listItem.textContent = reaction;
    listItem.addEventListener("click", () => {
      putReaction(data.id, reaction);
    });
    dropdownMenu.appendChild(listItem);
  });

  dropdownReact.appendChild(dropdownMenu);
  react.appendChild(dropdownReact);

  reactionContainer.appendChild(react);
  reactionsShow.appendChild(reactionContainer);

  // edit & delete
  // create modal
  const editPostModal = document.createElement("div");
  editPostModal.id = "editPostModal";
  editPostModal.classList.add("modal", "fade");
  editPostModal.setAttribute("data-bs-backdrop", "static");
  editPostModal.setAttribute("data-bs-keyboard", "false");
  editPostModal.tabIndex = -1;
  editPostModal.setAttribute("aria-labelledby", "staticBackdropLabel");
  editPostModal.setAttribute("aria-hidden", "true");

  const editPostDialog = document.createElement("div");
  editPostDialog.classList.add("modal-dialog");

  const editPostContent = document.createElement("div");
  editPostContent.classList.add("modal-content");

  const editPostHeader = document.createElement("div");
  editPostHeader.classList.add("modal-header");
  const editPostTitle = document.createElement("h5");
  editPostTitle.id = "staticBackdropLabel"; //editPostTitle ?
  editPostTitle.textContent = "Edit post";

  const editPostCloseButton = document.createElement("button");
  editPostCloseButton.type = "button";
  editPostCloseButton.classList.add("btn-close");
  editPostCloseButton.setAttribute("data-bs-dismiss", "modal");
  editPostCloseButton.setAttribute("aria-label", "close");

  editPostHeader.append(editPostTitle, editPostCloseButton);

  const editPostBody = document.createElement("div");
  editPostBody.id = "modalBody";

  const labelTitle = document.createElement("label");
  labelTitle.textContent = "Title:";
  labelTitle.setAttribute("for", "editTitleInput");
  const editTitleInput = document.createElement("input");
  editTitleInput.classList.add("form-control");
  editTitleInput.type = "text";
  editTitleInput.id = "editTitleInput";

  const labelBody = document.createElement("label");
  labelBody.textContent = "Body:";
  labelBody.setAttribute("for", "editBodyInput");
  const editBodyInput = document.createElement("textarea");
  editBodyInput.classList.add("form-control");
  editBodyInput.id = "editBodyInput";
  editBodyInput.name = "";
  editBodyInput.cols = 30;
  editBodyInput.cols = 5;

  const labelMedia = document.createElement("label");
  labelMedia.textContent = "Image (url)";
  labelMedia.setAttribute("for", "editMediaInput");
  const editMediaInput = document.createElement("input");
  editMediaInput.classList.add("form-control");
  editMediaInput.type = "text";
  editMediaInput.id = "editMediaInput";

  const labelTags = document.createElement("label");
  labelTags.textContent =
    "Add tags so others can find your post. Edit tags separated by spaces";
  labelTags.setAttribute("for", "editTagsInput");
  const editTagsInput = document.createElement("input");
  editTagsInput.classList.add("form-control");
  editTagsInput.type = "text";
  editTagsInput.id = "editTagsInput";

  editPostBody.append(
    labelTitle,
    editTitleInput,
    labelBody,
    editBodyInput,
    labelMedia,
    editMediaInput,
    labelTags,
    editTagsInput
  );

  const editPostFooter = document.createElement("div");
  editPostFooter.classList.add("modal-footer");
  const saveEditPostButton = document.createElement("button");
  saveEditPostButton.type = "submit";
  saveEditPostButton.classList.add("btn", "btn-secondary");
  saveEditPostButton.id = "saveEditPostButton";
  saveEditPostButton.textContent = "Save Post";

  editPostFooter.append(saveEditPostButton);
  editPostContent.append(editPostHeader, editPostBody, editPostFooter);

  editPostDialog.append(editPostContent);
  editPostModal.append(editPostDialog);

  const options = document.createElement("div");
  options.setAttribute("id", "options");

  if (username === author.name) {
    const dropdownEditDelete = document.createElement("div");
    dropdownEditDelete.classList.add("dropdown");

    const dropdownButton = document.createElement("button");
    dropdownButton.classList.add("btn", "btn-secondary");
    dropdownButton.type = "button";
    dropdownButton.id = "dropdownMenuButton";
    dropdownButton.setAttribute("data-bs-toggle", "dropdown");
    dropdownButton.setAttribute("aria-expanded", "false");

    const dropdownIcon = document.createElement("i");
    dropdownIcon.classList.add("bi", "bi-three-dots-vertical");

    dropdownButton.appendChild(dropdownIcon);
    dropdownEditDelete.appendChild(dropdownButton);

    const dropdownMenu = document.createElement("ul");
    dropdownMenu.classList.add("dropdown-menu");
    dropdownMenu.setAttribute("aria-labelledby", "dropdownMenuButton1");

    const editItem = document.createElement("li");
    const editLink = document.createElement("a");
    editLink.classList.add("dropdown-item");
    editLink.id = "editPost";
    editLink.setAttribute("data-post-id", id);
    editLink.textContent = "Edit";
    editItem.appendChild(editLink);

    const deleteItem = document.createElement("li");
    const deleteLink = document.createElement("a");
    deleteLink.classList.add("dropdown-item");
    deleteLink.href = "#";
    deleteLink.id = "deletePost";
    deleteLink.setAttribute("data-post-id", id);
    deleteLink.textContent = "Delete";
    deleteItem.appendChild(deleteLink);

    editLink.addEventListener("click", (e) => {
      const postId = e.target.getAttribute("data-post-id");
      editPostModal.dataset.id = postId;
      editPostModal.classList.add("show");
      editPostModal.style.display = "block";
    });
    deleteLink.addEventListener("click", (e) => {
      const postId = e.target.getAttribute("data-post-id");
      deletePost(postId);
    });
    editPostCloseButton.addEventListener("click", () => {
      editPostModal.style.display = "none";
    });
    saveEditPostButton.addEventListener("click", (e) => {
      const postId = e.target.getAttribute("data-post-id");
      editPostModal.dataset.id = postId;

      const updatedPostData = {
        title: editTitleInput.value,
        body: editBodyInput.value,
        media: editMediaInput.value,
        tags: editTagsInput.value.split(" "),
      };
      editPost(id, updatedPostData);
      editPostModal.style.display = "none";
    });

    dropdownMenu.append(editItem, deleteItem);

    dropdownEditDelete.appendChild(dropdownMenu);
    options.appendChild(dropdownEditDelete);
  }

  cardBottom.append(reactionsShow, commentsShow, editPostModal, options);
  card.append(cardTop, cardContent, cardBottom);
  return card;
}
