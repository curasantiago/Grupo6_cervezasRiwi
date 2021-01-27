window.addEventListener("load", function(){ 
let cancelAlertForm = document.querySelector(".cancel__alert");

if (cancelAlertForm) {
cancelAlertForm.addEventListener("submit", function(e){
    e.preventDefault();
    // let confirmDelete = 
    Swal.fire({
        icon: 'warning',
        title: '¿CONFIRMA ELIMINAR?', 
        confirmButtonColor: "rgba(166,150,30,1)",
        iconColor: "#DACB5E",
        confirmButtonText: 'ELIMINAR',
        showCancelButton: 'true',
        cancelButtonText: 'CANCELAR',
        cancelButtonColor: 'rgb(240, 114, 114)'
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                this.submit()
                // return e.preventDefault();
            }
    });
    
    // confirm("¿CONFIRMA ELIMINAR?");
    // if (!confirmDelete) {
    //     console.log("borrado!");
    // }
});
}

});