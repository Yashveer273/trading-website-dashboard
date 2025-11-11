import React, { useEffect, useState } from "react";
import './App.css';

import Sidebar from "./Sidebar";

import Users from "./Users"; // Import the Users page

import Recharge from "./Recharge";
import { Routes, Route } from "react-router-dom";
import Withdrawal from "./WithdrawHistory";
import WithdrawRequest from "./withdrawRequest";


import PaymentStatus from "./PaymentStatus";

import Logout from "./Logout";
import ManageProducts from "./ManageProducts";
import Giftcodes from "./Giftcodes";

import Teams from "./Teams";
import QRCodeSubmit from "./QRCodeSubmit";
import LucySpin from "./lucySpin";
import ProductPurchaseList from "./ProductPurchaseList";
import SocialMedia from "./SocialMedia";
import DemoAccounts from "./DemoAccounts";
import CommissionSettings from "./CommissionSettings";
import UPIDashboard from "./UPIDashboard";
import AuthCard from "./AuthCard";
import SubordinateManager from "./SubordinateManager";


function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  // Check localStorage for logged user on page load
  useEffect(() => {
    const user = localStorage.getItem("realStateLoggedUser");
    if (user) setLoggedUser(JSON.parse(user));
  }, []);
  
   if (!loggedUser) {
    return <AuthCard onLoginSuccess={setLoggedUser} />;
  }
  return (
    <div className="grid-container">
      {/* <Header /> */}
      <Sidebar />
      <Routes>
        <Route path="/" element={<ProductPurchaseList />} />
        <Route path="/users" element={<Users isDemoUser={false}/>} />
        <Route path="/CreateDemousers" element={<DemoAccounts />} />
        <Route path="/demousers" element={<Users isDemoUser={true}/>} />
        <Route path="/commissionSettings" element={<CommissionSettings/>} />
        <Route path="/UPISettings" element={<UPIDashboard/>} />
        <Route path="/SubordinateManager" element={<SubordinateManager/>} />
       
       
        <Route path="/recharge" element={<Recharge />} />   {/* fixed typo */}
        <Route path="/withdraw" element={<Withdrawal />} />
        <Route path="/WithdrawRequest" element={<WithdrawRequest />} />
        <Route path="/edit-product" element={<ManageProducts />} />

      
     
        
        <Route path="/payment-status" element={<PaymentStatus/>}/>
       
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/QRCodeSubmit" element={<QRCodeSubmit/>}/>
        <Route path="/LucySpin" element={<LucySpin/>}/>
        <Route path="/giftcodes" element={<Giftcodes/>}/>
        <Route path="/socialMedia" element={<SocialMedia/>}/>

         <Route path="/teams/:id" element={<Teams />} />

        {/* Add other routes if needed */}
      </Routes>
    </div>
  );
}

export default App;