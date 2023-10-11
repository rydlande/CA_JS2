const queryString = document.location.search;
const params = new URLSearchParams(queryString);
console.log(params);
const id = params.get("id");
console.log(id)
import renderSingleCard from './modules/renderSingleCard.mjs';
import checkForErrors from './modules/checkForErrors.mjs'


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
    checkForErrors(data)
    console.log(data)
    document.title = `Post by ${data.author.name} | The Garden`;
    root.append(renderSingleCard(data))
}
renderPost(); 

/* async function renderPost() {
    const root = document.getElementById('root-single-post');
    const res = await fetch(`../../TESTFILES/posts.json`)
    const data = await res.json()
    console.log(data[0])
    document.title = `Post by ${data[1].author.name} | The Garden`;
    root.append(renderSingleCard(data[19]))
}
renderPost(); */