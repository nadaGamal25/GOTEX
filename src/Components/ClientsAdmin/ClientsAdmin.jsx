import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function ClientsAdmin() {
    useEffect(()=>{
        getClientsAdmin()
      },[])
      const [clientsAdmin,setClientsAdmin]=useState([])
    
      async function getClientsAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/companies/get-all-orders',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const clients = response.data.data;
          console.log(clients)
          setClientsAdmin(clients)
        } catch (error) {
          console.error(error);
        }
      }
  return (
    <>
    <NavAdmin/>
    <div className='p-5' id='content'>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> الشركة</th>
            <th scope="col">رقم تتبع الشحنة</th>
            <th scope="col">العميل </th>
            <th scope="col">الهاتف </th>
            <th scope="col">الايميل </th>
            
          </tr>
        </thead>
        <tbody>
          {clientsAdmin.map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item.company?<td>{item.company}</td>:''}
                {item.data.orderTrackingNumber?<td>{item.data.orderTrackingNumber}</td>:''}
                {item.user && item.user.name ? <td>{item.user.name}</td> : ''}
                {item.user && item.user.mobile?<td>{item.user.mobile}</td>:''}
                {item.user && item.user.email?<td>{item.user.email}</td>:''}

{/*                 
                <td>{item.data.waybill} {item.data.orderTrackingNumber}</td>
                <td>{item.user.name}</td>
                <td>{item.user.mobile}</td>
                <td>{item.user.email}</td> */}
              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div>
         </div>
    </>
  )
}
