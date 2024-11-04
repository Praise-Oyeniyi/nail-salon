import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaAngleDown} from "react-icons/fa6";
import { FaShoppingCart,FaRegUserCircle, } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import Sidebar from './Sidebar';
import Logo from '../components/images/logo.webp'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [side, setSide] = useState(false);


  return (
    <div className='w-full relative '>
        <div className='w-full h-14 hidden md:flex items-center px-10 mt-3 mb-5'>
            <div className="top-header w-2/6">
                <div className="logo h-12 w-12 bg-black rounded-full overflow-hidden">
                    <Link to="/home"><img src={Logo} alt="" className='w-full'/></Link>
                </div>
                
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
                    <li ><Link className='flex gap-x-1 items-center' to="/cart"><span><FaShoppingCart/></span>Cart</Link></li>
                </ul>
            </div>
            
        </div>

        <div>
            <div className={`w-full h-12 md:hidden z-30 transition-all ease-in duration-200 ${side? "fixed top-0 left-0 bg-[#fff1f5fd]":"block"}`}>
                <div className={`w-full h-full flex justify-between items-center`}>
                    <div className='burger-menu w-1/6 h-full flex items-center justify-center'>
                        <div className='cursor-pointer p-2' onClick={()=>setSide(!side)}>
                            <div className='w-5 h-1 bg-black mb-[2px]'></div>
                            <div className='w-5 h-1 bg-[#ff00ff] ml-1'></div>
                        </div>
                    </div>

                    <div className='w-full border-b border-l h-full border-l-gray-300 border-b-gray-300 shadow-gray-300 shadow-sm'>
                        
                        <ul className='w-full h-full flex items-center justify-center z-50 gap-x-7 text-lg font-medium'>
                            <li className='cursor-pointer hidden md:block' onClick={()=>setSide(!side)}>
                                <div className='w-5 h-1 bg-black mb-[2px]'></div>
                                <div className='w-5 h-1 bg-[#ff00ff] ml-1'></div>
                                <div className='w-5 h-1 bg-black ml-2'></div>
                            </li>
                            <li className='relative bg-[#fff1f5] rounded-2xl py-1 px-2 hidden md:block'>
                                <input type="text" placeholder='search product'  className='w-full bg-transparent text-sm outline-none accent-gray-700'/>
                                <span className='absolute top-[50%] right-2 -translate-y-[50%]  text-gray-700'><CiSearch /></span>
                            </li>
                        
                            <li ><Link className='flex gap-x-1 items-center' to='/cart'><span><FaShoppingCart/></span>Cart</Link></li>
                            
                            <li className='flex gap-x-1 items-center'><span><CiLocationOn /></span>Chicago</li>
                        </ul>
                    </div>
                </div> 
                <div className={`absolute z-30`}>
                    <Sidebar open={side}/>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Navbar