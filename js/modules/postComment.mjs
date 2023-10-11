export default async function postComment(PostURL) {
const commentInput = document.querySelector(".comment-input");
const url = PostURL;
const inputPost = {
    body: commentInput.value,
  };
const res = await fetch(url, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(inputPost),
})
const data = await res.json()
window.location.reload();
console.log(data)
}