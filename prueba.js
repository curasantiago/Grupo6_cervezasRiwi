// let operacion = Date.now() - 1999/02/02
// let newDate = new Date()

// let prueba = newDate;

// let otraprueba = new Date(1999,02,02)

// let suma = prueba - otraprueba

// console.log(suma)
// -------------------
// let hoy = new Date(Date.now())

// let hace18 = new Date(new Date(hoy).getDate() + "/" + new Date(hoy).getMonth() + "/" + (new Date(hoy).getFullYear() - 18));

// let nacimiento = new Date("2012/12/13")

// let resultado = hace18 > nacimiento

// console.log(resultado)



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
console.log('age: ' + getAge("1988/12/09"));
