import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../images/logo.webp";

// #ffb7ce #cccccc #fff1f5 #ff00ff
const Sidebar = ({ open, setSide, setProductName, noSearch=false, }) => {
  const handleSearchChange = (e) => {
    setProductName(e.target.value);
  };

  return (
    <div
      className={`h-screen overflow-hidden !z-[99] 
    ${open ? "top-12 lg:top-0 lg block " : "-top-[999px] hidden"} 
    left-0  fixed w-full  backdrop-blur-sm lg:backdrop-blur-0`}
    >
      <div className="w-5/6 !z-[999] h-full md:w-[25%] space-y-7 lg:space-y-10 
      rounded-r-xl shadow-md lg:shadow-none shadow-gray-300 lg:rounded-r-none 
      lg:px-10 px-7 lg:py-7 py-3  bg-[#ffb7ce] lg:bg-[#fff1f5]">
        <div className="sidebar-header flex items-center gap-x-3">
          <div className="logo h-12 w-12 bg-black rounded-full overflow-hidden">
            <Link to="/">
              <img src={Logo} alt="" className="w-full" />
            </Link>
          </div>

          <div className="uppercase hidden lg:block text-lg font-bold tracking-wide leading-tight">
            <h3>
              WITTY
              <br />
              Nail Tips
            </h3>
          </div>
        </div>
        <ul className="space-y-7 font-normal cursor-pointer !z-[999]">
          <li className="">
            <Link className="flex gap-x-1 items-center" to="/">
              Home
            </Link>
          </li>
          {/* <li className='flex gap-x-1 items-center'>Categories <span><FaAngleDown /></span></li> */}
          <li>
            <Link className="flex gap-x-1 items-center" to="/saved">
              Saved Items
            </Link>
          </li>
          {/* <li>Delivery</li> */}
          <li>
            <Link className="flex gap-x-1 items-center" to="/order">
              My Orders
            </Link>
          </li>
          <li className="">
            <Link className="flex gap-x-1 items-center" to="/cart">
              <span>
                <FaShoppingCart />
              </span>
              Cart
            </Link>
          </li>
          <li className="flex gap-x-1 items-center">
            <Link className="flex gap-x-1 items-center" to="/edit-profile">
              <span>
                <FaRegUserCircle />{" "}
              </span>
              Account
            </Link>
          </li>
          {!noSearch && 
          <li className="relative bg-[#fff1f5] lg:bg-[#ffb7ce] rounded-2xl py-1 px-2">
            <input
              type="text"
              placeholder="search product"
              onChange={handleSearchChange}
              className="w-full bg-transparent text-sm outline-none accent-gray-700"
            />
            <span className="absolute top-[50%] right-2 -translate-y-[50%]  text-gray-700">
              <CiSearch onClick={() => setSide(false)}/>
            </span>
          </li>}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
