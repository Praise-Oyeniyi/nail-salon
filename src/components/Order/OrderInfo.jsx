import React from 'react'


// #ffb7ce #cccccc #fff1f5 #ff00ff
const OrderInfo = () => {
  return (
    <div className='w-full'>
        <div className='w-full border border-gray-200 rounded-md'>
            <div className='w-full  px-5 py-3'>
                <h4 className='font-bold text-xl'>Order Item</h4>
                <h5 className="state  ml-2 font-medium w-fit text-[#ff00ff] tracking-wider px-1 text-sm bg-[#fff1f5]">Unfufilled</h5>
                <p className='text-sm font-medium'>Make payment for your goods and get your items</p>
                
                <div className="order-item w-full my-3">
                    <div className="order-item-in w-full ">
                        <div className='flex w-full justify-between'>
                            <div className="left flex gap-x-2">
                                <div className="image bg-black h-14 w-14"></div>
                                <div className='text-sm'>
                                    <h6 className='item text-[#cccccc]'>Nails</h6>
                                    <h4 className='Item-name font-bold'>Cortex Nail</h4>
                                    <div className="colors gap-x-1 text-xs flex font-medium">
                                        <button className='border border-[#cccccc] px-2 max-w-fit flex justify-center items-center'>Glossy</button>
                                        <button className='border border-[#cccccc] px-2 max-w-fit flex justify-center items-center'>Black</button>
                                        <div className="color-picked bg-black w-5 h-inherit">

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="right flex items-center justify-center gap-x-3 text-sm">
                                <button className='amount border border-gray-700 w-20 rounded-md text-center font-medium'>{'10'} piece</button>
                                <p className='cost border border-gray-700 w-16 rounded-md text-center font-medium'>$300</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-10 flex items-center bg-[#ffb7ce]">
                <div className='w-5/6 mx-auto flex font-medium text-sm justify-between items-center py-1'>
                    <p className='text-gray-500'>Effectively manage your order in our order page</p>
                    <button className='rounded-xl px-2 py-1 text-gray-100 flex justify-center items-center bg-[#ff00ff]'>Create Shipping Label</button>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default OrderInfo