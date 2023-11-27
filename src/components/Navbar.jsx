import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import postContext from './context/post/postContext'
import userContext from './context/user/userContext';
import "./navbar.css";

function Navbar({children}) {
  // fetch trending posts
  const {fetchTrendingPost} = useContext(postContext);

  //user state
  const {userLogout,userState} = useContext(userContext);
  return (
    <div >
      {!userState && <Navigate to="/login"></Navigate>}
      <div className='navbar'>
        <p>Hi, {userState?.name || "User"}</p>
        <nav>
            <button className='nav-btn' onClick={()=>fetchTrendingPost(1)}>Trending</button>
            <button className='signout' onClick={()=>userLogout()}>Sign Out</button>
        </nav>
      </div>
        <div>{children}</div>
    </div>
  )
}

export default Navbar