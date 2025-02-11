import React, { useContext, useEffect, useState } from 'react'
import { FaRegHeart, FaHeart, FaRegStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {CartContextProvider} from '../context/CartContext';

const ProductBox = ({ image, id, name, price, alt, info, item}) => {
    const [like, setLike] = useState(false)
    const {addtoCart, setSaved, saved, addToSave} = useContext(CartContextProvider)
    

    const handleLikeAndSave = (id) => {
        const newLikeState = !like;
        setLike(newLikeState);
    
        addToSave(id, newLikeState)
    };
    

  return (
    <div className='w-full shadow-md shadow-gray-200' >
        <div className="image relative bg-[#fff1f5] w-fit">
            <Link to={`/details/${id}`}>
                <img src={image} alt={alt} className='min-w-full min-h-[12em] max-h-[12em] object-cover md:min-h-[22em] md:max-h-[22em] flex justify-center items-center'/>
            </Link>
            <div className='bg-[#ff00ff] p-2 text-sm md:text-base absolute top-3 right-3 w-fit rounded-full' onClick={() => handleLikeAndSave(id)}>
                {like? <FaHeart  className="text-red-700"/>
                :
                <FaRegHeart color="#fff"/>
                }
            </div>
        </div>
        <div className="pd-info font-medium py-3 pb-5 px-2 md:mt-0">
            <div className='flex flex-col gap-y-1'>
                <div className='flex items-start justify-between gap-x-4'>
                    <h4 className='text-base md:text-lg tracking-tight md:tracking-normal font-bold uppercase truncate'>{name}</h4>
                    <h4 className='text-base md:text-xl flex-shrink-0'>$ {price}</h4>
                </div>
                
                <p className='text-xs md:text-base truncate font-normal'>{info}</p>
                <div className='ratings flex items-center gap-x-2 pt-1'>
                    <div className='flex cursor-pointer gap-x-1 text-[#ff00ff] text-xs md:text-base truncate'>{[1,2,3,4,5].map((e,index)=>(<FaRegStar key={index}/>))}</div>
                    <h6 className='text-xs font-normal flex-shrink-0'>(In stock)</h6>
                </div>
                
                <button className='flex px-2 mt-2 w-fit rounded-2xl text-xs border border-[#ff00ff7e]' onClick={()=>addtoCart(item)}>Add to Cart</button>
            </div>
        </div>

    </div>
  )
}

export default ProductBox