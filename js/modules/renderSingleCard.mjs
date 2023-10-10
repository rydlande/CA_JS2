export default function renderCard(data) {
    const card = document.createElement("div");
    card.classList.add("card-single");
  
    let { title, body, id, media, author, comments, reactions } = data;
  
    const cardContent = document.createElement("div");
    cardContent.classList.add("cardContent-single");
  
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("imageContainer-single");
    const postImage = document.createElement("img");
    const creator = document.createElement("a");
    creator.classList.add("creator");
    const creatorImage = document.createElement("img");
    creatorImage.src = author.avatar;
    creatorImage.classList.add("creatorImage");
    const creatorImageContainer = document.createElement("div");
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
  
    creatorImageContainer.classList.add("creatorImageContainer");
    creatorImageContainer.append(creatorImage);
    creator.append(creatorImageContainer, author.name);
    if (!author.avatar) {
      creatorImage.style.display = "none";
    }
    creator.href = `../../public/profile/?author=${author.id}`;
    const cardTop = document.createElement("div");
    cardTop.classList.add("cardTop");
    cardTop.append(creator, timestamp);
    const cardTitle = document.createElement("h2");
    cardTitle.innerText = title;
    if (!media) {
      imageContainer.style.display = "none";
    }
    card.style.zIndex="4"
    const cardBody = document.createElement("div");
    cardBody.classList.add("cardBody-single");
    cardBody.innerText = body;
    postImage.src = media;
    imageContainer.append(postImage);
    cardContent.append(cardTitle, cardBody, imageContainer);
    const cardBottom = document.createElement("div");
    cardBottom.classList.add("cardBottom");
    const commentsShow = document.createElement("a");
    commentsShow.href = `../../public/posts/?id=${id}`;
    commentsShow.innerText = `${comments.length} comments`;
    commentsShow.classList.add("comments");
    const reactionsShow = document.createElement("a");
    reactionsShow.href = `../../public/posts/?id=${id}`;
    reactionsShow.innerText = `${reactions.length} reactions`;
    reactionsShow.classList.add("reactions");
    cardBottom.append(reactionsShow, commentsShow);
    card.append(cardTop, cardContent, cardBottom);
    return card;
  }
  