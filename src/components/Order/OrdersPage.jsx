import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import OrderItem from './OrderItem';
import OrderSkeleton from './OrderSkeleton';

const OrdersPage = () => {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        fetch('https://wittynailtip.com/backend/my-orders.php', {
            credentials: 'include',
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {setOrder(data.orders); console.log(data.orders)})
        .catch(error => console.error('Error fetching Product details:', error));
    }, []);

    console.log(order)

  return (
    <div className=''>
        <Navbar/>
        <div className='md:w-5/6 w-[90%] mx-auto mt-5 md:mt-7 h-full mb-20'>
            <div className='w-full space-y-3'>
                {order?.length <1 ? Array(5).fill(0).map((_, index) => (
                    <OrderSkeleton key={index}/>
                ))
                :
                order === undefined? 
                (
                    <div className="cart-footer flex items-center min-w-full fixed left-0 bottom-0 h-16 bg-[#fff1f5] shadow-[0_-4px_7px_-1px_rgba(0,0,0,0.1)]">
                        <div className='md:w-5/6 w-[90%] mx-auto flex items-center justify-between z-10'>
                            <h3 className='flex justify-center items-center gap-x-2 italic'>You have no orders. Please <Link to='/'><span className='text-[#ff00ff] cursor-pointer font-semibold'>login</span></Link> and check again!</h3>
                        </div>
                    </div>
                )
                :
                order?.map((e, index)=>(
                    <Link to={`/order/${e.order_id}`}>
                        <div key={index} className="mb-3">
                            <OrderItem e={e}/>
                        </div>
                    </Link>
                ))}
            </div>
            

        </div>
        
    </div>
  )
}

export default OrdersPage