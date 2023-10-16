const username = localStorage.getItem("name");
import { putReaction } from "./putReaction.js";
console.log(username);

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
  const options = document.createElement("div");
  options.setAttribute("id", "options");

  if (username === author.name) {
    options.innerHTML = `
    <div class="dropdown">
      <button class="btn btn-secondary" type="button" id="dropdownMenuButton" dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-three-dots-vertical"></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" href="#" id="editPost" data-post-id="${id}>Edit</a></li>
        <li><a class="dropdown-item" href="#" id="editPost" data-post-id="${id}">Edit</a></li>
        <li><a class="dropdown-item" href="#" id="deletePost" data-post-id="${id}">Delete</a></li>

      </ul>
   </div>`;
  }

  cardBottom.append(reactionsShow, commentsShow, options);
  card.append(cardTop, cardContent, cardBottom);
  return card;
}
