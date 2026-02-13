import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

import { app } from "../config/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { useNavigate } from "react-router-dom";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        const user = value.user;
        console.log("User signed in with Email:", user);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("User signed in with Google:", user);
        navigate("/");

        // Redirect or show success message
      })
      .catch((e) => {
        setError(e.message);
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col justify-center h-full min-h-screen font-Poppins shadow-2xl bg-bgGreen items-center text-green-200">
      <div className="flex flex-col items-center justify-center px-12 py-6 shadow-2xl rounded-3xl backdrop-blur-sm bg-opacity-25 bg-white">
        <p className="py-2 text-3xl text-white font-semibold">
          <img src={logo} alt="" className="w-40" />
        </p>
        <div className="flex justify-center flex-col">
          <p>UserName</p>
          <div className="flex w-full items-center">
            <input
              name="email"
              placeholder="Enter your UserName"
              className="bg-yellow-50 rounded-md my-2 p-1 bg-opacity-20 text-white"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        </div>
        <div>
          <p>Password</p>
          <div>
            <input
              name="password"
              placeholder="Enter your password"
              className="bg-yellow-50 rounded-md my-2 p-1 bg-opacity-20 text-white"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>

        <div className="w-full px-6">
          <button
            onClick={loginUser}
            className="p-2 my-5 rounded-full w-full  text-center bg-buttonYellow text-bgGreen text-xl font-semibold "
          >
            Login
          </button>
        </div>
        <div className="font-semibold">
          <p>or</p>
        </div>
        <div className="flex items-center justify-center my-4">
          <button
            onClick={loginWithGoogle}
            className="px-4 py-2 border flex gap-2 bg-white border-slate-900 rounded-lg text-slate-900  hover:border-slate-700  hover:text-slate-700  hover:shadow transition duration-550"
          >
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>Login with Google</span>
          </button>
        </div>
        <div className="flex flex-row align-items-center justify-content-center ">
          <p className="">
            Don't have an account?{" "}
            <a href="/register" className="font-semibold">
              Register Now!
            </a>
          </p>
        </div>
      </div>


      <div className="flex-col justify-center gap-1">
        <div className="flex gap-1">
          <p>Need Help? </p>
          <Link to="/contact" className="underline">
            Contact us
          </Link>
        </div>

        <div className="justify-center flex underline">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
      
    </div>
  );
}

export default LoginPage;
