import Navbar from "./Navbar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { app } from "../config/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(app);

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const docRef = await addDoc(collection(db, "customer-query"), {
        name: name,
        email: email,
        subject: subject,
        message: message,
      });
      console.log("Document written with ID: ", docRef.id);
      setEmail("");
      setmessage("");
      setname("");
      setsubject("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className=" justify-center h-full min-h-screen font-Poppins shadow-2xl bg-bgGreen items-center text-green-200">
      <Navbar />

      <div className="flex flex-col items-center justify-center m-2 ">
        <div className="py-4 px-8  shadow-2xl rounded-3xl backdrop-blur-sm bg-opacity-25 bg-white">
          <div className="flex justify-center flex-col">
            <p>Name</p>
            <div className="flex w-full items-center">
              <input
                name="name"
                placeholder="Enter your Name"
                className="bg-yellow-50  w-full rounded-md my-2 p-1 bg-opacity-20 text-white"
                type="text"
                onChange={(e) => setname(e.target.value)}
                value={name}
              />
            </div>
          </div>
          <div className="flex justify-center flex-col">
            <p>Email</p>
            <div className="flex w-full items-center">
              <input
                name="email"
                placeholder="Enter your email"
                className="bg-yellow-50 w-full  rounded-md my-2 p-1 bg-opacity-20 text-white"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>
          <div className="flex justify-center flex-col">
            <p>Subject</p>
            <div className="flex w-full items-center">
              <input
                name="name"
                placeholder="Subject of query"
                className="bg-yellow-50 w-full rounded-md my-2 p-1 bg-opacity-20 text-white"
                type="text"
                onChange={(e) => setsubject(e.target.value)}
                value={subject}
              />
            </div>
          </div>
          <div>
            <p>Query</p>
            <div className="flex w-full items-center">
              <textarea
                name="message"
                placeholder="Enter your password"
                cols="50"
                rows="3"
                className="bg-yellow-50 rounded-md my-2 p-1 bg-opacity-20 text-white"
                onChange={(e) => setmessage(e.target.value)}
                value={message}
              />
            </div>
          </div>

          <div className="w-full">
            <Link to="/" className="">
              <button
                onClick={handleSubmit}
                className="p-2 my-5 rounded-full w-full  text-center bg-buttonYellow text-bgGreen text-xl font-semibold "
              >
                Submit Query
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
