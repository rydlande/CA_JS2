const button = document.querySelector("#button-register");
button.addEventListener("click", (e) => {
  e.preventDefault();
  registerUser();
});

let inputName = document.querySelector(".input-name");
let inputEmail = document.querySelector(".input-username");
let inputPassword = document.querySelector(".input-password");
let response = document.querySelector("#response");

async function registerUser() {
  let user = {
    name: inputName.value,
    email: inputEmail.value,
    password: inputPassword.value,
  };
    const res = await fetch('https://api.noroff.dev/api/v1/social/auth/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    const data = await res.json()
    console.log(data)
    if(data.status === "Bad Request"){
        inputName.style.border = '1px solid #ced4da';
        inputEmail.style.border = '1px solid #ced4da';
        inputPassword.style.border = '1px solid #ced4da';
        response.innerText = '';
        response.style.color = 'red';
        data.errors.forEach((item) => {
            if(item.message === 'Name can only use a-Z, 0-9, and _'){
                inputName.style.border = '1px solid red';
            }
            if(item.message === 'Only noroff.no emails are allowed to register'){
                inputEmail.style.border = '1px solid red';
            }
            if(item.message === 'Password must be at least 8 characters'){
                inputPassword.style.border = '1px solid red';
            }
            if(data.errors[0].message === "Invalid email"){
                response.innerText = `Only noroff.no emails are allowed to register \n`
            }else {
                response.innerText = `${data.errors[0].message} \n`
            }
        })
        } else {
            response.style.color = 'green';
            response.innerText = `Welcome to the Garden ${data.name}. \n Redirecting to login page...`
            setTimeout(() => {
                window.location.href = './public/feed/'
            }, 3000);
        }    
    }

