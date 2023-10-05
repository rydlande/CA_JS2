const url = "https://api.noroff.dev/api/v1/social/profiles/";

async function getToken() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const res = await fetch(url + name, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
  const data = await res.json();
  console.log(data);
  getCount(data);
}
getToken();

async function getCount(data) {
  const containerCount = document.querySelector("#containerCount");
  // const postsCount = document.querySelector("#postsCount");
  const usersCount = data._count;
  const { posts, following, followers } = usersCount;
  console.log(usersCount);
  containerCount.innerHTML = `
    <div class="col w-100 gap-4 d-flex align-items-center justify-content-center flex-column">
      <img class="follower-icon icon" src="../../media/Unionfollowers-icon.svg">
      <p class="text-nobreak count" id="postsCount">${followers}</p>
    </div>
    <div class="col w-100 gap-4 d-flex align-items-center justify-content-center flex-column">
      <img class="likes-icon icon" src="../../media/Unionlikes-icon.svg">
      <p class="text-nobreak count">${following}</p>
    </div>
    <div class="col w-100 gap-4 d-flex align-items-center justify-content-center flex-column">
      <i class="bi bi-image"></i>
      <p class="text-nobreak count">${posts}</p>
    </div>
  `;
  // usersPostCount.forEach((e) => {
  //   const { posts, follewers, following } = e;
  //   console.log(posts.count_);
  //   postsCount.innerHTML = `${posts.count_}`;
  //   console.log(posts.count_);
  // });
}
