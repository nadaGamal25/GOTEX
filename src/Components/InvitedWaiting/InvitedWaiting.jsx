import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NavAdmin from '../NavAdmin/NavAdmin';

export default function InvitedWaiting() {
    useEffect(()=>{
        getWaitingListsAdmin()
      },[])
      const[show,setShow]=useState(false)
    const [waitingList2,setWaitingList]=useState('')
    async function getWaitingListsAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/invatation/get-invitations-wait',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const waitinglist = response.data.data;
          console.log(waitinglist)
          setWaitingList(waitinglist)
        } catch (error) {
          console.error(error.response);
        }
      }
      async function accept(orderId) {
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/api/invatation/accept-invitation/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          if (response.status === 200) {
          console.log(response)
          window.alert('تم قبول الدعوة')
          }
        } catch (error) {
          console.error(error.response);
        }
      }
      const openShow = () => {
        setShow(true);
      };
      const closeShow = () => {
        setShow(false);
      };
  return (
    <>
    <NavAdmin/>
    <div className='p-5' id='content'>
      <div className="row">
      <div className="d-flex ll bg-light p-3">
        <div className="px-2">
          <h5>اسم المسوق</h5>
        </div>
        <div className="px-2">
          <h5>ايميل المسوق</h5>
        </div>
        <div className="px-2">
          <h5>اسم العميل</h5>
        </div>
        <div className="px-2">
          <h5>ايميل العميل</h5>
        </div>
        <div className="px-2"></div>
      </div>
      </div>
      {waitingList2 && waitingList2.map((item,index) =>{
            return(
<div className="row my-3">
      <div className="d-flex bg-light p-3 ll">
        <div className="px-2">
          <h6> {item.markter.name}</h6>
        </div>
        <div className="px-2">
          <h6> {item.markter.email}</h6>
        </div>
        <div className="px-2">
          <h6> {item.clint.name}</h6>
        </div>
        <div className="px-2">
          <h6> {item.clint.email}</h6>
        </div>
        <div className="px-2">
          <button onClick={openShow} className="btn btn-primary">قبول الدعوة</button>
        </div>
      </div>
      {show && ( 
        <div className="bg-light my-3 p-3 ll">
        <h4 className='text-center'>قبول الدعوة</h4>
        <table className="table">
          <thead>
            <tr>
            <td scope="col">الشركة</td>
            <td scope="col">الدفع اونلاين</td>
            <td scope="col">الدفع COD</td>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>gotex</td>
            <td>{item.companies[0].onlinePayment}</td>
            <td>{item.companies[0].cod}</td>
            </tr>
            <tr>
            <td>{item.companies[1].name}</td>
            <td>{item.companies[1].onlinePayment}</td>
            <td>{item.companies[1].cod}</td>
            </tr>
            <tr>
            <td>{item.companies[2].name}</td>
            <td>{item.companies[2].onlinePayment}</td>
            <td>{item.companies[2].cod}</td>
            </tr>
            <tr>
            <td>{item.companies[3].name}</td>
            <td>{item.companies[3].onlinePayment}</td>
            <td>{item.companies[3].cod}</td>
            </tr>
            <tr>
            <td>{item.companies[4].name}</td>
            <td>{item.companies[4].onlinePayment}</td>
            <td>{item.companies[4].cod}</td>
            </tr>

          </tbody>
        </table>
        <button className="btn btn-primary " onClick={() => accept(item._id)}>
          قبول
        </button>
        <button onClick={closeShow} className="btn btn-danger mx-3"> اغلاق</button>

        {/* <div className="d-flex p-3">
        <h4>الشركة</h4>
        <h4>الدفع اونلاين</h4>
        <h4>الدفع COD</h4>
        </div>
        <div className="d-flex p-3">
        <h4>{item.companies[0].name}</h4>
        <h4>{item.companies[0].name}</h4>
        <h4>{item.companies[0].onlinePayment}</h4>
        </div> */}
      </div>
      )}
      </div>
            )
          }
          )}

        
      
    {/* <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">اسم المسوق</th>
            <th scope="col">ايميل المسوق</th>
            <th scope="col">اسم العميل </th>
            <th scope="col">ايميل العميل </th>
            <th scope="col"> </th>
            
          </tr>
        </thead>
        <tbody>
          {waitingList2 && waitingList2.map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item.markter.name?<td>{item.markter.name}</td>:<td>_</td>}
                {item.markter.email?<td>{item.markter.email}</td>:<td>_</td>}
                {item.clint.name? <td>{item.clint.name}</td> : <td>_</td>}
                {item.clint.email?<td>{item.clint.email}</td>:<td>_</td>}
                <td></td>


              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div> */}
    </div>
    </>
  )
}
