const { body, validationResult } = require('express-validator')
const {Users, sequelize} = require('../../database/models');
const {Op} = require('sequelize');

const validator = {
    userCreate:
    [
        body("first_name")
        .notEmpty()
        .withMessage("Ingresa un nombre")
        .bail()
        .custom(function(value) {
            if( value.includes(" ") ) {
                return false
            } else {
                return true
            }
        }).withMessage("El nombre no puede tener espacios"),
        body("last_name")
        .notEmpty()
        .withMessage("Ingresa un apellido")
        .bail()
        .custom(function(value) {
            if( value.includes(" ") ) {
                return false
            } else {
                return true
            }
        }).withMessage("El apellido no puede tener espacios"),
        body("email")
        .notEmpty()
        .withMessage("Ingresa un email")
        .bail()
        .isEmail()
        .withMessage("Email no valido")
        .bail()
        .custom(function(value) {
            if( value.includes(" ") ) {
                return false
            } else {
                return true
            }
        }).withMessage("El email no puede tener espacios")
        .bail()
        .custom(async function(value){
            let checkUserEmail;
            try {
            checkUserEmail = await Users.findAll({where: {email: value}})
            
            } catch(err) {
                console.log(err)
            }
            if (checkUserEmail == '') {
               
                return true;
            } else {
                console.log('hello')
                return false;
            }
            

            // if (emailExiste) {
            //     return false
            // } else {
            //     return true
            // }

        }).withMessage('El email ingresado ya existe'),
        // .withMessage("Email no valido"),
        body("birthdate")
        .notEmpty()
        .withMessage("Ingresa una fecha de nacimiento"),
        // .custom(function(value) {
        //     if (Date.now() - value >= 18)
        // })
        body("address")
        .notEmpty()
        .withMessage("Ingresá un domicilio")
        .bail()
        .isLength({min: 10})
        .withMessage("El domicilio debe tener al menos 10 caracteres"),
        body("password")
        .notEmpty()
        .withMessage("Ingresá una contraseña")
        .bail()
        .custom(function(value, {req}) {
            if (value == req.body.repassword) {
                return true 
            } else {
                return false
            }
        })
        .withMessage("Deben coincidir las contraseñas"),
        body("repassword")
        .notEmpty()
        .withMessage("Repetí la contraseña")
        .bail()
        .custom(function(value, {req}) {
            if (value == req.body.password) {
                return true 
            } else {
                return false
            }
        })
        .withMessage("Deben coincidir las contraseñas"),
        
        


        
        
    ],
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
