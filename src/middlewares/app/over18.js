function over18 (req, res, next) {
     
    if (req.cookies.over18) {
        req.session.over18 = req.cookies.over18
    }

    if (req.path.indexOf("api") != -1) {
        next();
    }
    else if (req.body.edad_start) {
        next(); 
    } else if (req.session.over18 == "YES") {
        next();
    } else if (!req.session.over18 && req.path != "/ingreso" ) {
        res.redirect("/ingreso")
    } else if (!req.session.over18 && req.path == "/ingreso" ) {
        next();
    } else if (req.session.over18 == "NO" && req.path) {
        let menorDeEdad = {message: "Tiene que ser mayor de 18 años"}
        res.render('ingreso', {title: "Riwi Cervezas", menorDeEdad})
    }
    
    }
module.exports = over18;