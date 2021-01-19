const mainController={
    index:(req, res)=> {
        res.render("index", {title: "Riwi Cervezas"});
    },

    ingresar:(req, res)=>{
        res.render("ingreso" , {title: "Riwi Cervezas"});
    },

    processIngresar:(req, res) => {
        function getAge(dateString) {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
        if (getAge(req.body.edad_start) > 18) {
            res.redirect('/')
        } else {
            let menorDeEdad = {message: "Tiene que ser mayor de 18 años"}
            res.render('ingreso', {title: "Riwi Cervezas", menorDeEdad})
        }
    },
  
    historia:(req, res)=>{
    res.render("historia" , {title: "Riwi Cervezas"});
},
    ayuda:(req, res)=>{
    res.render("help" , {title: "Riwi Cervezas"});
},
    terminos:(req, res)=>{
    res.render("terminos" , {title: "Riwi Cervezas"});
},
    contacto:(req, res) => {
    res.render('contacto', {title: "Riwi Cervezas"})
    }

}

module.exports = mainController;