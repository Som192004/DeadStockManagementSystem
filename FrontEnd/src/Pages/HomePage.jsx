import React, { useEffect } from 'react';
import video from '../assets/video.mp4';
import Example from '../NavBar';
import './Homepage.css'; // Import custom CSS for HomePage
const HomePage = () => {
  useEffect(() => {
    const heading = document.querySelector('.LabHeading');
    if (heading) {
      heading.classList.add('rotate-once');
    }
  }, []);

  return (
    <>
      <Example /> {/* Keep the navbar visible */}

      <div className="video-container h-screen relative">
        <video autoPlay loop muted className="background-video w-full h-full object-cover absolute top-0 left-0 z-[-1]">
          <source src={video} type="video/mp4" />
        </video>

        <div className="content-wrapper absolute top-1/2 transform -translate-y-1/2 w-full text-center">
          <center className="centered-content max-w-7xl mx-auto">
            <h1 className="LabHeading text-silver text-4xl font-bold mb-20 animate__animated animate__rotateIn">
              Welcome to the PICT Lab Administrator System
            </h1>

            <div className="system-description text-white text-2xl mb-16 border-2 border-white p-4 rounded-lg">
              <p className="mb-4 inline-block min-w-[2rem]">
                The PICT Lab Administrator System is a comprehensive tool designed to streamline the management of laboratory resources and processes. It empowers administrators to:
              </p>
              <ol className="description-list text-white list-decimal pl-8 mt-2 space-y-2">
                <li className="flex items-start">
                  <span className="inline-block min-w-[2rem]">1.</span>
                  <span>Efficiently manage lab equipment and inventory.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block min-w-[2rem]">2.</span>
                  <span>Schedule lab usage and allocate resources.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block min-w-[2rem]">3.</span>
                  <span>Track lab activities and user access.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block min-w-[2rem]">4.</span>
                  <span>Generate reports and analyze lab utilization.</span>
                </li>
              </ol>
              <p className="mt-4">
                This system simplifies lab administration tasks, promoting better organization, efficiency, and control over your lab environment.
              </p>
            </div>
          </center>
        </div>
      </div>
    </>
  );
};

export default HomePage;