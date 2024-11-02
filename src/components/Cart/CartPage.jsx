import React from 'react'
import Navbar from '../Navbar'
import CartItem from './CartItem'

const CartPage = () => {
  return (
    <div className=''>
        <Navbar/>
        <div className='w-5/6 mx-auto mt-7 h-full mb-20'>
            <div className='w-full'>
                {[1,2,3,4,5].map(()=>(
                    <div className='w-full flex items-center gap-x-3 border-b border-b-gray-300'>
                        <input type="checkbox" 
                            className='accent-[#ff00ff] h-5 w-5 !outline-none border !border-[#ff00ff]'
                            name="cart-select" id="cart-select" 
                        />
                        <CartItem/>
                    </div>
                ))}
            </div>
            

        </div>
        <div className="cart-footer flex items-center w-full fixed bottom-0 h-16 bg-[#fff1f5] shadow-[0_-4px_7px_-1px_rgba(0,0,0,0.1)]">
            <div className='w-5/6 mx-auto flex items-center justify-between z-20'>
                <div className='flex items-center gap-x-1'>
                    <input type="checkbox" 
                        className='accent-[#ff00ff] h-5 w-5 !outline-none border !border-[#ff00ff]'
                        name="cart-select" id="cart-select" 
                    />
                    <h4 className='font-bold text-xl'>ALL </h4>
                </div>

                <div>
                    <h4 className='text-3xl font-bold'>USD {'150'}</h4>
                </div>

                <button className='text-lg uppercase text-white tracking-wide font-bold px-3 py-1 rounded-2xl bg-[#ff00ff]'>Make Payment<span>{'{5}'}</span></button>

            </div>

        </div>
    </div>
  )
}

export default CartPage