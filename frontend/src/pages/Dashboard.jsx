import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Dashboard = () => {
  const [balance,setBalance] = useState(0);
  const navigate = useNavigate()

   useEffect(() => {
    const fetchBalance = async () => {
        try {
         const res =  await axios.get("http://localhost:3000/api/v1/account/balance",{

            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
            })
            
            setBalance(res.data.balance)
            
        } 
        
        catch (error) {
            console.error("Failed to fetch balance", error);

            //option handle autherisze
            if(err.response?.status === 401 ){
                localStorage.removeItem("token");
                navigate("/signin")

            }
            
        }
    }
    fetchBalance();

   },[navigate])

    return <div>
        <Appbar/>
        <div className="m-8">
        <Balance value ={balance}></Balance>
        <button onClick={() => {
            navigate("/transactions")
        }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">View Transaction History</button>
        <Users/>

        </div>
    </div>
}