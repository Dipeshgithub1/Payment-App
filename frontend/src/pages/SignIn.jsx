import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ButtomWarning from "../components/BottomWarning"
import { Button } from "../components/Button"
import Heading from "../components/Heading"
import {InputBox} from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"

export const SignIn = () => {

      const navigate = useNavigate();
       //state
       const[username,setUsername] = useState("")
       const[password,setPassword] = useState("")

      const handleSignin = async () => {
       try {
        const res = await axios.post("http://localhost:3000/api/v1/user/signin",
            {
                username,
                password,
            }
        );
        localStorage.setItem("token",res.data.token)
        navigate("/dashboard")
        
       } catch (error) {
        alert("signin failed. please try again")
             console.log(error)
        
       }
      }
      

    return <div>
        <div className="bg bg-slate-200 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label ={"Sign In"}/>
          <SubHeading label= {"Enter your credentials to access your account"}></SubHeading>
          <InputBox onChange={(e) => setUsername(e.target.value)} placeholder={"johndoe@gmail"} label={"username"}></InputBox>
          <InputBox  onChange={(e) => setPassword(e.target.value)} placeholder={"@1234"} label={"Password"}></InputBox>
          <div className="pt-4">
          <Button label={"Sign In"} onClick={handleSignin}></Button>

          </div>
          <ButtomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}></ButtomWarning>

            </div>
        </div>

        </div>
    </div>
}