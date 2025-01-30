import React, { useContext, useState } from 'react'
import { CartContextProvider } from '../../context/CartContext';
import { ProductContextProvider } from '../../context/Product';
import { FaRegHeart, FaHeart } from "react-icons/fa";


const SavedItem = ({image, name, price, info, color, item}) => {
    const [like, setLike] = useState(true)
    const {data} = useContext(ProductContextProvider)
    const {addtoCart, removedItem, total, setSum, setTotal} = useContext(CartContextProvider);
  
    return (
        <div className='w-full flex items-center gap-x-3 border-b border-b-gray-300'>
                        
        <div className='md:py-3 py-2'>
            <div className='flex items-center gap-x-3 md:gap-x-5'>
            <div className="shadow-lg w-[10em] bg-[#fff1f5] shadow-gray-300 rounded-xl overflow-hidden">
                <img src={image} alt="" className='w-full'/>
            </div>

            <div className='md:space-y-1'>
                <h4 className='md:text-xl text-lg font-bold'>{name}</h4>
                <p className='md:text-base text-sm text-gray-700 leading-tight md:leading-normal tracking-tight lg:tracking-normal'>{info}</p>
                <p className='cursor-pointer my-1 md:my-0 color w-fit text-sm  px-2 rounded-xl shadow-sm shadow-gray-400'>{color}</p>
                <div className='flex gap-x-3 items-center'>
                <h5 className='md:text-xl text-lg font-bold'>${price}</h5>
                <div className='font-bold text-base bg-[#fff1f5] flex rounded-2xl items-center gap-x-5 px-3 py-1'>
                    <button onClick={()=>{}}>{like? <FaHeart  className="text-red-700"/>:<FaRegHeart color="#fff"/>}</button>
                    <button onClick={()=>addtoCart(item)}>Add To Cart</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default SavedItem