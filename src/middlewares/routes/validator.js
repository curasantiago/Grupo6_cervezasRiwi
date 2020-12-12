const { body, validationResult } = require('express-validator')
const {Users, sequelize} = require('../../database/models');
const {Op} = require('sequelize');
const path = require('path');

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
        }).withMessage("El email no puede tener espacios"),
        // .bail()
        // .custom(async function(value){
        //     let checkUserEmail;
        //     try {
        //     checkUserEmail = await Users.findAll({where: {email: value}})
            
        //     } catch(err) {
        //         console.log(err)
        //     }
        //     if (checkUserEmail == '') {
               
        //         return true;
        //     } else {
        //         console.log('hello')
        //         return false;
        //     }
            

            // if (emailExiste) {
            //     return false
            // } else {
            //     return true
            // }

        // }).withMessage('El email ingresado ya existe'),
        //  .withMessage("Email no valido"),
        body("birthdate")
        .notEmpty()
        .withMessage("Ingresa una fecha de nacimiento")
        .bail()
        .custom(function(value){
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
       
       if(getAge(value)<18){
           return false
       }else{
           return true
       }
        })
        .withMessage("Debe ser mayor de 18 años"),
        
        
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
        body("id_category")
        .notEmpty()
        .withMessage("Elija una categoría"),
        body("id_subcategory")
        .notEmpty()
        .withMessage("Elija una subcategoría"),
        body("id_size")
        .notEmpty()
        .withMessage("Elija un tamaño"),
        body("name")
        .notEmpty()
        .withMessage("Nombre obligatorio")
        .bail()
        .isLength({min: 5})
        .withMessage("El mínimo de caracteres del nombre es 5"),
        body("info")
        .notEmpty()
        .withMessage("Información del producto obligatoria")
        .bail()
        .isLength({min: 8})
        .withMessage("El mínimo de caracteres de la información del producto es 8"),
        body("price")
        .isInt({min: 10, max: 999})
        .withMessage("Ingrese un precio entre 10 y 9999"),
        body("image")
        .custom(function(value, {req}) {
             if (req.file != undefined) {
                return true
             } else {
                return false
             }
        })
        .withMessage("Imagen obligatoria")
        .bail()
        .custom(function(value, {req}) {
            const acceptedExtensions = [".jpg", ".jpeg", ".png"];
            const ext = path.extname(req.file.originalname);
            const resultado = acceptedExtensions.includes(ext);
            return resultado
        })
        .withMessage("Formato de imagen no válido")
    ],
    productEdit: 
    [
        body("id_category")
        .notEmpty()
        .withMessage("Elija una categoría"),
        body("id_subcategory")
        .notEmpty()
        .withMessage("Elija una subcategoría"),
        body("id_size")
        .notEmpty()
        .withMessage("Elija un tamaño"),
        body("name")
        .notEmpty()
        .withMessage("Nombre obligatorio")
        .bail()
        .isLength({min: 5})
        .withMessage("El mínimo de caracteres del nombre es 5"),
        body("info")
        .notEmpty()
        .withMessage("Información del producto obligatoria")
        .bail()
        .isLength({min: 8})
        .withMessage("El mínimo de caracteres de la información del producto es 8"),
        body("price")
        .isInt({min: 10, max: 999})
        .withMessage("Ingrese un precio entre 10 y 9999"),
        body("image")
        .custom(function(value, {req}) {
            if(req.file != undefined) {
                const acceptedExtensions = [".jpg", ".jpeg", ".png"];
                const ext = path.extname(req.file.originalname);
                const resultado = acceptedExtensions.includes(ext);
                return resultado
            } else {
                return true
            }
        })
        .withMessage("Formato de imagen no válido")
    ]
};


module.exports = validator;

// ESTO VA EN EL FORM PARA VALIDAR!!
// <% if(typeof errors != "undefined") { %>
//     <p><%= errors[0].msg %></p>
//     <% } %>
