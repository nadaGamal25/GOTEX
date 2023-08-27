import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function MarketerClients() {
    useEffect(()=>{
        getClientsList()
      },[])

      const[clients,setClients]=useState([])


      async function getClientsList() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/daftra/get-markter-clints',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const List = response.data.data
          console.log(List)
          setClients(List)
        } catch (error) {
          console.error(error);
        }
      }
     
      
  return (
    <>
    <div className='p-5' id='content'>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">العميل </th>
            <th scope="col">الهاتف </th>
            <th scope="col">الايميل </th>
            <th scope="col">المدينة </th>
            <th scope="col">العنوان </th>
            <th scope="col">عنوان اضافى </th>
            <th scope="col">رقم العميل </th>
            <th scope="col">id_العميل </th>
            <th scope="col">id_الموظف </th>
            
          </tr>
        </thead>
        <tbody>
          {clients && clients.map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item.Client?<td>{item.Client.first_name} {item.Client.last_name}</td>:<td>_</td>}
                {item.Client.phone1?<td>{item.Client.phone1} ,<br/>
                {item.Client.phone2} </td>:<td>_</td>}
                {item.Client.email?<td>{item.Client.email}</td>:<td>_</td>}
                {item.Client.city?<td>{item.Client.city}</td>:<td>_</td>}
                {item.Client.address1?<td>{item.Client.address1}</td>:<td>_</td>}
                {item.Client.address2?<td>{item.Client.address2}</td>:<td>_</td>}
                {item.Client.client_number?<td>{item.Client.client_number}</td>:<td>_</td>}
                {item.Client.id?<td>{item.Client.id}</td>:<td>_</td>}
                {item.Client.staff_id?<td>{item.Client.staff_id}</td>:<td>_</td>}
                
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
