const {Users, Carts, Purchase_histories, Admins, sequelize} = require('../database/models');
const {Op} = require('sequelize');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');


const adminController={
    ingresoAdmin: (req, res)=>{
        if(req.session.adminLoggeado) {
                  res.render('admin/panel', {title: "Panel de administrador"})
                    } else {
                    res.render("admin/administrador" , {title: "Ingreso"});
                    }
                }
                ,


processIngresoAdmin: async (req, res)=>{
      
        try {
          
          let adminName = req.body.username;
          let adminPass = req.body.password;
          // usuarioPass = bcrypt.hashSync(usuarioPass, 10)
  
          let administrador = await Admins.findAll({
            where: {username : adminName}
          })

          console.log(administrador)
          
  
          if (administrador == "") {
            let error = "Administrador no encontrado."
            res.render("admin/administrador", {title: "Ingreso", error, adminName})
          
          } else 
           if //(bcrypt.compareSync// 
           (adminPass == administrador[0].password)
           //)//
            {
              
              req.session.adminLoggeado = administrador[0];
              
              res.render('admin/panel', {title: "Panel de administrador"})
  
            } else {
  
            let error = "Contraseña incorrecta."
            res.render("admin/administrador", {title: "Ingreso", error, adminName})
          }
          
  
        } catch(error){
          console.log(error)
        }
      
  
        res.render("admin/administrador", { title: "ingreso"})
    },




    logout: (req,res)=>{
      req.session.adminLoggeado = null;
      
      res.redirect('/');
    },


///////////////////////////////////////////////////////////////


  //   panel:async (req,res)=>{
  //  try {
  //     const productsjson=await Products.findAll() ;

  //   res.render("admin/panel",{productsjson});

  //   }
  //    catch(error){
  //          console.log(error)
  //   }
  // }
 panel: (req, res)=>{
      res.render("admin/panel", {title:"Panel admin"});
    }

}



  

module.exports = adminController;









// ingresoAdmin: (req, res)=>{
    //   res.render("admin/administradores", {title:"Ingreso admin"});
    // },
    // processIngresoAdmin: (req, res)=>{
    //   res.render("admin/administradores", {title:"Ingreso admin"});
    // }



