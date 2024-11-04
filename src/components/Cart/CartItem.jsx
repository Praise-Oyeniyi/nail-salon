import React, { useState } from 'react'
import PD1 from '../images/IMAGE3.webp'

const CartItem = () => {
  const [item, setItems] = useState(1)


  return (
    <div className='md:py-3 py-2'>
      <div className='flex items-center gap-x-3 md:gap-x-5'>
        <div className="shadow-lg w-[10em] bg-[#fff1f5] shadow-gray-300 rounded-xl">
          <img src={PD1} alt="" className='w-full'/>
        </div>

        <div className='md:space-y-1'>
          <h4 className='md:text-xl text-lg font-bold'>Cortex-Nail</h4>
          <p className='md:text-base text-sm text-gray-700 leading-tight md:leading-normal tracking-tight lg:tracking-normal'>A perfect nail to grace your look in every location or event that you want to attend. A must buy nail </p>
          <p className='cursor-pointer my-1 md:my-0 color w-fit text-sm  px-2 rounded-xl shadow-sm shadow-gray-400'>Black</p>
          <div className='flex gap-x-3 items-center'>
            <h5 className='md:text-xl text-lg font-bold'>$30</h5>
            <div className='font-bold text-base bg-[#fff1f5] flex rounded-2xl items-center gap-x-5 px-3 py-1'>
                <button onClick={()=>setItems(item ===1? 1 :item-1)}>-</button>
                <h3>{item}</h3>
                <button onClick={()=>setItems(item+1)}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem