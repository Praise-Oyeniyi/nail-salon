import React from 'react'
import Sidebar from '../Sidebar'
import OrderInfo from './OrderInfo'
import OrderSide from './OrderSide'
import OrderSumry from './OrderSumry'


const OrderIndex = () => {
  return (
    <div className='w-full flex justify-start items-start overflow-x-hidden '>
        <Sidebar/>
        <div className='w-full py-7 px-5 ml-[25%]'>
            <div className='w-full space-y-3'>
                <div className="order-head flex justify-between items-center">
                    <div>
                        <div className="id flex items-center gap-x-3 font-bold">
                            <h3 className='text-2xl'>Order ID:55432176708</h3>
                            <h5 className='uppercase text-[#ff00ff] tracking-wider px-1  text-sm bg-[#fff1f5]'>payment Pending</h5>
                        </div>
                        <p className='font-medium text-sm'>{'December 8, 2024 at 9:59pm from cart orders'}</p>
                    </div>
                    <div className="profile-image fixed right-5 w-14 h-14 bg-black rounded-full">

                    </div>
                    
                </div>
                <div className="w-[71%] max-w-[72%] flex justify-between items-start gap-x-5 space-y-2 ">
                    <div className="w-full space-y-3">
                        <OrderInfo/>
                        <OrderSumry/>
                    </div>
                    <div className='w-[20%] !max-w-[20%] !h-5/6 fixed right-4'>
                        <OrderSide/>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default OrderIndex