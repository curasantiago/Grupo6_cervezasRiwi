const { body, validationResult } = require('express-validator')

const validator = {
    productCreate: 
    [
        body("name")
        .isInt()
        .withMessage("Nombre obligatorio"),
        body("info")
        .isLength({min: 8})
        .withMessage("Info obligatoria")
    ]
};


module.exports = validator;

// ESTO VA EN EL FORM PARA VALIDAR!!
// <% if(typeof errors != "undefined") { %>
//     <p><%= errors[0].msg %></p>
//     <% } %>
