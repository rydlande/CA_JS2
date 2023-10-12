export default function renderProfile(data) {
  console.log(data);

  //AVATAR
  const containerAvatar = document.querySelector("#containerAvatar");
  const { name, banner, avatar } = data;
  if (!avatar) {
    containerAvatar.innerHTML = `
    <img class=" profile-image-element rounded-circle" src="../../media/ian-dooley-hpTH5b6mo2s-unsplash.jpg">`;
  } else {
    containerAvatar.innerHTML = `
    <img class=" profile-image-element rounded-circle" src="${avatar}">`;
  }

  //USERNAME
  const containerName = document.querySelector("#containerName");
  containerName.innerHTML = `
  <h1 class="p-4 text-secondary text-nowrap font-monospace">${name} 
  <small class="text-muted font-normal identifier">(Me)</small></h1>`;

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
