import React from 'react';

const OurStory = () => {
  return (
    <div className="bg-[#f9f6f0] px-8 py-16 flex flex-col justify-center items-center">
      <div className="text-center mb-12">
        <img 
          src="/png/OurStory.png" 
          alt="Our Story Image" 
          className="w-full md:w-1/2 mx-auto mb-8"
        />
        <p className="font-montserrat fontWeight-medium  text-15 leading-25 text-custom-green max-w-xl lg:max-w-[44%] mx-auto">
          Embark on a global culinary journey infused with the vibrant energy of Latin America, 
          all complemented by our agave-spirited bar. Set in a lively space, Marièta pulses with life. 
          As the sun sets, so do the lights, but everything else rises – <br/> energy, music, expectations.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 justify-center items-center md:px-20 w-[90%]">
        <div className="w-[80%] text-center lg:self-end">
            <img 
            src="/png/food-menu1.png" 
            alt="Food Menu" 
            className=" shadow-md mx-auto"
            />
            <p className="text-base font-semibold text-[#2b593e] mt-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>FOOD MENU</p>
            <hr className="w-[50%] mx-auto border-1 mb-4 border-[#2b593e]" />
            <p className="text-md text-[#2b593e] max-w-[80%] mx-auto mt-1">
            Marièta invites you on a culinary journey that transcends borders with a menu that features 
            a vast selection of globally inspired dishes.
            </p>
        </div>

        <div className="w-[80%] text-center lg:self-start">
            <img 
            src="/png/cocktail-menu1.png" 
            alt="Cocktail Menu" 
            className="shadow-md mx-auto"
            />
            <p className="text-base font-semibold text-[#2b593e] mt-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>COCKTAIL MENU</p>
            <hr className="w-[50%] mx-auto border-1 mb-4 border-[#2b593e]" />
            <p className="text-md text-[#2b593e] max-w-[80%] mx-auto mt-1">
            Agave forward mixology offering a selection of crafted tequila and mezcal cocktails and 
            signature concoctions that celebrate the Latino way of life.
            </p>
        </div>
        </div>

    </div>
  );
};

export default OurStory;
