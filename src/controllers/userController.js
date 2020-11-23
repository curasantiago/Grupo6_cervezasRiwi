// const fs = require("fs");
// const path = require("path");

// const leerJSON = () => {
//     let jsonUsers = fs.readFileSync(path.resolve(__dirname + "/../users.JSON"));
//     return JSON.parse(jsonUsers);
// }

const {Users, sequelize} = require('../database/models');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');

const userController={


    registro:(req, res)=>{
        res.render("users/registerForm", {title: "Registrarse"});
    },
   
    processRegister: async (req, res)=>{
      let nuevoUsuario = req.body;
      nuevoUsuario.password = bcrypt.hashSync(nuevoUsuario.password, 10);
      
      try {
            await Users.create(nuevoUsuario);
            res.redirect('/');
          } catch (error) {
            console.log(error);
          }      
    },

    detail: async (req, res) =>{
      try {  
        let usuario = await Users.findByPk(req.params.id)
        res.render('users/userDetail', {usuario, title: usuario.first_name + " " + usuario.last_name})
      } catch (error) {
          console.log(error);
      }
    },

    edit: async (req, res) => {
      try {  
        let usuario = await Users.findByPk(req.params.id)
        res.render('users/userEdit', {usuario, title: "Editar Información"})
      } catch (error) {
          console.log(error);
      }
    },

    processEdit: async (req,res) => {
      let usuarioEditado = req.body;
      
      // SI MODIFICO SU CONTRASEÑA
      if (usuarioEditado.password != "") {

        usuarioEditado.password = bcrypt.hashSync(usuarioEditado.password, 10);
        
        
        try {      
          await Users.update(usuarioEditado, {
              where: {id: req.params.id}
          });
          res.redirect('../detail/'+req.params.id)
        } catch (error) {
            console.log(error)
        }

      // SI NO MODIFICO CONTRASEÑA  
      } else {

          try {      
            let usuario = await Users.findByPk(req.params.id);
            usuarioEditado.password = usuario.password

            await Users.update(usuarioEditado, {
                where: {id: req.params.id}
            });
            res.redirect('../detail/'+req.params.id)
          } catch (error) {
              console.log(error)
          }
        }  
    },

    login:(req, res)=>{
        res.render("users/login", {title: "Login"});
    }, 

    processLogin: async (req, res)=>{
      try {
        
        let usuarioMail = req.body.email;
        let usuarioPass = req.body.password;
        // usuarioPass = bcrypt.hashSync(usuarioPass, 10)

        let usuario = await Users.findAll({
          where: {email : usuarioMail}
        })
      

        if (usuario == "") {
          let error = "Usuario no encontrado."
          res.render("users/login", {title: "Login", error, usuarioMail})
        
        } else if (bcrypt.compareSync(usuarioPass, usuario[0].password)) {

            res.render('users/userDetail', {usuario: usuario[0], title: usuario[0].first_name + " " + usuario[0].last_name})
          
          } else {

          let error = "Contraseña incorrecta."
          res.render("users/login", {title: "Login", error, usuarioMail})
        }
        

      } catch(error){
        console.log(error)
      }
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