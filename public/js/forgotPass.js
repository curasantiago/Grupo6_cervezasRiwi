window.addEventListener("load", function(){
    
    function isEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    let forgotPass = document.getElementById("login-form-a");
    let forgotForm = document.getElementById("forgot-form");

    forgotPass.addEventListener("click", function(e){
        e.preventDefault()
        Swal.fire({
            icon: 'question',
            title: 'Ingrese su email para recuperar su contraseña',
            input: "text", 
            confirmButtonColor: "rgba(166,150,30,1)",
            iconColor: "#DACB5E",
            inputValidator: (email) => {
                if (isEmail(email)) {
                    forgotForm.email.value = email;
                    forgotForm.submit();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'INGRESE UN EMAIL VÁLIDO',
                        confirmButtonColor: "rgba(166,150,30,1)",
                        iconColor: "#DACB5E"
                    })
                }
            }
        })
        // prompt("Ingrese su email para recuperar su contraseña");
        // if (isEmail(email)) {
        //     forgotForm.email.value = email;
        //     forgotForm.submit();
        // } else {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'INGRESE UN EMAIL VÁLIDO',
        //         confirmButtonColor: "rgba(166,150,30,1)",
        //         iconColor: "#DACB5E"
        //     })
            // alert("Ingrese un email válido")
        // }
        
    })

});