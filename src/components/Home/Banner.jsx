import React, { useState, useEffect } from 'react';
import BannerImage1 from '../../images/1.webp'
import BannerImage2 from '../../images/2.webp'
import BannerImage3 from '../../images/3.webp'
import BannerImage4 from '../../images/4.webp'
import { FaChevronLeft, FaChevronRight  } from "react-icons/fa";


const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      description: "Discover our exclusive nail designs",
      image: BannerImage1
    },
    {
      description: "Experience the best in nail care",
      image: BannerImage2
    },
    {
      description: "Transform your nails with our top picks",
      image: BannerImage3
    },
    {
      description: "Indulge in luxury nail treatments",
      image: BannerImage4
    }
  ];

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
  }, [currentSlide, isPaused]);

  return (
    <div 
      className="bg-[#fff1f5] md:pl-10 md:pr-0 px-5 w-full py-14 md:py-0  md:h-[50vh] overflow-hidden relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex justify-between items-end gap-x-10 h-full ">
        {/* Text Section */}
        <div className="self-center w-3/6 z-20 text-center md:text-left lg:pl-7 py-14 md:py-0 rlative md:before:hidden before:absolute before:h-full before:w-full before:bg-white/50 !before:z-[0] before:top-0 before:left-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 md:w-3/6 p-8 z-10 flex flex-col justify-center transition-opacity duration-500 ${
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
                  document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' });
                }}
                className='w-fit z-[99] mx-auto md:mx-0 bg-black text-base 
                font-semibold text-white mt-2 md:mt-5 md:ml-5 lg:ml-8 flex justify-center 
                items-center rounded-3xl py-2 px-5 uppercase tracking-wide'>
                    shop now
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
      <button
      type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 visible md:invisible group-hover:visible -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full shadow-lg transition-all z-20"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="md:w-6 w-4 h-4 md:h-6" />
      </button>
      <button
      type="button"
        onClick={nextSlide}
        className="absolute right-4 z-20 top-1/2 visible md:invisible group-hover:visible -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full shadow-lg transition-all "
        aria-label="Next slide"
      >
        <FaChevronRight  className="md:w-6 w-4 h-4 md:h-6" />
      </button>

      {/* Indicators */}
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
    </div>
  );
};

export default Banner;


