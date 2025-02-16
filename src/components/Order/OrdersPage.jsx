import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { sendApi } from '../../apis/Index';
import Navbar from '../../components/Navbar'
import OrderItem from './OrderItem';
import OrderSkeleton from './OrderSkeleton';

const OrdersPage = () => {
    const [order, setOrder] = useState([]);
    const [orderError, setOrderError] = useState(null)

    useEffect(() => {
        const moApi = 'https://wittynailtip.com/backend/my-orders.php'
        async function fetchData(){
            try {
                const result = await sendApi(undefined,moApi)
                if (result.data.success){
                    setOrder(result.data.orders)

                } else {
                    setOrderError(result.data.message)
                }
            } catch (error) {
                setOrderError(error)
            }
        }
        fetchData()
    }, []);

    useEffect(() => {
        if (orderError) {
            toast.error(orderError);
        }
    }, [orderError]);


  return (
    <div className='font-jost'>
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
                            <h3 className='flex justify-center items-center gap-x-2 italic'>
                                You have no orders. Add
                                 <Link to='/'>
                                    <span className='text-[#ff00ff] cursor-pointer font-semibold'>
                                        Products
                                    </span>
                                </Link> and track orders!
                            </h3>
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