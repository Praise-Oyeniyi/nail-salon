import React, { useState } from 'react'
import { FaRegHeart, FaHeart, FaRegStar } from "react-icons/fa";

const ProductBox = ({image, alt, name, price, info}) => {
    const [like, setLike] = useState(false)

  return (
    <div className='w-full'>
        <div className="image relative bg-[#fff1f5]">
            <img src={image} alt={alt} className='w-full h-[22em] max-h-[22em] flex justify-center items-center'/>
            <div className='bg-[#ff00ff] p-2 absolute top-3 right-3  w-fit rounded-full' onClick={()=>{setLike(!like)}}>
                {like? <FaHeart size={24} className="text-red-700"/>
                :
                <FaRegHeart size={24} color="#fff"/>
                }
            </div>
        </div>
        <div className="pd-info flex items-start justify-between font-medium">
            <div className='flex flex-col gap-y-1'>
                <h4 className='text-lg font-bold uppercase'>{name}</h4>
                <p>{info}</p>
                <div className='ratings flex items-center gap-x-2'>
                    <div className='flex cursor-pointer gap-x-1 text-[#ff00ff]'>{[1,2,3,4,5].map(()=>(<FaRegStar />))}</div>
                    <h6 className='text-xs'>(In stock)</h6>
                </div>
                
                <button className='flex px-2 mt-2 w-fit rounded-2xl text-xs border border-[#ff00ff7e]'>Add to Cart</button>
            </div>
            <div className='font-bold'>
                <h4 className='text-xl'>${price}</h4>

            </div>
        </div>

    </div>
  )
}

export default ProductBox