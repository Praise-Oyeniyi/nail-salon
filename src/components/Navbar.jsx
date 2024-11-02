import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaAngleDown} from "react-icons/fa6";
import { FaShoppingCart,FaRegUserCircle, } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className='w-full relative'>
        <div className='w-full h-14 flex items-center px-10 mt-3 mb-5'>
            <div className="top-header w-2/6">
                <div className="logo h-12 w-12 bg-black rounded-full"></div>
                
            </div>

            <div className="w-full">
                <ul className='w-full relative font-medium flex cursor-pointer justify-between items-center'>
                    <li className='flex gap-x-1 items-center'>Categories <span><FaAngleDown /></span></li>
                    <li>Deals</li>
                    <li>What's New</li>
                    <li>Delivery</li>
                    <li className='relative bg-[#fff1f5] rounded-2xl py-1 px-2'>
                        <input type="text" placeholder='search product'  className='w-full bg-transparent text-sm outline-none accent-gray-700'/>
                        <span className='absolute top-[50%] right-2 -translate-y-[50%]  text-gray-700'><CiSearch /></span>
                    </li>
                    <li className='flex gap-x-1 items-center'><span><FaRegUserCircle /></span>Account</li>
                    <li className='flex gap-x-1 items-center'><span><FaShoppingCart/></span>Cart</li>
                </ul>
            </div>
            
        </div>
    </div>
  )
}

export default Navbar