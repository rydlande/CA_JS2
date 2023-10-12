import comment from './comment.mjs';
import postComment from './postComment.mjs';
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
 if(minutesAgo > 59) {
    timestamp.innerText = `${Math.floor(minutesAgo/60)} hours ago`;
  } else if(Math.floor(minutesAgo/60) > 23){
    timestamp.innerText = `${Math.floor((minutesAgo/60)/24)} days ago`;
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
    reactionsShow.innerText = `${data._count.reactions} reactions`;
    reactionsShow.classList.add("reactions");
    comment(data, commentsShow)
    cardBottom.append(reactionsShow, commentsShow);
    card.append(cardTop, cardContent, cardBottom);
    return card;
  }

