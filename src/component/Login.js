import React ,{useState,useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import SignUp from './SignUp';
import emailPic from '../assets/email.png'
import passwordPic from '../assets/password.png'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate("")

  useEffect(() => {
    const auth = localStorage.getItem("user")
    if (auth) {
      navigate("/")
    }

  })

  const handleData = async (e) => {
    console.log(email, password);

    let result = await fetch('https://growing-file.onrender.com/login', {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-type": "application/json"
      }
    })
    result = await result.json();
    console.log(result);
    if (result) {
      navigate("/")
    }
    localStorage.setItem('user', JSON.stringify(result))
  }

  return (
    <div className='bodyLogin'>
      <p className='appNameLogin11'>Feedback</p>
        <p className='appTextLogin11'>Add your products and give us your valuable feedback</p>
      <div className='portionLogin'> 
        <img src={emailPic}  className='emailPic77' alt=''/> 

        <input type='email' value={email} placeholder='Email ' className='inputLogIn77' onChange={(e)=>setEmail(e.target.value)}/><br/>

        <img src={passwordPic} className='passwordPic77' alt=''/> 

        <input type='password' value={password} placeholder='Password ' className='inputLogIn78' onChange={(e)=>setPassword(e.target.value)}/><br/>
        <p className="loginText99">Don’t have an account?</p>

        <a className="signupLink99" href="/register" src={<SignUp/>}>Sign up</a>

        <button type='submit' className='loginButton77' onClick={handleData}>Log in</button>
        </div>

    </div>
  )
}

export default Login
