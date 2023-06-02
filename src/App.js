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
import ShipmentForms from './Components/ShipmentForms/ShipmentForms';
import Admin from './Components/Admin/Admin';
import GltShipments from './Components/GltShipments/GltShipments';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import { useEffect } from 'react';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import SaeeShipments from './Components/SaeeShipments/SaeeShipments';
import SaeeSticker from './Components/SaeeSticker/SaeeSticker';
import CompaniesAdmin from './Components/CompaniesAdmin/CompaniesAdmin';
import SaeeEdit from './Components/SaeeEdit/SaeeEdit';
import GltEdit from './Components/GltEdit/GltEdit';
import GltOrdersShipment from './Components/GltOrdersShipment/GltOrdersShipment';
import ClientsAdmin from './Components/ClientsAdmin/ClientsAdmin';
import UsersListAdmin from './Components/UsersListAdmin/UsersListAdmin';
import AddDepositAdmin from './Components/AddDepositAdmin/AddDepositAdmin';
import AramexShippments from './Components/AramexShipments/AramexShippments';
function App() {
  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      saveUserData();
    }
  },[])

  const [userData, setuserData] = useState(null)

  function saveUserData(){
    let encodedToken =localStorage.getItem('userToken')
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setuserData(decodedToken)
  }

  let routers =createBrowserRouter([
    {index:true,element:<Login saveUserData={saveUserData} setuserData={setuserData} userData={userData}/>},
    {path:'register',element:<RegisterForm setuserData={setuserData} userData={userData} />},
    {path:'admin',element:<ProtectedRoute userData={userData}><Admin/></ProtectedRoute>},
    {path:'companiesAdmin',element:<ProtectedRoute userData={userData}><CompaniesAdmin/></ProtectedRoute>},
    {path:'clientsAdmin',element:<ProtectedRoute userData={userData}><ClientsAdmin/></ProtectedRoute>},
    {path:'saeeEdit',element:<ProtectedRoute userData={userData}><SaeeEdit/></ProtectedRoute>},
    {path:'gltEdit',element:<ProtectedRoute userData={userData}><GltEdit/></ProtectedRoute>},
    {path:'userListAdmin',element:<ProtectedRoute userData={userData}><UsersListAdmin/></ProtectedRoute>},
    {path:'addDepositAdmin',element:<ProtectedRoute userData={userData}><AddDepositAdmin/></ProtectedRoute>},
    // {path:'saeeSticker',element:<SaeeSticker userData={userData}/>},
      {path:'/',element:<Layout setuserData={setuserData} userData={userData}/> ,children:[
      {path:'home',element:<ProtectedRoute userData={userData}><Home /></ProtectedRoute> },
      {path:'/companies',element:<ProtectedRoute userData={userData}><Companies/></ProtectedRoute>},
      {path:'/clients',element:<ProtectedRoute userData={userData}><Clients/></ProtectedRoute>},
      {path:'/addclient',element:<ProtectedRoute userData={userData}><AddClient/></ProtectedRoute>},
      {path:'/payment',element:<ProtectedRoute userData={userData}><Payment/></ProtectedRoute>},
      {path:'/shipments',element:<ProtectedRoute userData={userData}><Shipments/></ProtectedRoute>},
      {path:'/shipmentForms',element:<ProtectedRoute userData={userData}><ShipmentForms userData={userData}/></ProtectedRoute>},
      {path:'/saeeShipments',element:<ProtectedRoute userData={userData}><SaeeShipments userData={userData}/></ProtectedRoute>},
      {path:'/gltShipment',element:<ProtectedRoute userData={userData}><GltShipments/></ProtectedRoute>},
      {path:'/aramexShipment',element:<ProtectedRoute userData={userData}><AramexShippments/></ProtectedRoute>},
      {path:'/gltOrders',element:<ProtectedRoute userData={userData}><GltOrdersShipment/></ProtectedRoute>}
    ]}
  ])
  return (
    <>
            <RouterProvider router={routers} />
    </>
  );
}

export default App;
