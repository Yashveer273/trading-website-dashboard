import React from "react";
import { Link } from "react-router-dom";
import {
  BsGrid1X2Fill,
  BsPeopleFill,
  BsWallet2,
  BsCashStack,
  BsArrowUpRightCircle,
  BsBag,
  BsBarChart,
  BsCreditCard,
  BsGear,
  BsBoxSeam,
  BsPower
} from "react-icons/bs";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-user">
        <div className="user-photo">
          <img src="https://img.freepik.com/premium-vector/blue-fire-icon-vector_690841-792.jpg" style={{marginTop:"1rem",marginBottom:"0px"}}></img>
          {/* Placeholder – replace src with actual image if needed */}
        </div>
        <div className="user-name" style={{marginLeft:"1rem",marginBottom:"0px"}}><b>For Admin</b> </div>
       
      </div>

      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link to="/">
            <BsGrid1X2Fill className="icon" />
            Product Purchase History
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/users">
            <BsPeopleFill className="icon" />
            All Users
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/QRCodeSubmit">
            <BsWallet2 className="icon" />
            Add QR Code
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/LucySpin">
            <BsWallet2 className="icon" />
            Lucky Spin
          </Link>
        </li>
        
        <li className="sidebar-item">
          <Link to="/recharge">
            <BsCashStack className="icon" />
            Diposit History
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/withdraw">
            <BsArrowUpRightCircle className="icon" />
            Withdraw History
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/WithdrawRequest">
            <BsBag className="icon" />
            Withdraw Request
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/edit-product">
            <BsBoxSeam className="icon" />
            Edit Product
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/team-income">
            <BsBarChart className="icon" />
            Team Income
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/giftcodes">
            <BsBarChart className="icon" />
            Gift Codes
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/claim-history">
            <BsCreditCard className="icon" />
            Claim History
          </Link>
        </li>
       
        <li className="sidebar-item">
          <Link to="/payment-status">
            <BsCreditCard className="icon" />
            Diposit Request
          </Link>
        </li>
        
        <li className="sidebar-item">
          <Link to="/logout">
            <BsPower className="icon" />
            Logout
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
