export default async function handleProfileMedia(name, bannerLink, avatarLink) {
    const token = localStorage.getItem("token");
    const url = `https://api.noroff.dev/api/v1/social/profiles/${name}/media`;
    let bodyInfo = {
            banner: bannerLink || null,
            avatar: avatarLink || null,
    }   
    console.log(url)
    console.log(JSON.stringify(bodyInfo))
    const res = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyInfo),
    })
    const data = await res.json()
    console.log(data)
    if(res.ok){
        window.location.reload();
    }
    if(res.status === 400){
        alert("Something went wrong, please check your links and try again")
    }
    console.log(data)
    }
