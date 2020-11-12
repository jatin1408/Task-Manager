 import {imageUpload} from './utils/imageUpload'
 import {postData} from './utils/newUser';
 const signUp = document.querySelector('.boxSignUp');
       localStorage.clear();
        signUp.addEventListener("submit", (e) => {
            e.preventDefault();
        
            if (signUp.elements[2].value === signUp.elements[3].value) {
                var obj={
                 name: signUp.elements[0].value,
                email: signUp.elements[1].value,
                password: signUp.elements[2].value,
                }
                doTask(obj);

             
            }
            else {
                window.alert("Password Not Matched")
            }
            
        })
const doTask=async (data)=>{
    const token=await postData(data);

   
    if(token){
         const formData = new FormData();
        formData.append('avatar',signUp.elements[4].files[0]);
        const res=await imageUpload(formData,token);
        if(res.status===200){
          window.location.replace(window.location.origin+"/signin.html");
        }
        else{
            window.alert('Something went wrong');
        }
    }
    else{
        window.alert("Something went wrong");
    }
}