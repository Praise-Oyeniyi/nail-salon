import React, { useContext} from 'react'
import { ProductContextProvider } from '../context/Product'
import Navbar from '../components/Navbar'
import Banner from '../components/Home/Banner'
import ProductDisplay from '../components/Home/ProductDisplay'

const Home = () => {
  const {data} = useContext(ProductContextProvider)


  return (
    <div>
        <div>
          <Navbar/>
          <div>
            <div className='w-[90%] mx-auto mt-7 md:mt-0'>
              <Banner/>
            </div>
            <div className='max-w-[90%] w-[90%] overflow-x-hidden mx-auto mt-5'>
              <ProductDisplay data={data}/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home