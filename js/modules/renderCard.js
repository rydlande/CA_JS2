export default function renderCard(data){
    const card = document.createElement('a');
    card.classList.add('card');
    let {title, body, id, media, author } = data;
    const cardContent = document.createElement('div');
    cardContent.classList.add('cardContent');
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('imageContainer');
    const postImage = document.createElement('img');
    if(media === null){
     postImage.style.display = 'none';
     media = ""
    }
    postImage.src = media;
    card.href = `../../public/posts/index.html?id=${id}`
    imageContainer.append(postImage);
    cardContent.append(imageContainer, title, body, author, id)
    card.append(cardContent)
    return card;
    }
