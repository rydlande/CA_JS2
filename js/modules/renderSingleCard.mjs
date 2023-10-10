import comment from './comment.mjs';
export default function renderCard(data) {
  const card = document.createElement("div");
  card.classList.add("card-single");
    creatorImageContainer.classList.add("creatorImageContainer");
    creatorImageContainer.append(creatorImage);
    creator.append(creatorImageContainer, author.name);
    if (!author.avatar) {
      creatorImage.style.display = "none";
    }
    creator.href = `../../public/profile/?author=${author.id}`;
    const cardTop = document.createElement("div");
    cardTop.classList.add("cardTop-single");
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
    cardBottom.classList.add("cardBottom-single");
    const commentsShow = document.createElement("div");
    commentsShow.innerText = `${comments.length} comments`;
    commentsShow.classList.add("comments");
    const reactionsShow = document.createElement("div");
    reactionsShow.innerText = `${reactions.length} reactions`;
    reactionsShow.classList.add("reactions");
    comment(data, commentsShow)
    cardBottom.append(reactionsShow, commentsShow);
    card.append(cardTop, cardContent, cardBottom);
    return card;
  }
