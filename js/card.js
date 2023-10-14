const root = document.getElementById('root-posts');
const url = "https://api.noroff.dev/api/v1/social/posts?_author=true&_reactions=true&_comments=true";
const buttonMorePosts = document.querySelector("#buttonMorePosts");
let postsPerPage = 10;
let startIndex = 0;

import renderCard from './modules/renderCard.mjs';
import checkForErrors from './modules/checkForErrors.mjs'

/**
 * Fetches posts from the specified URL and renders them as cards on the page.
 * @async
 * @function getPosts
 * @param {string} url - The URL to fetch the posts from.
 * @returns {Promise<void>}
 */

async function getPosts(url){
    let token = localStorage.getItem('token');
    const res = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
    })
    const data = await res.json()
    const newData = filterPosts(data)
    checkForErrors(newData)
    console.log(newData)
    let slicedData = newData.slice(startIndex, startIndex + postsPerPage);
    slicedData.forEach(item => {
        root.append(renderCard(item))
    });
}
addEventListener('DOMContentLoaded', () => {
    getPosts(url)
})

buttonMorePosts.addEventListener("click", () => {
    startIndex += postsPerPage;
    getPosts(url);
  });


/* FILTER */
const filterNewest = document.querySelector('#filter-newest');
const filterOldest = document.querySelector('#filter-oldest');
const filterFollowing = document.querySelector('#filter-following');

filterNewest.addEventListener('click', () => {
    root.innerHTML = '';
    getPosts(url + '&sortOrder=desc')
});
filterOldest.addEventListener('click', () => {
    root.innerHTML = '';
    getPosts(url + '&sortOrder=asc')
});
filterFollowing.addEventListener('click', () => {
    root.innerHTML = '';
    getPosts('https://api.noroff.dev/api/v1/social/posts/following?_author=true&_reactions=true&_comments=true')
});

/**
 * Filters an array of post objects by removing any posts with empty titles or bodies.
 * @param {Array} data - The array of post objects to filter.
 * @returns {Array} - The filtered array of post objects.
 */

function filterPosts(data){
    let filter1  = data.filter(post => post.title !== "");
    let filter2 = filter1.filter(post => post.body !== "");
    return filter2
}

/* SEARCH */
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-input-button');

searchButton.addEventListener('click', () => {
    root.innerHTML = '';
    getPosts(url + `&search=${searchInput.value}`)
});

searchInput.addEventListener('keyup', (e) => {
    e.preventDefault();
    let postsArr = [];
    async function searchPosts(){
        let token = localStorage.getItem('token');
        const res = await fetch("https://api.noroff.dev/api/v1/social/posts?_tag=cute", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
        })
        const data = await res.json()
        const newData = filterPosts(data)
        checkForErrors(newData)
        console.log(newData)
    }
    searchPosts()
})