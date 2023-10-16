import comment from './comment.mjs';
import postComment from './postComment.mjs';
import {putReaction} from './putReaction.js';
/**
 * Renders a single card element based on the provided data.
 * @param {Object} data - The data object containing information about the card.
 * @param {string} data.id - The ID of the card.
 * @param {string} data.title - The title of the card.
 * @param {string} data.body - The body text of the card.
 * @param {string} data.media - The URL of the media associated with the card.
 * @param {Object[]} data.comments - An array of comment objects associated with the card.
 * @param {Object[]} data.reactions - An array of reaction objects associated with the card.
 * @param {Object} data.author - An object containing information about the author of the card.
 * @param {string} data.author.name - The name of the author.
 * @param {string} data.author.avatar - The URL of the author's avatar image.
 * @example renderCard({
 *  id: "123",
 * title: "Hello, world!",
 * body: "This is a post about the world.",
 * media: "https://example.com/image.png",
 * comments: [],
 * reactions: [],
 * author: {
 *  name: "John Doe",
 * avatar: "https://example.com/avatar.png"
 * }
 * });
 */


export default function renderCard(data) {
  const url = `https://api.noroff.dev/api/v1/social/posts/${data.id}/comment`;
  let { title, body, media, comments, reactions } = data;
  const cardContent = document.createElement("a");
  cardContent.classList.add("cardContent-single");
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("imageContainer");
  const card = document.createElement("div");
  card.classList.add("card-single");
  const creator = document.createElement("a");
  creator.classList.add("creator-single");
  const timestamp = document.createElement("p");
  timestamp.classList.add("timestamp");
  const minutesAgo = Math.floor((new Date() - new Date(data.created)) / 60000 )
  if(minutesAgo > 59 && minutesAgo < 1440) {
    timestamp.innerText = `${Math.floor(minutesAgo/60)} hours ago`;
  } else if(minutesAgo > 1439 && minutesAgo < 43800){
    timestamp.innerText = `${Math.floor((minutesAgo/60)/24)} days ago`;
  } else if(minutesAgo > 10079 && minutesAgo < 43799){
    timestamp.innerText = `${Math.floor(((minutesAgo/60)/24)/7)} weeks ago`;
  } else if(minutesAgo > 43800){
    timestamp.innerText = `${Math.floor(((minutesAgo/60)/24)/30)} months ago`;
  } else if(minutesAgo < 1) {
    timestamp.innerText = `Now`;
  } else {
    timestamp.innerText = `${minutesAgo} minutes ago`;
 }
  const creatorImage = document.createElement("img");
  creatorImage.src = data.author.avatar;
  creatorImage.classList.add("creatorImage");
  const postImage = document.createElement("img");
  const creatorImageContainer = document.createElement("div");
    creatorImageContainer.classList.add("creatorImageContainer");
    creatorImageContainer.append(creatorImage);
    creator.append(creatorImageContainer, data.author.name);
    if (!data.author.avatar) {
      creatorImage.style.display = "none";
    }
    creator.href = `../../public/profile/?author=${data.author.name}`;

    const cardTop = document.createElement("div");
    cardTop.classList.add("cardTop-single");
    cardTop.append(creator, timestamp);
    const cardTitle = document.createElement("h2");
    cardTitle.innerHTML = title || `<p class="no-text-title">The post has no title</p>`;
    if (!media) {
      imageContainer.style.display = "none";
    }
    card.style.zIndex="4"
    const cardBody = document.createElement("div");
    cardBody.classList.add("cardBody-single");
    cardBody.innerHTML = body || `<p class="no-text-body">The post has no body text</p>`;
    postImage.src = media;
    imageContainer.append(postImage);
    cardContent.append(cardTitle, cardBody, imageContainer);
    const cardBottom = document.createElement("div");
    cardBottom.classList.add("cardBottom-single");
    const commentsShow = document.createElement("div");
    commentsShow.innerHTML = `<h5>Comments</h5>`;
    commentsShow.classList.add("commentsShow");
    const commentInput = document.createElement('textarea');
    commentInput.classList.add('input-group');
    commentInput.classList.add('input-group-custom');
    commentInput.classList.add('comment-input');
    commentInput.placeholder = "Write a comment...";
    const commentPostContainer = document.createElement('div');
    commentPostContainer.classList.add('comment-post-container');
    const commentButton = document.createElement('button');
    commentButton.classList.add('btn');
    commentButton.classList.add('btn-custom-new-post');
    commentButton.classList.add('comment-btn');
    commentButton.innerText = "Post";  
    commentButton.addEventListener('click', ()=> {
      postComment(url)
    })
    commentPostContainer.append(commentInput, commentButton);
    commentsShow.append(commentPostContainer);
    const reactionsShow = document.createElement("div");
    reactionsShow.classList.add("reactions");
    comment(data, commentsShow);
    
    const reactionContainer = document.createElement("div");
    reactions.forEach(item => {
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
    
    const reactionsList = ["❤️", "👌", "👍", "🤩", "😎", "😂", "😍", "😀", "😆", "👽", "👻", "👹"];
    reactionsList.forEach(reaction => {
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
    
    cardBottom.appendChild(reactionsShow);
    cardBottom.appendChild(commentsShow);
    card.appendChild(cardTop);
    card.appendChild(cardContent);
    card.appendChild(cardBottom);
    return card;
  }