import React from 'react'

// #ffb7ce #cccccc #fff1f5 #ff00ff
const OrderSumry = ({ordered, user}) => {
  return (
    <div className='space-y-3'>
        <div className='border border-gray-200 rounded-md text-summary'>
            <div className='py-3 space-y-2'>
                <div className='md:px-5 px-1'>
                    <h4 className='font-bold md:text-xl text-base'>Order Summary</h4>
                    <h5 className="state ml-2 font-medium w-fit text-[#ff00ff] md:tracking-wider px-1 text-xs md:text-sm bg-[#fff1f5] capitalize">{ordered.tracking}</h5>
                    <p className='font-medium md:text-sm text-xs'>Monitor your goods on our page</p> 
                </div>
                
                <div className="order-summary px-1 md:px-5 space-y-1 font-medium text-sm md:text-base">
                    <div className="w-full">
                        <div className='flex w-full justify-between items-center'>
                            <h6 className='w-3/6'>Subtotal</h6>
                            <div className='w-3/6 flex justify-between items-center'>
                                <h6>{ordered.quantity} item</h6>
                                <h6>${ordered?.initial_price?.unit_amount}</h6>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className='flex w-full justify-between items-center'>
                            <h6 className='w-3/6'>Discount</h6>
                            <div className='w-3/6 flex justify-between items-center'>
                                <h6>New Customer</h6>
                                <h6>${'-20'}</h6>
                            </div>
                        </div>
                    </div>

                    <div className="">
                        <div className='flex w-full justify-between items-center'>
                            <h6 className='w-3/6'>Shipping</h6>
                            <div className='w-3/6 flex justify-between items-center'>
                                <h6>{'Free Shipping (0.0)'}</h6>
                                <h6>${'0.0'}</h6>
                            </div>
                        </div>
                    </div>

                    <div className='flex font-bold w-full justify-between items-center'>
                        <h6 className='w-3/6'>Total</h6>
                        <div className='w-auto'>
                            <h6>${ordered.final_price}</h6>
                        </div>
                    </div>

                </div>
                <div className='border-t text-sm border-t-gray-200 pt-3 px-1 md:px-5 font-medium'>
                    {<div className='flex w-full justify-between items-center'>
                        <h6 className='w-3/6'>Paid by customer</h6>
                        <div className='w-auto'>
                            <h6>${ordered?.initial_price?.unit_amount}</h6>
                        </div>
                    </div>}

                    {/* <div className='flex w-full justify-between items-center'>
                        <h6 className='md:w-3/6'>Payment due when invoice is sent</h6>
                        <div className='w-auto'>
                            <h6 className='text-[#ff00ff] cursor-pointer'>Edit</h6>
                        </div>
                    </div> */}
                </div>
                    
            </div>

            {!ordered.tracking === "paid" &&
                <div className='md:h-10 font-medium md:text-sm text-xs flex justify-between items-center w-full md:px-5 px-2 bg-[#ffb7ce46] '>
                    <p className='w-3/6 md:w-auto'>Review your order at glance in our order summary page</p>
                    <div className='flex items-center md:gap-x-2 gap-x-1 text-xs my-2 md:my-0'>
                        <button className='md:px-2 border md:border-2 border-gray-700 rounded-xl py-1 '>Send Invoice</button>
                        <button className='md:px-2 bg-[#ff00ff] rounded-xl py-1 text-gray-100 '>Confirm Payment</button>
                    </div>
                </div>
            }
        </div>

        <div className="timeline border-2 border-gray-300 rounded-md md:px-5 px-3 md:py-3 py-2">
            <div className='text-sm'>
                <h4 className='font-bold md:text-xl text-base'>Timeline</h4>
                <p className='font-medium md:text-sm text-xs'>Review your order at a glance in our summary page</p>
                <h6 className='name border border-gray-300 rounded-md px-2 w-fit my-1 font-bold text-sm md:text-base'>{user?.full_name}</h6>

                <textarea name="comment" id="comment" cols="30" rows="5" 
                    className='w-5/6 md:w-3/6 bg-transparent rounded-lg p-3 outline-none border border-gray-300' 
                    placeholder='Leave a comment' ></textarea>
            </div>
        </div>
        
    </div>
  )
}

export default OrderSumry