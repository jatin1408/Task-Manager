import axios from 'axios';

var token=localStorage.getItem('token');
const apiUrl='http://localhost:3000'

axios.interceptors.request.use(
    config => {
        config.headers.authorization=`Bearer ${token}`;
        return config;
    },
    error=>{
        return Promise.reject(error);
    }
);

  

    const fetchData=async ()=>{
        try{
            console.log("hey");
             const result= await axios.get(apiUrl+"/users/me");
            return result;
           
        }
        catch{
                console.log("hey");
                
    }
}
const logOut=async ()=>{
    try{
        const loggedOut=await axios.post(apiUrl+"/users/logout");
       
        return loggedOut.status;
    }
    catch{
            console.log("hey");
    }
}
const postTask=async (data) =>{
    token=localStorage.getItem('token');
    try{
     
        const postData=await axios.post(apiUrl+"/tasks",data);
        
        return postData.status;
    }
    catch(e){
        return null;
    }
}
const getAllTask=async (data) =>{
    try{
        const getData= await axios.get(apiUrl+"/tasks");
        return getData;
    }
    catch{
        return null;
    }
}

export {fetchData,logOut,postTask,getAllTask};

 