import React from 'react'
import BannerImage from '../images/IMAGE3.png'

const Banner = () => {
  return (
    <div className='bg-[#fff1f5] px-10 w-full h-[50vh] overflow-hidden'>
        <div className=' flex justify-around items-end gap-x-10 h-full'>
            <div className='self-center w-auto'>
                <h2 className='text-5xl tracking-wide font-bold'>
                    Grab upto 10% off on selected nails
                </h2>
                <button 
                    className='w-fit bg-black text-base font-semibold text-white mt-5 flex justify-center items-center rounded-2xl py-1 px-5 uppercase tracking-wide'>shop now</button>
            </div>
            <div className='h-full w-3/6  banner-inner'>
            </div>
        </div>
    </div>
  )
}

export default Banner