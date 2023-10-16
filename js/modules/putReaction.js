async function putReaction(postID, reaction) {
  const token = localStorage.getItem("token");
  if(reaction === "heart"){
    return reaction = "❤️";
  } else if(reaction === "nice"){
    return reaction = "👌";
  } else if (reaction === "thumbsup"){
    return reaction = "👍";
  } else if(reaction === "stareyes"){
    return  reaction = "🤩";
  }else if(reaction === "cool"){
    return reaction = "😎";
  } else if(reaction === "laugh"){
    return reaction = "😂";
  } else if(reaction === "hearteyes"){
    return reaction = "😍";
  }else if(reaction === "okface"){
    return reaction = "😀";
  } else if(reaction === "lillaugh"){
    return reaction = "😆";
  }else if(reaction === "alien"){
    return  reaction = "👽";
  } else if(reaction === "ghost"){
    return  reaction = "👻";
  }else if(reaction === "devil"){
    return  reaction = "👹";
  }
  const url = `https://api.noroff.dev/api/v1/social/posts/${postID}/react/${reaction}`;
  const res = await fetch(url, {
      method: "PUT",
      headers: {
          Authorization: `Bearer ${token}`,
      },
  })
  const data = await res.json()
  window.location.reload();
  console.log(data)
  }

  export { putReaction };