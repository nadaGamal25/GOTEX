import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function UsersListAdmin() {
    useEffect(()=>{
        getUsersListsAdmin()
      },[])
      const [usersListAdmin,setUsersListsAdmin]=useState([])
    
      async function getUsersListsAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/admin/get-all-users',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const usersList = response.data.data;
          console.log(usersList)
          setUsersListsAdmin(usersList)
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
            <th scope="col">id_المسخدم</th>
            <th scope="col"> المحفظة </th>
            <th scope="col">اسم المستخدم </th>
            <th scope="col">الهاتف </th>
            <th scope="col">الايميل </th>
            <th scope="col">العنوان </th>
            
          </tr>
        </thead>
        <tbody>
          {usersListAdmin.map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item._id?<td>{item._id}</td>:<td>_</td>}
                {item.wallet?<td>{item.wallet}</td>:<td>0</td>}
                {item.name? <td>{item.name}</td> :<td>_</td>}
                {item.mobile?<td>{item.mobile}</td>:<td>_</td>}
                {item.email?<td>{item.email}</td>:<td>_</td>}
                {item.address?<td>{item.address}</td>:<td>_</td>}
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
