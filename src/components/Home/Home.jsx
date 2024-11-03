import React from 'react'
import Navbar from '../Navbar'
import Banner from './Banner'
import ProductDisplay from './ProductDisplay'

const Home = () => {
  return (
    <div>
        <div>
          <Navbar/>
          <div>
            <div className='w-[90%] mx-auto mt-7 md:mt-0'>
              <Banner/>
            </div>
            <div className='w-[90%] mx-auto mt-5'>
              <ProductDisplay/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home