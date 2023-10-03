(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

  new Splide( '#slider11-feed' ).mount();  
  new Splide( '#slider12-feed' ).mount(); 
  new Splide( '#slider13-feed' ).mount(); 
  new Splide( '#slider21-feed' ).mount();
  new Splide( '#slider22-feed' ).mount();
  new Splide( '#slider23-feed' ).mount();
  new Splide( '#slider31-feed' ).mount();
  new Splide( '#slider32-feed' ).mount();
  new Splide( '#slider33-feed' ).mount();
  

const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput')
searchBtn.addEventListener('click', () => {
  if(searchInput.style.display = "none"){
    searchInput.style.display = "inline-flex";
    searchBtn.style.width = "auto"
  }
  else if ( searchInput.style.display = "block"){
    searchInput.style.display = "none";
  }
  else {
    searchInput.style.display = "none";
  }
})