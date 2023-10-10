export default function comment(data, appendTo){
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comment-container');
    const commentForm = document.createElement('form');
    commentForm.classList.add('comment-form');
    data.comments.forEach((item)=> {
    const comment = document.createElement('div');
    comment.classList.add('comment');
    const commentBody = document.createElement('p');
    commentBody.classList.add('comment-body');
    commentBody.innerText = item.body;
    const commentHeader = document.createElement('div');
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
        commentHeader.append(creator)
    comment.append(commentHeader, commentBody, commentForm)
    commentContainer.append(comment);
})
appendTo.append(commentContainer);
}