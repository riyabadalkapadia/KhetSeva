import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const FindLAbs = () => {
  return (
    <div className="flex flex-col bg-bgGreen h-full min-h-screen">
      <Navbar />
      <div className="flex justify-center m-3 p-3 rounded border border-YellowText bg-green-500 bg-opacity-20 text-white font-semibold text-lg">
        <p>Please find the nearby places to test the soil. </p>
      </div>
      <div className="flex p-3 justify-center items-center">
        <iframe
          title="Labs near me"
          className=" h-[300px] w-[300px]"
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d60275.44386846441!2d72.81113548027066!3d19.229448942885835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1ssoil%20testing%20lab%20near%20me!5e0!3m2!1sen!2sin!4v1715582225241!5m2!1sen!2sin "
          style={{
            border: "2px",
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade",
          }}
        ></iframe>
      </div>
      <div className="flex justify-center m-3 p-3 rounded border border-YellowText bg-green-500 bg-opacity-20 text-white font-semibold text-lg">
        <p>
          Need help?{" "}
          <Link to="/contact" className="underline font-bold">
            Contact us
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default FindLAbs;
