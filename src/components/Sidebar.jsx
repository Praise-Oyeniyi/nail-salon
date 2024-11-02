import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaAngleDown} from "react-icons/fa6";
import { FaShoppingCart,FaRegUserCircle, } from "react-icons/fa";

// #ffb7ce #cccccc #fff1f5 #ff00ff
const Sidebar = () => {
  return (
    <div className='h-screen overflow-hidden fixed w-[25%] bg-[#fff1f5]'>
        <div className='w-full space-y-10 px-10 py-7'>
            <div className="sidebar-header">
                <div className="logo">

                </div>
            </div>
            <ul className='space-y-7 font-medium cursor-pointer'>
                <li>Home</li>
                <li className='flex gap-x-1 items-center'>Categories <span><FaAngleDown /></span></li>
                <li>Deals</li>
                <li>What's New</li>
                <li>Delivery</li>
                <li>Order</li>
                <li className='flex gap-x-1 items-center'><span><FaRegUserCircle/> </span>Account</li>
                <li className='flex gap-x-1 items-center'><span><FaShoppingCart/></span>Cart</li>
                <li className='relative bg-[#ffb7ce] rounded-2xl py-1 px-2'>
                    <input type="text" placeholder='search product'  className='w-full bg-transparent text-sm outline-none accent-gray-700'/>
                    <span className='absolute top-[50%] right-2 -translate-y-[50%]  text-gray-700'><CiSearch /></span>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar