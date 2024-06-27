// Layout.js
import React from 'react';
import video from "../assets/video1.mp4";  // Adjust the path if necessary

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <video autoPlay loop muted
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1"
        }}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="relative z-10 text-white text-center mb-8">
        <h1 className='text-4xl font-bold'>Welcome to the PICT Lab Administrator System</h1>
      </div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;
