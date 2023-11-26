import './App.css';
import Home from './pages/Home';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import PostState from './components/context/post/postState';
import UserState from './components/context/user/userState';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home></Home>
      ),
    },
    {
      path: "/login",
      element: (
        <Login></Login>
      ),
    },
    {
      path: "/signup",
      element: (
        <Signup></Signup>
      ),
    },
  ]);

  return (
    <div className="App">
      <UserState>
      <PostState>
       <RouterProvider router={router} />
       </PostState>
       </UserState>
    </div>
  );
}

export default App;
