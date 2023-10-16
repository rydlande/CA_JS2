export default async function deletePost(postId) {
  const token = localStorage.getItem("accessToken");

  const url = "https://api.noroff.dev/api/v1/social/posts/";
  const res = await fetch(url + postId, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const resData = await res.json();
  if (resData.ok) {
    console.log("Post deleted");
  }
}
