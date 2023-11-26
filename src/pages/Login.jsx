import React, { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import userContext from "../components/context/user/userContext.js";
import "./login.css";
import postContext from "../components/context/post/postContext.js";
import { Loader } from "@giphy/react-components";
function Login() {
  const navigate = useNavigate();
  const { setLoading, loading } = useContext(postContext);
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const { loginUser, userState } = useContext(userContext);
  function setVal(e) {
    setLoginDetails({ ...loginDetails, [e.target.id]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await loginUser(loginDetails.email, loginDetails.password);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
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
            <h1>Login</h1>
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
              Login
            </button>
          </form>
          <p className="sign-up-text">
            Don't have an account?<Link to="/signup"> Sign Up</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
