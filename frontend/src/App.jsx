import { useState } from 'react'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import {SignUp} from "./pages/SignUp"
import {SignIn} from "./pages/SignIn"
import {Dashboard} from "./pages/Dashboard"
import {SendMoney} from "./pages/SendMoney"
import { Transactions } from './pages/Transactions'
import { NotFound } from './pages/NotFound'


function App() {
  return (
  <>
    <BrowserRouter>
    <Routes>
    <Route path = "/" element={<Navigate to="/signin" />}></Route>
    <Route path = "/signup" element={<SignUp/>}></Route>
    <Route path = "/signin" element= {<SignIn/>}></Route>
    <Route path = "/dashboard" element= {<Dashboard/>}></Route>
    <Route path = "/send" element = {<SendMoney/>} ></Route>
   <Route path="/transactions" element={<Transactions />} />
    <Route path="*" element={<NotFound />} />

    </Routes>
    </BrowserRouter>

  </>

  
  )      
  
}

export default App;
