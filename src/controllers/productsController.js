const fs = require("fs");
const path = require("path");

const {Products, SubCategories, Categories, sequelize, Sizes } = require('../database/models');
const {Op} = require('sequelize');

const pathJsonProducts = path.join(__dirname , "/../data/products.JSON");

const leerJsonProducts = () => {
    let jsonProducts = fs.readFileSync(pathJsonProducts);
    return JSON.parse(jsonProducts);
};

const productsController={
           
      detalle: async (req, res)=>{

        let id = req.params.id;  
        try {
          let product = await Products.findByPk(id, {
            include:{all:true}
          });
          let category = await Categories.findByPk(product.subcategory.id);
          let size = await Sizes.findByPk(product.size.id)

          
          res.render("products/productDetail", {title: "Detalle de producto", product, category, size});
          // res.json(size)
          
        } catch (error) {
          console.log(error)
        }
        
        // let DBproducts = leerJsonProducts();
        // let product = DBproducts.find(producto => producto.id == id);
        
      },
      
      carrito:(req, res)=>{
          res.render("products/productCart", {title: "Carrito de compras"});
      },
            
      buscar: async (req, res)=>{

        try {
          const subcategories = await SubCategories.findAll({include:{all: true}});
          const categories = await Categories.findAll({include:{all: true}});
          let query = req.body.query;
          let isNumber = parseInt(query);
          let infoResultados;
        
        // SI BUSCO POR NOMBRE, O SEA SI NO ES UN NUMERO Y SI NO SELECCIONO MOSTRAR TODAS LAS SUBCATEGORIAS

      if (!isNumber && req.body.searchAllCat == undefined) {

        try {
          let products = await Products.findAll({
              where: { name: {[Op.like]: "%"+ query + "%"} },
              include: {all: true}
            });
          infoResultados = "RESULTADOS DE BÚSQUEDA '" + query.toUpperCase() + "'";
          res.render("products/productSearch", {title: "Productos", products, subcategories, categories, query: infoResultados});
        } catch (error) {
          console.log(error)
        }
        
        // SI SELECCIONO MOSTRAR TODAS LAS SUBCATEGORIAS DE LA CATEGORIA

      } else if (req.body.searchAllCat != undefined) {
        
        // CHEQUEO DE CUAL ES LA CATEGORÍA SELECCIONADA PARA PODER ENVIAR EL NOMBRE A LA VISTA
        let category_id = req.body.searchAllCat;
        const catSelected = categories.find(cat => cat.id == category_id);

        try {
        // BUSCA PRODUCTOS, INCLUYE SUBCATEGORIAS Y SOLO LO ELIGE SI EL ID_CATEGORIA DE LA SUBCATEGORIA COINCIDE
          let products = await Products.findAll({
            include: [{model: SubCategories, as: 'subcategory', where: {id_category: category_id}}, 'size']          
          });
          
          infoResultados = "RESULTADOS DE BÚSQUEDA " + catSelected.name.toUpperCase();
          res.render("products/productSearch", {title: "Productos", products, subcategories, categories, query: infoResultados});
        } catch (error) {
          console.log(error)
        }

        // SI BUSCO POR SUBCATEGORIA

      } else {

          try {
            const subcatBuscada = subcategories.find(subcat => subcat.id == isNumber)
            const catDeSubcat = categories.find(cat => cat.id == subcatBuscada.id_category);
            let products = await Products.findAll({
                where: { id_subcategory: isNumber },
                include: {all: true}
              });
            let infoResultados = "RESULTADOS DE BÚSQUEDA " + catDeSubcat.name.toUpperCase() + " > " +  subcatBuscada.name.toUpperCase();
            res.render("products/productSearch", {title: "Productos", products, subcategories, categories, query: infoResultados});
          } catch (error) {
            console.log(error)
          }
        
      }

      } catch (error) {
        console.log(error);
      }
        
    },

    crear: async (req, res)=> {
      try{   
      const category= await Categories.findAll();
      const subcategory= await SubCategories.findAll();
      const capacidad= await Sizes.findAll();
    res.render("products/productCreateForm", {title: "Crear producto nuevo", category, subcategory, capacidad});  
  }catch (error){

  }
    },

    processCreate: async(req, res)=>{
      try{   
         let image= req.files[0].filename
         let productoEntero= {...req.body, image}
          await Products.create(productoEntero)
          
          res.redirect("/");

        // let DBproducts = leerJsonProducts();
        
        // let product = {
        //     id: Number(DBproducts[DBproducts.length -1].id) + 1,
        //     ...req.body,
        //     images: req.files[0].filename
        // }

        // let nuevaDBProducts = [...DBproducts, product];

        // fs.writeFileSync(pathJsonProducts, JSON.stringify(nuevaDBProducts, null, 2));

        // res.redirect("/products/"+product.id);
      }catch (error){   
      console.log(error)
    }
    },
      
        

      editar:(req, res)=>{
        let id = req.params.id;  
        let DBproducts = leerJsonProducts();
        let product = DBproducts.find(producto => producto.id == id);
        // console.log(product);
        res.render("products/productEditForm", {title: "Editar producto", product: product});
      },

      processEdit:(req, res)=> {
        
        let id = req.params.id;
        let DBproducts = leerJsonProducts();
                
        let indexOldProduct = DBproducts.findIndex(producto => producto.id == id);
        
        console.log(req.files);
        let imagen;

        if(req.files == "") {
            imagen = DBproducts[indexOldProduct].images
        } else {
            imagen = req.files[0].filename
            // borrar foto vieja
        };

        

        let newProduct = {
            id: Number(req.params.id),
            ...req.body,
            images: imagen
        };

        DBproducts[indexOldProduct] = newProduct;

        fs.writeFileSync(pathJsonProducts, JSON.stringify(DBproducts, null, 2));
        
        res.redirect("/products/"+newProduct.id);

      },

      processDelete: (req, res)=> {
        
        let id = req.params.id;
        let DBproducts = leerJsonProducts();

        let nuevaDBProducts = DBproducts.filter(producto => producto.id != id);
        
        fs.writeFileSync(pathJsonProducts, JSON.stringify(nuevaDBProducts, null, 2));
        
        res.json(pathJsonProducts)
        // res.sendfile(path.resolve(__dirname + "/../data/products.JSON"));
    },

    listar: async (req,res) =>{ 
      
      try {
        const categories = await Categories.findAll({include:{all: true}});
        const subcategories = await SubCategories.findAll({include:{all: true}});
        let products = await Products.findAll({include:{all: true}});
        res.render("products/productSearch", {title: "Productos", products, subcategories, categories});  
      } catch (error) {
        console.log(error)
      };

    }

      
  }
  
  module.exports = productsController;
  