import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { app } from "../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom";

const auth = getAuth(app);

const PlantDiseaseDetectionPage = () => {
  const [image, setImage] = useState(null);
  const [diseaseResult, setDiseaseResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const CLASSES = [
    "Apple scab",
    "Apple Black rot",
    "Apple Cedar apple rust",
    "Apple healthy",
    "Blueberry healthy",
    "Cherry (including sour) Powdery mildew",
    "Cherry (including sour) healthy",
    "Corn (maize) Cercospora leaf spot Gray leaf spot",
    "Corn(maize) Common rust",
    "Corn(maize) Northern Leaf Blight",
    "Corn(maize) healthy",
    "Grape Black rot",
    "Grape Esca(Black Measles)",
    "Grape Leaf blight(Isariopsis Leaf Spot)",
    "Grape healthy",
    "Orange Haunglongbing(Citrus greening)",
    "Peach Bacterial spot",
    "Peach healthy",
    "Bell PepperBacterial_spot",
    "Pepper bell healthy",
    "Potato Early blight",
    "Potato Late blight",
    "Potato healthy",
    "Raspberry healthy",
    "Soybean healthy",
    "Squash Powdery mildew",
    "Strawberry Leaf scorch",
    "Strawberry healthy",
    "Tomato Bacterial spot",
    "Tomato Early blight",
    "Tomato Late blight",
    "Tomato Leaf Mold",
    "Tomato Septoria leaf spot",
    "Tomato Spider mites (Two-spotted spider mite)",
    "Tomato Target Spot",
    "Tomato Yellow Leaf Curl Virus",
    "Tomato mosaic virus",
    "Tomato healthy",
  ];

  const [user, setuser] = useState(null);
  const [authorized, setauthorized] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user);
        setauthorized(true);
        console.log("Hello", user.displayName, user);
      } else {
        setuser(null);
        setauthorized(false);
        console.log("youo are logged out");
        navigate("/login");
      }
    });
  }, []);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select an image file.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      console.log(formData);

      const response = await axios.post(
        "http://localhost:5000/detect-disease",
        formData,
        {
          headers: {},
        }
      );

      setDiseaseResult(response.data.result);
      Swal.fire({
        icon: "success",
        title: "Disease detected",
        text: `our algorithm detected ${diseaseResult} disease`,
      });
      console.log(diseaseResult);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("File:", file);
    setImage(file);
  };

  return authorized ? (
    <div className=" h-full w-full flex flex-col justify-center bg-bgGreen text-white">
      <Navbar />
      <div className=" flex flex-col justify-center items-center">
        <div className="text-4xl font-bold mb-4 p-24 text-YellowText ">
          <p>Plant Disease Detection</p>
        </div>
        <form
          onSubmit={handleImageUpload}
          className=" flex flex-col px-24 mb-24 justify-center "
        >
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="p-6 rounded-lg border text-xl"
            />
          </div>
          <button
            type="submit"
            className="mt-12 mx-12 p-3 bg-YellowText text-bgGreen font-bold text-2xl rounded-md shadow-md hover:bg-yellow-200 focus:outline-none focus:bg-yellow-200"
          >
            {isLoading ? (
              <Spinner animation="grow" role="status" variant="success">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              "Detect Disease"
            )}
          </button>
        </form>
      </div>

      {diseaseResult && (
        <div className="m-10">
          <h2 className="text-3xl font-semibold mb-2">Disease Detected</h2>
          <p className="text-2xl">{diseaseResult}</p>
          <p>{CLASSES.random}</p>
        </div>
      )}
      <Footer />
    </div>
  ) : (
    console.log("pleae login")
  );
};

export default PlantDiseaseDetectionPage;
