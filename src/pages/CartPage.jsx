import React, { useContext, useEffect, useState } from 'react'
import { CartContextProvider } from '../context/CartContext';
import Navbar from '../components/Navbar'
import CartItem from '../components/Cart/CartItem'

const CartPage = () => {
    const {cart, sum, total, setSum} = useContext(CartContextProvider);

    // useEffect(()=>{
    //     setSum(total.reduce((a, b) => a + b, 0))
    // }, [total])


    console.log(cart)
    

  return (
    <div className=''>
        <Navbar/>
        <div className='md:w-5/6 w-[90%] mx-auto mt-5 md:mt-7 h-full mb-20'>
            <div className='w-full'>
                {cart.map((e, index)=>(
                    <div key={index}>
                        <CartItem price={e.prices[0].unit_amount} id={e.id} info={e.description} count={e.count} name={e.name} color={e.color} image={e.images[0]}/>
                    </div>
                ))}
            </div>
            

        </div>
        <div className="cart-footer flex items-center w-full fixed bottom-0 h-16 bg-[#fff1f5] shadow-[0_-4px_7px_-1px_rgba(0,0,0,0.1)]">
            <div className='md:w-5/6 w-[90%] mx-auto flex items-center justify-between z-10'>
                <div className='flex items-center gap-x-1'>
                    <input type="checkbox" 
                        className='accent-[#ff00ff] w-4 h-4 md:h-5 md:w-5 !outline-none border !border-[#ff00ff]'
                        name="cart-select" id="cart-select" 
                    />
                    <h4 className='font-bold md:text-xl text-lg'>ALL </h4>
                </div>

                <div>
                    <h4 className='md:text-3xl font-bold text-xl'>USD {total}</h4>
                </div>

                <button className='md:text-lg text-sm uppercase text-white tracking-wide font-bold px-3 py-1 rounded-2xl bg-[#ff00ff]'>Make Payment <span>{`{${cart.length}}`}</span></button>

            </div>

        </div>
    </div>
  )
}

export default CartPage