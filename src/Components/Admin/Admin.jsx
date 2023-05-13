import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import glt from '../../assets/glt.jpg'
import imile from '../../assets/imile.jpg'
import jonex from '../../assets/jonex.jpg'
import jt from '../../assets/jt.jpg'
import mkan from '../../assets/mkan.jpg'
import sae from '../../assets/sae.jpg'
import sms from '../../assets/sms.jpg'
import spl from '../../assets/spl.jpg'
import armx from '../../assets/armx.jpg'
import axios from 'axios'
import Joi from 'joi'

export default function Admin() {
  const [errorList, seterrorList]= useState([]); 
  const [saeePrices,setSaeePrices] =useState({
    status :'',
    userprice :'',
    marketerprice:'',
    kgprice :'',
  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)

  async function sendSaeePricesToApi() {
    console.log(localStorage.getItem('userToken'))
    try {
      const {data} = await axios.post(`https://dashboard.go-tex.net/api/saee/edit`, saeePrices,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      if (data.msg === 'ok') {
        console.log(data.token)
        setisLoading(false)
        window.alert("تم التسجيل بنجاح");
      } else {
        setisLoading(false)
        setError(data.msg)
        console.log(data.msg)
      }
    } catch (error) {
      console.log(error);
      window.alert('wrong');
    }
  //  let { data } = await axios.post(`https://dashboard.go-tex.net/api/saee/edit`, saeePrices,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  //     },
  //   });
  //   if (data.msg === 'ok') {
  //     setisLoading(false);
  //     window.alert("تم التسجيل بنجاح");
  //     console.log(data);
  //   } else {
  //     setisLoading(false);
  //     setError(data.msg);
  //   }
  }
  
function submitSaeePricesForm(e){
  e.preventDefault();
  setisLoading(true)
  let validation = validateSaeePricesForm();
  console.log(validation);
  if(validation.error){
    setisLoading(false)
    seterrorList(validation.error.details)

  }else{
    sendSaeePricesToApi();
  }

}

  function getSaeePrices(e){
    let mySaeePrices={...saeePrices};
    mySaeePrices[e.target.name]= e.target.value;
    setSaeePrices(mySaeePrices);
    console.log(mySaeePrices);
  }

  function validateSaeePricesForm(){
    let scheme= Joi.object({
        status:Joi.string().required(),
        userprice:Joi.number().required(),
        marketerprice:Joi.number().required(),
        kgprice :Joi.number().required()

    });
    return scheme.validate(saeePrices, {abortEarly:false});
  }
  return (
    <>
        <div className='p-4 admin' id='content'>
            <h3>أسعار الشركات</h3>
            <div className="row py-3">
              <div className="col-md-6">
                <div className="p-saee p-3">
                  <h5 className="text-center">أسعار شركة ساعي</h5>
                  <form onSubmit={submitSaeePricesForm} action="">
                    <label htmlFor="">سعر المسخدم</label>
                    <input onChange={getSaeePrices} type="number" className='my-input my-2 form-control' name='userprice' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='userprice'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                    <label htmlFor="">سعر المتاجر</label>
                    <input onChange={getSaeePrices} type="number" className='my-input my-2 form-control' name='marketerprice' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='marketerprice'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                    <label htmlFor="">سعر الزيادة</label>
                    <input onChange={getSaeePrices} type="number" className='my-input my-2 form-control' name='kgprice' />
                    {errorList.map((err,index)=>{
      if(err.context.label ==='kgprice'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
                    <label htmlFor="">الحالة</label>
                    <select className='my-input my-2 form-control' onChange={getSaeePrices} name='status'>
                      <option></option>
                      <option>True</option>
                      <option>False</option>
                      </select>
                      {errorList.map((err,index)=>{
      if(err.context.label ==='status'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}

                      <button className='btn btn-primary mt-3'>
                      {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'تسجيل'}
                     </button>
                  </form>
                </div>
              </div>
            </div>
            
      <div className="shipment-details mt-4 p-4">
        <h3>تفاصيل الشحنات</h3>
        <div className="company-links py-3">
        <Link to="/gltShipment"><img src={glt} alt="company" /></Link>
        <Link to=""><img src={imile} alt="company" /></Link>
        <Link to=""><img src={jonex} alt="company" /></Link>
        <Link to=""><img src={sms} alt="company" /></Link>
        <Link to=""><img src={mkan} alt="company" /></Link>
        <Link to=""><img src={sae} alt="company" /></Link>
        <Link to=""><img src={jt} alt="company" /></Link>
        <Link to=""><img src={spl} alt="company" /></Link>
        <Link to=""><img src={armx} alt="company" /></Link>
        </div>
      </div>
      <div className="merchants mt-5">
      <h3>تفاصيل التجار</h3>
            <div className="clients-table p-4 mt-4">
        <table className="table">
        <thead>
    <tr>
      <th scope="col">الاسم</th>
      <th scope="col">رقم الهاتف  </th>
      <th scope="col">العنوان </th>
      <th scope="col">قيمة الشحنة </th>
      <th scope="col">فاتورة الشحنة</th>
      <th scope="col"> الكمية </th>
      <th scope="col">تاريخ الاستلام </th>
      <th scope="col">رقم الفاتورة </th>
      <th scope="col">الشركة </th>

    </tr>
  </thead>
  </table>
  </div>

      </div>
        </div>
    </>
  )
}


  // "proxy": "http://localhost:8080",

{/* <div className="clients-table p-4 mt-4">
        <table className="table">
        <thead>
    <tr>
      <th scope="col">الأسعار</th>
      <th scope="col">glt </th>
      <th scope="col">ارامكس </th>
      <th scope="col">iMile</th>
      <th scope="col">jonex</th>
      <th scope="col"> J&T</th>
      <th scope="col">أى مكان</th>
      <th scope="col">ساعى </th>
      <th scope="col">سبل </th>
      <th scope="col">smsa </th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">سعر المسوقين</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th scope="row">سعر المتاجر</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    </tbody>
        </table>
      </div> */}