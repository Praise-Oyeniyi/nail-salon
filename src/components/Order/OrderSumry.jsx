import React from 'react'

// #ffb7ce #cccccc #fff1f5 #ff00ff
const OrderSumry = () => {
  return (
    <div className='space-y-3'>
        <div className='border border-gray-200 rounded-md text-summary'>
            <div className='py-3 space-y-2'>
                <div className='px-5'>
                    <h4 className='font-bold text-xl'>Order Summary</h4>
                    <h5 className="state ml-2 font-medium w-fit text-[#ff00ff] tracking-wider px-1 text-sm bg-[#fff1f5]">Payment Pending</h5>
                    <p className='text-sm font-medium'>Monitor your goods on our page</p> 
                </div>
                
                <div className="order-summary px-5 space-y-1 font-medium">
                    <div className="w-full">
                        <div className='flex w-full justify-between items-center'>
                            <h6 className='w-3/6'>Subtotal</h6>
                            <div className='w-3/6 flex justify-between items-center'>
                                <h6>{'10'} items</h6>
                                <h6>${'300'}</h6>
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
                            <h6>${'280'}</h6>
                        </div>
                    </div>

                </div>
                <div className='border-t text-sm border-t-gray-200 pt-3 px-5 font-medium'>
                    <div className='flex w-full justify-between items-center'>
                        <h6 className='w-3/6'>Paid by customer</h6>
                        <div className='w-auto'>
                            <h6>${'0.0'}</h6>
                        </div>
                    </div>

                    <div className='flex w-full justify-between items-center'>
                        <h6 className='w-3/6'>Payment due when invoice is sent</h6>
                        <div className='w-auto'>
                            <h6 className='text-[#ff00ff] cursor-pointer'>Edit</h6>
                        </div>
                    </div>
                </div>
                    
            </div>

            <div className='h-10 font-medium text-sm flex justify-between items-center w-full px-5 bg-[#ffb7ce46] '>
                <p>Review your order at glance in our order summary page</p>
                <div className='flex gap-x-2 text-xs'>
                    <button className='px-2 border-2 border-gray-700 rounded-xl py-1 flex w-fit justify-center items-center'>Send Invoice</button>
                    <button className='px-2 bg-[#ff00ff] rounded-xl py-1 text-gray-100 flex w-fit justify-center items-center'>Confirm Payment</button>
                </div>
            </div>
        </div>

        <div className="timeline border-2 border-gray-300 rounded-md px-5 py-3">
            <div className='text-sm'>
                <h4 className='font-bold text-xl'>Timeline</h4>
                <p className='text-sm font-medium'>Review your order at a glance in our summary page</p>
                <h6 className='name border border-gray-300 rounded-md px-2 w-fit my-1 font-bold'>Timmy Witty</h6>

                <textarea name="comment" id="comment" cols="30" rows="5" 
                    className='w-3/6 bg-transparent rounded-lg p-3 outline-none border border-gray-300' 
                    placeholder='Leave a comment' ></textarea>
            </div>
        </div>
        
    </div>
  )
}

export default OrderSumry