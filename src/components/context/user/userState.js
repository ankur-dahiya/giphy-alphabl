import { useState } from "react";
import {auth} from "../../../components/firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import userContext from "./userContext";

const UserState = (props)=>{
  const loginUser = async (email,password)=>{
    try{
      const {user} = await signInWithEmailAndPassword(auth, email, password);
      if(user.email===email){
        setUserState({
              name : user.displayName,
              email : user.email
          });
      }
      else{
        setUserState(null);
          return Promise.reject("Wrong Credentials");
      }
  }
  catch(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
  };
}

  const signupUser = async (email,password,name)=>{
    try{
      const {user} = await createUserWithEmailAndPassword(auth, email, password)
      // updating profile (setting name)
      if(name){
          await updateProfile(user, {
              displayName: name,
          });
      }
      setUserState({
        name : user.displayName,
        email : user.email
    });
  }
  catch(error){
    return Promise.reject("Error Occured");
  };
  }

  const userLogout = ()=>{
    setUserState(null);
  }

  const [userState,setUserState] = useState(null);

    return (
        <userContext.Provider value={{loginUser,signupUser,userState,setUserState,userLogout}}>
        {props.children}
        </userContext.Provider>
    );
}

export default UserState;