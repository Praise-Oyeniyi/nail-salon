import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import OrderInfo from '../components/Order/OrderInfo'
import OrderSide from '../components/Order/OrderSide'
import OrderSumry from '../components/Order/OrderSumry'
import { useParams } from 'react-router-dom'
import { fetchApi, sendApi } from '../apis/Index'


const OrderIndex = () => {
    const { orderId} = useParams();
    const [side, setSide] = useState(false);
    const [orderItem, setOrderItem] = useState([])
    const [user, setUser] = useState(null);

    useEffect(() => {
        const profileApi = 'https://wittynailtip.com/backend/profile.php';
        async function fetchData(){
            try {
                const result = await fetchApi(profileApi)
                if (result.data.success){
                    setUser(result.data.data)
                } else {
                    console.log(result.data.message);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
        }, []);


    useEffect(() => {
        const order = {"order_id":orderId}
        const orderApi = 'https://wittynailtip.com/backend/order-info.php'
        async function fetchData(){
            try {
                const result = await sendApi(order, orderApi)
                if (result.data.success){
                    setOrderItem(result.data.order)
                } else {
                    // please login to add to cart
                    console.log(result.data.message);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
      }, []);

  return (
    <div className='w-full md:flex justify-start items-start overflow-x-hidden font-jost'>
        <div className='px-3 h-14 flex justify-between items-center lg:hidden'>
            <div className='cursor-pointer p-2' onClick={()=>setSide(!side)}>
                <div className='w-5 h-1 bg-black mb-[2px]'></div>
                <div className='w-5 h-1 bg-[#ff00ff] ml-1'></div>
            </div>

            <div className="profile-image w-10 h-10 bg-black rounded-full">

            </div>
        </div>
        <div className='hidden lg:block'>    
            <Sidebar open={true}/>
        </div>
        <div className=''>
            <Sidebar open={side}/>
        </div>
        <div className='w-full md:py-7 py-3 px-5 mx-auto lg:ml-[25%]'>
            <div className='w-full space-y-3'>
                <div className="order-head flex justify-between items-center relative">
                    <div className='relative'>
                        <div className="id flex items-center gap-x-1 md:gap-x-3 font-bold">
                            <h3 className='md:text-2xl text-lg'>Order ID: {orderItem.order_id}</h3>
                            <h5 className='uppercase text-[#ff00ff] md:tracking-wider px-1 text-xs md:text-sm bg-[#fff1f5]'>{orderItem.tracking}</h5>
                        </div>
                        <p className='font-medium md:text-sm text-xs'>{orderItem.order_date}</p>
                    </div>
                    <div className="profile-image hidden lg:fixed lg:block md:right-5 w-10 h-10 md:w-12 md:h-12 bg-black rounded-full">

                    </div>
                    
                </div>
                <div className="lg:w-[71%] lg:max-w-[72%] h-full block lg:flex justify-between items-start gap-x-5 space-y-2 ">
                    <div className="w-full space-y-3">
                        <OrderInfo  ordered={orderItem}/>
                        <OrderSumry ordered={orderItem} user={user}/>
                    </div>
                    <div className='lg:w-[20%] w-full lg:!max-w-[20%] lg:!h-5/6 lg:max-h-[83%] lg:fixed right-4 overflow-y-auto z-40'>
                        <OrderSide user={user}/>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default OrderIndex