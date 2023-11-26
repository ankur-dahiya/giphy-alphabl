import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import userContext from "../components/context/user/userContext.js";
import "./login.css";
import postContext from "../components/context/post/postContext.js";
import { Loader } from "@giphy/react-components";

function Signup() {
  const { loading, setLoading } = useContext(postContext);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    name: "",
    password: "",
  });
  const navigate = useNavigate();
  const { signupUser, userState } = useContext(userContext);
  function setVal(e) {
    setLoginDetails({ ...loginDetails, [e.target.id]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signupUser(
        loginDetails.email,
        loginDetails.password,
        loginDetails.name
      );
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="outer-container">
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="login-container">
          {userState && <Navigate to={"/"} />}
          <form onSubmit={(e) => handleSubmit(e)}>
            <h1>Sign Up</h1>
            <div className="form-row">
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="email"
                value={loginDetails.email}
                onChange={(e) => setVal(e)}
              ></input>
              <label htmlFor="email" className="form-label">
                Email
              </label>
            </div>

            <div className="form-row">
              <input
                type="text"
                id="name"
                className="form-input"
                placeholder="name"
                value={loginDetails.name}
                onChange={(e) => setVal(e)}
              ></input>
              <label htmlFor="name" className="form-label">
                Name
              </label>
            </div>

            <div className="form-row">
              <input
                type="password"
                id="password"
                className="form-input"
                placeholder="password"
                value={loginDetails.password}
                onChange={(e) => setVal(e)}
              ></input>
              <label htmlFor="password" className="form-label">
                Password
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          </form>
          <p className="sign-up-text">
            Already have an account?<Link to="/login"> Login</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Signup;
