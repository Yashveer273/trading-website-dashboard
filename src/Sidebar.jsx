import React, { useState } from "react";
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
  BsTelegram,
  BsBoxSeam,
  BsPower,
  BsChevronLeft,
  BsChevronRight,
  BsGift,BsDice5,
  BsFileEarmarkText
} from "react-icons/bs";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <>
    <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <BsChevronLeft size={30} /> : <BsChevronRight size={30} />}
      </div>
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      

      {isOpen && (
        <>
          <div className="sidebar-user">
           
          
          </div>

          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <Link to="/"><BsGrid1X2Fill className="icon" /> Product Purchase History</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/users"><BsPeopleFill className="icon" /> All Users</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/QRCodeSubmit"><BsWallet2 className="icon" /> Add QR Code</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/LucySpin"><BsDice5 className="icon" /> Lucky Spin</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/recharge"><BsCashStack className="icon" /> Deposit History</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/withdraw"><BsArrowUpRightCircle className="icon" /> Withdraw History</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/WithdrawRequest"><BsBag className="icon" /> Withdraw Request</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/edit-product"><BsBoxSeam className="icon" /> Edit Product</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/team-income"><BsBarChart className="icon" /> Team Income</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/giftcodes"><BsGift className="icon" /> Gift Codes</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/claim-history"><BsFileEarmarkText className="icon" /> Claim History</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/payment-status"><BsCreditCard className="icon" /> Deposit Request</Link>
            </li>
           <li className="sidebar-item">
              <Link to="/socialMedia"><BsTelegram  className="icon" /> Social Media</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/logout"><BsPower className="icon" /> Logout</Link>
            </li>
          </ul>
        </>
      )}
    </aside>
    </>
  );
}

export default Sidebar;
