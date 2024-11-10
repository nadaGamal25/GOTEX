import axios from 'axios'
import React from 'react'
import { useState ,useEffect} from 'react'

export default function AdminStoreOrders() {
    useEffect(()=>{
        getOrders()
        
      },[])
      const [orders,setOrders]=useState([])
      async function getOrders() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/test/store-orders',{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          console.log(response)
          setOrders(response.data)
          
        } catch (error) {
          console.error(error);
        }
      }
      async function deleteOrder(id) {
        try {
          const response = await axios.delete(`https://dashboard.go-tex.net/test/store-orders/${id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          console.log(response)
          alert("تم الغاء الطلب بنجاح")          
        } catch (error) {
          console.error(error);
          alert("لا يمكن الغاء الطلب")
        }
      }
  return (
    <>
    <div className='p-4' id='content'>
    <div className="clients-table p-4 mt-4">
          <table className="table">
            <thead>
              <tr>
               <th scope="col">#</th>
               <th scope="col"> المنتج</th>
               <th scope="col">العنوان</th>
               <th scope="col">طريقة الدفع </th>
               <th scope="col">السعر</th>
               <th scope="col">الحالة </th>
               
                <th></th>
              </tr>
            </thead>
            <tbody>
  {orders && orders.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
        {item.items.map((i, index) => (
      <span key={index}>
        {i.product.name} 
        <span className='fw-bold' dir='ltr'> {i.quantity}x </span>
        <br />
      </span>
    ))}
  </td>
        <td>{item.shippingAddress}</td>
        <td>{item.paymentMethod}</td>
        <td>{item.totalAmount}</td>
        <td>{item.status}</td>
       <td>
       <button
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm('هل انت بالتأكيد تريد الغاء هذا الطلب ؟')) {
               deleteOrder(item._id)
            }}}
          >
             الغاء الطلب
          </button>
       </td>
      </tr>
    );
  })}
</tbody>


         </table>
        </div>
    </div>
    </>
  )
}
