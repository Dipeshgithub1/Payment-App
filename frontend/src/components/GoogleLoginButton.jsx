import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { BASE_URL } from "../config";

export default function GoogleLoginButton(){
    
    const handleSuccess = async(credentialResponse) => {
     
     const token = credentialResponse.credential;
    

     try {
        const res = await axios.post(`${BASE_URL}/api/v1/user/google`,
            {token}
        );
        const data = res.data;

        localStorage.setItem("token",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));

        window.location.href = "/dashboard"
        
     } catch (error) {
        console.log("Google login failed", error);
     }
   

    };
      return (
        <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login failed")}>

        </GoogleLogin>
        
     )
 }
