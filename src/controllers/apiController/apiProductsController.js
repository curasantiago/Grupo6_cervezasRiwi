const fs = require("fs");
const path = require("path");

const {Products, SubCategories, Categories, Carts } = require('../../database/models');
const {Op} = require('sequelize');

// const { body, validationResult, check } = require('express-validator');

// const pathJsonProducts = path.join(__dirname , "/../data/products.JSON");

// const leerJsonProducts = () => {
//     let jsonProducts = fs.readFileSync(pathJsonProducts);
//     return JSON.parse(jsonProducts);
// };

const apiProductsController = {


    listar: async (req,res) =>{ 
      
        try {
          
          let products = await Products.findAll({
            include:{all:true}
          });

          let subcategories = await SubCategories.findAll();
          
          let arrayDeTotalDeProductos = [];

          subcategories.forEach(subcat => {
            let nombreSubCat = subcat.name
              arrayDeTotalDeProductos.push( { id: parseInt(subcat.id), nombreSubCategoria: subcat.name, total: 0})
          });

          // console.log(arrayDeTotalDeProductos)
          
          products.forEach(product => {
            let subcatDeProducto = arrayDeTotalDeProductos.find( subc => subc.id == product.id_subcategory);
            let indexOfSubcat = arrayDeTotalDeProductos.indexOf(subcatDeProducto)
            arrayDeTotalDeProductos[indexOfSubcat].total = arrayDeTotalDeProductos[indexOfSubcat].total + 1
          })
          
          // console.log(arrayDeTotalDeProductos)

          if (products.length > 0) {
              
              let respuesta = {

                  metadata: {
                      status: 200,
                      count: products.length,
                      countBySubCategory: arrayDeTotalDeProductos,
                      url: 'api/products'
                  },
    
                  data: products
              }
              res.json(respuesta);

          } else {
            let respuesta = {
                metadata: {
                    status: 201,
                    message: 'No se encontraron productos.',
                    url: 'api/products'
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
          let product = await Products.findByPk(id, {
            include:{all:true}
          });

        if (product) {

          let category = await Categories.findByPk(product.subcategory.id_category); 
            product.setDataValue('category', category);
          
          let respuesta = {

            metadata: {
                status: 200,
                url: 'api/products/' + id
            },

            data: {
                'product': product
            }
        }

        res.json(respuesta);

      } else {
        let respuesta = {
          metadata: {
              status: 201,
              message: 'Producto no encontrado.',
              url: 'api/products/' + id
            }
          }
      res.json(respuesta);
      }
          
        } catch (error) {
          console.log(error)
        }
        
        // let DBproducts = leerJsonProducts();
        // let product = DBproducts.find(producto => producto.id == id);
        
      },

      listarCompras: async (req,res) => {
        try {
          
          let carts = await Carts.findAll({
            include:{all:true}
          });

          if (carts.length > 0) {
              
              let respuesta = {

                  metadata: {
                      status: 200,
                      count: carts.length,
                      url: 'api/products/purchases'
                  },
    
                  data: "Información sensible. Gracias por visitar Riwi Cervezas"
              }
              res.json(respuesta);

          } else {
            let respuesta = {
                metadata: {
                    status: 201,
                    message: 'No se encontraron compras.',
                    url: 'api/users'
                }
            }
            res.json(respuesta);
          }
        
        } catch (error) {
          console.log(error)
        };
        

      },
      
          
  }
  
  module.exports = apiProductsController;
  