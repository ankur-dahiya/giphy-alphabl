import { useContext, useState } from "react";
import { auth } from "../../../components/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import userContext from "./userContext";

const UserState = (props) => {
  //login user with email and password
  const loginUser = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user.email === email) {
        // if user is authenticated update user state
        setUserState({
          name: user.displayName,
          email: user.email,
        });
      } else {
        setUserState(null);
        return Promise.reject("Wrong Credentials");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  // signup user using email pass and name
  const signupUser = async (email, password, name) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // updating profile (setting name)
      if (name) {
        await updateProfile(user, {
          displayName: name,
        });
      }
      //setting current user as loggedin user
      setUserState({
        name: user.displayName,
        email: user.email,
      });
    } catch (error) {
      return Promise.reject("Error Occured");
    }
  };

  //logout user
  const userLogout = () => {
    setUserState(null);
  };

  //current user state contains email and name
  const [userState, setUserState] = useState(null);

  return (
    <userContext.Provider
      value={{ loginUser, signupUser, userState, setUserState, userLogout }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
