import React, {useRef} from "react";
import plant from "../assets/Plant.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HowToUse from "./HowToUse";
import { Link } from "react-router-dom";





function HomePage() {
  const explore = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar />
      <div className="bg-bgGreen min-h-screen flex flex-col h-full justify-center  items-center w-full">
        <div className="text-center">
          <div className="flex justify-between m-10 items-center align-middle">
            <div className="flex-1 text-left">
              <p className="text-YellowText text-6xl font-bold">
                Rooted in Tradition, Powered by Technology
              </p>
              <p className="text-textGreen my-6 text-xl">
                From crop recommendations to soil analysis, we're here to
                nurture your harvest dreams and sow the seeds of sustainability
                together!
              </p>
              <button onClick={() => scrollToSection(explore)} className="p-4 px-8 my-8 rounded-full text-xl font-bold  bg-buttonYellow ">
                Explore More
              </button>
            </div>
            <div className="flex-1 shadow-2xl rounded-full flex justify-center bg-lightBrown">
              <img src={plant} alt="" className="p-8" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 my-10 flex-col border-t-2 m-10 border-textGreen" ref={explore}>
          <HowToUse
            title="Crop Recommendation"
            description="The process of advising farmers on suitable crops to cultivate based on factors such as Nitrogen, Phosphorous, Potassium, Temperature, Humidity,pH and Rainfall and agronomic practices, with the aim of maximizing yield, profitability, and sustainability.
Watch the video to know how to use for the better and the maximum utilization of the crop recommendation."
          />
          <HowToUse
            flexDirection="flex-row-reverse"
            title="Plant Disease"
            description="Plant disease detection involves the identification and diagnosis of diseases affecting crop This process typically employs various techniques such as visual inspection and symptom analysis. The goal of plant disease detection is to accurately identify the causal agents of diseases early on, allowing for timely and effective management strategies to minimize crop losses and maintain plant health. The video includes details to optimal use of the plant disease detection."
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
