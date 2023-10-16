export default function renderProfile(data) {
  //AVATAR
  const defaultAvatar = document.querySelector("#defaultAvatar");
  const profileAvatar = document.querySelector("#profileAvatar");

  const { name, banner, avatar } = data;
  if (!avatar) {
    defaultAvatar.innerHTML = `
      <img class=" profile-image-element rounded-circle" src="../../media/bruker2.png">
      `;
  } else {
    defaultAvatar.style.display = "none";
    profileAvatar.innerHTML = `
      <img class=" profile-image-element rounded-circle" src="${avatar}">`;
  }

  //USERNAME
  const containerName = document.querySelector("#containerName");
  containerName.innerHTML = `
    <h1 class="p-4 text-secondary text-nowrap font-monospace">${name}`;

  //COUNT
  const containerCount = document.querySelector("#containerCount");
  const usersCount = data._count;
  const { posts, following, followers } = usersCount;
  console.log(usersCount);
  containerCount.innerHTML = `
      <div class="col w-100 gap-4 d-flex align-items-center justify-content-center flex-column">
        <i class="bi bi-collection-fill icon-complimentary fa-lg"></i>
        <p class="text-nobreak count">${posts}</p>
      </div>
  
      <div class="col w-100 gap-4 d-flex align-items-center justify-content-center flex-column">
        <i class="bi bi-person-heart icon-complimentary fa-lg"></i>
        <p class="text-nobreak count">${following}</p>
      </div>
  
      <div class="col w-100 gap-4 d-flex align-items-center justify-content-center flex-column">
        <i class="bi bi-people-fill icon-complimentary fa-lg"></i>
        <p class="text-nobreak count" id="postsCount">${followers}</p>
      </div>
    `;
}
