import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <div className="fixed inset-0 flex items-center justify-center w-full h-full -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source 
            src="https://res.cloudinary.com/djho4slzk/video/upload/v1740772544/Marieta_d7ywp3.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Centered Logo */}
      <div className="flex items-center justify-center w-full h-full">
        <img src="/png/MiddleLogo.png" alt="Logo" className="max-w-xl md:max-w-3xl" />
      </div>
    </div>
  );
};

export default HeroSection;