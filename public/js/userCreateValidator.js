const registerForm = document.querySelector("#registerForm");


const first_name= document.querySelector("#first_name");
const last_name= document.querySelector("#last_name");
const email= document.querySelector("#email");
const birthdate= document.querySelector("#birthdate");
const address= document.querySelector("#address");
const password= document.querySelector("#password");
const repassword= document.querySelector("#repassword");

registerForm.addEventListener("submit", function(e){
    checkInputs()
    if(Object.keys (errores).length>0){
        e.preventDefault();
        console.log(errores)
    }
});

function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

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




let errores={};

function checkInputs(){
    console.log(image.value)
    if(first_name.value== ""){
        setErrors(first_name,"Ingresa un nombre")
    }
    
   else if(first_name.value.includes(" ") ){
        setErrors(first_name,"El nombre no puede tener espacios")
    }
    else{
        setSuccess(first_name)
    }
    if(last_name.value== ""){
        setErrors(last_name,"Ingresa un apellido")
    }
    else if(last_name.value.includes(" ") ){
        setErrors(last_name,"El apellido no puede tener espacios")
    }else{
        setSuccess(last_name)
    }
    if(!isEmail(email.value)){
        setErrors(email,"Ingresa un email valido")
    }else{
        setSuccess(email)
    }
    
    if(birthdate.value=="") {
        setErrors(birthdate,"Ingresa una fecha de nacimiento")
    }
    else if(getAge(birthdate.value)< 18){
        setErrors(birthdate, "Debe ser mayor de 18 años")
      
    }else{
        setSuccess(birthdate);
    }
    if(address.value== ""){
        setErrors(address,"Ingresa una direccion")
    }
    else if(address.value.length<10 ){
        setErrors(address,"La dirección debe tener al menos 10 caracteres")
    }else{
        setSuccess(address);
    }
    if(password.value== ""){
        setErrors(password,"Ingresá una contraseña")
    }
    else if(password.value!== repassword.value ){
        setErrors(password,"Las contraseñas deben coincidir")
    }else{
        setSuccess(password);
    }
    if(repassword.value== ""){
        setErrors(repassword,"Volve a ingresar la contraseña")
    }
    else if(repassword.value!== password.value ){
        setErrors(repassword,"Las contraseñas deben coincidir")
    }else{
        setSuccess(repassword);
    }
    const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
    if (!(/\.(jpg|png|jpeg)$/i).test(image.value)) {
        setErrors(image,"El formato de imagen debe ser JPG, JPEG o PNG")
    } else {
        setSuccess(image);
    }
 
}

function setErrors(input, mensaje){
    let formControl = input.parentElement
    formControl.className = 'form-control-error'
    let smallDiv=input.parentElement.querySelector("small")
    
    smallDiv.innerText=mensaje;
    // console.log(smallDiv);
    errores[input.name]=mensaje;
    console.log(errores)
}
function setSuccess(input){
    let formControl = input.parentElement
    formControl.className = 'form-control-success'
    let smallDiv=input.parentElement.querySelector("small")
    smallDiv.innerText="";
    delete errores[input.name];
}



