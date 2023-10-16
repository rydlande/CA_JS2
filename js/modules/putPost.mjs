export default async function editPost(id, updatedPostData) {
  const token = localStorage.getItem("accessToken");

  const url = "https://api.noroff.dev/api/v1/social/posts/";
  const res = await fetch(url + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedPostData),
  });
  const resData = await res.json();
  console.log(resData);
  if (res.ok) {
    window.location.reload();
  }
}
