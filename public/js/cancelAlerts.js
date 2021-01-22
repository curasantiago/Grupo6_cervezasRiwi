window.addEventListener("load", function(){ 
let cancelAlertForm = document.querySelector(".cancel__alert");

cancelAlertForm.addEventListener("submit", function(e){
    
    let confirmDelete = confirm("¿CONFIRMA ELIMINAR?");
    if (!confirmDelete) {
        e.preventDefault();
    }
});

});