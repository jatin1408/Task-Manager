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
         
             const result= await axios.get(apiUrl+"/users/me");
            return result;
           
        }
        catch{
               
                
    }
}
const logOut=async ()=>{
    try{
        const loggedOut=await axios.post(apiUrl+"/users/logoutAll");
       
        return loggedOut.status;
    }
    catch{
           return null
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
const deleteTask=async (id)=>{
    try{
        const deleted=await axios.delete(apiUrl+"/tasks/"+id);
        return deleted.status;
    }
    catch{
        return null;
    }
}
const getAvatar=async ()=>{
    var getId=await axios.get(apiUrl+"/users/me");
    getId=getId.data._id;
    var avatar=await axios.get(apiUrl+"/users/"+getId+"/avatar");

    if(avatar.status===200){
        return avatar.config.url;
    }
    return null;
}
const updateTask=async (id,state)=>{
    var result=await axios.patch(apiUrl+"/tasks/"+id,{
        taskState:state
    })
    if(result.status===200){
        return result.status;
    }
    return null;
}


export {fetchData,logOut,postTask,getAllTask,getAvatar,deleteTask,updateTask};

 