const mainController={
    index:(req, res)=> {
        res.render("index", {title: "Riwi Cervezas"});
    },

    ingresar:(req, res)=>{
        res.render("ingreso" , {title: "Riwi Cervezas"});
    },
  
}

module.exports = mainController;