const urlPosts = "https://api.noroff.dev/api/v1/social/posts/";
const body = document.getElementById("inputBody").value;
const media = document.getElementById("inputMedia").value;
const tags = document.getElementById("inputTags").value;

export default async function createPost() {
  const title = document.getElementById("inputTitle").value;
  const newPost = {
    title: title,
    body: body,
    media: media,
    tags: tags.split(" "),
  };

  const token = localStorage.getItem("token");
  const res = await fetch(urlPosts, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newPost),
  });

  const data = await res.json();
  if (res.ok) {
    location.reload();
  }
}
