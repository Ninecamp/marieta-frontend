

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  "/png/001.png", "/png/002.jpg", "/png/003.jpg", "/png/004.jpg", "/png/005.jpg",
  "/png/006.jpg", "/png/007.jpg", "/png/008.jpg", "/png/009.jpg"
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef(null);
  const slidesToShow = useRef(5);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width < 640) slidesToShow.current = 1;
      else if (width < 768) slidesToShow.current = 3;
      else if (width < 1024) slidesToShow.current = 4;
      else slidesToShow.current = 5;
    };
    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Check if we're showing the last slide, if so reset to beginning
      if (currentIndex >= images.length - slidesToShow.current) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    // Check if we're showing the last slide, if so reset to beginning
    if (currentIndex >= images.length - slidesToShow.current) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  return (
    <div className="relative bg-[#f9f6f0] py-8 px-4 flex flex-col items-end">
      <div 
        className="relative w-full overflow-hidden max-w-[99%] mb-16"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${(currentIndex * 100) / slidesToShow.current}%)` }}
        >
          {images.map((image, i) => (
            <div
              key={i}
              className="min-w-[20%] px-2 flex justify-center items-center"
              style={{ flex: `0 0 ${100 / slidesToShow.current}%` }}
            >
              <img
                src={image}
                alt={`Slide ${i + 1}`}
                className="shadow-md object-cover w-[450px] h-[450px]"
              />
            </div>
          ))}
        </div>
        {isHovering && (
          <>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
      <div>
        <img src="/png/signature.png" alt="" className="w-[250px]" />
      </div>
    </div>
  );
};

export default ImageSlider;