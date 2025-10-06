import React from "react";
import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";

import Users from "./Users"; // Import the Users page

import Recharge from "./Recharge";
import { Routes, Route } from "react-router-dom";
import Withdrawal from "./WithdrawHistory";
import WithdrawRequest from "./withdrawRequest";
import TeamIncome from "./TeamIncome";
import ClaimHistory from "./ClaimHistory";

import PaymentStatus from "./PaymentStatus";

import Logout from "./Logout";
import ManageProducts from "./ManageProducts";
import Giftcodes from "./Giftcodes";

import Teams from "./Teams";
import QRCodeSubmit from "./QRCodeSubmit";
import LucySpin from "./lucySpin";
import ProductPurchaseList from "./ProductPurchaseList";

function App() {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<ProductPurchaseList />} />
        <Route path="/users" element={<Users />} />
       
        <Route path="/recharge" element={<Recharge />} />   {/* fixed typo */}
        <Route path="/withdraw" element={<Withdrawal />} />
        <Route path="/WithdrawRequest" element={<WithdrawRequest />} />
        <Route path="/edit-product" element={<ManageProducts />} />

        <Route path="/team-income" element={<TeamIncome/>}/>
        <Route path="/claim-history" element={<ClaimHistory/>}/>
        
        <Route path="/payment-status" element={<PaymentStatus/>}/>
       
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/QRCodeSubmit" element={<QRCodeSubmit/>}/>
        <Route path="/LucySpin" element={<LucySpin/>}/>
        <Route path="/giftcodes" element={<Giftcodes/>}/>

         <Route path="/teams/:id" element={<Teams />} />

        {/* Add other routes if needed */}
      </Routes>
    </div>
  );
}

export default App;