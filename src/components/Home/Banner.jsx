import React, { useState, useEffect, useContext } from 'react';
import BannerImage1 from '../../images/1.webp'
import { FaChevronLeft, FaChevronRight  } from "react-icons/fa";
import { CartContextProvider } from '../../context/CartContext';
import { ProductContextProvider } from '../../context/Product';


const Banner = () => {
  const {bannerData} = useContext(ProductContextProvider);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const {userAvailable} = useContext(CartContextProvider);

  const defaultSlides = [
    {
      description: "Sign up with your gmail now and get 10% bonus on your product",
      image: BannerImage1
    }
  ];

  const processedSlides =  (bannerData && userAvailable) ? [
    {
      description: bannerData.text1,
      image: bannerData.img1,
      buttonText: bannerData.btn1,
    },
    {
      description: bannerData.text2,
      image: bannerData.img2,
      buttonText: bannerData.btn2,
    },
    {
      description: bannerData.text3,
      image: bannerData.img3,
      buttonText: bannerData.btn3,
    }
  ] : defaultSlides;

  const slides = processedSlides;

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating && index !== currentSlide) {
      setIsAnimating(true);
      setCurrentSlide(index);
    }
  };

  // Handle animation completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [currentSlide, isPaused, slides, slides.length]);

  if (!bannerData) {
    return (
      <div className="bg-gray-100 md:bg-[#fff1f5] md:pl-10 md:pr-0 px-5 w-full 
      py-24 max-md:animate-pulse md:py-0 md:h-[50vh] overflow-hidden relative">
        <div className="max-md:hidden flex justify-between 
        items-end gap-x-10 h-full animate-pulse">
          {/* Text Section Skeleton */}
          <div className="self-center md:w-3/6 z-20 
          text-left lg:pl-7 py-5 md:py-0 relative">
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"/>
            <div className="h-8 bg-gray-200 w-1/5 rounded-2xl"/>
          </div>
          
          {/* Image Section Skeleton */}
          <div className="h-full w-1/2 bg-gray-300"></div>
        </div>
      </div>
    );
  }

  // console.log(slides)

  return (
    <div 
      className="bg-[#fff1f5] md:pl-10 md:pr-0 px-5 w-full py-14 md:py-0  
      md:h-[50vh] overflow-hidden relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex justify-between items-end gap-x-10 h-full">
        {/* Text Section */}
        <div className="self-center w-3/6 z-20 text-center md:text-left lg:pl-7
         py-14 md:py-0 rlative md:before:hidden before:absolute before:h-full 
         before:w-full before:bg-white/50 !before:z-[0] before:top-0 before:left-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 md:w-3/6 p-8 z-10 flex flex-col 
                justify-center transition-opacity duration-500 ${
                currentSlide === index 
                  ? 'opacity-100 z-10' 
                  : 'opacity-0 z-0'
              }`}
            >
              <h2 className="text-3xl md:text-5xl tracking-wide font-semibold
               leading-tighter md:pl-5 lg:pl-8 z-20">{slide.description}</h2>
                <button 
                type="button"
                 onClick={() => {
                    if (userAvailable) {
                    document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
                    } else {
                    window.location.href = '/auth';
                    }
                }}
                className='w-fit z-[99] mx-auto md:mx-0 bg-black text-base 
                font-semibold text-white mt-2 md:mt-5 md:ml-5 lg:ml-8 flex justify-center 
                items-center rounded-3xl py-2 px-5 uppercase tracking-wide'>
                  {userAvailable ? slide.buttonText : 'sign up'} 
                </button>
            </div>
          ))}
        </div>

        {/* Image Section */}
        <div className="h-full w-full md:w-1/2 banner-inner md:relative lg:after:absolute   
        after:w-full after:h-full after:top-0 after:left-0 lg:after:bg-white/30 after:z-10">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                currentSlide === index 
                  ? 'opacity-100 z-10' 
                  : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={''}
                className="w-full h-full object-cover absolute top-0 left-0 z-0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {slides.length > 1 && 
      <>
      <button
      type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 visible md:invisible group-hover:visible -translate-y-1/2 
        bg-white/60 hover:bg-white p-2 rounded-full shadow-lg transition-all z-20"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="md:w-6 w-4 h-4 md:h-6" />
      </button>
      <button
      type="button"
        onClick={nextSlide}
        className="absolute right-4 z-20 top-1/2 visible md:invisible group-hover:visible -translate-y-1/2 
        bg-white/60 hover:bg-white p-2 rounded-full shadow-lg transition-all "
        aria-label="Next slide"
      >
        <FaChevronRight  className="md:w-6 w-4 h-4 md:h-6" />
      </button>
      </>}

      {/* Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/4 -translate-x-1/2 md:flex gap-2 z-20 mx-auto hidden">
          {slides.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-[#ff00ff] w-2 md:w-3' : 'bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;


