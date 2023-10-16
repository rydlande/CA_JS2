import handleProfileMedia from "./handleProfileMedia.mjs";
export default function renderProfile(data) {
  console.log(data);

  //AVATAR
  const containerAvatar = document.querySelector("#containerAvatar");
  const profileBanner = document.querySelector("#profileBanner");
  const { name, banner, avatar } = data;
  if (!avatar) {
    containerAvatar.innerHTML = `
    <img class=" profile-image-element rounded-circle" src="../../media/bruker2.png">`;
  } else {
    containerAvatar.innerHTML = `
    <img class=" profile-image-element rounded-circle" src="${avatar}">`;
  }
  const profileBannerContainer = document.createElement("div");
  profileBannerContainer.classList.add("profile-banner-container");
  const profileBannerElement = document.createElement("img");
  profileBannerElement.classList.add("profile-banner-element");
  if (!banner) {
    console.log("no banner")
    profileBannerElement.src = "../../media/banner.png";
  } else {
    console.log("banner")
    profileBannerElement.src = banner;
  }
  profileBannerContainer.append(profileBannerElement);
  profileBanner.append(profileBannerContainer);
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
  function openModal() {
    const modal = document.createElement("div");
    modal.classList.add("editMedia-modal");
  
    const modalContent = document.createElement("div");
    modalContent.classList.add("editMedia-modal-content");
  
    const closeBtn = document.createElement("span");
    closeBtn.classList.add("close");
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", () => {
      modal.remove();
    });
    modalContent.appendChild(closeBtn);
  
    const title = document.createElement("h4");
    title.textContent = "Edit Profile Media";
    modalContent.appendChild(title);

    const avatarInput = document.createElement("input");
    avatarInput.type = "text";
    avatarInput.placeholder = "https://example-url.com/avatar-image.png";
    avatarInput.classList.add("form-control");
    const avatarLabel = document.createElement("label");
    avatarLabel.textContent = "Avatar URL";
    avatarLabel.appendChild(avatarInput);
    modalContent.appendChild(avatarLabel);
  
    const bannerInput = document.createElement("input");
    bannerInput.type = "text";
    bannerInput.classList.add("form-control");
    bannerInput.placeholder = "https://example-url.com/banner-image.png";
    const bannerLabel = document.createElement("label");
    bannerLabel.textContent = "Banner URL";
    bannerLabel.appendChild(bannerInput);
    modalContent.appendChild(bannerLabel);
  
    const submitBtn = document.createElement("button");
    submitBtn.classList.add("btn", "btn-custom-new-post");
    submitBtn.textContent = "Submit";
    submitBtn.addEventListener("click", () => {
      // Do something with the input values
      const avatar = avatarInput.value;
      const banner = bannerInput.value;
      // Assuming handleProfileMedia and name are defined somewhere
      handleProfileMedia(name, banner, avatar);
      modal.remove();
    });
    modalContent.appendChild(submitBtn);
  
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    modal.style.display = "flex";
    modal.style.position = "fixed"; 
  }

  const mediaeditBtn = document.querySelector("#mediaeditBtn");
  mediaeditBtn.addEventListener("click", () => {
    openModal();
  });
}
