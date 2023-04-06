import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Companies from './Components/Companies/Companies';
import Clients from './Components/Clients/Clients';
import AddClient from './Components/AddClient/AddClient';
import Payment from './Components/Payment/Payment';
import Shipments from './Components/Shipments/Shipments';
function App() {

  let routers =createBrowserRouter([
    {index:true,element:<Login/>},
    {path:'register',element:<Register/>},
      {path:'/',element:<Layout/> ,children:[
      {path:'home',element:<Home/>},
      {path:'/companies',element:<Companies/>},
      {path:'/clients',element:<Clients/>},
      {path:'/addclient',element:<AddClient/>},
      {path:'/payment',element:<Payment/>},
      {path:'/shipments',element:<Shipments/>},
    ]}
  ])
  return (
    <>
            <RouterProvider router={routers} />
    </>
  );
}

export default App;
