import React from 'react'
import PD1 from '../images/IMAGE3.png'
import PD2 from '../images/IMAGE4.png'
import PD3 from '../images/IMAGE5.png'
import PD4 from '../images/IMAGE6.png'
import ProductBox from '../ProductBox'
import { FaAngleDown } from "react-icons/fa6";


const ProductDisplay = () => {
  return (
    <div className='mb-14'>
        <div>
            <div className="fiter w-full">
                <ul className='flex w-full items-center gap-x-5 text-sm'>
                    {['Nails Type','Price','Reviews','Colors','Offers','Filter all'].map((e, index)=>(
                        <li className='filter-bg px-3 rounded-2xl flex items-center gap-x-2' key={index}>{e}<span><FaAngleDown /></span></li>
                    ))}
                </ul>
            </div>

            <div className="products mt-10 space-y-5">
                <h3 className='capitalize font-bold text-3xl'>Nails for you!</h3>
                <div className='flex items-start w-full gap-x-5 justify-between'>
                    {[PD1, PD2, PD3, PD4].map((e, index)=>(
                        <div className='w-[25%]' key={index}>
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