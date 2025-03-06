import React from 'react';

const OurPhilosophy = () => {
  return (
    <div className="bg-[#f9f6f0] px-8 py-16 flex flex-col items-center">
      <div className="text-center mb-12">
        <img src="/png/OurPhilosophy.png" alt="" className='mx-auto w-full md:w-1/2'/>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center items-center lg:items-start mx-8 lg:mx-24">
        <div className="text-center max-w-xl lg:max-w-[28%]">
          <img 
            src="/png/phi01.png" 
            alt="Agave" 
            className="w-36 h-36 mx-auto mb-4"
          />
          <p className="text-md font-montserrat font-light text-[#2b593e]">
            At Marieta, we celebrate the essence of Agave, the plant at the very heart of Latin American Spirits. We’ve poured our passion and creativity into crafting drinks that embody agave-forward mixology.
          </p>
        </div>

        <div className="text-center max-w-xl lg:max-w-[28%]">
          <img 
            src="/png/phi02.png" 
            alt="Kiss" 
            className="w-36 h-36 mx-auto mb-4"
          />
          <p className="text-md font-montserrat font-light text-[#2b593e]">
            A fleeting moment of connection, a shared laugh, a stolen kiss - each mark tells a tale of unforgettable moments Marièta has shared with friends and strangers alike. Experience Marièta's playful essence here, brimming with laughter, joy, and mischievous charm.
          </p>
        </div>

        <div className="text-center max-w-xl lg:max-w-[28%]">
          <img 
            src="/png/phi03.png" 
            alt="Chilli" 
            className="w-36 h-36 mx-auto mb-4"
          />
          <p className="text-md font-montserrat font-light text-[#2b593e]">
            Chilli, a revered plant in Mexico known for its protective charm and fiery flavour, is a central element of their cuisine and culture. We honour its mystical appeal and culinary prowess, infusing its spicy allure into our vibrant offerings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurPhilosophy;