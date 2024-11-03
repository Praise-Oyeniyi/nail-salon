import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaAngleDown} from "react-icons/fa6";
import { FaShoppingCart,FaRegUserCircle, } from "react-icons/fa";

// #ffb7ce #cccccc #fff1f5 #ff00ff
const Sidebar = () => {
  
  return (
    <div className='h-screen overflow-hidden left-0 z-40 fixed w-full  backdrop-blur-sm'>
        <div className='w-5/6 h-full xl:h-auto md:w-[25%] space-y-7 xl:space-y-10 rounded-r-xl shadow-md xl:shadow-none shadow-gray-300 xl:rounded-r-none xl:px-10 px-7 xl:py-7 py-3  bg-[#ffb7ce] xl:bg-[#fff1f5]'>
            <div className="sidebar-header">
                <div className="logo">

                </div>
            </div>
            <ul className='space-y-7 font-medium cursor-pointer'>
                <li className='hidden xl:block'>Home</li>
                <li className='flex gap-x-1 items-center'>Categories <span><FaAngleDown /></span></li>
                <li>Deals</li>
                <li>What's New</li>
                <li>Delivery</li>
                <li>Order</li>
                <li className='flex gap-x-1 items-center'><span><FaRegUserCircle/> </span>Account</li>
                <li className='flex gap-x-1 items-center'><span><FaShoppingCart/></span>Cart</li>
                <li className='relative bg-[#fff1f5] xl:bg-[#ffb7ce] rounded-2xl py-1 px-2'>
                    <input type="text" placeholder='search product'  className='w-full bg-transparent text-sm outline-none accent-gray-700'/>
                    <span className='absolute top-[50%] right-2 -translate-y-[50%]  text-gray-700'><CiSearch /></span>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar