const button = document.querySelector('#button-register')
button.addEventListener('click', (e)=> {
e.preventDefault();
registerUser()
})

let inputName = document.querySelector('.input-name');
let inputEmail = document.querySelector('.input-username');
let inputPassword = document.querySelector('.input-password');

async function registerUser(){
    let user = {
        name: inputName.value,
        email: inputEmail.value, 
        password: inputPassword.value,
    }
const res = await fetch('https://api.noroff.dev/api/v1/social/auth/register',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
})
const data = await res.json()
console.log(data)
}