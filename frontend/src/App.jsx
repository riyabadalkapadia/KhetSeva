import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CropRecommendation from './components/CropRecommendation';
import PlantDiseaseDetection from './components/PlantDiseaseDetection';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import FindLabs from './components/FindLabs';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-labs" element={<FindLabs />} />
          <Route path="/crop-recommendation" element={<CropRecommendation/>} />
          <Route path="/plant-disease-detection" element={<PlantDiseaseDetection/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
