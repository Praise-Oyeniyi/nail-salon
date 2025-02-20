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
    <div>
        <Navbar />
        <div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start w-full mx-auto max-w-full
                gap-x-4 md:gap-x-6 gap-y-3 md:gap-y-5 justify-start flex-wrap'>
                {data === null ?                             
                    [...Array(6)].map((_, index) => (
                        <ProductLoader key={index}/>
                    ))
                    :
                    data.length === 0 ? 
                    <div className='w-full text-center col-span-full'>No products found</div>
                    :
                    data.map((e) => (
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