import React from 'react'

const OrderSide = () => {
  return (
    <div className='w-full text-sm font-medium space-y-2 overflow-y-auto h-full'>
        <div className='space-y-1 border border-gray-300 rounded-lg px-3 py-1'>
            <h5 className='font-bold text-base'>Notes</h5>
            <textarea
                className='outline-none bg-transparent border-none' name="note" id="note" cols="30" rows="3" placeholder='Drop a note'>

            </textarea>
        </div>

        <div className='space-y-1 border border-gray-300 rounded-lg px-3 py-1'>
            <h5 className='font-bold text-base'>Customer</h5>
            <div className='space-y-1'>
                <div className="flex items-center gap-x-2">
                    <div className="icon">Icon</div>
                    <h6>Timmy Witty</h6>
                </div>

                <div className="flex items-center gap-x-2">
                    <div className="icon">Icon</div>
                    <h6>Timmy Witty</h6>
                </div>

                <p>Customer is tax-exempt</p>
            </div>


        </div>

        <div className='space-y-1 text-xs border border-gray-300 rounded-lg px-3 py-1'>
            <h5 className='font-bold text-base'>Contact Information</h5>
            <div className='space-y-1'>
                <div className="flex items-center gap-x-2">
                    <div className="icon">Icon</div>
                    <h6>timmywitty44@gmail.com</h6>
                </div>

                <div className="flex items-center gap-x-2">
                    <h6 className="font-bold">Phone No:</h6>
                    <h6>+1 (95) 456 789 123</h6>
                </div>
            </div>
        </div>

        <div className='space-y-1 border border-gray-300 rounded-lg px-3 py-1'>
            <h5 className='font-bold text-base'>Shipping Address</h5>
            <div className='space-y-1'>
                <div className="flex items-center gap-x-2">
                    <div className="icon">Icon</div>
                    <h6>Timmy Witty</h6>
                </div>

                <div className="">
                    <p className='w-4/6'>1345 Subway extension Ikeja park CA 945086 United States</p>
                    <h6 className='font-bold text-[#ff00ff]'>
                        <span>
                            icon
                        </span>
                        View Map
                    </h6>
                </div>
            </div>
        </div>

        <div className='space-y-1 border border-gray-300 rounded-lg px-3 py-1'>
            <h5 className='font-bold text-base'>Billing Address</h5>
            <p>Same as shipping address</p>
        </div>

        <div className='space-y-1 border border-gray-300 rounded-lg px-3 py-1'>
            <h5 className='font-bold text-base'>Conversion Summary</h5>
            <div className='space-y-1'>
                <p className='w-4/6'>No Converstaion details for this order</p>
                <h6 className='font-bold text-[#ff00ff]'>Learn More</h6>
            </div>
        </div>

    </div>
  )
}

export default OrderSide