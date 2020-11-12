import axios from 'axios';

const postData=async (data)=>{
    const res=await axios.post('http://localhost:3000/users',data);
  
    if(res.status==201){
        return res.data.token;
    }
    else{
        return null;
    }
}
export {postData}
