import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ClientsCreditAdmin() {
    useEffect(()=>{
        getClientsCredit()
      },[])

      const[clientsCredit,setClientsCredit]=useState([])


      async function getClientsCredit() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/daftra/get-all-client-credit-order',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const List = response.data.msg
          console.log(List)
          setClientsCredit(List)
        } catch (error) {
          console.error(error);
        }
      }
      // const [theStatus, setStatus] = useState('');
      // const [selectedId, setSelecteId] = useState(null);
      // async function credit() {
      //   try {
      //     const response = await axios.post(
      //       'https://dashboard.go-tex.net/api/daftra/change-credit-order-status',
      //       {
      //         orderid: selectedId,
      //         status: theStatus,
      //       },
      //       {
      //         headers: {
      //           Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      //         },
      //       }

      //     );
      //     // Handle the response as per your requirement
      //     console.log(response.data);
      //     window.alert(response.data.msg)
      //     setStatus('')
          
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
      
      const [theStatus, setStatus] = useState('');
      const [selectedId, setSelectedId] = useState(null);
    
      async function handleActionClick(orderId, status) {
        setSelectedId(orderId);
        setStatus(status);
    
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/api/daftra/change-credit-order-status',
            {
              orderid: orderId,
              status: status,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }
          );
          console.log(response.data);
          window.alert(response.data.msg);
          getClientsCredit()
        } catch (error) {
          console.error(error);
        }
      }
    
      // function acceptCredit(id){
      //   setSelecteId(id);
      //   console.log(theStatus)
      //   setStatus(Number(1));
      //   credit()

      // }
      // function removeCredit(id){
      //   setSelecteId(id);
      //   console.log(theStatus)
      //   setStatus('');
      //   credit()
      //   getClientsCredit()

      // }
     
     
  return (
    <>
    <div className='p-5' id='content'>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">id_العميل </th>
            <th scope="col">سعة الباقة </th>
            <th scope="col">مدة الباقة </th>
            <th scope="col">اسم المسوق </th>
            
            <th></th>
            <th></th>            
          </tr>
        </thead>
        <tbody>
          {clientsCredit && clientsCredit.map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item.clientid?<td>{item.clientid}</td>:<td>_</td>}
                {item.credit_limit?<td>{item.credit_limit} </td>:<td>_</td>}
                {item.credit_period?<td>{item.credit_period}</td>:<td>_</td>}
                {item.markterid?<td>{item.markterid.name}</td>:<td>_</td>}
                <td>
                <button className=' btn btn-success mt-2'
                      onClick={() => handleActionClick(item._id, 1)} // Sending status 1 for "قبول"
>                      قبول </button>

              </td>
              <td>
                <button
                        className=' btn btn-danger mt-2'
                        onClick={() => handleActionClick(item._id, 2)} >
                        حذف 
                      </button>
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
