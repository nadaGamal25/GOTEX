import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SaeeSticker from '../SaeeSticker/SaeeSticker';
import { useNavigate } from 'react-router-dom';

export default function Shipments() {
  const [saeeAllOrders,setSaeeAllOrders]=useState([]);
  const [sticker, setSticker] = useState('');

  useEffect(()=>{
    getUserOrders()
  },[])

      async function getUserOrders() {
        console.log(localStorage.getItem('userToken'))
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/saee/get-all-orders',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const orders = response.data.data;
          // Process the orders as needed
          console.log(orders)
          setSaeeAllOrders(orders)
        } catch (error) {
          console.error(error);
        }
      }

      
      let navigate= useNavigate(); //hoke

      async function getOrderSticker(orderId) {      
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/api/saee/print-sticker/${orderId}`,
          {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
              }
            );
            console.log(response.data)
          const stickerHTML = response.data.data;
          console.log(stickerHTML)
          setSticker(stickerHTML)
          console.log(sticker)
          // Navigate to the SaeeSticker component with the stickerHTML data
          // navigate('/saeeSticker', { state: { stickerHTML } });
          navigate('/saeeSticker', { state: { stickerHTML: stickerHTML } });
        } catch (error) {
          console.error(error);
        }
      }
  return (
    <>
<div className='p-4' id='content'>
      <div className="clients-heading py-2 d-flex justify-content-between">
        <h3><i class="fa-solid fa-box-open bx"></i>
الشحنات</h3>
        <Link to="/companies" className='btn'><i class="fa-solid fa-plus"></i>إنشاء  </Link>
      </div>
     <div className="clients-table p-4 mt-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">اسم الشركة</th>
            <th scope="col">epayment_url</th>
            <th scope="col">message</th>
            <th scope="col">waybill</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {saeeAllOrders.map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                <td>ساعي</td>
                <td>{item.data.epayment_url}</td>
                <td>{item.data.message}</td>
                <td>{item.data.waybill}</td>
                <td>
                <Link
      to="/saeeSticker"
      className="btn btn-success"
      onClick={() => getOrderSticker(item._id)}
    >
      عرض الاستيكر
    </Link>
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


{/* <div className="search-box p-4 mt-2 row g-1">
        <div className="col-md-2">
        <button className="btn"><i class="fa-solid fa-magnifying-glass"></i> بحث</button>
        </div>
        <div className="col-md-10">
        <input className='form-control' type="search" placeholder='الأسم' />
        </div>
      </div>
      <div className="clients-table p-4 mt-4">
        <table className="table">
        <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">اسم الشركة/المتجر</th>
      <th scope="col">اسم العميل</th>
      <th scope="col">الشاحنون </th>
      <th scope="col">قيمة الشحنة</th>
      <th scope="col">الكمية</th>
      <th scope="col">فاتورة الشحن</th>
      <th scope="col">تاريخ الاستلام</th>
      <th scope="col">الحالة</th>
      <th scope="col">رقم الفاتورة</th>
      <th scope="col">الاجراءات</th>
    </tr>
  </thead>
        </table>
      </div> */}

      // async function getOrderSticker(orderId) {
      //   try {
      //     const response = await axios.get(`https://dashboard.go-tex.net/api/saee/print-sticker/${orderId}`, {
      //       headers: {
      //         Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      //       },
      //     });
      //     const sticker = response.data.data;
      //     setSticker(sticker);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
            {/* {sticker && <SaeeSticker sticker={sticker} />} */}
