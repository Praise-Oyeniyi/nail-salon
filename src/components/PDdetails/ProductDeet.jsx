import React, { useState } from 'react'
import Navbar from '../Navbar'
import PD1 from '../images/IMAGE3.png'
import {FaRegStar } from "react-icons/fa";

const ProductDeet = () => {
    const [item, setItems] = useState(1)
  return (
    <div className='mb-14'>
        <Navbar/>
        <div className='w-4/6 mx-auto'>
            <h6 className='text-gray-400 font-normal pl-3 pb-2'>Nails/ Exclusive/ High quality/ Shop by nail type/ <span className='font-bold text-gray-900'>Cortex</span></h6>
            <div className='w-full mx-auto space-y-5'>
                <div className='w-full h-[30em] bg-[#fff1f5] rounded-lg shadow-xl shadow-gray-300'>
                    <img 
                        src={PD1}
                        className="w-5/6 ml-auto !h-full object-contain object-right-bottom" 
                        alt="full product view in product details page" 
                    />

                </div>
                


                <div>
                    <div className="priceandinfo flex justify-start items-start">
                        <div className="left w-4/6 space-y-2 pb-5 border-b-2 border-r-2 border-r-gray-300 border-b-gray-300" >
                            <h3 className='uppercase text-3xl font-bold'>Cortex-nail</h3>
                            <p className='font-medium text-base leading-tight'>
                                A perfect nail to grace your look in every location or event that you want to attend. A must buy nail 
                            </p>
                            <div className='flex cursor-pointer gap-x-1 text-[#ff00ff]'>{[1,2,3,4,5].map(()=>(<FaRegStar />))}</div>
                        </div>

                        <div className="right w-auto pl-5">
                            <div className='border-b-2 border-b-gray-300 pb-3'>
                                <h4 className='uppercase  text-3xl font-bold'><span className='line-through'>${'50'}</span> /${'30'}</h4>
                                <p className='font-medium text-base leading-tight'>20% Discount Price on our products</p>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="choose-color border-b border-b-gray-300 space-y-3">
                    <h4 className='font-bold text-lg tracking-wide '>Choose any color</h4>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            {[1,2,3,4,5].map(()=>(<div className="w-14 h-14 rounded-full border bg-black border-[#ff00ff]"></div>))}
                        </div>

                        <div className="items">
                            <div className='font-bold text-xl bg-[#fff1f5] flex rounded-2xl items-center gap-x-8 px-5 py-2'>
                                <button onClick={()=>setItems(item ===1? 1 :item-1)}>-</button>
                                <h3>{item}</h3>
                                <button onClick={()=>setItems(item+1)}>+</button>
                            </div>
                        </div>

                        <p className='font-medium text-base leading-tight'>Only <span className="text-[#ff00ff]">12</span> items left don't miss out!</p>
                    </div>

                    <div className='pt-5 border-b-2 border-b-gray-300 pb-7 flex text-right font-bold w-full justify-end items-center gap-x-2 text-lg'>
                        <button className='h-10 w-40 rounded-3xl text-white tracking-wide bg-[#ff00ff]'>Buy Now</button>
                        <button className='h-10 w-40 rounded-3xl text-black tracking-wide bg-[#ffb7ce]'>Add to cart</button>
                    </div>

                    <div className="pd-perks w-3/6">
                        <div className='py-3 border-b-2 border-b-gray-300'>
                            <h5 className='font-bold text-lg leading-tight'>Free Delivery</h5>
                            <p className='text-gray-400 text-base font-medium underline'>Enter your postal code for delivery Availability</p>
                        </div>

                        <div className='py-3'>
                            <h5 className='font-bold text-lg leading-tight'>Return Delivery</h5>
                            <p className='text-gray-400 text-base font-medium underline'>Free 30Days Delivery Returns <span className='text-gray-900 cursor-pointer'>Details</span></p>
                        </div>
                    </div>

                    <div className='w-full'>
                        <div className='flex min-w-[25%] items-center justify-center gap-x-5'>
                            {[1,2,3,4].map(()=>(
                                <div className='w-full shadow-xl shadow-gray-300 rounded-lg bg-[#fff1f5]'>
                                    <img 
                                        src={PD1}
                                        className="w-full" 
                                        alt='variation in color of product'
                                    />

                                </div>
                            ))}
                        </div>
                        
                    </div>
                    
                    
                    
                </div>
            </div>
            
        </div>

    </div>
  )
}

export default ProductDeet