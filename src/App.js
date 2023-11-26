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
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
