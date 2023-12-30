import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx'; // Import the xlsx library
// import * as XLSXStyle from 'xlsx-style'; // Import the xlsx-style library
import { saveAs } from 'file-saver';

export default function AdminSearchShipments() {
    const [shipmentsAdmin,setShipmentsAdmin]=useState([])
    const [theLimit,setLimit]=useState(30)
    const [currentPage, setCurrentPage] = useState(Number(1));
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchCompany, setSearchCompany] = useState('');
const [searchPaytype, setSearchPaytype] = useState('');
const [searchBillCode, setSearchBillCode] = useState('');
const [currentPage2, setCurrentPage2] = useState(Number(1));
    const [numberOfPages2, setNumberOfPages2] = useState(1);
const [secondFilter, setSecondFilter] = useState(false);
const [currentPage3, setCurrentPage3] = useState(Number(1));
    const [numberOfPages3, setNumberOfPages3] = useState(1);
const [marketerFilter, setMarketerFilter] = useState(false);
const [currentPage4, setCurrentPage4] = useState(Number(1));
const [numberOfPages4, setNumberOfPages4] = useState(1);
const [dateFilter, setDateFilter] = useState(false);
    const [clientFilter, setClientFilter] = useState('');
  const [marketerCodeFilter, setMarketerCodeFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


    async function getShipmentsAdmin() {
        try {
          setLoading(true);
          const response = await axios.get(`https://dashboard.go-tex.net/api/companies/orders/all`, {
            params: {
                page: currentPage,
                limit: 30,
                
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
      
          setShipmentsAdmin(response.data.data);
          setSecondFilter(false)
          // setMarketerFilter(false)
          // setDateFilter(false)
          console.log(response)
          setCurrentPage(response.data.pagination.currentPage);
          setNumberOfPages(response.data.pagination.numberOfPages);
        } catch (error) {
          console.error('Error fetching students:', error);
        } finally {
          setLoading(false); 
        }
      }
      async function getSearchShipmentsAdmin() {
        try {
          setLoading(true);
          const response = await axios.get(`https://dashboard.go-tex.net/api/companies/orders/all`, {
            params: {
                page: currentPage2,
                limit: 30,
                company: searchCompany,
                paytype: searchPaytype,
                billCode: searchBillCode,
                marktercode:marketerCodeFilter,
                keyword:clientFilter,
                startDate:startDate,
                endDate:endDate,
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
      
          setShipmentsAdmin(response.data.data);
          setSecondFilter(true)
          // setMarketerFilter(false)
          // setDateFilter(false)
          console.log(response)
          setCurrentPage2(response.data.pagination.currentPage);
          setNumberOfPages2(response.data.pagination.numberOfPages);
        } catch (error) {
          console.error('Error fetching students:', error);
        } finally {
          setLoading(false); 
        }
      }
      
    useEffect(() => {
        getShipmentsAdmin();
    }, []);
  
    
    const handlePreviousPage = async () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1); 
        try {
          setLoading(true);
          const response = await axios.get(`https://dashboard.go-tex.net/api/companies/orders/all`, {
            params: {
                page: currentPage -1,
                limit: 30,
                
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
      
          setShipmentsAdmin(response.data.data);
          setSecondFilter(false)
          // setMarketerFilter(false)
          // setDateFilter(false)
          console.log(response)
          setCurrentPage(response.data.pagination.currentPage);
          setNumberOfPages(response.data.pagination.numberOfPages);
        } catch (error) {
          console.error('Error fetching students:', error);
        } finally {
          setLoading(false); 
        }
      }
    };
    const handleNextPage = async () => {
      if (currentPage < numberOfPages) {
        setCurrentPage(currentPage + 1);
        try {
          setLoading(true);
          const response = await axios.get(`https://dashboard.go-tex.net/api/companies/orders/all`, {
            params: {
                page: currentPage +1,
                limit: 30,
                
              },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
      
          setShipmentsAdmin(response.data.data);
          setSecondFilter(false)
          // setMarketerFilter(false)
          // setDateFilter(false)
          console.log(response)
          setCurrentPage(response.data.pagination.currentPage);
          setNumberOfPages(response.data.pagination.numberOfPages);
        } catch (error) {
          console.error('Error fetching students:', error);
        } finally {
          setLoading(false); 
        }
      }
    };
    const handlePreviousPage2 = async () => {
  if (currentPage2 > 1) {
    setCurrentPage2(currentPage2 - 1); 
    try {
      setLoading(true);
      const response = await axios.get(`https://dashboard.go-tex.net/api/companies/orders/all`, {
        params: {
            page: currentPage2 -1,
            limit: 30,
            company: searchCompany,
            paytype: searchPaytype,
            billCode: searchBillCode,
            marktercode:marketerCodeFilter,
            keyword:clientFilter,
            startDate:startDate,
            endDate:endDate,
          },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
  
      setShipmentsAdmin(response.data.data);
      setSecondFilter(true)
      // setMarketerFilter(false)
      // setDateFilter(false)
      console.log(response)
      setCurrentPage2(response.data.pagination.currentPage);
      setNumberOfPages2(response.data.pagination.numberOfPages);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false); 
    }
  }
};
const handleNextPage2 = async () => {
  if (currentPage2 < numberOfPages2) {
    setCurrentPage2(currentPage2 + 1) 
    try {
      setLoading(true);
      const response = await axios.get(`https://dashboard.go-tex.net/api/companies/orders/all`, {
        params: {
            page: currentPage2 +1,
            limit: 30,
            company: searchCompany,
            paytype: searchPaytype,
            billCode: searchBillCode,
            marktercode:marketerCodeFilter,
            keyword:clientFilter,
            startDate:startDate,
            endDate:endDate,
          },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
  
      setShipmentsAdmin(response.data.data);
      setSecondFilter(true)
      // setMarketerFilter(false)
      // setDateFilter(false)
      console.log(response)
      setCurrentPage2(response.data.pagination.currentPage);
      setNumberOfPages2(response.data.pagination.numberOfPages);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false); 
    }  
  }
};
async function getSearchShipmentsPage() {
  try {
    setLoading(true);
    const response = await axios.get(`https://dashboard.go-tex.net/api/companies/orders/all`, {
      params: {
          page: currentPage2,
          limit: 30,
          company: searchCompany,
          paytype: searchPaytype,
          billCode: searchBillCode,
          marktercode:marketerCodeFilter,
          keyword:clientFilter,
          startDate:startDate,
          endDate:endDate,
        },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });

    setShipmentsAdmin(response.data.data);
    setSecondFilter(true)
    console.log(response)
    setCurrentPage2(response.data.pagination.currentPage);
    setNumberOfPages2(response.data.pagination.numberOfPages);
  } catch (error) {
    console.error('Error fetching students:', error);
  } finally {
    setLoading(false); 
  }
} 


  return (
    <>
    <div className='p-5' id='content'>
    <div className="gray-table p-4 mb-4">
      <div className="row">
        <div className="col-md-4">
        <select className='form-control m-1' name="" id="" onChange={(e) => setSearchCompany(e.target.value)}>
<option value="">شركة الشحن</option>
<option value="saee">saee</option>
<option value="anwan">gotex</option>
<option value="smsa">smsa</option>
<option value="aramex">aramex</option>
<option value="imile">imile</option>
<option value="jt">jt</option>
<option value="spl">spl</option>
</select>          
        </div>
        <div className="col-md-4">
          <input className='form-control m-1' 
          type="search" placeholder="الاسم , الايميل ,الهاتف"
          // value={clientFilter}
          onChange={(e) => setClientFilter(e.target.value)}
          />
        </div>
        
       
        <div className="col-md-4">
          <input className='form-control m-1' type="search"
            placeholder="رقم التتبع"
            //   value={searchBillCode}
              onChange={(e) => setSearchBillCode(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input className='form-control m-1' type="search" 
          placeholder="كود المسوق"
          // value={marketerCodeFilter}
          onChange={(e) => setMarketerCodeFilter(e.target.value)} />
        </div>
        <div className="col-md-4">
          <input className='form-control m-1' type="search" 
          
          placeholder="طريقة الدفع"
        //   value={searchPaytype}
          onChange={(e) => setSearchPaytype(e.target.value)} />
        </div>
        {/* <div className="col-md-4">
          <input className='form-control m-1' type="search" 
          
          placeholder="رقم الصفحة "
          onChange={(e) => setCurrentPage2(e.target.value)} />
        </div> */}
        <div className="col-md-8 p-1">
          <label>
  التاريخ من:
  <input
    type="date"
    // value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    max={endDate || undefined}
  />
</label>
<label>
  الى:
  <input
    type="date"
    // value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    min={startDate || undefined}
  />
</label>

        </div>
        <div className="text-center mt-1">
        <button className="btn btn-dark m-1" onClick={getSearchShipmentsAdmin}>
  بحث
</button>         </div>
      </div>
    </div>
    <div className="clients-table p-4 my-4">
     
        {/* <div className='my-1'>

<select className='mx-1' name="" id="" onChange={(e) => setSearchCompany(e.target.value)}>
<option value="">شركة الشحن</option>
<option value="saee">saee</option>
<option value="anwan">gotex</option>
<option value="smsa">smsa</option>
<option value="aramex">aramex</option>
<option value="imile">imile</option>
<option value="jt">jt</option>
<option value="spl">spl</option>
</select>

<input
  className='mx-1'
  type="text"
  placeholder="طريقة الدفع"
//   value={searchPaytype}
  onChange={(e) => setSearchPaytype(e.target.value)}
/>

<input
className='mx-1'
  type="text"
  placeholder="رقم التتبع"
//   value={searchBillCode}
  onChange={(e) => setSearchBillCode(e.target.value)}
/>
<input
    type="text"
    placeholder="الاسم , الايميل ,الهاتف"
    value={clientFilter}
    onChange={(e) => setClientFilter(e.target.value)}
  />
  {/* <button className="btn btn-dark m-1" onClick={filterByClientData}>بحث بالاسم أو الايميل</button> 

<input
    type="text"
    placeholder="كود المسوق"
    value={marketerCodeFilter}
    onChange={(e) => setMarketerCodeFilter(e.target.value)}
  />
  {/* <button className="btn btn-dark m-1" onClick={filterByMarketerCode}>بحث بكود المسوق</button> 
  <div>
          <label>
  التاريخ من:
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
{/* <button className="btn btn-dark m-1" onClick={filterByDate}>بحث بالتاريخ </button> 
        </div>
<button className="btn btn-dark m-1" onClick={getSearchShipmentsAdmin}>
  بحث
</button> 
        </div> */}
        
        <button className="btn btn-addPiece m-1" onClick={getShipmentsAdmin}>عرض جميع الشحنات  </button>

          <table className="table" id="table-to-export">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">التاريخ</th>
                <th scope="col">العميل</th>
                <th scope="col">
                  شركة الشحن</th>
                <th scope="col">
                  رقم التتبع</th>
                <th scope="col">
                  حالة الشحنة </th>
                <th scope="col">
                  طريقة الدفع</th>
                <th scope="col">
                  الهاتف</th>
                <th scope="col">
                  الايميل</th>
                <th scope="col">
                  السعر</th>
                <th scope="col">
                  كود المسوق</th>
                <th scope="col">id_الفاتورة</th>  
                <th scope="col"></th>              
              </tr>
            </thead>
            <tbody>
            {shipmentsAdmin && shipmentsAdmin.map((item, index) => (
  <tr key={index} className={item.status === "canceled" ? 'cancel' : ''}>
    {loading ? (
      <td>
        <i className="fa-solid fa-spinner fa-spin"></i>
      </td>
    ) : (
      <>
        <td>{index+1}</td>
                {item.createdate ? (<td>{item.createdate.slice(0, 10)}</td>
) : item.data && item.data.createDate ? (
  <td>{item.data.createDate.slice(0, 10)}</td>): item.created_at ? (
    <td>{item.created_at.slice(0, 10)}</td>) : (<td>_</td>)}
                {item.user && item.user.name ? <td>{item.user.name}</td> : <td>_</td>}
                {item.company ==="anwan"?<td>gotex</td>:<td>{item.company}</td>}
                {/* {item.company?<td>{item.company}</td>:<td>_</td>} */}
                {item.data && item.data.awb_no ? (
  <td>{item.data.awb_no}</td>
): item.data.data && item.data.data.expressNo? (
  <td>{item.data.data.expressNo}</td>
): item.data && item.data.Items && item.data.Items[0]?.Barcode? (
  <td>{item.data.Items[0].Barcode}</td>
)
 : item.data && item.data.waybill ? (
  <td>{item.data.waybill}</td>
) :item.data.data && item.data.data.billCode?(
    <td>{item.data.data.billCode}</td>
) : item.data && item.data.orderTrackingNumber ? (
  <td>{item.data.orderTrackingNumber}</td>
) : item.data && item.data.Shipments && item.data.Shipments[0]?.ID ? (
  <td>{item.data.Shipments[0].ID}</td>
) : item.data && item.data.sawb ? (
  <td>{item.data.sawb}</td>
) : (
  <td>_</td>
)}
               {item.status?<td className={item.status=== "canceled" ?'text-center text-danger fw-bold':''}>{item.status}</td>:<td>_</td>}
                {item.paytype?<td>{item.paytype}</td>:<td>_</td>}

                {item.user && item.user.mobile?<td>{item.user.mobile}</td>:<td>_</td>}
                {item.user && item.user.email?<td>{item.user.email}</td>:<td>_</td>}
                {item.price?<td>{item.price}</td>:<td>_</td>}
                


                {item.marktercode?<td>{item.marktercode}</td>:<td>_</td>}
                
        {item.inovicedaftra?.id?(<td>{item.inovicedaftra.id}</td>):(<td>_</td>)}
        {item.status=== "canceled" ?<td><span className='text-center text-danger fw-bold'> x </span> </td> : <td></td>}
            
      </>
    )}
  </tr>
))}         
        </tbody>
      </table>
      {secondFilter?(
      <div>
        <button className="btn btn-dark" onClick={handlePreviousPage2} disabled={currentPage2 === 1}>
          الصفحة السابقة 
        </button>
        <span className='px-1'>
          Page {currentPage2} of {numberOfPages2}
        </span>
        <button className="btn btn-dark" onClick={handleNextPage2} disabled={currentPage2 === numberOfPages2}>
          الصفحة التالية 
        </button>
      </div>
      ):
      // :marketerFilter?(<div>
      //   <button className="btn btn-dark" onClick={handlePreviousPage3} disabled={currentPage3 === 1}>
      //     الصفحة السابقة 
      //   </button>
      //   <span className='px-1'>
      //     Page {currentPage3} of {numberOfPages3}
      //   </span>
      //   <button className="btn btn-dark" onClick={handleNextPage3} disabled={currentPage3 === numberOfPages3}>
      //     الصفحة التالية 
      //   </button>
      // </div>):
      // dateFilter?(<div>
      //   <button className="btn btn-dark" onClick={handlePreviousPage4} disabled={currentPage4 === 1}>
      //     الصفحة السابقة 
      //   </button>
      //   <span className='px-1'>
      //     Page {currentPage4} of {numberOfPages4}
      //   </span>
      //   <button className="btn btn-dark" onClick={handleNextPage4} disabled={currentPage4 === numberOfPages4}>
      //     الصفحة التالية 
      //   </button>
      // </div>):
      (
        <div>
        <button className="btn btn-dark" onClick={handlePreviousPage} disabled={currentPage === 1}>
          الصفحة السابقة 
        </button>
        <span className='px-1'>
          Page {currentPage} of {numberOfPages}
        </span>
        <button className="btn btn-dark" onClick={handleNextPage} disabled={currentPage === numberOfPages}>
          الصفحة التالية 
        </button>
      </div>
      )}
      <div>
<input className=' m-1' type="number" 

placeholder="رقم الصفحة "
onChange={(e) => setCurrentPage2(e.target.value)} />
<button className="btn btn-primary m-1" onClick={getSearchShipmentsPage}>
            بحث برقم الصفحة
        </button>
      </div>
     </div>

    </div>
    </>
  )
}


// async function filterByClientData() {
//   try {
//     setLoading(true);
//     const response = await axios.get(
//       `https://dashboard.go-tex.net/api/companies/orders/filter-by-client-data?keyword=${clientFilter}`,
//       {
//           params: { page: currentPage2, limit: 30 },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//         },
//       }
//     );

//     setShipmentsAdmin(response.data.data);
//     setMarketerFilter(false)
//     setDateFilter(false)
//     setSecondFilter(true)
    
//     setCurrentPage2(response.data.pagination.currentPage);
// setNumberOfPages2(response.data.pagination.numberOfPages);
//     console.log(response)
//   } catch (error) {
//     console.error('Error filtering by client data:', error);
//   } finally {
//     setLoading(false);
//   }
// }
// const handlePreviousPage2 = async () => {
//   if (currentPage2 > 1) {
//     setCurrentPage2(currentPage2 - 1); // Call setCurrentPage2 first
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `https://dashboard.go-tex.net/api/companies/orders/filter-by-client-data?keyword=${clientFilter}`,
//         {
//           params: { page: currentPage2 -1 , limit: 30 },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//           },
//         }
//       );

//       setShipmentsAdmin(response.data.data);
//       setMarketerFilter(false)
//       setDateFilter(false)
//       setSecondFilter(true);
//       setCurrentPage2(response.data.pagination.currentPage);
//       setNumberOfPages2(response.data.pagination.numberOfPages);
//       console.log(response);
//     } catch (error) {
//       console.error('Error filtering by client data:', error);
//     } finally {
//       setLoading(false);
//     }
//   }
// };


// const handleNextPage2 = async () => {
//   if (currentPage2 < numberOfPages2) {
//     setCurrentPage2(currentPage2 + 1);
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `https://dashboard.go-tex.net/api/companies/orders/filter-by-client-data?keyword=${clientFilter}`,
//         {
//           params: { page: currentPage2 +1 , limit: 30 },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//           },
//         }
//       );

//       setShipmentsAdmin(response.data.data);
//       setMarketerFilter(false)
//       setDateFilter(false)
//       setSecondFilter(true);
//       setCurrentPage2(response.data.pagination.currentPage);
//       setNumberOfPages2(response.data.pagination.numberOfPages);
//       console.log(response);
//     } catch (error) {
//       console.error('Error filtering by client data:', error);
//     } finally {
//       setLoading(false);
//     }
//   }

// };

// async function filterByMarketerCode() {
//   try {
//     setLoading(true);
//     const response = await axios.get(
//       `https://dashboard.go-tex.net/api/companies/orders/filter-by-marketercode?marktercode=${marketerCodeFilter}`,
//       {
//           params: { page: currentPage3, limit: 30 },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//         },
//       }
//     );
//     console.log(response)
//     setShipmentsAdmin(response.data.data);
//     setSecondFilter(false)
//     setDateFilter(false)
//     setMarketerFilter(true)
//     setCurrentPage3(response.data.pagination.currentPage);
// setNumberOfPages3(response.data.pagination.numberOfPages);
//   } catch (error) {
//     console.error('Error filtering by marketer code:', error);
//   } finally {
//     setLoading(false);
//   }
// }
// const handlePreviousPage3 = async () => {
//   if (currentPage3 > 1) {
//     setCurrentPage3(currentPage3 - 1); 
//     try {
//       setLoading(true);
//       const response = await axios.get(
//           `https://dashboard.go-tex.net/api/companies/orders/filter-by-marketercode?marktercode=${marketerCodeFilter}`,
//           {
//           params: { page: currentPage3 -1 , limit: 30 },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//           },
//         }
//       );

//       setShipmentsAdmin(response.data.data);
//       setSecondFilter(false);
//       setDateFilter(false)
//       setMarketerFilter(true)
//       setCurrentPage3(response.data.pagination.currentPage);
//       setNumberOfPages3(response.data.pagination.numberOfPages);
//       console.log(response);
//     } catch (error) {
//       console.error('Error filtering by client data:', error);
//     } finally {
//       setLoading(false);
//     }
//   }
// };


// const handleNextPage3 = async () => {
//   if (currentPage3 < numberOfPages3) {
//     setCurrentPage3(currentPage3 + 1);
//     try {
//       setLoading(true);
//       const response = await axios.get(
//           `https://dashboard.go-tex.net/api/companies/orders/filter-by-marketercode?marktercode=${marketerCodeFilter}`,
//           {
//           params: { page: currentPage3 +1 , limit: 30 },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//           },
//         }
//       );

//       setShipmentsAdmin(response.data.data);
//       setSecondFilter(false)
//       setDateFilter(false)
//       setMarketerFilter(true);
//       setCurrentPage3(response.data.pagination.currentPage);
//       setNumberOfPages3(response.data.pagination.numberOfPages);
//       console.log(response);
//     } catch (error) {
//       console.error('Error filtering by client data:', error);
//     } finally {
//       setLoading(false);
//     }
//   }

// };
// async function filterByDate() {
//   try {
//     setLoading(true);
//     const response = await axios.get(
//       `https://dashboard.go-tex.net/api/companies/orders/filter-by-date?startDate=${startDate}&endDate=${endDate}`,
//       {
//           params: { page: currentPage4, limit: 30 },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//         },
//       }
//     );

//     setShipmentsAdmin(response.data.data);
//     setMarketerFilter(false)
//     setSecondFilter(false)
//     setDateFilter(true)
    
//     setCurrentPage4(response.data.pagination.currentPage);
// setNumberOfPages4(response.data.pagination.numberOfPages);
//     console.log(response)
//   } catch (error) {
//     console.error('Error filtering by client data:', error);
//   } finally {
//     setLoading(false);
//   }
// }
// const handlePreviousPage4 = async () => {
//   if (currentPage4 > 1) {
//     setCurrentPage4(currentPage4 - 1); 
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `https://dashboard.go-tex.net/api/companies/orders/filter-by-date?startDate=${startDate}&endDate=${endDate}`,
//         {
//             params: { page: currentPage4 -1 , limit: 30 },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//           },
//         }
//       );

//       setShipmentsAdmin(response.data.data);
//       setMarketerFilter(false)
//       setSecondFilter(false)
//       setDateFilter(true)
      
//       setCurrentPage4(response.data.pagination.currentPage);
//   setNumberOfPages4(response.data.pagination.numberOfPages);
//       console.log(response)
//     } catch (error) {
//       console.error('Error filtering by client data:', error);
//     } finally {
//       setLoading(false);
//     }
//   }
// };
// const handleNextPage4 = async () => {
//   if (currentPage4 < numberOfPages4) {
//     setCurrentPage4(currentPage4 + 1);
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `https://dashboard.go-tex.net/api/companies/orders/filter-by-date?startDate=${startDate}&endDate=${endDate}`,
//         {
//             params: { page: currentPage4 +1 , limit: 30 },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//           },
//         }
//       );

//       setShipmentsAdmin(response.data.data);
//       setMarketerFilter(false)
//       setSecondFilter(false)
//       setDateFilter(true)
      
//       setCurrentPage4(response.data.pagination.currentPage);
//   setNumberOfPages4(response.data.pagination.numberOfPages);
//       console.log(response)
//     } catch (error) {
//       console.error('Error filtering by client data:', error);
//     } finally {
//       setLoading(false);
//     }
//   }

// };



