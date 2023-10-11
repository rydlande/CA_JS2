const root = document.getElementById('root-posts');
const url = "https://api.noroff.dev/api/v1/social/posts?_author=true&_reactions=true&_comments=true";
const buttonMorePosts = document.querySelector("#buttonMorePosts");
let postsPerPage = 10;
let startIndex = 0;

import renderCard from './modules/renderCard.mjs';
import checkForErrors from './modules/checkForErrors.mjs'

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
    checkForErrors(data)
    console.log(data)
    let slicedData = data.slice(startIndex, startIndex + postsPerPage);
    slicedData.forEach(item => {
        root.append(renderCard(item))
    });
}
addEventListener('DOMContentLoaded', () => {
    getPosts()
})

buttonMorePosts.addEventListener("click", () => {
    startIndex += postsPerPage;
    getPosts();
  });
