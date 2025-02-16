import React from 'react'
import ProductBox from '../ProductBox'
import ProductLoader from './ProductLoader';

const ProductDisplay = ({data, productName}) => {
    const [rangeValue, setRangeValue] = React.useState(0);

    const handleRangeChange = (e) => {
        setRangeValue(e.target.value);
    };

    const filteredData = data.filter(product => 
        (rangeValue === 0 || rangeValue === "0" || product.prices[0].unit_amount <= rangeValue) &&
        (productName === "" || product.name.toLowerCase().includes(productName.toLowerCase()))
    );

    return (
        <div className='mb-14 w-full'>
            <div className='w-full'>
                <div className="fiter w-full block">
                    <div className="flex items-center">
                        <label htmlFor="sort" className="mr-2">Sort by quantity:</label>
                        <input 
                            type="range" 
                            id="sort" 
                            name="sort" 
                            min="0" 
                            max="10" 
                            className="slider accent-[#ff00ff] bg-white" 
                            value={rangeValue}
                            onChange={handleRangeChange} 
                        />
                        <span className="ml-2">{rangeValue}</span>
                    </div>
                </div>

                <div className="products md:mt-10 mt-7 md:space-y-5 space-y-3 w-full">
                    <h3 className='capitalize font-medium text-2xl md:text-3xl'>Nails for you!</h3>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start w-full mx-auto max-w-full
                     gap-x-4 md:gap-x-6 gap-y-3 md:gap-y-5 justify-start flex-wrap'>
                        {data === null ?                             
                            [...Array(6)].map((_, index) => (
                                <ProductLoader key={index}/>
                            ))
                            :
                            filteredData.length === 0 ? 
                            <div className='w-full text-center col-span-full'>No products found</div>
                            :
                            filteredData.map((e) => (
                                <div className='w-full' key={e?.id}>
                                    <ProductBox 
                                        name={e.name}
                                        id={e?.id}
                                        price={e?.prices[0].unit_amount} 
                                        info={e?.description} 
                                        alt={'images'} 
                                        image={e?.images[0]} 
                                        item={e}
                                    />
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