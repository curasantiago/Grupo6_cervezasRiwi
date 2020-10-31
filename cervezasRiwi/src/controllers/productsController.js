const fs = require("fs");
const path = require("path");

const pathJsonProducts = path.join(__dirname , "/../data/products.JSON");

const leerJsonProducts = () => {
    let jsonProducts = fs.readFileSync(pathJsonProducts);
    return JSON.parse(jsonProducts);
};

const productsController={
           
      detalle:(req, res)=>{
          res.render("products/productDetail", {title: "Detalle de producto"});
      },
      
      carrito:(req, res)=>{
          res.render("products/productCart", {title: "Carrito de compras"});
      },
            
      buscar:(req, res)=>{
        res.render("products/productSearch", {title: "Productos"});
    },

    crear: (req, res)=> {
    res.render("products/productCreateForm", {title: "Crear producto nuevo"});  
    },

    processCreate:(req, res)=>{
        
        let DBproducts = leerJsonProducts();
        
        let product = {
            id: DBproducts[DBproducts.length -1].id + 1,
            ...req.body,
            images: req.files[0].filename
        }

        let nuevaDBProducts = [...DBproducts, product];

        fs.writeFileSync(pathJsonProducts, JSON.stringify(nuevaDBProducts, null, 2));
        res.send("/../data/products.JSON");
    },
      
        

      editar:(req, res)=>{
        let id = req.params.id;  
        let DBproducts = leerJsonProducts();
        let product = DBproducts.find(producto => producto.id == id);
        console.log(product);
        res.render("products/productEditForm", {title: "Editar producto", product: product});
      },

      processEdit:(req, res)=> {
        let id = req.params.id;
        let DBproducts = leerJsonProducts();
                
        let indexOldProduct = DBproducts.findIndex(producto => producto.id == id);
        
        // console.log(DBproducts);
        // console.log("el req params id " + req.params.id)

        // console.log("el find " + DBproducts.find(producto => producto.id == req.params.id));


        // let indexOldProduct = DBproducts.indexOf(DBproducts.find(producto => producto.id == req.params.id));

        // let indexProductoEditado = products.indexOf(products.find(producto => producto.id == req.params.id));

        // console.log("el indice es: " + indexOldProduct)

        let newProduct = {
            id: req.params.id,
            ...req.body,
            images: "holaa"
        }

        DBproducts[indexOldProduct] = newProduct;

        fs.writeFileSync(pathJsonProducts, JSON.stringify(DBproducts, null, 2));
        res.sendfile(path.resolve(__dirname + "/../data/products.JSON"));

      }

      
  }
  
  module.exports = productsController;
  