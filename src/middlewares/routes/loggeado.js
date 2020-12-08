function loggeado (req, res, next) {
if (req.session.usuarioLoggeado && req.session.usuarioLoggeado.id == req.params.id) {
    next();
} else {
    res.redirect("/")
 };
}
module.exports = loggeado;