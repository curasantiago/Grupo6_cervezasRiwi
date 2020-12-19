// const fs = require("fs");
// const path = require("path");

// const leerJSON = () => {
//     let jsonUsers = fs.readFileSync(path.resolve(__dirname + "/../users.JSON"));
//     return JSON.parse(jsonUsers);
// }

const {Users, Carts, Purchase_histories, sequelize} = require('../database/models');
const {Op} = require('sequelize');
const bcrypt = require('bcrypt');

const { validationResult } = require('express-validator');

const userController={


    registro:(req, res)=>{
        res.render("users/registerForm", {title: "Registrarse"});
    },
   
    processRegister: async (req, res)=>{
      // console.log(req.body)
      // console.log(req.file)
      // console.log(image)


      
      let errors = validationResult(req);

        // CHEQUEO DE MATCH DE CONTRASEÑAS 
        // if (nuevoUsuario.password != nuevoUsuario.repassword) {
        //   res.render("users/registerForm", {title: "Registrarse", datosLlenos: nuevoUsuario, errorMsg: "Contraseñas diferentes"});
        // } else {
      
          
          // let checkUserEmail = await Users.findAll({where: {email: nuevoUsuario.email}})
          // if (checkUserEmail == "") {
            
            try {
              if (errors.isEmpty()){
                
                try{
                        let image = req.file.filename
                        
                        let nuevoUsuario = {...req.body, image: image}
                        
                        delete nuevoUsuario.repassword

                        nuevoUsuario.password = bcrypt.hashSync(nuevoUsuario.password, 10);

                        console.log(nuevoUsuario)
                  
                  let emailUser=await Users.findAll({where:{email:nuevoUsuario.email}})
                  if(emailUser==""){
                        
                        await Users.create(nuevoUsuario);
                        
                    res.redirect('./login');
                      }else{
                        res.render("users/registerForm", {title: "Registrarse", errors: [
                          {
                            msg:"El email ingresado ya existe"
                          }
                        ]});
                        

                      }
                    }catch(error){
                      console.log(error)
                    }

                    
                  
                  }  else {
                    res.render("users/registerForm", {title: "Registrarse", errors: errors.errors});
                  }
                
                
                // } else {
                //   res.render("users/registerForm", {title: "Registrarse", datosLlenos: nuevoUsuario, errorMsg: "Email no válido"});
                // }

              } catch (error) {
                    console.log(error);
              }
    // }

    },

    detail: async (req, res) =>{
      
      try {  
        let usuario = await Users.findByPk(req.params.id)
        res.render('users/userDetail', {usuario, title: usuario.first_name + " " + usuario.last_name})
      } catch (error) {
          console.log(error);
      }

    
    },

    userCarts: async (req, res) =>{
      
      try {  
        let usuario = await Users.findByPk(req.params.id)
        let userCarts = await Carts.findAll({
          where: { user_id: req.params.id },
          include: {all: true}
        })
        res.render('users/userCarts', {usuario, userCarts, title: "Historial de compras"})
      } catch (error) {
          console.log(error);
      }

    
    },

    purchaseHistory: async (req, res) =>{
      
      try {  
        let cart = await Carts.findByPk(req.params.idCart,{
          include: [{model: Purchase_histories, as: 'purchase_history', include: ['product']}]
        })
        // res.send(cart)
        res.render('users/purchaseHistories', {cart, title: "Detalle carrito"})
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
      if (usuarioEditado.password != "" || usuarioEditado.repassword != "") {

        // CHEQUEAR MATCH DE CONTRASEÑAS
        // SI FALLA EL MATCH      
        if (usuarioEditado.password != usuarioEditado.repassword) {
          try {
            let usuario = await Users.findByPk(req.params.id);
            usuarioEditado.id = usuario.id;
            res.render('users/userEdit', {usuario: usuarioEditado, title: "Editar Información", errorMsg: "Contraseñas diferentes"})
          } catch (error) {
            console.log(error)
          }

        } else {
        // SI NO FALLA EL MATCH DE CONTRASEÑAS
              delete usuarioEditado.repassword
              usuarioEditado.password = bcrypt.hashSync(usuarioEditado.password, 10);
                
              try {      
                // CHEQUEO DE CAMBIO DE EMAIL
                let usuario = await Users.findByPk(req.params.id)
                let checkUserEmail = await Users.findAll({
                  where: { email: {[Op.not]: usuario.email}, [Op.and] : {email: usuarioEditado.email} }
                })
                
                // SI EL EMAIL NO EXISTE EN DB, POR LO TANTO ES VALIDO
                if (checkUserEmail == "") {

                    await Users.update(usuarioEditado, {
                        where: {id: req.params.id}
                    });
                    res.redirect('../detail/'+req.params.id)
                  
                // SI EL EMAIL YA EXISTE
                } else {
                    usuarioEditado.id = usuario.id;
                    res.render('users/userEdit', {usuario: usuarioEditado, title: "Editar Información", errorMsg: "Email no válido"})
                }
              } catch (error) {
                  console.log(error)
              }
      }

      // SI NO MODIFICO CONTRASEÑA  
      } else {

          try {      
            delete usuarioEditado.repassword
            let usuario = await Users.findByPk(req.params.id);
            usuarioEditado.password = usuario.password
            
            // CHEQUEO DE CAMBIO DE EMAIL
            let checkUserEmail = await Users.findAll({
              where: { email: {[Op.not]: usuario.email}, [Op.and] : {email: usuarioEditado.email} }
            })
            
            // SI EL EMAIL NO EXISTE EN DB, POR LO TANTO ES VALIDO
            if (checkUserEmail == "") {

                await Users.update(usuarioEditado, {
                    where: {id: req.params.id}
                });
                res.redirect('../detail/'+req.params.id)
                
            // SI EL EMAIL YA EXISTE
              } else {
                usuarioEditado.id = usuario.id;
                res.render('users/userEdit', {usuario: usuarioEditado, title: "Editar Información", errorMsg: "Email no válido"})
              }
          } catch (error) {
              console.log(error)
          }
        }  
    },

    login:(req, res)=>{
        if(req.session.usuarioLoggeado) {
          res.redirect("/users/detail/" + req.session.usuarioLoggeado.id)
        } else {
        res.render("users/login", {title: "Login"});
        }
    }, 

    logout: (req,res)=>{
      req.session.destroy();
      res.clearCookie('recordame');
      res.redirect('/users/login');
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

            req.session.usuarioLoggeado = usuario[0];
            
            if (req.body.recordame != undefined) {
              res.cookie('recordame', usuario[0], {maxAge: 30000});
            }
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