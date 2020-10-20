const userController={
    registro:(req, res)=>{
        res.render("users/registerForm", {title: "Registrarse"});
    },
   
    login:(req, res)=>{
        res.render("users/login", {title: "Login"});
    }, 
   
    pagar:(req, res)=>{
        res.render("users/payForm", {title: "Incluir medio de pago"});
    },
}

  module.exports = userController;
  