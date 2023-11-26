import React, { useContext, useState } from 'react'
import {auth} from "../components/firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import userContext from '../components/context/user/userContext.js';

function Signup() {
    const [loginDetails,setLoginDetails] = useState({email:"",name:"",password:""});
    const navigate = useNavigate();
    const {signupUser,userState} = useContext(userContext);
    function setVal(e){
        setLoginDetails({...loginDetails,[e.target.id] :e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await signupUser(loginDetails.email,loginDetails.password,loginDetails.name);
            navigate("/");
        }
        catch(error){
            console.log(error);
        };
    }
  return (
    <div>
        {userState?<Navigate to={"/"}></Navigate> : <form onSubmit={(e)=>handleSubmit(e)}>
            <input type='email' id="email" value={loginDetails.email} onChange={e=>setVal(e)}></input>
            <input type='text' id="name" value={loginDetails.name} onChange={e=>setVal(e)}></input>
            <input type='password' id="password" value={loginDetails.password} onChange={e=>setVal(e)}></input>
            <input type='submit' value="submit"></input>
        </form>}
    </div>
  )
}

export default Signup