import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {FaRegStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { CartContextProvider } from '../context/CartContext';
import ProductDeetLoader from '../components/PDdetails/ProductDeetLoader';
import { sendApi } from '../apis/Index';

const ProductDeet = () => {
    const { productId} = useParams();
    const [data, setData] = useState(null);
    const {addtoCart, removedItem} = useContext(CartContextProvider);
    const [item, setItems] = useState(data?.quantity || 0)

    useEffect(() => {
        const prodApi = 'https://wittynailtip.com/backend/product-info.php'
        const prodId = {"product_id":productId};
        async function fetchData(){
            try {
                const result = await sendApi(prodId, prodApi)
                if (result.data.success){
                    setData(result.data.data)
                } else {
                    console.log(result.data.message);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);


    const addToItem = () => {
        addtoCart(data)   
        setItems(prevItem => {
            const newCount = prevItem +1 || data?.quantity;
            return newCount;
        });   
    }

    const removeItem = (itemId) => {
        console.log(itemId)
        removedItem(itemId)
        setItems(prevItem => {
            const newCount = prevItem <= 0? 0: prevItem - 1 ;
            return newCount;
        });
    }

  return (
    <div className='md:mb-14 mb-10 font-jost'>
        <Navbar/>
        { data?
            <div className='md:w-4/6 w-[90%] mx-auto mt-5 md:mt-0'>
            {/* <h6 className='text-gray-400 md:text-base text-sm font-normal  md:pl-3 pb-1 md:pb-2'>Nails/ Exclusive/ High quality/ Shop by nail type/ <span className='font-bold text-gray-900'>Cortex</span></h6> */}
            <div className='w-full mx-auto md:space-y-5 space-y-3'>
                <div className='w-full h-[20em] md:h-[30em] bg-[#fff1f5] rounded-lg shadow-xl shadow-gray-300 overflow-hidden'>
                    <img 
                        src={data?.images[0]}
                        className="w-full ml-auto md:min-w-full lg:mx-auto !h-full object-cover object-center lg:object-center" 
                        alt="full product view in product details page" 
                    />

                </div>
                


                <div>
                    <div className="priceandinfo md:flex justify-start items-start">
                        <div className="left w-full md:w-4/6 space-y-2 pb-5 border-b-2 md:border-r-2 border-r-gray-300 border-b-gray-300" >
                            <h3 className='uppercase text-xl md:text-3xl font-bold'>{data?.name}</h3>
                            <p className='font-medium text-sm md:text-base leading-tight'>
                                {data?.description}
                            </p>
                            <div className='flex cursor-pointer gap-x-1 text-[#ff00ff]'>{[1,2,3,4,5].map((_, index)=>(< FaRegStar key={index}/>))}</div>
                        </div>

                        <div className="right w-auto md:pl-5">
                            <div className='border-b-2 border-b-gray-300 pt-3 md:pt-0 pb-3'>
                                <h4 className='uppercase text-xl md:text-3xl font-bold'><span className='line-through'>${data?.price?.unit_amount + (0.2*data?.price?.unit_amount)}</span> /${data?.price?.unit_amount}</h4>
                                <p className='font-medium text-sm md:text-base leading-tight'>20% Discount Price on our products</p>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="choose-color border-b border-b-gray-300 space-y-3">
                    <h4 className='font-bold text-lg tracking-wide '>Choose color & Size</h4>
                    <div className='md:flex items-center justify-between space-y-2 md:space-y-0 gap-x-7'>
                        <div className='space-y-3'>
                            <div className='flex items-center max-w-full overflow-x-auto gap-x-3'>
                                {['black','brown','transparent'].map((e, index)=>(<button key={index} className="px-3 min-w-fit h-8 capitalize md:px-5 flex justify-center items-center rounded-xl border bg-transparent  border-[#ff00ff]">{e}</button>))}
                            </div>

                            <div className='flex items-center max-w-full overflow-x-auto gap-x-3'>
                                {['S','M','L', 'XL'].map((e, index)=>(<button key={index} className="px-3 min-w-fit h-8 md:px-5 flex justify-center items-center rounded-xl border bg-transparent  border-[#ff00ff]">{e}</button>))}
                            </div>
                        </div>
                        

                        <div className="items flex  items-center md:block gap-x-3 flex-shrink-0 pt-5 md:pt-0">
                            <div className='font-bold text-base md:text-xl bg-[#ffeef3] flex rounded-2xl items-center gap-x-8 px-5 py-2'>
                                <button onClick={()=>removeItem(productId)}>-</button>
                                <h3>{item}</h3>
                                <button onClick={()=>addToItem()}>+</button>
                            </div>
                            <p className='md:hidden font-medium text-sm md:text-base leading-tight'>Only <span className="text-[#ff00ff]">12</span> items left don't miss out!</p>
                        </div>

                        <p className='font-medium hidden md:block text-base leading-tight'>Only <span className="text-[#ff00ff]">12</span> items left don't miss out!</p>
                    </div>

                    <div className='pt-5 border-b-2 border-b-gray-300 pb-7 flex text-right font-bold w-full justify-center md:justify-end items-center gap-x-2 text-base md:text-lg'>
                        <button className='h-10 w-40 rounded-3xl text-white tracking-wide bg-[#ff00ff]'>Buy Now</button>
                        <button disabled={item<1 && true} className={`h-10 w-40 rounded-3xl text-black tracking-wide  ${item<1 ?'!bg-[#ffb7ce86]':'bg-[#ffb7ce]'}`} onClick={()=>addToItem()}>Add to cart</button>
                    </div>

                    <div className="pd-perks md:w-3/6">
                        <div className='py-3 border-b-2 border-b-gray-300'>
                            <h5 className='font-bold md:text-lg text-base leading-tight'>Free Delivery</h5>
                            <p className='text-gray-400 text-sm md:text-base font-medium underline'>Enter your postal code for delivery Availability</p>
                        </div>

                        <div className='py-3'>
                            <h5 className='font-bold md:text-lg text-base leading-tight'>Return Delivery</h5>
                            <p className='text-gray-400  text-sm md:text-base font-medium underline'>Free 30Days Delivery Returns <span className='text-gray-900 cursor-pointer'>Details</span></p>
                        </div>
                    </div>

                    {/* <div className='w-full'>
                        <div className='flex min-w-[25%] items-center justify-center gap-x-5'>
                            {[1,2,3,4].map(()=>(
                                <div className='w-full shadow-xl shadow-gray-300 rounded-lg bg-[#fff1f5]'>
                                    <img 
                                        src={PD1}
                                        className="w-full" 
                                        alt='variation in color of product'
                                    />

                                </div>
                            ))}
                        </div>
                        
                    </div> */}
                    
                    
                    
                </div>
            </div>
            
        </div>
        :
        <ProductDeetLoader/>     
    }

    </div>
  )
}

export default ProductDeet