import React from 'react';

const Contact = () => {
  return (
    <div className=" mt-0 pb-16 bg-white" >
      <div className="container mx-auto max-w-full">
        <div className="mb-10 mx-auto">
          <img 
            src="/png/contact-us-page.jpg" 
            alt="Restaurant interior" 
            className="w-100% shadow-md"
          />
        </div>  
        
        <h1 className="text-4xl font-bold text-[#324c22] text-center mb-12">GET IN TOUCH</h1>
        
        <div className="max-w-3xl mx-auto bg-transparent rounded-lg p-8">
          <div className="flex flex-col items-center">
            {/* Contact Information */}
            <div className="space-y-8 w-full max-w-lg">
              <div className="flex items-center space-x-4">
                <h3 className="text-sm uppercase font-semibold tracking-wider text-[#324c22] w-24">PHONE</h3>
                <p className="text-lg text-[#324c22] ">+91 8800186953</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <h3 className="text-sm uppercase font-semibold tracking-wider text-[#324c22] w-24">EMAIL</h3>
                <a href="mailto:info@marieta.in" className="text-lg text-[#324c22]  hover:underline ">info@marieta.in</a>
              </div>
              
              <div className="flex items-start space-x-4">
                <h3 className="text-sm uppercase font-semibold tracking-wider text-[#324c22] w-24">ADDRESS</h3>
                <p className="text-lg text-[#324c22] ">Two Horizon Center,Gurugram</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <h3 className="text-sm uppercase font-semibold tracking-wider text-[#324c22] w-24">FOLLOW</h3>
                <a 
                  href="https://instagram.com/MARIETAHORIZON" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lg flex items-center gap-2 hover:text-[#324c22] transition-colors"
                >
                  <span className="text-lg text-[#324c22] ">@MARIETAHORIZON</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default Contact;