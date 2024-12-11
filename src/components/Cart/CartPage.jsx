import React, { useContext } from 'react'
import { CartContextProvider } from '../../context/CartContext';
import Navbar from '../Navbar'
import CartItem from './CartItem'

const CartPage = () => {
    const {cart, total} = useContext(CartContextProvider);
    const sum = total.reduce((a, b) => a + b, 0)

  return (
    <div className=''>
        <Navbar/>
        <div className='md:w-5/6 w-[90%] mx-auto mt-5 md:mt-7 h-full mb-20'>
            <div className='w-full'>
                {cart.map((e, index)=>(
                    <div key={index}>
                        <CartItem price={e.price} id={e.id} info={e.info} count={e.count} name={e.name} color={e.color} image={e.image}/>
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
                    <h4 className='md:text-3xl font-bold text-xl'>USD {sum}</h4>
                </div>

                <button className='md:text-lg text-sm uppercase text-white tracking-wide font-bold px-3 py-1 rounded-2xl bg-[#ff00ff]'>Make Payment <span>{`{${cart.length}}`}</span></button>

            </div>

        </div>
    </div>
  )
}

export default CartPage