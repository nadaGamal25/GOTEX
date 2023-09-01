import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function InvocesAdmin() {
    useEffect(()=>{
        getInvocesAdmin()
      },[])
      const [invocesAdmin,setInvocesAdmin]=useState([])
    
      async function getInvocesAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/daftra/inovic-get-all',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          console.log(response.data.data)
          setInvocesAdmin(response.data.data)
        } catch (error) {
          console.error(error);
        }
      }
      const [search, setSearch]= useState('')

  return (
    <>
    <div className='p-5' id='content'>
    <div className="search-box p-4 mt-2 row g-1">
        <div className="col-md-2">
        <button className="btn"><i class="fa-solid fa-magnifying-glass"></i> بحث</button>
        </div>
        <div className="col-md-10">
        <input className='form-control' name="search" onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='id_الفاتورة' />
        </div>
      </div>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">العميل </th>
            <th scope="col">اللقب </th>
            <th scope="col">الايميل </th>
            <th scope="col">المدينة </th>
            <th scope="col">العنوان </th>
            <th scope="col">عنوان اضافى </th>
            <th scope="col">id_العميل </th>
            <th scope="col">id_الفاتورة </th>            
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {invocesAdmin && invocesAdmin.filter((item)=>{
          return search === ''? item : item.Invoice.id.includes(search);
          }).map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item.Invoice?<td>{item.Invoice.client_first_name} {item.Invoice.client_last_name}</td>:<td>_</td>}
                {item.Invoice.client_business_name?<td>{item.Invoice.client_business_name}</td>:<td>_</td>}
                {item.Invoice.client_email?<td>{item.Invoice.client_email}</td>:<td>_</td>}
                {item.Invoice.client_city?<td>{item.Invoice.client_city}</td>:<td>_</td>}
                {item.Invoice.client_address1?<td>{item.Invoice.client_address1}</td>:<td>_</td>}
                {item.Invoice.client_address2?<td>{item.Invoice.client_address2}</td>:<td>_</td>}
                {item.Invoice.client_id?<td>{item.Invoice.client_id}</td>:<td>_</td>}
                {item.Invoice.id?<td>{item.Invoice.id}</td>:<td>_</td>}
                <td>
                    <a className="btn btn-orange" href={item.Invoice.invoice_pdf_url} target='_blank'>
                        عرض الفاتورة
                    </a>
                </td>
                
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
