setTimeout(function(){
    if(localStorage.getItem('token') !== null){

        window.location.href = "./public/feed/";
    }
    else {
        window.location.href = "./auth/login.html";
    }
}, 1000);
