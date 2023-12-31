export default async function deletePost(postId) {
  const token = localStorage.getItem("token");

  const url = "https://api.noroff.dev/api/v1/social/posts/";
  const res = await fetch(url + postId, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const resData = await res.json();
  if (res.ok) {
    window.location.reload();
  }
}
