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
    root.innerHTML = '';
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
    let slicedData = data.slice(startIndex, startIndex + postsPerPage);
    console.log(slicedData)
    slicedData.forEach(item => {
            root.append(renderCard(item))
    });
    buttonMorePosts.style.display = data.length > startIndex + postsPerPage ? "flex" : "none";
    buttonMorePosts.addEventListener("click", () => {
        startIndex += postsPerPage;
        let slicedData = data.slice(startIndex, startIndex + postsPerPage);
        slicedData.forEach((item) => {
          root.append(renderCard(item));
        });
        buttonMorePosts.style.display = data.length > startIndex + postsPerPage ? "flex" : "none";
        console.log(slicedData)
    });
    if(root.innerHTML === ""){
        root.innerHTML = '<h2 class="no-results">No results found</h2>'
    }
    }
addEventListener('DOMContentLoaded', () => {
    getPosts(url)
})

/* buttonMorePosts.addEventListener("click", () => {
    startIndex += postsPerPage;
    getPosts(url);
  }); */


/* FILTER */
const filterNewest = document.querySelector('#filter-newest');
const filterOldest = document.querySelector('#filter-oldest');
const filterFollowing = document.querySelector('#filter-following');

filterNewest.addEventListener('click', () => {
    getPosts(url + '&sortOrder=desc')
});
filterOldest.addEventListener('click', () => {
    getPosts(url + '&sortOrder=asc')
});
filterFollowing.addEventListener('click', () => {
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


searchButton.addEventListener('click', (e) => {
    e.preventDefault();
async function searchPosts(){
        root.innerHTML = '';
        let token = localStorage.getItem('token');
        const res = await fetch("https://api.noroff.dev/api/v1/social/posts/?_author=true&_reactions=true&_comments=true", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
        })
        const data = await res.json()
        checkForErrors(data)
        filterSearch(data)
    }
    searchPosts()
})
function filterSearch(data){
    let filteredArray = [];
    let filterTitle  = data.filter(post => post.title.toLowerCase().includes(searchInput.value.toLowerCase()));
    let filterBody = data.filter(post => post.body.toLowerCase().includes(searchInput.value.toLowerCase()));
    let filterTag = data.filter(post => post.tags.forEach((item)=> {
        if(item.toLowerCase().includes(searchInput.value.toLowerCase())){
            return post
        }
    }));
    filterTitle.forEach(item => {
        filteredArray.push(item)
    })
    filterBody.forEach(item => {
        filteredArray.push(item)
    })
    filterTag.forEach(item => {
        filteredArray.push(item)
    })
    const uniqueArray = filteredArray.filter((item, index, self) => {
        return index === self.findIndex((t) => (
            t.id === item.id
        ));
    });
    let slicedData = uniqueArray.slice(startIndex, startIndex + postsPerPage);
    buttonMorePosts.style.display = uniqueArray.length > startIndex + postsPerPage ? "flex" : "none";
    buttonMorePosts.addEventListener("click", () => {
        let slicedData = uniqueArray.slice(startIndex, startIndex + postsPerPage);
        startIndex += postsPerPage;
        slicedData.forEach((item) => {
            root.append(renderCard(item));
        });
        buttonMorePosts.style.display = uniqueArray.length > startIndex + postsPerPage ? "flex" : "none";
    });
    if(uniqueArray.length === 0){
        root.innerHTML = '<h2 class="no-results">No results found</h2>'
    } else {
        slicedData.forEach(item => {
            root.append(renderCard(item))
        });
    }
}