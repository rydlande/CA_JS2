const queryString = document.location.search;
const params = new URLSearchParams(queryString);
console.log(params);
const id = params.get("id");
console.log(id)
import renderSingleCard from './modules/renderSingleCard.mjs';

async function renderPost() {
    const root = document.getElementById('root-single-post');
const token = localStorage.getItem("token");
    const res = await fetch(`https://api.noroff.dev/api/v1/social/posts/`+ id +"?_author=true&_reactions=true&_comments=true",{
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
    })
    const data = await res.json()
    console.log(data)
    document.title = `Post by ${data.author} | The Garden`;
    root.append(renderSingleCard(data))
}
renderPost();
