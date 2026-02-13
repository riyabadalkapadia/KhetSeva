import React, { useState } from 'react';
import axios from 'axios';


function PredictForm() {
    const [inputData, setInputData] = useState('');
  
    const sendInputData = () => {
      axios
        .post('http://localhost:5000/predict', { inputData })
        .then(response => {
          console.log('Response:', response.data);
          // Handle the response data here
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle the error here
        });
    };
  
    return (
      <div>
        <input
          type="text"
          value={inputData}
          onChange={e => setInputData(e.target.value)}
        />
        <button onClick={sendInputData}>Send</button>
      </div>
    );
  }

export default PredictForm;