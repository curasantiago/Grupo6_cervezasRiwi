window.addEventListener("load", function(){

const searchButton = document.querySelector("#search-button");
const searchBar = document.querySelector("#search-bar");
const headerButtons = document.querySelector("#header-buttons");
const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector("#search-form");

searchButton.addEventListener("click", function(e){
        e.preventDefault();
        headerButtons.classList.toggle("header-hide");
        searchBar.classList.toggle("header-hide");
        searchInput.focus();
});

searchInput.addEventListener("blur", function(){
    headerButtons.classList.toggle("header-hide");
    searchBar.classList.toggle("header-hide");
});

searchForm.addEventListener("submit", function(e){
    let isNumber = parseInt(searchInput.value)
    if (isNumber) {
    alert("No puede buscar por números. Por favor ingrese letras")
    e.preventDefault()
    }
})

});
    
    

