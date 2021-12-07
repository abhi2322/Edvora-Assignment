import React, { useState } from 'react'
import pokeLogo from '../Assets/pokmonLogo.png'
import {Link,useNavigate} from 'react-router-dom';
import ErrorBox from '../components/ErrorBox';
import axios from 'axios';
function LoginScreen() {
    const navigate = useNavigate();
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[error,setError]=useState("")
    const LoginHandler=(event)=>{
        event.preventDefault();
        if(!(email&&password)){
            setError("Enter all input fields")
            return;
         }
         const payload={email:email,password:password}
         axios.post('/api/login',payload)
         .then(response=>{
                if(response.status===200){
                    localStorage.setItem('user',JSON.stringify(response.data));
                    navigate(`/home/:${response.data.first_name}`);
                }
         })
         .catch(err=>{
             console.log(err)
             if(err.response.status===400){
                setError("Invalid credentials")
            }
         })
    }
    return (
        <div className="LoginForm" onSubmit={LoginHandler}>
            <form className="InputField">
                <p className="formTitle">Login</p>
                {error!==""?<ErrorBox errorMessage={error}></ErrorBox>:null}
                <Link className="formSubTitle" to="/signup">Don't have an account?</Link>
                <label>Your Email</label>
                <input type="text" value={email} placeholder="Enter Your Email" onChange={(event)=>{setEmail(event.target.value)}}/>
                <label>Password</label>
                <input type="text" value={password} placeholder="Enter Your Password" onChange={(event)=>{setPassword(event.target.value)}}/>
                <input type="submit"  value="Login" className="btnLogin"/>
            </form>
            <div className="showCase">
            <p className="showCaseTitle">Pokemon Storage- </p>
            <p className="showCaseSubTitle">Save your favourite pokemons</p>
            <img  className="pokeLogo" src={pokeLogo} alt="pokeLogo"></img>
            </div>
        </div>
    )
}

export default LoginScreen;
