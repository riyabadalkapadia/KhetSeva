import React, { useState, useEffect } from 'react';
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Swal from "sweetalert2";

import { useNavigate } from 'react-router-dom'
import { app } from '../config/firebase';
import {getAuth, onAuthStateChanged} from 'firebase/auth'

const auth = getAuth(app)

const CropRecommendationPage = () => {
  
  const [inputs, setInputs] = useState({
    nitrogen: '',
    phosphorous: '',
    potassium: '',
    temperature: '',
    // humidity:'',
    ph: '',
    rainfall: '',

  });
  

  // const [inputs, setInputs] = useState({
  //   district: "",
  //   soil_color: "",
  //   nitrogen: "",
  //   phosphorous: "",
  //   potassium: "",
  //   ph: "",
  //   rainfall: "",
  //   temperature: "",
  // });


  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedCrop, setRecommendedCrop] = useState(null);
  const [reclink,setreclink] =useState(null)
  const [fert,setfert] =useState(null)

  const [user, setuser] =useState(null)
  const [authorized, setauthorized] = useState(false)

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5000/recommend-crop",
        inputs
      );
      setRecommendedCrop(response.data.crop1);
      setreclink(response.data.link);
      setfert(response.data.fertilizer);
      console.log(response.data)
      // Swal.fire({
      //   icon: "success",
      //   title: `Hurray! ${user.displayName}`,
      //   text: `We really suggest that you plant the ${recommendedCrop.toUpperCase()} crop. 
      //   You can use ${fert} to improve your yields .`,
      // });
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `An error occurred. Please check the values or try again later.`,
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user)
        setauthorized(true)
        console.log('Hello', user.displayName, user)
      }
      else{
        setuser(null)
        setauthorized(false)
        console.log("youo are logged out")
        navigate('/login')
      }
    })
  }, [])

  useEffect(() => {
    if (recommendedCrop && fert) {
        Swal.fire({
            icon: "success",
            title: `Hurray! ${user.displayName}`,
            text: `We really suggest that you plant the ${recommendedCrop.toUpperCase()} crop. 
            You can use ${fert} to improve your yields.`,
        });
    } else if (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `An error occurred. Please check the values or try again later.`,
        });
    }
}, [recommendedCrop, fert, error]);



// const [inputs, setInputs] = useState({
//     district: "",
//     soil_color: "",
//     nitrogen: "",
//     phosphorous: "",
//     potassium: "",
//     ph: "",
//     rainfall: "",
//     temperature: "",
//   });

//   const [recommendedCrop, setRecommendedCrop] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInputs((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/recommend-crop",
//         inputs
//       );
//       setRecommendedCrop(response.data.crop);
//     } catch (error) {
//       console.error("Error:", error);
//       setError("An error occurred. Please try again later.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

  const inputClass="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-500"



  return (
    <div className="bg-bgGreen min-h-screen h-full">
      <Navbar />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold p-5 text-YellowText">Crop Recommendation</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="my-8 flex flex-col justify-center items-center">
          <div className="flex flex-wrap gap-4 justify-center">
            {/*<div className="w-[45%]">
              <p className="font-semibold">District Name</p>
              <input
                type="text"
                name="district"
                value={inputs.district}
                onChange={handleChange}
                placeholder="District Name"
                className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="w-[45%]">
              <p className="font-semibold">Soil Colour</p>
              <input
                type="text"
                name="soil_color"
                value={inputs.soil_color}
                onChange={handleChange}
                placeholder="Soil Colour"
                className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-[45%]">
              <p className="font-semibold">Nitrogen</p>
              <input
                type="number"
                step="0.01"
                name="nitrogen"
                value={inputs.nitrogen}
                onChange={handleChange}
                placeholder="Nitrogen"
                className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="w-[45%]">
              <p className="font-semibold">Phosphorous</p>
              <input
                type="number"
                step="0.01"
                name="phosphorous"
                value={inputs.phosphorous}
                onChange={handleChange}
                placeholder="Phosphorous"
                className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="w-[45%]">
              <p className="font-semibold">Potassium</p>
              <input
                type="number"
                step="0.01"
                name="potassium"
                value={inputs.potassium}
                onChange={handleChange}
                placeholder="potassium"
                className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="w-[45%]">
              <p className="font-semibold">pH value</p>
              <input
                type="number"
                step="0.01"
                name="ph"
                value={inputs.ph}
                onChange={handleChange}
                placeholder="ph"
                className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="w-[45%]">
              <p className="font-semibold">Rainfall</p>
              <input
                type="number"
                step="0.01"
                name="rainfall"
                value={inputs.rainfall}
                onChange={handleChange}
                placeholder="rainfall"
                className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="w-[45%]">
              <p className="font-semibold">Temperature</p>
              <input
                type="number"
                step="0.01"
                name="temperature"
                value={inputs.temperature}
                onChange={handleChange}
                placeholder="temperature"
                className="w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:border-blue-500"
              />
            </div> */}

            <div className="w-[45%]">
              <p className="font-semibold text-white">Enter Nitrogen values:</p>
              <input
                  type="number"
                  step="1"
                  name="nitrogen"
                  value={inputs.nitrogen}
                  onChange={handleChange}
                  placeholder="Nitrogen"
                  className={inputClass}
                  min='0'
              />
            </div>
            <div className="w-[45%]">
              <p className="font-semibold text-white">Enter Phosphorous values: </p>
          <input
              type="number"
              step="0.01"
              name="phosphorous"
              value={inputs.phosphorous}
              onChange={handleChange}
              placeholder="Phosphorous"
              className={inputClass}
              min='0'
          />
          </div>

          <div className="w-[45%]">
              <p className="font-semibold text-white">Enter Potassium values:</p>
          <input
              type="number"
              step="0.01"
              name="potassium"
              value={inputs.potassium}
              onChange={handleChange}
              placeholder="potassium"
              className={inputClass}
              min='0'
          />
          </div>

          <div className="w-[45%]">
              <p className="font-semibold text-white">Enter Temperature:</p>
          <input
              type="number"
              step="0.01"
              name="temperature"
              value={inputs.temperature}
              onChange={handleChange}
              placeholder="temperature"
              className={inputClass}
              min='0'
          />
          </div>
          
          <div className="w-[45%]">
              <p className="font-semibold text-white">Enter Humidity:</p>
          <input
              type="number"
              step="0.01"
              name="humidity"
              value={inputs.humidity}
              onChange={handleChange}
              placeholder="Humidity"
              className={inputClass}
              min='0'
          />
          </div>
          <div className="w-[45%]">
              <p className="font-semibold text-white">Enter pH value:</p>
          <input
              type="number"
              step="0.1"
              name="ph"
              value={inputs.ph}
              onChange={handleChange}
              placeholder="ph"
              className={inputClass}
              min='0'
              max='14'
          />
          </div>
          <div className="w-[45%]">
              <p className="font-semibold text-white">Enter Rainfall:</p>
          <input
              type="number"
              step="0.01"
              name="rainfall"
              value={inputs.rainfall}
              onChange={handleChange}
              placeholder="rainfall"
              className={inputClass}
              min='0'
          />
          </div>
          
          </div>
          <button
            type="submit"
            className="m-4 p-2 w-1/2  bg-buttonYellow text-bgGreen rounded-full shadow-2xl font-semibold hover:bg-YellowText focus:outline-none focus:bg-YellowText"
          >
            {isLoading ? "Getting Recommendations..." : "Get Recommendations"}
          </button>
        </form>

        {/* units */}

        
        
        <div class="flex flex-col m-10">
        <h2 class="text-2xl font-bold mb-4 text-textGreen">Units for the inputs are:</h2>
        <table class="table-auto flex flex-col justify-center items-center ">
            
            <tbody className='bg-textGreen border-lightBrown border-4 rounded-xl p-3'>
                <tr>
                    <td class="border px-4 py-2"><strong>Nitrogen</strong></td>
                    <td class="border px-4 py-2">kg/ha or ppm</td>
                </tr>
                <tr>
                    <td class="border px-4 py-2"><strong>Phosphorus</strong></td>
                    <td class="border px-4 py-2">kg/ha or ppm</td>
                </tr>
                <tr>
                    <td class="border px-4 py-2"><strong>Potassium</strong></td>
                    <td class="border px-4 py-2">kg/ha or ppm</td>
                </tr>
                <tr>
                    <td class="border px-4 py-2"><strong>Temperature</strong></td>
                    <td class="border px-4 py-2">Degree Celsius (&deg;C)</td>
                </tr>
                <tr>
                    <td class="border px-4 py-2"><strong>Humidity</strong></td>
                    <td class="border px-4 py-2">xx.yy Percentage (%)</td>
                </tr>
                <tr>
                    <td class="border px-4 py-2"><strong>pH</strong></td>
                    <td class="border px-4 py-2">Integer on scale 0 to 14</td>
                </tr>
                <tr>
                    <td class="border px-4 py-2"><strong>Rainfall</strong></td>
                    <td class="border px-4 py-2">millimeters (mm)</td>
                </tr>
            </tbody>
        </table>
    </div>

        {/* result display */}
        <div className=" text-YellowText">
          {recommendedCrop && !error && (
            <div className="flex flex-col gap-3 items-center justify-between py-2 px-4 border border-gray-300 rounded-md shadow-sm mb-2">
              <h2 className="text-2xl font-semibold mb-2">Recommended Crop</h2>
              <span>
                We suggest you to plant the{" "}
                <b className="text-2xl uppercase">{recommendedCrop}</b> crop
              </span>
              <span>You can use <b className='text-2xl uppercase'>{fert}</b> as the fertilizer to improve the quality of your Yield</span>
            <p>For additional resources, refer : <a className='' href={reclink}>{reclink}</a></p>
            </div>
          )}
        </div>



        
      </div>
      <Footer />
    </div>
  );
};

export default CropRecommendationPage;
