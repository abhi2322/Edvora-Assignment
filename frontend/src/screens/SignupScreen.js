import React, { useState } from 'react';
import {Link,useNavigate } from 'react-router-dom';
import pokeLogo from '../Assets/pokmonLogo.png';
import ErrorBox from '../components/ErrorBox';
import axios from 'axios';

function SignupScreen(props) {
    const navigate = useNavigate();
    const[firstName,setFirstName]=useState("")
    const[lastName,setLastName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[repassword,setRePassword]=useState("")
    const[error,setError]=useState("")

    const SignUpHandler=(event)=>{
        event.preventDefault();
        if (!(password.match(/^(?=[^A-Z]*[A-Z])(?=[^!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]*[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~])(?=\D*\d).{8,}$/))) {
            setError("The password must include uppercase and lowercase letters numbers and symbols and must have atleat 8 characters");
            return;
         }

         if(password!==repassword){
             setError("Both the passwords dont match")
             return;
         }
         if(!(email&&password&&firstName&&lastName)){
            setError("Enter all input fields")
            return;
         }
        const payload={first_name:firstName,last_name:lastName,email:email,password:password}
         axios.post('/api/register',payload)
         .then(response=>{
                if(response.status===201){
                    localStorage.setItem('user',JSON.stringify(response.data));
                    navigate('/home');
                }
         })
         .catch(err=>{
             console.log(err)
             if(err.response.status===409){
                setError("User Already Exist. Please Login")
            }
         })


    }
    return (
        <div className="LoginForm " onSubmit={SignUpHandler}>
            <form className="InputField signUp">
                <p className="formTitle">Sign Up</p>
                <Link className="formSubTitle" to="/">Already have an account?</Link>
                {error!==""?<ErrorBox errorMessage={error}></ErrorBox>:null}
                <label>First Name</label>
                <input type="text" value={firstName} placeholder="Enter Your First Name" onChange={(event)=>{setFirstName(event.target.value)}}/>
                <label>Last Name</label>
                <input type="text" value={lastName} placeholder="Enter Your Last Name" onChange={(event)=>{setLastName(event.target.value)}}/>
                <label>Your Email</label>
                <input type="email" value={email} placeholder="Enter Your Email" onChange={(event)=>{setEmail(event.target.value)}}/>
                <label>Password</label>
                <input type="text" value={password} placeholder="Enter Your Password" onChange={(event)=>{setPassword(event.target.value);setError("")}}/>
                <label>Repeat Password</label>
                <input type="text" value={repassword} placeholder="Enter Your Password Again" onChange={(event)=>{setRePassword(event.target.value);setError("")}}/>
                <input type="submit"  value="Sign Up" className="btnLogin"/>
            </form>
            <div className="showCase">
            <p className="showCaseTitle">Pokemon Storage- </p>
            <p className="showCaseSubTitle">Save your favourite pokemons</p>
            <img  className="pokeLogo" src={pokeLogo} alt="pokeLogo"></img>
            </div>
        </div>
    )
};

export default SignupScreen;
