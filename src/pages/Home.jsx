import React, { useContext} from 'react'
import { ProductContextProvider } from '../context/Product'
import Navbar from '../components/Navbar'
import Banner from '../components/Home/Banner'
import ProductDisplay from '../components/Home/ProductDisplay'
import FooterSection from '../components/Footer'

const Home = () => {
  const {data} = useContext(ProductContextProvider);
  const [name, setProductName] = React.useState('')


  return (
    <div className='font-jost'>
        <div>
          <Navbar setProductName={setProductName}/>
          <div>
            <div className='w-[90%] mx-auto mt-7 md:mt-0'>
              <Banner/>
            </div>
            <div 
            id='products-section'
            className='max-w-[90%] w-[90%] overflow-x-hidden mx-auto mt-5'>
              <ProductDisplay data={data} productName={name}/>
            </div>
          </div>
        </div>
        <FooterSection />
    </div>
  )
}

export default Home