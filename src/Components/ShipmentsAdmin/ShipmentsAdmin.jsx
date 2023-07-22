import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function ShipmentsAdmin() {
 
  const [shipmentsAdmin,setShipmentsAdmin]=useState([])
  const [searchCompany, setSearchCompany] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPrice, setSearchPrice] = useState('');
  const [searchMarktercode, setSearchMarktercode] = useState('');
  const [searchPaytype, setSearchPaytype] = useState('');
  const [searchCreatedate, setSearchCreatedate] = useState('');
  const [searchTracking, setSearchTracking] = useState('');
  const [searchDataCreateDate, setSearchDataCreateDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  useEffect(()=>{
    getShipmentsAdmin()
  },[])
  async function getShipmentsAdmin() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/api/companies/get-all-orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      const shipments = response.data.data;
      setShipmentsAdmin(shipments);
      console.log(shipments)
    } catch (error) {
      console.error(error);
    }
  }
  function dateInRange(dateStr, startDate, endDate) {
    const date = new Date(dateStr);
    return (
      (startDate === '' || date >= new Date(startDate)) &&
      (endDate === '' || date <= new Date(endDate))
    );
  }
  const filteredShipments = shipmentsAdmin.filter((item) => {
    return (
      (searchCompany === '' || item.company?.includes(searchCompany)) &&
      (searchName === '' || (item.user?.name?.includes(searchName)) )&&
      (searchEmail === '' || item.user?.email?.includes(searchEmail)) &&
      (searchPrice === '' || item.price?.toString().includes(searchPrice)) &&
      (searchMarktercode === '' || item.marktercode?.includes(searchMarktercode)) &&
      (searchPaytype === '' || item.paytype?.includes(searchPaytype)) &&
      (startDate === '' || endDate === '' ||
      (item.createdate &&
        dateInRange(item.createdate, startDate, endDate)) ||
    (item.data?.createDate &&
      dateInRange(item.data.createDate, startDate, endDate))) &&
      // (searchCreatedate === '' || item.createdate?.slice(0, 15).includes(searchCreatedate) || item.data?.createDate?.slice(0, 10).includes(searchCreatedate)) &&
      (searchTracking === '' || (item.data?.awb_no?.includes(searchTracking)|| item.data?.sawb?.includes(searchTracking) || item.data?.waybill?.includes(searchTracking) || item.data?.orderTrackingNumber?.includes(searchTracking) || item.data?.Shipments?.some((shipment) => shipment.ID?.includes(searchTracking))))
    
    );

  });
  
  // const filteredShipments = shipmentsAdmin.filter((item) => {
  //   return (
  //     item.company?.includes(searchCompany) &&
  //     (item.user?.name?.includes(searchName )) &&
  //     item.user?.email?.includes(searchEmail) &&
  //     (item.price?.toString().includes(searchPrice)) &&
  //     item.marktercode?.includes(searchMarktercode) &&
  //     item.paytype?.includes(searchPaytype) &&
  //     (item.createdate?.slice(0, 15).includes(searchCreatedate) || item.data?.createDate?.slice(0, 10).includes(searchCreatedate))
  //   );
  // });
  // async function getShipmentsAdmin() {
  //   try {
  //     const response = await axios.get('https://dashboard.go-tex.net/api/companies/get-all-orders',
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  //       },
  //     });
  //     const shipments = response.data.data;
  //     console.log(shipments)
  //     setShipmentsAdmin(shipments)
      
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  return (
    <>
    <NavAdmin/>
    <div className='p-5' id='content'>
    <div className="gray-table p-4 my-4">
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="">الشركة:</label>
          <input className='form-control' type="search" value={searchCompany} onChange={(e) => setSearchCompany(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">اسم العميل:</label>
          <input className='form-control' type="search" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">الايميل:</label>
          <br/><input className='form-control' type="search" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">السعر:</label>
          <input className='form-control' type="search" value={searchPrice} onChange={(e) => setSearchPrice(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">رقم التتبع:</label>
          <input className='form-control' type="search" value={searchTracking} onChange={(e) => setSearchTracking(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">كود المسوق:</label>
          <input className='form-control' type="search" value={searchMarktercode} onChange={(e) => setSearchMarktercode(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">طريقة الدفع:</label>
          <input className='form-control' type="search" value={searchPaytype} onChange={(e) => setSearchPaytype(e.target.value)} />
        </div>
        <div className="col-md-8">
          <label htmlFor="">التاريخ:</label><br/>
          <label>
  من:
  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    max={endDate || undefined}
  />
</label>
<label>
  الى:
  <input
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    min={startDate || undefined}
  />
</label>

          {/* <input className='form-control' type="search" value={searchCompany} onChange={(e) => setSearchCompany(e.target.value)} /> */}
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
                <th scope="col">
                  الشركة
                  {/* <input type="search" value={searchCompany} onChange={(e) => setSearchCompany(e.target.value)} /> */}
                </th>
                <th scope="col">
                  العميل
                  {/* <input type="search" value={searchName} onChange={(e) => setSearchName(e.target.value)} /> */}
                </th>
                <th scope="col">
                  الهاتف
                </th>
                <th scope="col">
                  الايميل
                  {/* <br/><input type="search" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} /> */}

                </th>
                <th scope="col">
                  السعر
                  {/* <input type="search" value={searchPrice} onChange={(e) => setSearchPrice(e.target.value)} /> */}

                </th>
                <th scope="col">
                  رقم التتبع
                  {/* <input type="search" value={searchTracking} onChange={(e) => setSearchTracking(e.target.value)} /> */}

                </th>
                <th scope="col">
                  كود المسوق
                  {/* <input type="search" value={searchMarktercode} onChange={(e) => setSearchMarktercode(e.target.value)} /> */}

                </th>
                <th scope="col">
                  طريقة الدفع
                  {/* <input type="search" value={searchPaytype} onChange={(e) => setSearchPaytype(e.target.value)} /> */}

                </th>
                <th scope="col">التاريخ
                {/* <input type="search" value={searchCreatedate} onChange={(e) => setSearchCreatedate(e.target.value)} /> */}
</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((item, index) => {
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item.company?<td>{item.company}</td>:<td>_</td>}
                {item.user && item.user.name ? <td>{item.user.name}</td> : <td>_</td>}
                {item.user && item.user.mobile?<td>{item.user.mobile}</td>:<td>_</td>}
                {item.user && item.user.email?<td>{item.user.email}</td>:<td>_</td>}
                {item.price?<td>{item.price}</td>:<td>_</td>}
                
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


// const [searchTerm, setSearchTerm] = useState('');
//   const [searchOption, setSearchOption] = useState('email');
// const [filteredShipmentsList, setFilteredShipmentsList] = useState([]);

// useEffect(()=>{
//   getShipmentsAdmin()
// },[searchTerm, searchOption])

// async function getShipmentsAdmin() {
//   try {
//     const response = await axios.get('https://dashboard.go-tex.net/api/companies/get-all-orders',
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//       },
//     });
//     const shipments = response.data.data;
//     console.log(shipments)
//     setShipmentsAdmin(shipments)
//     const filteredList = shipments.filter((item) => {
//       if (searchOption === 'email') {
//         return item.user.email.includes(searchTerm);
//       } else if (searchOption === 'markter') {
//         if (searchTerm === '') {
//           return true;
//         }
//         return item.marktercode && item.marktercode.includes(searchTerm);        }
//       return true;
//     });
//     setFilteredShipmentsList(filteredList);
//   } catch (error) {
//     console.error(error);
//   }
// }
// return (
//   <>
//   <NavAdmin/>
//   <div className='p-5' id='content'>
//   <div className=" p-4 mt-2 row g-1">
//   <div className="col-md-3">
//         <button
//           className={`toggle-button ${searchOption === 'email' ? 'active' : ''}`}
//           onClick={() => setSearchOption('email')}
//         >
//           بحث بايميل العميل
//         </button>
//         <button
//           className={`toggle-button ${searchOption === 'markter' ? 'active' : ''}`}
//           onClick={() => setSearchOption('markter')}
//         >
//           بحث بكود المسوق
//         </button>
//       </div>
//       <div className="col-md-9">
//         <input
//         className='form-control'
//           type='search'
//           placeholder='بحث'
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//   </div>
//   <div className="clients-table p-4 my-4">