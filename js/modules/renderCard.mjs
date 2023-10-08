export default function renderCard(data) {
  const card = document.createElement("div");
  card.classList.add("card");

  let { title, body, id, media, author, comments, reactions } = data;

  const cardContent = document.createElement("a");
  cardContent.classList.add("cardContent");

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("imageContainer");
  const postImage = document.createElement("img");

  const creator = document.createElement("a");
  creator.classList.add("creator");
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
  creator.href = `../../public/profile/index.html?id=${author.id}`;

  const cardTop = document.createElement("div");
  cardTop.classList.add("cardTop");
  cardTop.append(creator);
  const cardTitle = document.createElement("h2");
  cardTitle.innerText = title;
  if (!media) {
    imageContainer.style.display = "none";
  }
  postImage.src = media;
  cardContent.href = `../../public/posts/index.html?id=${id}`;
  imageContainer.append(postImage);
  cardContent.append(title, body, id, imageContainer);
  const cardBottom = document.createElement("div");
  cardBottom.classList.add("cardBottom");
  const commentsShow = document.createElement("a");
  commentsShow.href = `../../public/posts/index.html?id=${id}`;
  commentsShow.innerText = `${comments.length} comments`;
  commentsShow.classList.add("comments");
  const reactionsShow = document.createElement("a");
  reactionsShow.href = `../../public/posts/index.html?id=${id}`;
  reactionsShow.innerText = `${reactions.length} reactions`;
  reactionsShow.classList.add("reactions");
  cardBottom.append(commentsShow, reactionsShow);
  card.append(cardTop, cardContent, cardBottom);
  return card;
}
