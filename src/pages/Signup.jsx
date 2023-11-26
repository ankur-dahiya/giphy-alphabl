import React, { useState } from 'react'
import {auth} from "../components/firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

function Signup() {
    const [loginDetails,setLoginDetails] = useState({email:"",name:"",password:""});
    function setVal(e){
        setLoginDetails({...loginDetails,[e.target.id] :e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const {user} = await createUserWithEmailAndPassword(auth, loginDetails.email, loginDetails.password)
            // updating profile
            if(loginDetails.name){
                await updateProfile(user, {
                displayName: loginDetails.name,
            });
            console.log(user);
            }
        }
        catch(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        };
    }
  return (
    <div>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input type='email' id="email" value={loginDetails.email} onChange={e=>setVal(e)}></input>
            <input type='text' id="name" value={loginDetails.name} onChange={e=>setVal(e)}></input>
            <input type='password' id="password" value={loginDetails.password} onChange={e=>setVal(e)}></input>
            <input type='submit' value="submit"></input>
        </form>
    </div>
  )
}

export default Signup