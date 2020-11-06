 import axios from 'axios';
 const signUp = document.querySelector('.boxSignUp');
       localStorage.clear();
        signUp.addEventListener("submit", (e) => {
            e.preventDefault();
            if (signUp.elements[2].value === signUp.elements[3].value) {

                axios.post('http://localhost:3000/users', {
                    name: signUp.elements[0].value,
                    email: signUp.elements[1].value,
                    password: signUp.elements[2].value

                }).then((response) => {
                    if (response.status === 201) {
                        window.alert("Success");
                        window.location.replace(window.location.origin+"/signin.html");
                    }
                }).catch(e => {
                    console.log(e);
                })
            }
            else {
                window.alert("Password Not Matched")
            }

        })