import React, { useState ,useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import './SignUp.css';
import userPic from '../assets/user.png';
import emailPic from '../assets/email.png';
import mobilePic from '../assets/mobile.png';
import passwordPic from '../assets/password.png';
import Login from './Login';



const SignUp = () => {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[number,setNumber] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect (()=>{
        const auth = localStorage.getItem("user")
          if(auth){
            navigate("/")
          }
       },[])
      
        const collectData =async() => {
          console.log(name, email, number, password);
      
          let result = await fetch('https://deshing-doc.onrender.com/register',{
            method:"post",
            body: JSON.stringify({name,email,number,password}),
            headers: { 
              "content-type": "application/json"
          }
          })
          result = await result.json();
              console.log(result);
              if(result){ 
                navigate("/")
              }
              localStorage.setItem('user', JSON.stringify(result))
        }
      

  return (
    <div className='body1'>
      <p className='appName'>Feedback</p>
        <p className='appText'>Add your products and give us your valuable feedback</p>
      <div className='portion1'> 
      <img src={userPic} className='userPic'alt='' /> 
        <input type='text' value={name} placeholder='Name ' className='inputSignUp1' onChange={(e)=>setName(e.target.value)}/><br/>
        <img src={emailPic}  className='emailPic' alt=''/> 

        <input type='email' value={email} placeholder='Email ' className='inputSignUp2' onChange={(e)=>setEmail(e.target.value)}/><br/>
        <img src={mobilePic} className='mobilePic' alt=''/> 

        <input type='text' value={number} maxLength={10} placeholder='Mobile ' className='inputSignUp3' onChange={(e)=>setNumber(e.target.value)}/><br/>
        <img src={passwordPic} className='passwordPic' alt=''/> 

        <input type='password' value={password} placeholder='Password ' className='inputSignUp4' onChange={(e)=>setPassword(e.target.value)}/><br/>
        <p className="loginText">Already have an account?</p>

        <a className="loginLink" href="/login" src={<Login/>}>Log in</a>

        <button type='submit' className='signUpButton' onClick={collectData}>SignUp</button>
        </div>

    </div>
  )
}

export default SignUp
