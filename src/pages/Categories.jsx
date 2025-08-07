import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import FooterSection from '../components/Footer';
import ProductLoader from '../components/Home/ProductLoader';
import ProductBox from '../components/ProductBox';

const Categories = () => {
    const [data, setData] = React.useState(null);
    const { category } = useParams();
    console.log(category)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://wittynailtip.com/backend/category.php', {
                    category: category
                });
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [category]);
  return (
    <div className='font-jost'>
        <Navbar />
        <div className='max-w-[90%] w-[90%] overflow-x-hidden mx-auto'>
            <h3 className='my-7 capitalize font-medium text-2xl md:text-3xl'>
            {category === 'machine' ? 'Machine Made Nails' : `${category} Nails`}
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start w-full mx-auto max-w-full
                gap-x-4 md:gap-x-6 gap-y-3 md:gap-y-5 justify-start flex-wrap'>
                {data === null ?                             
                    [...Array(6)].map((_, index) => (
                        <ProductLoader key={index}/>
                    ))
                    :
                    data && (data.length === 0 || data === null) ? 
                    <div className='w-full my-40 text-center col-span-full'>No products found</div>
                    :
                    data && data.map((e) => (
                        <div className='w-full' key={e?.id}>
                            <ProductBox 
                                name={e.name}
                                id={e?.id}
                                price={e?.prices[0].unit_amount} 
                                // info={e?.description} 
                                alt={'images'} 
                                image={e?.images[0]} 
                                item={e}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
        <FooterSection />
    </div>
  )
}

export default Categories