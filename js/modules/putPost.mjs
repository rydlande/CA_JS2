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
  console.log("Post updated", resData);
}

/* export default async function deletePost(postId, accessToken) {
  try {
    const editPostUrl = "https://api.noroff.dev/api/v1/social/posts/" + postId;
    const response = await fetch(editPostUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      console.log("Post deleted successfully");
    } else {
      console.error("Failed to delete post");
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
} */
