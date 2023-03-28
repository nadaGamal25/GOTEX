import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

function App() {

  let routers =createBrowserRouter([
    {index:true,element:<Login/>},
    {path:'register',element:<Register/>},
      {path:'home',element:<Layout/> ,children:[
      {path:'home',element:<Home/>},
    ]}
  ])
  return (
    <>
            <RouterProvider router={routers} />
    </>
  );
}

export default App;
