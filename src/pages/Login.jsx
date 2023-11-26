import React, { useContext, useState } from 'react'
import {auth} from "../components/firebase.js";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Navigate} from "react-router-dom";
import userContext from '../components/context/user/userContext.js';
function Login() {
    const navigate = useNavigate();
    const [loginDetails,setLoginDetails] = useState({email:"",password:""});
    const {loginUser,userState} = useContext(userContext);
    function setVal(e){
        setLoginDetails({...loginDetails,[e.target.id] :e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            await loginUser(loginDetails.email,loginDetails.password);
            navigate("/");
        }
        catch(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        };
    }
  return (
    <div>
        {userState?<Navigate to={"/"}/> : <form onSubmit={(e)=>handleSubmit(e)}>
            <input type='email' id="email" value={loginDetails.email} onChange={e=>setVal(e)}></input>
            <input type='password' id="password" value={loginDetails.password} onChange={e=>setVal(e)}></input>
            <input type='submit' value="submit"></input>
        </form>}
    </div>
  )
}

export default Login