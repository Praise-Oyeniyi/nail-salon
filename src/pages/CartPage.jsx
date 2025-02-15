import React, { useContext, useEffect, useState } from 'react'
import { CartContextProvider } from '../context/CartContext';
import Navbar from '../components/Navbar'
import CartItem from '../components/Cart/CartItem'
import { Link } from 'react-router-dom';
import { fetchApi, sendApi } from '../apis/Index';

const CartPage = () => {
    const {cart} = useContext(CartContextProvider);
    const [pay, setPay] = useState(false);

    const payOrder = async () => {
        const payPend = {"pay":"pay"}
        const payApi = 'https://wittynailtip.com/backend/add-to-cart.php'
        try {
            const result = await sendApi(payPend, payApi)
            if (result.data.success){
                setPay(true)
            } else {
                console.log(result.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    
    const total = cart?.reduce((sum, item) => {
        const unitPrice = item.price?.unit_amount|| 0;
        return sum + (unitPrice * item.quantity);
    }, 0).toFixed(2);


    useEffect(() => {
        const stripePay = 'https://wittynailtip.com/backend/pay-api.php';
        if(pay){
            async function fetchData(){
                try {
                    const result = await fetchApi(stripePay)
                    if (result.data.success){
                        window.location.href = result.data.url
                    } else {
                        console.log(result.data.message);
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fetchData();
        }
    }, [pay]);

    const emptyCart = async () =>{
        const emptyCart = 'https://wittynailtip.com/backend/empty-cart.php';
        try {
            const result = await fetchApi(emptyCart)
            if (result.data.success){
                window.location.reload()
            } else {
                console.log(result.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div className='font-jost'>
        <Navbar/>
        <div className='md:w-5/6 w-[90%] mx-auto mt-5 md:mt-7 h-full mb-20'>
            <div className='w-full'>
                {cart?.map((e, index)=>(
                    <div key={index}>
                        <CartItem price={e.price?.unit_amount} cartId={e.cart_id} id={e.product_id} info={e.description} count={e.quantity} name={e.name} color={e.color} image={e.images[0]}/>
                    </div>
                ))}
            </div>
            

        </div>
        <div className="cart-footer flex items-center w-full fixed bottom-0 h-16 bg-[#fff1f5] shadow-[0_-4px_7px_-1px_rgba(0,0,0,0.1)]">
            {cart?.length > 0?
                <div className='md:w-5/6 w-[95%] mx-auto flex items-center justify-between z-10 py-2'>
                    <div className={`${cart?.length >0 && '!flex' } hidden md:text-lg text-sm font-semibold items-center gap-x-1 `}>
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

                    <button 
                        onClick={()=>payOrder()} 
                        className='md:text-lg text-sm uppercase cursor-pointer text-white tracking-wide font-bold px-3 py-1 rounded-2xl bg-[#ff00ff]'>
                            Make Payment 
                            <span>{`{${cart?.length}}`}</span>
                    </button>
                </div>
                :!cart?
                (
                    <h3 className='md:w-5/6 w-[90%] pl-[10%] flex justify-start items-center gap-x-2 italic'>You have no item in cart. Please <Link to='/'><span className='text-[#ff00ff] cursor-pointer font-semibold'>login</span></Link> and check again!</h3>
                )
                :
                    <div className='md:w-5/6 w-[90%] mx-auto flex items-center justify-between z-10 italic'>
                        <h3>Cart is empty. Start Shopping NOW!</h3>
                    </div>
            }

        </div>
    </div>
  )
}

export default CartPage