import React from 'react'
import PD1 from '../../images/IMAGE3.webp'
import PD2 from '../../images/IMAGE4.webp'
import PD3 from '../../images/IMAGE5.webp'
import PD4 from '../../images/IMAGE6.webp'
import ProductBox from '../ProductBox'
import { FaAngleDown } from "react-icons/fa6";


const ProductDisplay = () => {
  return (
    <div className='mb-14'>
        <div>
            <div className="fiter w-full hidden md:block">
                <ul className='flex w-full items-center md:text-sm text-xs gap-x-2 md:gap-x-5'>
                    {['Nails Type','Price','Reviews','Colors','Offers','Filter all'].map((e, index)=>(
                        <li className='filter-bg px-3 rounded-2xl flex items-center gap-x-2' key={index}>{e}<span><FaAngleDown /></span></li>
                    ))}
                </ul>
            </div>

            <div className="products md:mt-10 mt-7 md:space-y-5 space-y-3">
                <h3 className='capitalize font-bold text-2xl md:text-3xl'>Nails for you!</h3>
                <div className='flex items-start w-full gap-x-2 md:gap-x-5 gap-y-3 md:gap-y-5 justify-between flex-wrap lg:flex-nowrap'>
                    {[PD1, PD2, PD3, PD4].map((e, index)=>(
                        <div className='md:w-[25%] w-[48%]' key={index}>
                            <ProductBox name={'Crochet nails'} 
                            price={'30'} info={'Original nails, Long Lasting'} 
                            alt={'fixed nails'} image={e}/>
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