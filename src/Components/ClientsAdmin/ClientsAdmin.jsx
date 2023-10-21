import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ClientsAdmin() {
    useEffect(()=>{
        getClientsAdmin()
      },[])
      const [clientsAdmin,setClientsAdmin]=useState([])
      const [searchName, setSearchName] = useState('');
      const [searchEmail, setSearchEmail] = useState('');
      const [searchPhone, setSearchPhone] = useState('');
      const [searchCity, setSearchCity] = useState('');
      const [searchID, setSearchID] = useState('');
    
      async function getClientsAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/daftra/clients-get-all',
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
      const filteredClients = clientsAdmin.filter((item) => {
        return (
          (searchPhone === '' || item.Client?.phone1?.includes(searchPhone)) &&
          (searchName === '' || (item.Client?.first_name?.includes(searchName)) )&&
          (searchEmail === '' || item.Client?.email?.includes(searchEmail)) &&
          (searchCity === '' || item.Client?.city.includes(searchCity)) &&
          (searchID === '' || item.Client?.id?.includes(searchID))
         
        );
    
      });
  return (
    <>
    <div className='p-5' id='content'>
    <div className="gray-table p-4 mb-4">
      <div className="row">
        
        <div className="col-md-4">
          <label htmlFor="">اسم العميل:</label>
          <input className='form-control' type="search" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">الايميل:</label>
          <br/><input className='form-control' type="search" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">الهاتف:</label>
          <input className='form-control' type="search" value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">المدينة :</label>
          <input className='form-control' type="search" value={searchCity} onChange={(e) => setSearchCity(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">id_العميل :</label>
          <input className='form-control' type="search" value={searchID} onChange={(e) => setSearchID(e.target.value)} />
        </div>
       
        <div className="text-center mt-3">
          <button className="btn dark"><i class="fa-solid fa-magnifying-glass"></i> بحث</button>
        </div>
      </div>
    </div>
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
          {filteredClients && filteredClients.map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item.Client?<td>{item.Client.first_name} {item.Client.last_name}</td>:<td>_</td>}
                {item.Client.phone1?<td>{item.Client.phone1}</td>:<td>_</td>}
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
