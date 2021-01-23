function loginVariable (req, res, next) {

    res.locals.usuarioSession = false;
    res.locals.adminSession = false;

    if(req.session.usuarioLoggeado) {
        // console.log("hay session")
        res.locals.usuarioSession = req.session.usuarioLoggeado
    } else if (req.cookies.recordame) {
        req.session.usuarioLoggeado = req.cookies.recordame
        res.locals.usuarioSession = req.session.usuarioLoggeado
    }

    if (req.session.adminLoggeado) {
        res.locals.adminSession = req.session.adminLoggeado
    }


    next();
};

module.exports = loginVariable;