import React from "react";
import { Link } from "react-router-dom";
// import footerbg from '../assets/footerbg.png';
import logo from '../assets/logo.svg'

const Footer = () => {
  return (
    <>
      <div className="flex w-full font-Poppins  py-3 px-10 bg-lightBrown text-green-200" >
        <div className="p-3 flex-1 ">
          <h2 className="font-semibold mb-4 "> Quick Links</h2>
          <ul>
            <li className="hover:scale-105 transition-all duration-500">
              <Link to={"/"}>Home</Link>
            </li>
            <li className=" hover:scale-105 transition-all duration-500 ">
              <Link to={"/crop-recommendation"}>Crop Recommendation</Link>
            </li>
            <li className=" hover:scale-105 transition-all duration-500 ">
              <Link to={"/plant-disease-detection"}>
                Plant Disease Detection
              </Link>
            </li>
            <li className="hover:scale-105 transition-all duration-500 ">
              <Link to={"/guidelines"}>Guidelines</Link>
            </li>
            <li className="hover:scale-105 transition-all duration-500 ">
              <Link to={"/find-labs"}>Find Labs</Link>
            </li>
          </ul>
        </div>

        {/* col 2 */}
        <div className='flex-1 justify-center items-center flex'>
          <img src={logo} alt="" />
        </div>

        {/* col 3 */}
        <div className="flex-1 flex p-3 items-center">
          <div className="w-full text-right flex flex-col font-Poppins">
            <p className="mt-5 ">Designed and Developed by</p>
            {/* <h2 className="font-Poppins text-xs mt-2">
              Department Of Computer Engineering
            </h2>
            <h2 className="font-semibold text-sm">
              K.J Somaiya Institute of Technology
            </h2> */}
            <p className="font-Poppins font-semibold mt-2">
              Jash Joshi
            </p>
            <p className="font-semibold ">
              Riya Kapadia
            </p>
            
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full p-12 font-Poppins  bg-bgGreen  text-green-200  py-6" >     
      <p className="text-sm text">
              All Rights Reserved | {new Date().getFullYear()}
            </p>      
      {/* style={{ backgroundImage: `url(${footerbg})`}} */}
        {/* <div className=" text-center flex-col items-center my-3 flex-1  ">
          <p className="font-bold text-2xl text-YellowText"> Under the guidance of</p>
          <div className=" font-m my-2 text-xl">
            <div className="hover:scale-105 transition-all duration-500">
              <a
                href="https://www.linkedin.com/in/sarita-ambadekar-699030146/"
                target="_blank"
               
              >
                Prof. Nisha Vanjari
              </a>
            </div>
          </div>

          <br></br>
        </div> */}
        {/* <br></br> */}
  {/*      <div className="flex flex-col flex-wrap gap-6 flex-1 text-center ">
          <h2 className="font-bold text-2xl flex-col text-YellowText ">Developed by</h2>
          <div className="flex justify-center gap-5">
          <div className="text-xl hover:scale-105 transition-all duration-500">
            <a href="https://linkedin.com/in/jash-joshi01/" target="_blank">
              Jash J. Joshi
            </a>
          </div>

          <div className="text-xl hover:scale-105 transition-all duration-500">
            <a
              href="https://linkedin.com/in/riya-kapadia-a571401bb/"
              target="_blank"
            >
              Riya Kapadia
            </a>
          </div>
          <div className="text-xl hover:scale-105 transition-all duration-500">
            <a href="https://linkedin.com/in/venu-chaudhari" target="_blank">
              Venu Chaudhari
            </a>
          </div>
          </div>
          
        </div> */}
      </div>
    </>
  );
};

export default Footer;
