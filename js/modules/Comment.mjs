export default function comment(data, appendTo){
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment-container');
    const commentForm = document.createElement('form');
    commentForm.classList.add('comment-form');
    const filteredByDate = data.comments.sort((b, a) => new Date(a.created) - new Date(b.created));
    filteredByDate.forEach((item) => {
    const comment = document.createElement('div');
    comment.classList.add('comment');
    const commentBody = document.createElement('p');
    commentBody.classList.add('comment-body');
    commentBody.innerText = item.body;
    const commentHeader = document.createElement('div');
    const timestamp = document.createElement("p");
    timestamp.classList.add("timestamp");
    const minutesAgo = Math.floor((new Date() - new Date(item.created)) / 60000 )
   if(minutesAgo > 59) {
      timestamp.innerText = `${Math.floor(minutesAgo/60)} hours ago`;
    } else if(Math.floor(minutesAgo/60) > 23){
      timestamp.innerText = `${Math.floor((minutesAgo/60)/24)} days ago`;
    } else if(minutesAgo < 1) {
      timestamp.innerText = `Now`;
    } else {
      timestamp.innerText = `${minutesAgo} minutes ago`;
   }
    commentHeader.classList.add('comment-header');
    const creator = document.createElement("a");
    creator.classList.add("creator-single");
    const creatorImage = document.createElement("img");
    creatorImage.src = item.author.avatar;
    creatorImage.classList.add("creatorImage");
    const creatorImageContainer = document.createElement("div");
    creatorImageContainer.classList.add("creatorImageContainer");
        creatorImageContainer.append(creatorImage);
        creator.append(creatorImageContainer, item.author.name);
        if (!item.author.avatar) {
          creatorImage.style.display = "none";
        }
        creator.href = `../../public/profile/?author=${item.author.name}`;
        commentHeader.append(creator, timestamp)
    comment.append(commentHeader, commentBody, commentForm)
    commentContainer.append(comment);
})
appendTo.append(commentContainer);
}