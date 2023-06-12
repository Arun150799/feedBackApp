import React from 'react'
import {useNavigate,Link} from "react-router-dom";
import './Nav.css';
import userProfile from '../assets/userProfile.png';

const Nav = () => {
    const navigate = useNavigate("")
    const auth = localStorage.getItem("user")

    const hadnleLogut = () => {
        localStorage.clear()
        navigate("/")
    
      }


  return (
    <ul className="header">
        <p className='title'>Feedback</p>
    <li>{auth ?
      <>
        <Link to="/" className='logout' onClick={hadnleLogut}>Logout</Link>
        <li><Link to="/" className='userName'>{JSON.parse(auth).name}</Link></li>
        <img src={userProfile} className='userProfile' alt=''/>
      </>
      :
      <>
        <li ><Link to="/login" className="Login"> Log in</Link></li>
        <li ><Link to="/register" className="register">Sign up </Link></li>


      </>
    }
    </li>

  </ul>
  )
}

export default Nav
