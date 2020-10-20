
const controller={
    show:(req, res)=>{
        res.render("index");
      },   
        
      login:(req, res)=>{
          res.render("login");
      }, 
      
      ingresar:(req, res)=>{
          res.render("ingreso");
      },
      
      pagar:(req, res)=>{
          res.render("productCart");
      },
      
      detalle:(req, res)=>{
          res.render("productDetail");
      },
      
      carrito:(req, res)=>{
          res.render("productCart");
      },
      registro:(req, res)=>{
          res.render("login");
      },
      
      crear:(req, res)=>{
         res.render("productCreateForm");
      },
      editar:(req, res)=>{
          res.render("productEditForm");
      },
      buscar:(req, res)=>{
          res.render("productSearchForm");
      }
  }
  
  
  
  module.exports = controller;
  