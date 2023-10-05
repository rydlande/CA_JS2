const root = document.getElementById('root-posts');
const url = "https://api.noroff.dev/api/v1/social/posts";

import renderCard from './modules/renderCard.js';

async function getPosts(){
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
        root.append(renderCard(item))
    });
}
addEventListener('DOMContentLoaded', () => {
    getPosts()
})