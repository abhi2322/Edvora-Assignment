import React, { useState } from 'react'
import pokeLogo from '../Assets/pokmonLogo.png'
import {Link} from 'react-router-dom';
function LoginScreen() {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const LoginHandler=(event)=>{
        console.log(email,password)
        event.preventDefault();
    }
    return (
        <div className="LoginForm" onSubmit={LoginHandler}>
            <form className="InputField">
                <p className="formTitle">Login</p>
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
