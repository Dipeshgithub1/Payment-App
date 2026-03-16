import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const Dashboard = () => {
  const [balance,setBalance] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

   useEffect(() => {
    const fetchData = async () => {
        try {
         // Fetch balance
         const balanceRes = await axios.get(`${BASE_URL}/api/v1/account/balance`,{
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
            })
            setBalance(balanceRes.data.balance)
            
            // Fetch current user
            const userRes = await axios.get(`${BASE_URL}/api/v1/user/me`,{
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
            })
            setUser(userRes.data)
            
        } 
        
        catch (error) {
            console.error("Failed to fetch data", error);

            //option handle autherisze
            if(error.response?.status === 401 ){
                localStorage.removeItem("token");
                navigate("/signin")

            }
            
        }
    }
    fetchData();

   },[navigate])

    return <div>
        <Appbar user={user}/>
        <div className="m-8">
        <Balance value ={balance}></Balance>
        <button onClick={() => {
            navigate("/transactions")
        }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">View Transaction History</button>
        <Users/>

        </div>
    </div>
}
