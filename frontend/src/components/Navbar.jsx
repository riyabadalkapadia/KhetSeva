import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

import { app } from '../config/firebase';
import {getAuth , onAuthStateChanged, signOut} from 'firebase/auth'

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const auth = getAuth(app)

function Navbar() {

  const [user, setuser] =useState(null)
  const [authorized, setauthorized] = useState(false)
  const [active, setactive] = useState('/')

  useEffect(() => {
    setactive(window.location.pathname)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user)
        setauthorized(true)
        console.log('Hello', user)
      }
      else{
        setuser(null)
        setauthorized(false)
        console.log("youo are logged out")
      }
    })
  }, [])
  

  const activeLink=  'text-xl font-semibold bg-lightBrown p-2 rounded-full' 
  const inactiveLink= 'text-lg font-semibold '


  

  return (
    <div className="flex justify-between shadow-2xl bg-bgGreen items-center text-green-200 p-4">
      <div className=''>
      <Link to="/" ><img src={logo} alt="" className='max-h-12'/> </Link>
      </div>
      <div className='flex items-center gap-4'>
        <Link to="/" className={active=='/' ?activeLink : inactiveLink }>Home</Link>
        <Link to="/find-labs" className={active=='/find-labs' ? activeLink : inactiveLink}>Find Labs</Link>
        <Link to="/crop-recommendation" className={active=='/crop-recommendation' ? activeLink : inactiveLink}>Crop Recommendation</Link>
        <Link to="/plant-disease-detection" className={active=='/plant-disease-detection' ? activeLink : inactiveLink}>Plant Disease Detection</Link>
        <Link to="/contact" className={active=='/contact' ? activeLink : inactiveLink}>Contact Us</Link>
        { !authorized 
            ?

            <Link to="/login" className='p-2 px-4 rounded-full  bg-buttonYellow text-bgGreen text-lg font-semibold  '>Login</Link>
            :
            <button onClick={() => signOut(auth)} className='flex justify-center items-center gap-2 p-2 rounded-full  bg-buttonYellow text-bgGreen text-xl font-semibold'>
              <div className='rounded-full w-8 h-8 bg-yellow-100'>
                {user.photoURL ? <img src={user.photoURL} alt="user's profile image" className='rounded-full w-8 h-8'/>
                :
                <p className='uppercase font-black text-2xl'>{user.email[0]}</p> }
                
              </div>
              <LogoutRoundedIcon/>
            </button>
            
        }
      </div>
    </div>
  );
}

export default Navbar;



