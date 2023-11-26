import React, { useState } from 'react'
import {auth} from "../components/firebase.js";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate} from "react-router-dom";
function Login() {
    const [user,setUser] = useState(null);
    const [loginDetails,setLoginDetails] = useState({email:"",password:""});
    console.log(user);
    function setVal(e){
        setLoginDetails({...loginDetails,[e.target.id] :e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const {user} = await signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password);
            if(user.email===loginDetails.email){
                setUser({
                    name : user.displayName,
                    email : user.email
                });
                console.log(user)
            }
            else{
                setUser(null);
                console.log("Wrong password");
            }
        }
        catch(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        };
    }
  return (
    <div>
        {user?<Navigate to={"/"}/> : <form onSubmit={(e)=>handleSubmit(e)}>
            <input type='email' id="email" value={loginDetails.email} onChange={e=>setVal(e)}></input>
            <input type='password' id="password" value={loginDetails.password} onChange={e=>setVal(e)}></input>
            <input type='submit' value="submit"></input>
        </form>}
    </div>
  )
}

export default Login