import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function ShipmentsAdmin() {
 
  const [shipmentsAdmin,setShipmentsAdmin]=useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('email');
  const [filteredShipmentsList, setFilteredShipmentsList] = useState([]);

  useEffect(()=>{
    getShipmentsAdmin()
  },[searchTerm, searchOption])

  async function getShipmentsAdmin() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/api/companies/get-all-orders',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      const shipments = response.data.data;
      console.log(shipments)
      setShipmentsAdmin(shipments)
      const filteredList = shipments.filter((item) => {
        if (searchOption === 'email') {
          return item.user.email.includes(searchTerm);
        } else if (searchOption === 'markter') {
          if (searchTerm === '') {
            return true;
          }
          return item.marktercode && item.marktercode.includes(searchTerm);        }
        return true;
      });
      setFilteredShipmentsList(filteredList);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
    <NavAdmin/>
    <div className='p-5' id='content'>
    <div className=" p-4 mt-2 row g-1">
    <div className="col-md-3">
          <button
            className={`toggle-button ${searchOption === 'email' ? 'active' : ''}`}
            onClick={() => setSearchOption('email')}
          >
            بحث بايميل العميل
          </button>
          <button
            className={`toggle-button ${searchOption === 'markter' ? 'active' : ''}`}
            onClick={() => setSearchOption('markter')}
          >
            بحث بكود المسوق
          </button>
        </div>
        <div className="col-md-9">
          <input
          className='form-control'
            type='search'
            placeholder='بحث'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
    </div>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> الشركة</th>
            <th scope="col">العميل </th>
            <th scope="col">الهاتف </th>
            <th scope="col">الايميل </th>
            <th scope="col">رقم التتبع </th>
            <th scope="col">كود المسوق  </th>
            <th scope="col">طريقة الدفع </th>
            <th scope="col">التاريخ </th>
            
          </tr>
        </thead>
        <tbody>
          {filteredShipmentsList.map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item.company?<td>{item.company}</td>:<td>_</td>}
                {item.user && item.user.name ? <td>{item.user.name}</td> : <td>_</td>}
                {item.user && item.user.mobile?<td>{item.user.mobile}</td>:<td>_</td>}
                {item.user && item.user.email?<td>{item.user.email}</td>:<td>_</td>}
                {/* {item.data.awb_no ? (<td>{item.data.awb_no}</td>
) : item.data.waybill ? (<td>{item.data.waybill}</td>)
: item.data.orderTrackingNumber ? (<td>{item.data.orderTrackingNumber}</td>)
: item.data.Shipments[0].ID ? (<td>{item.data.Shipments[0].ID}</td>)
: item.data.sawb ? (<td>{item.data.sawb}</td>) : (<td>_</td>)} */}
{item.data && item.data.awb_no ? (
  <td>{item.data.awb_no}</td>
) : item.data && item.data.waybill ? (
  <td>{item.data.waybill}</td>
) : item.data && item.data.orderTrackingNumber ? (
  <td>{item.data.orderTrackingNumber}</td>
) : item.data && item.data.Shipments && item.data.Shipments[0]?.ID ? (
  <td>{item.data.Shipments[0].ID}</td>
) : item.data && item.data.sawb ? (
  <td>{item.data.sawb}</td>
) : (
  <td>_</td>
)}

                {item.marktercode?<td>{item.marktercode}</td>:<td>_</td>}
                {item.paytype?<td>{item.paytype}</td>:<td>_</td>}
                {item.createdate ? (<td>{item.createdate.slice(0, 15)}</td>
) : item.data && item.data.createDate ? (
  <td>{item.data.createDate.slice(0, 10)}</td>) : (<td>_</td>)}

              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div>
         </div>
    </>  )
}
