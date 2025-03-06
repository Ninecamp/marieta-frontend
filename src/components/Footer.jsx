import React from 'react';
import { Instagram, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1c1c1c]  text-[#f1e7d1] pt-24 pb-4 px-2 lg:px-24">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mb-28">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <img src="/png/M-logo-11.png" alt="" width={100}/>
          <p className="text-[#B61F34] mt-2 text-[18px] font-normal">GLOBAL DINING & AGAVE FORWARD BAR</p>
        </div>
        
        {/* Opening Hours Section */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-reem-kufi font-normal mb-2 md:mb-8">OPENING HOURS</h2>
          <p className="font-light tracking-widest text-[18px] mb-2">12 NOON – 1 AM</p>
          <p className="font-light tracking-widest text-[18px]">  MONDAY - SUNDAY</p>
        </div>
        
        {/* Connect With Us Section */}
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-3xl font-reem-kufi font-normal mb-2 md:mb-8">CONNECT WITH US</h2>
          <a 
            href="https://www.instagram.com/marietahorizon?igsh=bnUyYjgyOWV6djZu" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center mb-2 hover:text-[#b53b46] transition-colors"
          >
            <img src="/png/insta.png" alt="" />
            <p className='font-light tracking-widest text-[16px] ml-2'>@MARIETAHORIZON</p>
          </a>
          <div className="flex items-center mb-2 text-center">
            <img src="/png/maps.png" alt="" />
            <p className='font-light tracking-widest text-[16px] ml-2'>TWO HORIZON CENTER,<br/> GURUGRAM</p>
          </div>
          <a 
            href="tel:+918800186953"
            className="flex items-center hover:text-[#b53b46] transition-colors"
          >
            <img src="/png/phone.png" alt="" />
            <p className='font-light tracking-widest text-[16px] ml-2'>+91 8800186953</p>
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Copyright © 2024 | Marieta
      </div>
    </footer>
  );
};

export default Footer;