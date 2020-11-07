// const fs = require("fs");
// const path = require("path");

// const leerJSON = () => {
//     let jsonUsers = fs.readFileSync(path.resolve(__dirname + "/../users.JSON"));
//     return JSON.parse(jsonUsers);
// }

const userController={


    registro:(req, res)=>{
        res.render("users/registerForm", {title: "Registrarse"});
    },
   
    login:(req, res)=>{
        res.render("users/login", {title: "Login"});
    }, 
   
    pagar:(req, res)=>{
        res.render("users/payForm", {title: "Incluir medio de pago"});
    }

}

  module.exports = userController;
  

      // processRegister: (req, res)=> {
    //     let DBusuarios = leerJSON();
        
    //     let usuario = {
    //         id: DBusuarios[DBusuarios.length -1].id + 1,
    //         ...req.body
    //     }

    //     let nuevaDB = [...DBusuarios, usuario];
    //     fs.writeFileSync(path.resolve(__dirname + "/../users.JSON"), JSON.stringify(nuevaDB, null, 2));
    //     res.redirect("/login");
    // },

    // processLogin: (req, res)=> {
    //     let DBusuarios = leerJSON();

    //     let userEncontrado = "No encontrado";

    //     DBusuarios.forEach(user => {
    //         if(req.body.email == user.email) {
    //             userEncontrado = user;
    //         }
    //     });

    //     res.send(userEncontrado);
        
        
    // }