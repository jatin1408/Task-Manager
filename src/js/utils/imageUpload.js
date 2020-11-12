import axios from 'axios';


const imageUpload=async (data,token)=>{
    console.log(token)
    const res=await axios.post('http://localhost:3000/users/me/avatar',data,{
         headers: {
    'Authorization': `Bearer ${token}`
  }
    }
    );
    return res;
}
export {imageUpload}