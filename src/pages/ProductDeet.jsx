/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { FaTools, FaHands, FaRing, FaRegStar } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import { CartContextProvider } from '../context/CartContext';
import ProductDeetLoader from '../components/PDdetails/ProductDeetLoader';
import { fetchApi, sendApi } from '../apis/Index';
import { RiLoader4Fill } from 'react-icons/ri';
import FooterSection from '../components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductDeet = () => {
    const { productId } = useParams();
    const [data, setData] = useState(null);
    const { addtoCart, addingToCart } = useContext(CartContextProvider);
    const [item, setItems] = useState(1);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [reviews, setReviews] = useState([]);

     useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await sendApi(
                    { product_id: productId },
                    'https://wittynailtip.com/backend/reviews.php'
                );
                
                if (response.data.success) {
                    setReviews(response.data.reviews);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        
        fetchReviews();
    }, [productId]);

    useEffect(() => {
        const prodApi = 'https://wittynailtip.com/backend/product-info.php';
        const prodId = { "product_id": productId };
        async function fetchData() {
            try {
                const result = await sendApi(prodId, prodApi);
                if (result.data.success) {
                    setData(result.data.data);
                    if (result.data.data.color_image_pairs) {
                        const firstColorKey = Object.keys(result.data.data.color_image_pairs).find(key => key.startsWith('Color'));
                        if (firstColorKey) {
                            setSelectedColor(result.data.data.color_image_pairs[firstColorKey]);
                        }

                         const imageKey = `Image ${firstColorKey.split(' ')[1]}`;
                            setMainImage(result.data.data.color_image_pairs[imageKey] || result.data.data.images[0]);
                    }
                } 
                else {
                    setMainImage(result.data.data.images[0]);
                    console.log(result.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [productId]);

    const addToItem = () => {
        const productDetails = {
            // ...data,
            product_id: data?.product_id,
            color: data?.category?.toLowerCase() === 'accessory' ? 'none' : selectedColor,
            size: data?.category?.toLowerCase() === 'accessory' ? 'none' : selectedSize,
            quantity: item
        };
        addtoCart(productDetails);
    };

    // const removeItem = (itemId) => {
    //     removedItem(itemId);
    //     setItems(prevItem => (prevItem <= 1 ? 1 : prevItem - 1));
    // };

    const getColors = () => {
        if (!data?.color_image_pairs) return [];
        
        const colors = [];
        let i = 1;
        while (data.color_image_pairs[`Color ${i}`]) {
            colors.push(data.color_image_pairs[`Color ${i}`]);
            i++;
        }
        return colors;
    };

    const getCategoryIcon = (category) => {
        switch(category?.toLowerCase()) {
            case 'machine':
            return <FaTools className="inline mr-1" />;
            case 'handmade':
            return <FaHands className="inline mr-1" />;
            case 'accessory':
            return <FaRing className="inline mr-1" />;
            default:
            return null;
        }
    };

    const getStockStatus = (quantity) => {
        if (quantity === 0) {
            return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Out of Stock</span>;
        } else if (quantity <= 5) {
            return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Low in Stock</span>;
        }
        return null;
    };


    const getSizes = () => {
        if (!data?.sizes) return [];
        return Object.keys(data.sizes);
    };

    const handleColorSelect = (color, index) => {
        setSelectedColor(color);
        // Find the corresponding image for the selected color
        const imageKey = `Image ${index + 1}`;
        const selectedImage = data.color_image_pairs[imageKey] || data.images[0];
        setMainImage(selectedImage);
    };

    return (
        <div className='font-jost overflow-y-auto'>
            <Navbar />
            {data ?
                <div className='md:w-4/6 w-[90%] mx-auto mt-5 md:mt-0 md:mb-14 mb-10 '>
                    <div className='w-full mx-auto md:space-y-5 space-y-3'>
                        <div className='w-full h-[20em] md:h-[30em] bg-[#fff1f5] rounded-lg shadow-xl shadow-gray-300 overflow-hidden'>
                            {/* <img
                                src={data?.images[0]}
                                className="w-full ml-auto md:min-w-full lg:mx-auto !h-full object-cover object-center lg:object-center"
                                alt="full product view in product details page"
                            /> */}
                            <div className="relative">
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    navigation
                                    pagination={{
                                        clickable: true,
                                        el: '.swiper-pagination',
                                    }}

                                    spaceBetween={20}
                                    slidesPerView={1}
                                    className='rounded-lg shadow-xl'
                                >
                                    {/* Main Image */}
                                    <SwiperSlide>
                                        <div className='w-full h-[20em] md:h-[30em] bg-[#fff1f5]'>
                                            <img
                                                src={mainImage || data?.images[0]}
                                                className="w-full h-full object-cover"
                                                alt="main product view"
                                            />
                                        </div>
                                    </SwiperSlide>

                                    {/* Extra Images */}
                                    {data?.pimg_extra?.map((img, index) => (
                                        <SwiperSlide key={index}>
                                            <div className='w-full h-[20em] md:h-[30em] bg-[#fff1f5]'>
                                                <img
                                                    src={img}
                                                    className="w-full h-full object-cover"
                                                    alt={`product view ${index + 1}`}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                        <div>
                            <div className="priceandinfo md:flex justify-start items-start">
                                <div className="left w-full md:w-4/6 space-y-2 pb-5 border-b-2 md:border-r-2 border-r-gray-300 border-b-gray-300">
                                    <div className="flex justify-between items-center pr-2">
                                        <h3 className='uppercase text-xl md:text-3xl font-bold'>{data?.name}</h3>
                                        <div className="flex items-center bg-[#FFEEF3]/70 px-2 rounded-3xl">
                                        {getCategoryIcon(data?.category)}
                                        <span className="text-sm capitalize">{data?.category}</span>
                                        </div>
                                    </div>
                                    <p className='font-medium text-sm md:text-base leading-tight'>
                                        {data?.description}
                                    </p>
                                    <div className="flex items-center justify-between pr-3">
                                        <div className='flex cursor-pointer gap-x-1 text-[#FFB8CD]'>
                                        {[1, 2, 3, 4, 5].map((_, index) => (<FaRegStar key={index} />))}
                                        </div>
                                        {getStockStatus(data?.total_quantity)}
                                    </div>
                                </div>
                                <div className="right w-auto md:pl-5">
                                    <div className='border-b-2 border-b-gray-300 pt-3 md:pt-0 pb-3'>
                                        <h4 className='uppercase text-xl md:text-3xl font-bold'><span className='line-through'>${data?.price?.unit_amount + (0.2 * data?.price?.unit_amount)}</span> /${data?.price?.unit_amount}</h4>
                                        <p className='font-medium text-sm md:text-base leading-tight'>20% Discount Price on our products</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="choose-color border-b border-b-gray-300 space-y-3">
                            <h4 className='font-bold text-lg tracking-wide '>Choose color & Size</h4>
                            <div className='md:flex items-center justify-between space-y-2 md:space-y-0 gap-x-7'>
                                <div className='space-y-3'>

                                    {/* <div className='flex items-center max-w-full overflow-x-auto gap-x-3'>
                                        {getColors().map((color, index) => (
                                            <button
                                            type="button"
                                                key={index}
                                                className={`px-3 min-w-fit h-8 capitalize md:px-5 flex justify-center items-center rounded-xl border ${selectedColor === color ? 'bg-[#FFB8CD] text-white' : 'bg-transparent border-[#FFB8CD]'}`}
                                                onClick={() => handleColorSelect(color, index)}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div> */}

                                    <div className="flex flex-col items-center">
                                        <div className="flex gap-4 overflow-x-auto w-full py-2 px-1">
                                            {getColors().map((color, index) => {
                                                const imageKey = `Image ${index + 1}`;
                                                const colorImage = data.color_image_pairs[imageKey] || data.images[0];
                                                return (
                                                    <div 
                                                        key={index}
                                                        className="flex flex-col items-center flex-shrink-0"
                                                    >
                                                        <button
                                                            type="button"
                                                            className={`cursor-pointer rounded-full p-0.5 ${selectedColor === color ? 'bg-[#FFB8CD]' : 'bg-transparent'}`}
                                                            onClick={() => handleColorSelect(color, index)}
                                                        >
                                                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                                                                <img
                                                                    src={colorImage}
                                                                    className="w-full h-full object-cover"
                                                                    alt={`${color} color option`}
                                                                />
                                                            </div>
                                                        </button>
                                                        <span className="text-xs mt-2 text-center font-medium capitalize">
                                                            {color}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Size Selection (keep your existing size buttons) */}
                                    <div className='flex items-center max-w-full overflow-x-auto gap-x-3'>
                                        {getSizes().map((size, index) => (
                                            <button
                                                type="button"
                                                key={index}
                                                className={`px-3 min-w-fit h-8 md:px-5 flex justify-center items-center rounded-xl border ${selectedSize === size ? 'bg-[#FFB8CD] text-white' : 'bg-transparent border-[#FFB8CD]'}`}
                                                onClick={() => setSelectedSize(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>

                                   
                                </div>
                                <div className="items flex items-center md:block gap-x-3 flex-shrink-0 pt-5 md:pt-0">
                                    <div className='font-bold text-base md:text-xl bg-[#ffeef3] flex rounded-2xl items-center gap-x-8 px-5 py-2'>
                                        <button 
                                            type="button"
                                            onClick={() => setItems(prevItem => (prevItem <= 1 ? 1 : prevItem - 1))}>-</button>
                                        <h3>{item}</h3>
                                        <button
                                            type="button"
                                            onClick={() => setItems(prevItem => prevItem + 1)}>+</button>
                                    </div>
                                    <p className='md:hidden font-medium text-sm md:text-base leading-tight'>
                                        Don't miss out!</p>
                                </div>
                                <p className='font-medium hidden md:block text-base leading-tight'>Don't miss out!</p>
                            </div>
                            <div className='pt-5 border-b-2 border-b-gray-300 pb-7 flex text-right font-bold w-full justify-center md:justify-end items-center gap-x-2 text-base md:text-lg'>
                                <button
                                            type="button"

                                   disabled={
                                        item < 1 || 
                                        (data?.category?.toLowerCase() !== 'accessory' && 
                                        (!selectedColor || !selectedSize))
                                    }
                                    className={`h-10 w-40 rounded-3xl text-black tracking-wide 
                                        disabled:bg-gray-200 disabled:cursor-not-allowed font-medium
                                        text-center flex items-center justify-center
                                         ${item < 1 || (data?.category?.toLowerCase() !== 'accessory' && !selectedSize) ?
                                        '' : 'bg-[#ffb7ce]'}`}
                                    onClick={addToItem}
                                >
                                    {addingToCart ? 
                                    <>
                                    Adding...
                                    <RiLoader4Fill className='animate-spin' />
                                    </> :
                                     'Add to cart'}
                                </button>
                            </div>
                            <div className="pd-perks md:w-3/6">
                                <div className='py-3 border-b-2 border-b-gray-300'>
                                    <h5 className='font-bold md:text-lg text-base leading-tight'>Free Delivery</h5>
                                    <div className='flex items-center gap-x-3'>
                                        <p className='text-gray-400 text-sm md:text-base font-medium underline'>Enter your postal code for delivery Availability</p>
                                        <p className="text-[#FFB8CD] max-md:text-xs">Coming soon</p>
                                    </div>
                                </div>
                                <div className='py-3'>
                                    <h5 className='font-bold md:text-lg text-base leading-tight'>Return Delivery</h5>
                                    <div className='flex items-center gap-x-3'>
                                        <p className='text-gray-400 text-sm md:text-base font-medium underline'>Free 30Days Delivery Returns <span className='text-gray-900 cursor-pointer'>Details</span></p>
                                        <p className='text-[#FFB8CD] max-md:text-xs'>Coming soon</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t pt-8">
                        <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                        {/* Reviews List */}
                        <div className="space-y-6">
                            {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <div key={index} className="border-b pb-4">
                                        <div className="flex items-center mb-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                                                {review.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h4 className="font-medium">{review.name}</h4>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(review.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700">{review.text}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                            )}
                        </div>
                    </div>
                </div>
                :
                <ProductDeetLoader />
            }
            <FooterSection />
        </div>
    );
};

export default ProductDeet;
