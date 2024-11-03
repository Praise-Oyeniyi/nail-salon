import React from 'react'
import BannerImage from '../images/IMAGE3.png'

const Banner = () => {
  return (
    <div className='bg-[#fff1f5] md:px-10 px-5 w-full py-14 md:py-0  md:h-[50vh] overflow-hidden'>
        <div className=' flex justify-around items-end gap-x-10 h-full'>
            <div className='self-center w-auto text-center md:text-left'>
                <h2 className='text-3xl md:text-5xl tracking-wide font-bold leading-tighter md:leading-normal'>
                    Grab upto 10% off on selected nails
                </h2>
                <button 
                    className='w-fit mx-auto md:mr-auto bg-black text-base font-semibold text-white mt-2 md:mt-5 flex justify-center items-center rounded-2xl py-1 px-5 uppercase tracking-wide'>shop now</button>
            </div>
            <div className='h-full w-3/6  banner-inner hidden md:block'>
            </div>
        </div>
    </div>
  )
}

export default Banner