const root = document.getElementById('root-posts');
function renderCard(data){
const card = document.createElement('div');
card.classList.add('card');
const { body, id, media, author } = data;
const cardContent = document.createElement('div');
cardContent.classList.add('cardContent');
const imageContainer = document.createElement('div');
const postImage = document.createElement('img');
postImage.src = media;
cardContent.append(body, imageContainer, author, id)
card.append(cardContent)
root.append(card)
}


async function getPosts(){
    const url = "https://api.noroff.dev/api/v1/social/posts";
    let token = localStorage.getItem('token');
    const res = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
    })
    const data = await res.json()
    console.log(data)
    let slicedData = data.slice(0, 10);
    slicedData.forEach(item => {
        renderCard(item)
    });
}
addEventListener('DOMContentLoaded', () => {
    getPosts()
})