import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleAudioChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleGenerateVideo = async () => {
    if (!imageFile || !audioFile) {
      alert('Please select both an image and an audio file.');
      return;
    }

    // Prepare form data to send to the API
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('audio', audioFile);

    try {
      const response = await fetch('http://ec2-18-217-167-2.us-east-2.compute.amazonaws.com/merge', {
        method: 'POST',
        body: formData,
        // Add any necessary headers (e.g., for file upload)
      });

      // Assuming the API returns a blob for the video file
      const videoBlob = await response.blob();

      // Create a download link for the video file
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(videoBlob);
      downloadLink.download = 'generated_video.mp4';
      downloadLink.click();
    } catch (error) {
      console.error('Error generating video:', error);
      // Handle error scenario
    }
  };

  return (
    <div className='main-container'>
      {/* <div className='child-container'> */}
        <h1 className='main-header'>Make A Freestyle<br/> Type Beat Video</h1>
        <div className='divider'/>
        <div className='file-container'>
          <label>
            Select Image File:<br/>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>
        <div className='file-container'>
          <label>
            Select Audio File:<br/>
            <input type="file" accept="audio/*" onChange={handleAudioChange} />
          </label>
        </div>
        <div>
          <button onClick={handleGenerateVideo}>Generate Video</button>
        </div>
      {/* </div> */}
    </div>
  );
};

export default App;
