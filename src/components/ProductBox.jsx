import React, { useContext, useState } from 'react'
import { FaRegHeart, FaHeart, FaRegStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {CartContextProvider} from '../context/CartContext';

const ProductBox = ({ image, id, name, price, alt, info, item}) => {
    const [like, setLike] = useState(false)
    const {addtoCart} = useContext(CartContextProvider)
    
    

  return (
    <div className='w-full shadow-md shadow-gray-200'>
        <div className="image relative bg-[#fff1f5]">
            <Link to={`/details/${id}`}>
                <img src={image} alt={alt} className='w-[10em] md:w-full md:object-cover md:h-[22em] max-h-[22em] flex justify-center items-center'/>
            </Link>
            <div className='bg-[#ff00ff] p-2 text-sm md:text-base absolute top-3 right-3  w-fit rounded-full' onClick={()=>{setLike(!like)}}>
                {like? <FaHeart  className="text-red-700"/>
                :
                <FaRegHeart color="#fff"/>
                }
            </div>
        </div>
        <div className="pd-info flex items-start justify-between font-medium py-3 pb-5 px-2 md:mt-0">
            <div className='flex flex-col gap-y-1'>
                <h4 className='text-base md:text-lg tracking-tight md:tracking-normal font-bold uppercase'>{name}</h4>
                <p className='text-xs md:text-base'>{info}</p>
                <div className='ratings flex items-center gap-x-2 pt-1'>
                    <div className='flex cursor-pointer gap-x-1 text-[#ff00ff] text-xs md:text-base'>{[1,2,3,4,5].map(()=>(<FaRegStar />))}</div>
                    <h6 className='text-xs'>(In stock)</h6>
                </div>
                
                <button className='flex px-2 mt-2 w-fit rounded-2xl text-xs border border-[#ff00ff7e]' onClick={()=>addtoCart(item)}>Add to Cart</button>
            </div>
            <div className='font-bold'>
                <h4 className='text-base md:text-xl'>$ {price}</h4>

            </div>
        </div>

    </div>
  )
}

export default ProductBox