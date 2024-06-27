import video from '../assets/video.mp4'; 
import Example from '../NavBar';
import Login from '../Login';


const HomePage = () => {
return(
  <>
  <Example></Example>
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
        <center><h1 className='LabHeading'>Welcome to the PICT Lab Administrator System</h1></center>
  </>
)
}

export default HomePage