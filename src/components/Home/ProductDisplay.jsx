import React from 'react'
import ProductBox from '../ProductBox'
import { FaAngleDown } from "react-icons/fa6";


const ProductDisplay = ({data}) => {

  return (
    <div className='mb-14 w-full'>
        <div className='w-full'>
            <div className="fiter w-full hidden md:block">
                <ul className='flex w-full items-center md:text-sm text-xs gap-x-2 md:gap-x-5 cursor-pointer'>
                    {['Nails Type','Price','Reviews','Colors','Offers','Filter all'].map((e, index)=>(
                        <li className='filter-bg px-3 rounded-2xl flex items-center gap-x-2' key={index}>{e}<span><FaAngleDown /></span></li>
                    ))}
                </ul>
            </div>

            <div className="products md:mt-10 mt-7 md:space-y-5 space-y-3 w-full">
                <h3 className='capitalize font-bold text-2xl md:text-3xl'>Nails for you!</h3>
                <div className='flex items-start w-full max-w-full mx-auto gap-x-2 md:gap-x-6 gap-y-3 md:gap-y-5 justify-start flex-wrap'>
                    {data.map((e)=>(
                        <div className='md:w-[23.5%] w-[48%]' key={e?.id}>
                            <ProductBox name={e.name}
                            id={e?.id}
                            price={e?.prices[0].unit_amount} info={e?.description} 
                            alt={'images'} image={e?.images[0]} item={e}/>
                        </div>
                    ))
                    
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDisplay