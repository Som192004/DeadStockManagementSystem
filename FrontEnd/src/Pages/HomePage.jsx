import React from 'react';
import video from '../assets/video.mp4';
import Example from '../NavBar';

const HomePage = () => {
  return (
    <>
      <Example /> {/* Keep the navbar visible */}

      <div className="video-container h-screen relative"> {/* Wrap video and content */}
        <video autoPlay loop muted className="background-video w-full h-full object-cover absolute top-0 left-0 z-[-1]">
          <source src={video} type="video/mp4" />
        </video>

        <div className="content-wrapper absolute top-1/2 transform -translate-y-1/2 w-full text-center"> {/* Centered text */}
          <center className="centered-content max-w-7xl mx-auto"> {/* Horizontally centered content with maximum width */}
            <h1 className="LabHeading text-white text-4xl font-bold mb-44">Welcome to the PICT Lab Administrator System</h1> {/* Added margin-bottom */}
            <p className="system-description text-white text-2xl mb-44">
              {/* Adjust paragraph content and style as needed */}
              The PICT Lab Administrator System is a comprehensive tool designed to streamline the management of laboratory resources and processes. It empowers administrators to:
              <ul className="description-list text-white">
                <li>Efficiently manage lab equipment and inventory.</li>
                <li>Schedule lab usage and allocate resources.</li>
                <li>Track lab activities and user access.</li>
                <li>Generate reports and analyze lab utilization.</li>
              </ul>
              This system simplifies lab administration tasks, promoting better organization, efficiency, and control over your lab environment.
            </p>
          </center>
        </div>
      </div>
    </>
  );
};

export default HomePage;
