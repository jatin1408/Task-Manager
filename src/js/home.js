
import {fetchData,logOut} from './utils/getInfo';
var userInformation={};
window.addEventListener('load',e=>{
    const checkToken=localStorage.getItem('token');
    if(!checkToken){
          window.location.replace(window.location.origin+"/index.html");
    }
})
const check=async ()=>{
    const result=await fetchData();
    userInformation=result.data;
    console.log("Hey "+userInformation.name);
}
check();
const log=async ()=>{
    const result=await logOut();
    if(result===200){
          window.location.replace(window.location.origin+"/index.html");
    }
}
document.querySelector('.test').addEventListener('click',e=>{
    log();
})