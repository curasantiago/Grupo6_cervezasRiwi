
const productsController={
           
      detalle:(req, res)=>{
          res.render("products/productDetail", {title: "Detalle de producto"});
      },
      
      carrito:(req, res)=>{
          res.render("products/productCart", {title: "Carrito de compras"});
      },
            
      buscar:(req, res)=>{
        res.render("products/productSearch", {title: "Productos"});
    },
      
      crear:(req, res)=>{
         res.render("products/productCreateForm", {title: "Crear producto nuevo"});
      },

      editar:(req, res)=>{
          res.render("products/productEditForm", {title: "Editar producto"});
      },

      
  }
  
  module.exports = productsController;
  