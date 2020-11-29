window.addEventListener("load", function(){

// SELECT DE CATEGORIAS
let selectCat = document.getElementById("select-category");

// SELECT DE SUBCATEGORIAS
let selectSubcat = document.getElementById("select-subcat");

// FORM DE BUSCADOR POR SUBCATEGORIA
const subcatSearchForm = document.getElementById("subcatsearch")

// TABLA SUBCATEGORIAS DE LA BASE DE DATOS, RENDERIZADA EN EL EJS 
subcategories = JSON.parse(subcategories)

// AL ELEGIR UNA CATEGORIA
selectCat.addEventListener("change", function(){
// SI ELIGIO UNA OPCION DE CATEGORIA
    if (selectCat.value > 0) {
        // MOSTRAR LISTA DE SUBCATEGORIAS
        selectSubcat.style.display = "initial"
        selectSubcat.innerHTML = `<option value="">SUBCATEGORÍA</option><option value="all">INCLUIR TODAS</option>`
        // LLENAR LISTA DE SUBCATEGORIAS SI COINCIDE EL ID DE CATEGORIA
        subcategories.forEach(subcat => {
            if (subcat.id_category == selectCat.value) {
            selectSubcat.innerHTML += `<option value="${subcat.id}">${subcat.name}</option>`
            }
        });
    }
});

// AL ELEGIR UNA SUBCATEGORIA
selectSubcat.addEventListener("change", function(){
// SI ELIGIO ALGUNA SUBCATEGORIA HACE LA BÚSQUEDA
    if (selectCat.value > 0 && selectSubcat.value != "all") {
        subcatSearchForm.submit()
// SI ELIGIO INCLUIR TODAS LAS SUBCATEGORIAS ENVIA UN INPUT MAS AL CONTROLLER DE BUSCAR CON EL ID DE LA CATEGORIA
    } else if (selectCat.value > 0 && selectSubcat.value == "all") {
        subcatSearchForm.innerHTML += `<input type="hidden" value="${selectCat.value}" name="searchAllCat">`
        subcatSearchForm.submit()
    }
})

});