import React,{useState} from 'react';
import img1 from '../assets/feedbackBanner.png';
import './Banner.css';
import axios from 'axios';

const Banner = () => {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', selectedFile);

    try {
      const response = await axios.post('http://localhost:6600/upload', formData);
      console.log(response.data);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('File upload failed.');
    }
  };


  return (
    <div className='bannerPortion'>
      <div className="banner">
    <img src={img1} className='img1' alt='' />
    {/* <a  href={img1} download={img1}>download image</a> */}
      </div>
      <div className="bannerText">
        <p className='text1'>Add your products and give your valuable feedback</p>
        <p className='text2'>Easily give your feedback in a matter of minutes. Access your audience on all platforms. Observe result manually in real time</p>
      </div>

    </div>
  )
}

export default Banner
