import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function CancelRequestsAdmin() {
    const [shipmentsAdmin,setShipmentsAdmin]=useState([])
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getShipmentsAdmin()
    },[])
    async function getShipmentsAdmin() {
        try {
          setLoading(true);
          const response = await axios.get(`https://dashboard.go-tex.net/test/orders/get-cancel-order-requests`, {
           
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
      
          setShipmentsAdmin(response.data.data);
          
          console.log(response)
          
        } catch (error) {
          console.error('Error fetching:', error);
        } finally {
          setLoading(false); 
        }
      }

    
      async function handleActionClick(id, status) {
        
    
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/test/orders/cancel-order-request-status',
            {
                orderId: id,
                requestStatus: status,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }
          );
          console.log(response);
        //   window.alert(`ok , ${response.data.data.status}`);
          getShipmentsAdmin()
        } catch (error) {
          console.error(error);
          alert(error.response.data.err)
        }
      }

  return (
    <>
        <div className='p-5' id='content'>
        <div className="clients-table p-4 my-4">

        <table className="table" id="table-to-export">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">التاريخ</th>
                <th scope="col">اسم المرسل</th>
                {/* <th scope="col">جوال المرسل</th> */}
                <th scope="col">اسم المستلم</th>
                {/* <th scope="col">جوال المستلم</th> */}
                <th scope="col">
                  شركة الشحن</th>
                <th scope="col">
                  رقم الشحنة</th>
                  <th scope="col">
                  طريقة الدفع</th>
                
                <th scope="col">
                  المبلغ</th>
                  <th scope="col">
                  مبلغCOD</th>
                  <th scope="col">
                  الوزن</th>
                  <th scope="col">
                  حالة الشحنة </th>
                <th scope="col">
                   المسوقة</th>
                <th scope="col">الملاحظات(سبب الإلغاء)</th>  
                <th scope="col"> حالة الالغاء </th>              
                <th scope="col"> المدخل </th>              
                <th scope="col">  </th>              
                <th scope="col">  </th>              
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
                    {item.sender && item.sender.name ? <td>{item.sender.name}</td> : <td>_</td>}
                    {/* {item.sender && item.sender.mobile ? <td>{item.sender.mobile}</td> : <td>_</td>} */}
                    {item.receiver && item.receiver.name ? <td>{item.receiver.name}</td> : <td>_</td>}
                    {/* {item.receiver && item.receiver.mobile ? <td>{item.receiver.mobile}</td> : <td>_</td>} */}

                {item.company?<td>{item.company}</td>:<td>_</td>}
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
                {item.paytype?<td>{item.paytype}</td>:<td>_</td>}
                {item.price?<td>{item.price}</td>:<td>_</td>}
                {item.codPrice?<td>{item.codPrice}</td>:<td>_</td>}
                {item.weight?<td>{item.weight}</td>:<td>_</td>}

               {item.status?<td className={item.status=== "canceled" ?'text-center text-danger fw-bold':''}>{item.status}</td>:<td>_</td>}

               {item.marketer && item.marketer.length > 0 && item.marketer[0]?<td>{item.marketer[0].name}</td>:<td>_</td>}
                
               {item.cancelReason?<td><span className='text-center text-danger fw-bold'> {item.cancelReason} </span> </td> : <td></td>}
               {item.cancel?<td><span className='text-center  fw-bold'> {item.cancel.requestStatus} </span> </td> : <td></td>}
               {item.user && item.user.length > 0 && item.user[0].name ? <td>{item.user[0].name}</td> : <td>_</td>}

      </>
    )}
    {item.status!=="canceled"?(
        <>
    <td>
                <button className=' btn btn-success mt-2'
                      onClick={() => {
                        if(window.confirm('هل تؤكد الغاء هذه الشحنة ؟')){
                            handleActionClick(item._id, "accepted")
                        }
                      }} 
>                      قبول </button>

              </td>
              <td>
                <button
                        className=' btn btn-danger mt-2'
                        onClick={() => {
                            if(window.confirm('هل ترفض الغاء هذه الشحنة ؟')){
                                handleActionClick(item._id, "rejected")
                            }
                           } }>
                        رفض 
                      </button>
              </td>
              </>
    ):(
        <>
        <td></td>
        <td></td>
        </>
    )}
  </tr>
))}         
        </tbody>
      </table>
      </div>
        </div>
    </>
  )
}
