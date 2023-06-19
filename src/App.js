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
import AramexEdit from './Components/AramexEdit/AramexEdit';
import MarketerSignUp from './Components/MarketerSignUp/MarketerSignUp';
import EmailTemplate from './Components/EmailTemplate/EmailTemplate';
import SmsaEdit from './Components/SmsaEdit/SmsaEdit';
import SmsaShippments from './Components/SmsaShippments/SmsaShippments';
import VerifyUser from './Components/VerifyUser/VerifyUser';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import ErrorBoundary from './Components/ErrorBoundary';
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
    console.log(userData)
  }

  let routers =createBrowserRouter([
    {index:true,element:<Login saveUserData={saveUserData} setuserData={setuserData} userData={userData}/>},
    {path:'register',element:<RegisterForm setuserData={setuserData} userData={userData} />},
    {path:'marketerSignUp',element:<MarketerSignUp/>},
    {path:'verifyUser',element:<ErrorBoundary><VerifyUser/></ErrorBoundary>},
    // {path:'admin',element:<ProtectedRoute userData={userData}><Admin/></ProtectedRoute>},
    {path:'companiesAdmin',element:<ErrorBoundary><ProtectedRoute userData={userData}><CompaniesAdmin/></ProtectedRoute></ErrorBoundary>},
    {path:'clientsAdmin',element:<ErrorBoundary><ProtectedRoute userData={userData}><ClientsAdmin/></ProtectedRoute></ErrorBoundary>},
    {path:'saeeEdit',element:<ErrorBoundary><ProtectedRoute userData={userData}><SaeeEdit/></ProtectedRoute></ErrorBoundary>},
    {path:'gltEdit',element:<ErrorBoundary><ProtectedRoute userData={userData}><GltEdit/></ProtectedRoute></ErrorBoundary>},
    {path:'aramexEdit',element:<ErrorBoundary><ProtectedRoute userData={userData}><AramexEdit/></ProtectedRoute></ErrorBoundary>},
    {path:'smsaEdit',element:<ErrorBoundary><ProtectedRoute userData={userData}><SmsaEdit/></ProtectedRoute></ErrorBoundary>},
    {path:'userListAdmin',element:<ErrorBoundary><ProtectedRoute userData={userData}><UsersListAdmin/></ProtectedRoute></ErrorBoundary>},
    {path:'addDepositAdmin',element:<ErrorBoundary><ProtectedRoute userData={userData}><AddDepositAdmin/></ProtectedRoute></ErrorBoundary>},
      {path:'/',element:<Layout setuserData={setuserData} userData={userData}/> ,children:[
      // {path:'home',element:<ProtectedRoute userData={userData}><Home /></ProtectedRoute> },
      {path:'/companies',element:<ErrorBoundary><ProtectedRoute userData={userData}><Companies userData={userData}/></ProtectedRoute></ErrorBoundary>},
      // {path:'/clients',element:<ProtectedRoute userData={userData}><Clients/></ProtectedRoute>},
      // {path:'/addclient',element:<ProtectedRoute userData={userData}><AddClient/></ProtectedRoute>},
      {path:'/payment',element:<ErrorBoundary><ProtectedRoute userData={userData}><Payment/></ProtectedRoute></ErrorBoundary>},
      {path:'/shipments',element:<ErrorBoundary><ProtectedRoute userData={userData}><Shipments/></ProtectedRoute></ErrorBoundary>},
      {path:'/shipmentForms',element:<ErrorBoundary><ProtectedRoute userData={userData}><ShipmentForms userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/saeeShipments',element:<ErrorBoundary><ProtectedRoute userData={userData}><SaeeShipments userData={userData}/></ProtectedRoute></ErrorBoundary>},
      // {path:'/gltShipment',element:<ErrorBoundary><ProtectedRoute userData={userData}><GltShipments/></ProtectedRoute>},
      {path:'/aramexShipment',element:<ErrorBoundary><ProtectedRoute userData={userData}><AramexShippments userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/smsaShipment',element:<ErrorBoundary><ProtectedRoute userData={userData}><SmsaShippments userData={userData}/></ProtectedRoute></ErrorBoundary>},
      {path:'/gltOrders',element:<ErrorBoundary><ProtectedRoute userData={userData}><GltOrdersShipment userData={userData}/></ProtectedRoute></ErrorBoundary>}
    ]},
    {path:'*', element:<PageNotFound/>}
  ])
  return (
    <>
            <RouterProvider router={routers} />
    </>
  );
}

export default App;
