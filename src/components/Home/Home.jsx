import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Banner from './Banner'
import ProductDisplay from './ProductDisplay'

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://wittynailtip.com/backend/product.php')
      .then(response => response.json())
      .then(data => setData(data.data));
  }, []);


  return (
    <div>
        <div>
          <Navbar/>
          <div>
            <div className='w-[90%] mx-auto mt-7 md:mt-0'>
              <Banner/>
            </div>
            <div className='w-[90%] mx-auto mt-5'>
              <ProductDisplay data={data}/>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home