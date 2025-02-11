import React, { useContext, useEffect, useState } from 'react'
import { CartContextProvider } from '../context/CartContext';
import Navbar from '../components/Navbar'
import CartItem from '../components/Cart/CartItem'

const CartPage = () => {
    const {cart} = useContext(CartContextProvider);
    const [pay, setPay] = useState(false);

    const payOrder = () => {
        const payPend = {"pay":"pay"}
        fetch('https://wittynailtip.com/backend/pend-order.php', {
            credentials: 'include',
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payPend)
        })
        .then(response => response.json())
        .then(data => {setPay(true)})
        .catch(error => console.error('Error in pend order:', error));
    }
    
    
    const total = cart?.reduce((sum, item) => {
        const unitPrice = item.price?.unit_amount|| 0;
        return sum + (unitPrice * item.quantity);
    }, 0).toFixed(2);


    useEffect(() => {
        if(pay){
            fetch('https://wittynailtip.com/backend/pay-api.php', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => console(data.data))
            .catch(error => console.error('Error in payment:', error));
        }
    }, [pay]);

    const emptyCart = () =>{
        fetch('https://wittynailtip.com/backend/empty-cart.php', {
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {console.log(data); window.location.reload()})
        .catch(error => console.error('Error clearing cart:', error));
    }
    

  return (
    <div className=''>
        <Navbar/>
        <div className='md:w-5/6 w-[90%] mx-auto mt-5 md:mt-7 h-full mb-20'>
            <div className='w-full'>
                {cart?.map((e, index)=>(
                    <div key={index}>
                        <CartItem price={e.price?.unit_amount} id={e.product_id} info={e.description} count={e.quantity} name={e.name} color={e.color} image={e.images[0]}/>
                    </div>
                ))}
            </div>
            

        </div>
        <div className="cart-footer flex items-center w-full fixed bottom-0 h-16 bg-[#fff1f5] shadow-[0_-4px_7px_-1px_rgba(0,0,0,0.1)]">
            <div className='md:w-5/6 w-[95%] mx-auto flex items-center justify-between z-10 py-2'>
                <div className={`${cart?.length >0 && 'flex' } hidden md:text-lg text-sm font-semibold items-center gap-x-1 `}>
                    {/* <input type="checkbox" 
                        className='accent-[#ff00ff] w-4 h-4 md:h-5 md:w-5 !outline-none border !border-[#ff00ff]'
                        name="cart-select" id="cart-select" 
                    />
                    <h4 className='font-bold md:text-xl text-lg'>ALL </h4> */}
                    <button className='bg-red-500 flex justify-center items-center rounded-2xl cursor-pointer px-3 py-1' onClick={()=>emptyCart()}>Empty cart</button>
                </div>

                <div>
                    <h4 className='md:text-3xl font-bold text-xl'>USD {total}</h4>
                </div>

                <button onClick={()=>payOrder()} className='md:text-lg text-sm uppercase cursor-pointer text-white tracking-wide font-bold px-3 py-1 rounded-2xl bg-[#ff00ff]'>Make Payment <span>{`{${cart?.length}}`}</span></button>

            </div>

        </div>
    </div>
  )
}

export default CartPage