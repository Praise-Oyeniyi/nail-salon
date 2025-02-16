import React from 'react'
import ProductBox from '../ProductBox'
import { FaAngleDown } from "react-icons/fa6";
import ProductLoader from './ProductLoader';


const ProductDisplay = ({data}) => {

  return (
    <div className='mb-14 w-full'>
        <div className='w-full'>
            <div className="fiter w-full hidden md:block">
                
            </div>

            <div className="products md:mt-10 mt-7 md:space-y-5 space-y-3 w-full">
                <h3 className='capitalize font-medium text-2xl md:text-3xl'>Nails for you!</h3>
                <div className='flex items-start w-full mx-auto max-w-full gap-x-4 md:gap-x-6 gap-y-3 md:gap-y-5 justify-start flex-wrap'>
                    {data === null?                             
                            [...Array(6)].map((_, index) => (
                                <ProductLoader key={index}/>
                            ))
                        :
                        data.map((e)=>(
                            <div className='md:w-[23.5%] w-[47.2%]' key={e?.id}>
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