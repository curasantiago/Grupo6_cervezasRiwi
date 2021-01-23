const {Users, Carts, Purchase_histories, Admin, sequelize} = require('../database/models');
const {Op} = require('sequelize');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');


const adminController={
    ingresoAdmin: (req, res)=>{
        if(req.session.adminLoggeado) {
                      res.redirect("admin/panel" + req.session.adminLoggeado.id)
                    } else {
                    res.render("admin/administradores" , {title: "Ingreso"});
                    }
                }
                ,


processIngresoAdmin: async (req, res)=>{
      
        try {
          
          let adminName = req.body.username;
          let adminPass = req.body.password;
          // usuarioPass = bcrypt.hashSync(usuarioPass, 10)
  
          let administrador = await Admin.findAll({
            where: {username : adminName}
          })
          
  
          if (administrador == "") {
            let error = "Administrador no encontrado."
            res.render("admin/administradores", {title: "Ingreso", error, adminName})
          
          } else 
           if //(bcrypt.compareSync// 
           (usuarioPass, administrador[0].password)
           //)//
            {
  
              req.session.adminLoggeado = administrador[0];
              
              if (req.body.recordame != undefined) {
                res.cookie('recordame', administrador[0], {maxAge: 30000});
              }
              res.render('admin/administradores', {administrador: administrador[0], title: administrador[0].username})
  
            } else {
  
            let error = "Contraseña incorrecta."
            res.render("admin/administradores", {title: "Ingreso", error, usuarioName})
          }
          
  
        } catch(error){
          console.log(error)
        }
      
  
        res.render("admin/administradores", { title: "ingreso"})
    },




    logout: (req,res)=>{
      req.session.destroy();
      
      res.redirect('admin/administradores');
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



