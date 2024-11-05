import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import OrderInfo from './OrderInfo'
import OrderSide from './OrderSide'
import OrderSumry from './OrderSumry'


const OrderIndex = () => {
    const [side, setSide] = useState(false);

  return (
    <div className='w-full md:flex justify-start items-start overflow-x-hidden '>
        <div className='px-3 h-14 flex justify-between items-center lg:hidden'>
            <div className='cursor-pointer p-2' onClick={()=>setSide(!side)}>
                <div className='w-5 h-1 bg-black mb-[2px]'></div>
                <div className='w-5 h-1 bg-[#ff00ff] ml-1'></div>
            </div>

            <div className="profile-image w-10 h-10 bg-black rounded-full">

            </div>
        </div>
        <div className='hidden lg:block'>    
            <Sidebar open={true}/>
        </div>
        <div className=''>
            <Sidebar open={side}/>
        </div>
        <div className='w-full md:py-7 py-3 px-5 mx-auto lg:ml-[25%]'>
            <div className='w-full space-y-3'>
                <div className="order-head flex justify-between items-center relative">
                    <div className='relative'>
                        <div className="id flex items-center gap-x-1 md:gap-x-3 font-bold">
                            <h3 className='md:text-2xl text-lg'>Order ID:55432176708</h3>
                            <h5 className='uppercase text-[#ff00ff] md:tracking-wider px-1 text-xs md:text-sm bg-[#fff1f5]'>payment Pending</h5>
                        </div>
                        <p className='font-medium md:text-sm text-xs'>{'December 8, 2024 at 9:59pm from cart orders'}</p>
                    </div>
                    <div className="profile-image hidden lg:fixed lg:block md:right-5 w-10 h-10 md:w-12 md:h-12 bg-black rounded-full">

                    </div>
                    
                </div>
                <div className="lg:w-[71%] lg:max-w-[72%] h-full block lg:flex justify-between items-start gap-x-5 space-y-2 ">
                    <div className="w-full space-y-3">
                        <OrderInfo/>
                        <OrderSumry/>
                    </div>
                    <div className='lg:w-[20%] w-full lg:!max-w-[20%] lg:!h-5/6 lg:max-h-[83%] lg:fixed right-4 overflow-y-auto z-40'>
                        <OrderSide/>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default OrderIndex