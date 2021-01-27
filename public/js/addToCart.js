window.addEventListener("load", function(){

// ----------------------------------------VISTA PRODUCT SEARCH-----------------------------------------

let addToCartForms = document.querySelectorAll(".addToCart")
let productToAdd;
let productsInCart = [];

for (let form of addToCartForms) {
    form.addEventListener("submit", function(e){
    
    // VALIDACION EN PRODUCT DETAIL DEL CAMPO QUANTITY
    let productQuantity = +e.target.elements["quantity"].value.trim()
    
    if (productQuantity > 99 || productQuantity < 0 || Number.isNaN(productQuantity) || productQuantity == "") {
        e.preventDefault()
        Swal.fire({
            icon: 'error',
            title: 'INGRESE UN NÚMERO ENTRE 1 y 99',
            confirmButtonColor: "rgba(166,150,30,1)",
            iconColor: "#DACB5E"
        });
    } else {
        // CAPTURO EL PRODUCTO AGREGADO EN UN OBJETO

        productToAdd = {
        id: e.target.elements["id"].value,
        name: e.target.elements["name"].value,
        price: e.target.elements["price"].value,
        size: e.target.elements["size"].value,
        image: e.target.elements["image"].value,
        quantity: e.target.elements["quantity"].value.trim()
        }
        
        // SI NO EXISTEN ITEMS EN EL CARRITO AGREGA UN PRODUCTO NUEVO AL ARRAY DE PRODUCTOS EN CARRITO
        if (sessionStorage.getItem("productsInCart") == null) {

            productsInCart.push(productToAdd);
            sessionStorage.setItem("productsInCart", JSON.stringify(productsInCart));


        // SI YA EXISTEN ITEMS EN EL CARRITO
        } else {
            // TRAE LOS PRODUCTOS A UN ARRAY
            productsInCart = JSON.parse(sessionStorage.getItem("productsInCart"));
            
            // CHEQUEO SI EL PRODUCTO QUE QUIERO AGREGAR YA EXISTE EN EL CARRITO AGREGO CANTIDAD 1
            let checkProduct = productsInCart.find( addedProduct => addedProduct.id == productToAdd.id);
            let indexOfCheckProduct = productsInCart.indexOf(checkProduct);
            if (checkProduct != undefined) {
                    let newQuantity = parseInt(productsInCart[indexOfCheckProduct].quantity) + parseInt(productToAdd.quantity);
                    newQuantity > 99 ? productsInCart[indexOfCheckProduct].quantity = 99 : productsInCart[indexOfCheckProduct].quantity = newQuantity;
                    sessionStorage.setItem("productsInCart", JSON.stringify(productsInCart));
            // SI YA EXISTE UN CARRITO PERO ESE PRODUCTO NO EXISTE AGREGO EL ITEM AL CARRITO
                } else {
                    productsInCart.push(productToAdd);
                    sessionStorage.setItem("productsInCart", JSON.stringify(productsInCart));
                }
        }
    }   
    });
};


// ------------------------------------------VISTA CARRITO---------------------------------------------------------

let cartItemsDiv = document.getElementById("cart-items");
let totalItemsDiv = document.getElementById("total-items-quantity");
let totalItemsInCart = 0;
let totalPrices = 0;
let plusItemsButtons = [];
let minusItemsButtons = [];

// CHEQUEA SI ESTOY EN LA VISTA DEL CARRITO Y SI EXISTEN ITEMS EN EL CARRITO
if (cartItemsDiv != null && sessionStorage.getItem("productsInCart") != null && sessionStorage.getItem("productsInCart") != "[]" ) {
    productsInCart = JSON.parse(sessionStorage.getItem("productsInCart"));
    let counter = 1;
    productsInCart.forEach(product => {
        
        cartItemsDiv.innerHTML += ` <!-- Producto -->
        <section class="cart__item">
            <!-- Imagen y nombre de producto -->
            <div class="cart__item__img__name">
                <a href="/products/${product.id}"><img src="/images/products/${product.image}" alt="${product.name}"></a>
                <article class="cart__item__name__details">
                <a href="/products/${product.id}" style="text-decoration: none"><h2>${product.name}</h2></a>
                        <p>${product.size}</p>           
                </article>        
            </div>
            
            <!-- Comienza header para mobile -->
            <div class="cart__mobile__header">


            <!-- Encabezados para versión móvil -->
            <div class="cart__mobile__header__titles">
                <article>PRECIO</article>
                <article>CANTIDAD</article>
                <article>TOTAL</article>
            </div>


            <!-- Precio del producto -->
            <div class="cart__item__price__amount">
                <article>
                    $${product.price}
                </article>
                <!-- Form de cantidad de producto, con opcion de aumentar y disminuir -->
                <article class="cart__product__amount">
                    <input type="text" name="prod__amount" class="input-quantity-products" value="${product.quantity}">
                    <a href="" class="plus-item"><img src="/images/img/plus.png" alt=""></a>                    
                    <a href="" class="minus-item"><img src="/images/img/minus.png" alt=""></a>
                    <input type="hidden" value="${product.id}" name="product_id${counter}" class="product-id-value">
                </article>
                <!-- Total del producto (precio x cantidad) -->
                <article>
                    $${product.price * product.quantity}
                </article>
            </div>

            </div>
            <!-- Fin de cart mobile header -->

        </section>
        <!-- Fin producto -->`
        counter++
        totalItemsInCart += parseInt(product.quantity);
        totalPrices += parseInt(product.price) * parseInt(product.quantity);


    });

    totalItemsDiv.innerText = `(${totalItemsInCart} ITEMS)`
    document.getElementById("total-cart").innerHTML = `$${totalPrices}`;
    plusItemsButtons = document.querySelectorAll(".plus-item");
    minusItemsButtons = document.querySelectorAll(".minus-item");
    inputQuantityProducts = document.querySelectorAll(".input-quantity-products");

    // CAPTURO BOTON VACIAR CARRITO
    const buttonEmptyCart = document.getElementById("empty_cart")

    buttonEmptyCart.addEventListener("click", function(){
        Swal.fire({
            icon: 'warning',
            title: '¿VACIAR CARRITO DE COMPRAS?', 
            confirmButtonColor: "rgba(166,150,30,1)",
            iconColor: "#DACB5E",
            confirmButtonText: 'VACIAR',
            showCancelButton: 'true',
            cancelButtonText: 'CANCELAR',
            cancelButtonColor: 'rgb(240, 114, 114)'
            }).then((resultado) => {
                if (resultado.isConfirmed) {
                    sessionStorage.removeItem("productsInCart");
                    location.reload();
                }
        });
    
        // let confirmEmpty = confirm("¿Vaciar carrito de compras?")

    // if(confirmEmpty){
    //     sessionStorage.removeItem("productsInCart");    
    //     location.reload();
    // }


    })
    
// SI NO HAY PRODUCTOS EN CARRITO PERO ESTOY EN LA VISTA CORRECTA
} else if (cartItemsDiv != null) {
    document.querySelector(".cart__final__info").style.display = "none"
    totalItemsDiv.innerHTML = `(ESTÁ VACIO :/ )`
    
};


// AL HACER CLICK EN EL BOTON (+)
if (plusItemsButtons != "") {
    for (let plusButton of plusItemsButtons) {
        plusButton.addEventListener("click", function(){
            
            // let nuevaCantidad = parseInt(this.parentElement.querySelector("textarea").innerHTML) + 1;
            // this.parentElement.querySelector("textarea").innerText = nuevaCantidad;
            let idProduct = this.parentElement.querySelector(".product-id-value").value;
            let checkProduct = productsInCart.find( addedProduct => addedProduct.id == parseInt(idProduct));
            let indexOfCheckProduct = productsInCart.indexOf(checkProduct)
            parseInt(productsInCart[indexOfCheckProduct].quantity) + 1 > 99 ? productsInCart[indexOfCheckProduct].quantity = 99 : productsInCart[indexOfCheckProduct].quantity = parseInt(productsInCart[indexOfCheckProduct].quantity) + 1;

            sessionStorage.setItem("productsInCart", JSON.stringify(productsInCart));
        });
    };
};


// AL HACER CLICK EN EL BOTON (-)
if (minusItemsButtons != "") {
    for (let minusButton of minusItemsButtons) {
        minusButton.addEventListener("click", function(e){
            
            // let nuevaCantidad = parseInt(this.parentElement.querySelector("textarea").innerHTML) + 1;
            // this.parentElement.querySelector("textarea").innerText = nuevaCantidad;
            let idProduct = this.parentElement.querySelector(".product-id-value").value;
            let checkProduct = productsInCart.find( addedProduct => addedProduct.id == parseInt(idProduct));
            
            // SI AL RESTAR LA CANTIDAD DEL PRODUCTO QUEDA EN CERO Y NO QUEDAN MAS ITEMS EN EL CARRITO
            if (checkProduct.quantity - 1 <= 0 && productsInCart.length == 1) {
                sessionStorage.removeItem("productsInCart");
            // SI AL RESTAR LA CANTIDAD DEL PRODUCTO QUEDA EN CERO Y QUEDAN MAS ITEMS EN EL CARRITO
            } else if (checkProduct.quantity - 1 <= 0 && productsInCart.length > 1) {
                productsInCart.pop(checkProduct)
                sessionStorage.setItem("productsInCart", JSON.stringify(productsInCart));
            }
            // SI AL RESTAR 1 QUEDA MAS CANTIDAD DE ESE PRODUCTO
            else {
            productsInCart[productsInCart.indexOf(checkProduct)].quantity = parseInt(productsInCart[productsInCart.indexOf(checkProduct)].quantity) - 1;
            sessionStorage.setItem("productsInCart", JSON.stringify(productsInCart));
            }
        });
    };
};


// AL MODIFICAR MANUALMENTE LA CANTIDAD
if (typeof inputQuantityProducts != "undefined") {
    let oldValueTemp;
    for (let input of inputQuantityProducts) {
        
        input.addEventListener("focus", function(){
            oldValueTemp = this.value.trim();
        });

        input.addEventListener("change", function(){
            let idProduct = this.parentElement.querySelector(".product-id-value").value;
            let checkProduct = productsInCart.find( addedProduct => addedProduct.id == parseInt(idProduct));
            
            let nuevaCantidad = +this.value.trim();  //EL UNARY PLUS + CONVIERTE A INTEGER
            
            // VALIDACION QUE LO INGRESADO SEA UN NUMERO Y QUE SEA ENTRE 0 y 99
            if(nuevaCantidad < 0 || nuevaCantidad > 99 || Number.isNaN(nuevaCantidad)) {
                // alert("Ingrese un número entre 0 y 99");
                Swal.fire({
                    icon: 'error',
                    title: 'INGRESE UN NÚMERO ENTRE 0 y 99',
                    confirmButtonColor: "rgba(166,150,30,1)",
                    iconColor: "#DACB5E"
                });
                this.value = oldValueTemp;
            // SI ESCRIBIO 0 Y ES EL UNICO ITEM EN EL CARRITO
            } else if (nuevaCantidad == 0 && productsInCart.length == 1) {
                sessionStorage.removeItem("productsInCart");    
                location.reload();
            // SI ESCRIBIO 0 Y QUEDAN OTROS ITEMS EN EL CARRITO
            } else if (nuevaCantidad == 0 && productsInCart.length > 1) {
                productsInCart.pop(checkProduct)
                sessionStorage.setItem("productsInCart", JSON.stringify(productsInCart));
                location.reload();
            // SI ESCRIBIO ENTRE 1 Y 99
            } else {
                productsInCart[productsInCart.indexOf(checkProduct)].quantity = nuevaCantidad;
                sessionStorage.setItem("productsInCart", JSON.stringify(productsInCart));
                location.reload();
            }
        });
    };
};

// CAPTURO EL BOTON PARA FINALIZAR COMPRA Y UN INPUT OCULTO DONDE MANDAR LA INFORMACION DEL CARRITO
const finCompraForm = document.getElementById("finCompra")
const productsToPay = document.getElementById("products-to-pay")


if (finCompraForm != null) {
finCompraForm.addEventListener("submit", function(e){
    e.preventDefault()
    Swal.fire({
        icon: 'question',
        title: `¿CONFIRMA LA COMPRA POR UN TOTAL DE `+document.getElementById("total-cart").innerHTML + `?`,
        text: "SE LE ENVIARÁ UN EMAIL A SU CUENTA", 
        confirmButtonColor: "rgba(166,150,30,1)",
        iconColor: "#DACB5E",
        confirmButtonText: 'COMPRAR',
        showCancelButton: 'true',
        cancelButtonText: 'CANCELAR',
        cancelButtonColor: 'rgb(240, 114, 114)'
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                // MANDO EN UN INPUT HIDDEN UN JSON CON TODOS LOS PRODUCTOS DEL CARRITO QUE ESTAN EN SESSION STORAGE
                let allProductsJSON = encodeURIComponent(sessionStorage.getItem("productsInCart"))
                productsToPay.value = `${allProductsJSON}`
                // BORRA EL CARRITO
                sessionStorage.removeItem("productsInCart")
                this.submit()
            } else {
                e.preventDefault()
            }
    });
    
    // let confirmaCompra = confirm("¿Confirma la compra por un total de "+document.getElementById("total-cart").innerHTML + "? Se le enviará un email a su cuenta")
    
    // if (confirmaCompra) {

        // MANDO EN UN INPUT HIDDEN UN JSON CON TODOS LOS PRODUCTOS DEL CARRITO QUE ESTAN EN SESSION STORAGE
        // let allProductsJSON = encodeURIComponent(sessionStorage.getItem("productsInCart"))
        // productsToPay.value = `${allProductsJSON}`

        // BORRA EL CARRITO
    //     sessionStorage.removeItem("productsInCart")
    // } else {
        // e.preventDefault()
    // }
    
})
}



});