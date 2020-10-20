const controller={
    usuario:(req, res)=>{
        res.render("index");
   },
   
    login:(req, res)=>{
        res.render("login");
   },
   
    ingresar:(req, res)=>{
        res.render("ingreso");
   }
}

  module.exports = controller;
  