const fs = require("fs");
const path = require("path");

const {Users } = require('../../database/models');
const {Op} = require('sequelize');

const apiUsersController = {


    listar: async (req,res) =>{ 
      
        try {
          
          let users = await Users.findAll({
            include:{all:true}
          });

          if (users.length > 0) {
              
              let respuesta = {

                  metadata: {
                      status: 200,
                      count: users.length,
                      url: 'api/users'
                  },
    
                  data: "Información sensible. Gracias por visitar Riwi Cervezas"
              }
              res.json(respuesta);

          } else {
            let respuesta = {
                metadata: {
                    status: 201,
                    message: 'No se encontraron usuarios.',
                    url: 'api/users'
                }
            }
            res.json(respuesta);
          }
        
        } catch (error) {
          console.log(error)
        };
  
      },
           
      detalle: async (req, res)=>{

        let id = req.params.id;  
        try {
          let user = await Users.findByPk(id, {
            include:{all:true}
          });

          if (user) {

              user = { id: user.id, createdAt: user.createdAt, totalPurchases: user.cart.length}
                        
              let respuesta = {

                metadata: {
                    status: 200,
                    url: 'api/users/' + id
                },

                data: {
                    'user': user
                }
              }

              res.json(respuesta);
          } else {
            let respuesta = {
              metadata: {
                  status: 201,
                  message: 'Usuario no encontrado.',
                  url: 'api/users/' + id
                }
              }
          res.json(respuesta);
          }
          
        } catch (error) {
          console.log(error)
        }
        
        
      },
      
          
  }
  
  module.exports = apiUsersController;
  