window.addEventListener("load", function(){

// SELECT DE CATEGORIAS
let selectCat = document.getElementById("category");

// SELECT DE SUBCATEGORIAS
let selectSubcat = document.getElementById("subcat");

// TABLA SUBCATEGORIAS DE LA BASE DE DATOS, RENDERIZADA EN EL EJS 
subcategories = JSON.parse(subcategories)

// AL ELEGIR UNA CATEGORIA
selectCat.addEventListener("change", function(){
    // SI ELIGIO UNA OPCION DE CATEGORIA
    if (selectCat.value > 0) {
        // MOSTRAR LISTA DE SUBCATEGORIAS  
        selectSubcat.innerHTML = `<option value="">Subcategoría</option>`
        // LLENAR LISTA DE SUBCATEGORIAS SI COINCIDE EL ID DE CATEGORIA
        subcategories.forEach(subcat => {
            if (subcat.id_category == selectCat.value) {
            selectSubcat.innerHTML += `<option value="${subcat.id}">${subcat.name}</option>`
            }
        });
    }
});


});