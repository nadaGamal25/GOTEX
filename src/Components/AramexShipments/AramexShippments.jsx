import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';

export default function AramexShippments() {
    const [value ,setPhoneValue]=useState()
    const [phone2,setPhone2] =useState()
    const [pcellPhone,setPcellPhone] =useState()
    const [CcellPhone,setCcellPhone] =useState()
    const [p_PhoneNumber,setp_PhoneNumber1Ext] =useState()
    const [c_PhoneNumber,setc_PhoneNumber1Ext] =useState()

    const [errorList, seterrorList]= useState([]); 
  const [orderData,setOrderData] =useState({
    c_name: "",
    c_company: "",
    c_email: "",
    c_phone: "",
    c_CellPhone: "",
    // c_PhoneNumber1Ext: "",
    c_line1: "",
    c_line2: "",
    c_city: "",
    pieces: "",
    p_name: "",
    p_company: "",
    p_email: "",
    p_phone: "",
    p_PhoneNumber1Ext: "",
    p_line1: "",
    p_city: "",
    p_CellPhone: "",
    p_postCode: "",
    weight: ""
  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)

  async function sendOrderDataToApi() {
    console.log(localStorage.getItem('userToken'))
    try {
      const response = await axios.post(
        "https://dashboard.go-tex.net/api/aramex/create-user-order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
  
      if (response.status === 200) {
        setisLoading(false);
        window.alert(`تم تسجيل الشحنة بنجاح \n ${response.data.data.Shipments[0].ShipmentLabel.LabelURL}`);
        console.log(response.data);
        console.log(response.data.data.Shipments[0].ShipmentLabel.LabelURL);
        const stickerUrl = `${response.data.data.Shipments[0].ShipmentLabel.LabelURL}`;
      const newTab = window.open();
      newTab.location.href = stickerUrl;
        // {response.data.Shipments[0]?console.log(response.data.Shipments[0].ShipmentLabel.LabelURL):''}
        console.log("okkkkkkkkkkk")
      }else if (response.status === 400) {
        setisLoading(false);
        const errorMessage = response.data?.msg || "An error occurred.";
        window.alert(`يوجد خطأ ما ..لم يتم تسجيل الشحنة`);
        console.log(response.data);
      }
    } catch (error) {
      // Handle error
      console.error(error);
      setisLoading(false);
      const errorMessage = error.response?.data?.msg || "An error occurred.";
      window.alert(`يوجد خطأ ما ..لم يتم تسجيل الشحنة`);
    }
  }
  function submitOrderUserForm(e){
    e.preventDefault();
    setisLoading(true)
    let validation = validateOrderUserForm();
    console.log(validation);
    if(validation.error){
      setisLoading(false)
      seterrorList(validation.error.details)
  
    }else{
      sendOrderDataToApi();
    }
  
  }
  
    function getOrderData(e){
      let myOrderData={...orderData};
      myOrderData[e.target.name]= e.target.value;
      setOrderData(myOrderData);
      console.log(myOrderData);
    }
  
    function validateOrderUserForm(){
      let scheme= Joi.object({
          c_name: Joi.string().required(),
          c_company: Joi.string().required(),
          c_email: Joi.string().required(),
          c_phone: Joi.string().required(),
          c_CellPhone: Joi.string().required(),
        //   c_PhoneNumber1Ext: Joi.string(),
          c_line1: Joi.string().required(),
          c_line2: Joi.string().required(),
          c_city: Joi.string().required(),
          pieces: Joi.number().required(),
          p_name: Joi.string().required(),
          p_company: Joi.string().required(),
          p_email: Joi.string().required(),
          p_phone: Joi.string().required(),
          p_PhoneNumber1Ext: Joi.string(),
          p_line1: Joi.string().required(),
          p_city: Joi.string().required(),
          p_CellPhone: Joi.string().required(),
          p_postCode: Joi.string().required(),
          weight: Joi.number().required(),
    

  
      });
      return scheme.validate(orderData, {abortEarly:false});
    }
  return (
<div className='p-4' id='content'>
        <div className="shipmenForm">
        <form onSubmit={submitOrderUserForm} className='' action="">
            <div className="row">
            <div className="col-md-6">
            <div className="shipper-details brdr-grey p-4">
                <h3>تفاصيل المرسل</h3>
                <div className='pb-3'>
                <label htmlFor=""> اسم المرسل</label>
                <input type="text" className="form-control" name='p_name' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                <div className='pb-3'>
                <label htmlFor=""> اسم الشركة/المتجر</label>
                <input type="text" className="form-control" name='p_company' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_company'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> البريد الالكترونى</label>
                <input type="text" className="form-control" name='p_email' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_email'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor="">رقم الهاتف</label>
                {/* <input type="text" className="form-control" /> */}
                <PhoneInput name='p_phone' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={value}
    onChange={(value) => {
      setPhoneValue(value);
      getOrderData({ target: { name: 'p_phone', value } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='p_phone'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
      
            </div>
            <div className='pb-3'>
                <label htmlFor="">الهاتف الخلوى</label>
                {/* <input type="text" className="form-control"/> */}
                <PhoneInput name='p_CellPhone' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={pcellPhone}
    onChange={(pcellPhone) => {
      setPcellPhone(pcellPhone);
      getOrderData({ target: { name: 'p_CellPhone', value: pcellPhone } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='p_CellPhone'){
        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
      }
      
    })}
      
            </div>
            <div className='pb-3'>
                <label htmlFor="">رقم هاتف اضافى </label>
                {/* <input type="text" className="form-control"/> */}
                <PhoneInput name='p_PhoneNumber1Ext' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={p_PhoneNumber}
    onChange={(p_PhoneNumber) => {
      setp_PhoneNumber1Ext(p_PhoneNumber);
      getOrderData({ target: { name: 'p_PhoneNumber1Ext', value: p_PhoneNumber } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='p_PhoneNumber1Ext'){
        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
      }
      
    })}
      
            </div>
            
            <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <input type="text" className="form-control" name='p_city' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> العنوان</label>
                <input type="text" className="form-control" name='p_line1' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_line1'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> الرمز البريدى</label>
                <input type="text" className="form-control" name='p_postCode' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_postCode'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
           
            
            </div>
            <div className="package-info brdr-grey p-3 my-3 ">
                <h3>بيانات الشحنة</h3>
                <div className="row">
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> الوزن</label>
                <input type="number" className="form-control" name='weight' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='weight'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                </div>
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> عدد القطع</label>
                <input type="number" className="form-control" name='pieces' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='pieces'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}               
            </div>
                </div>
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> القيمة</label>
                <input type="text" className="form-control" name=''/>
                
            </div>
                </div>
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> محتويات الشحنة</label>
                <input type="text" className="form-control"/>
            </div>
                </div>
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> رقم الفاتورة</label>
                <input type="text" className="form-control"/>
            </div>
                </div>
                
                <div className="">
                
                </div>
                <h6 className='text-center py-2'>{'<<'}  معلومات اضافية  {'>>'}</h6>
                <div className="col-md-4">
                <div className='pb-3'>
                <label htmlFor=""> الامتداد </label>
                <input type="text" className="form-control"/>
            </div>
                </div>
                <div className="col-md-4">
                <div className='pb-3'>
                <label htmlFor=""> العرض </label>
                <input type="text" className="form-control"/>
            </div>
                </div>
                <div className="col-md-4">
                <div className='pb-3'>
                <label htmlFor=""> الطول </label>
                <input type="text" className="form-control"/>
            </div>
                </div>
                </div>
            </div>
            </div>
            <div className="col-md-6">
            <div className="reciever-details brdr-grey p-3">
                <h3>تفاصيل المستلم</h3>
                {/* <div className=" mb-4 mt-2">
        <input className='form-control' type="search" placeholder='بحث بالأسم' />
        </div> */}
        <div className='pb-3'>
                <label htmlFor=""> اسم المستلم</label>
                <input type="text" className="form-control" name='c_name' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> اسم الشركة</label>
                <input type="text" className="form-control" name='c_company' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_company'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
       
            </div>
            <div className='pb-3'>
                <label htmlFor=""> البريد الالكترونى</label>
                <input type="text" className="form-control" name='c_email' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_email'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> رقم الهاتف</label>
                {/* <input type="text" className="form-control"/> */}
                <PhoneInput name='c_phone' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone2}
    onChange={(phone2) => {
      setPhone2(phone2);
      getOrderData({ target: { name: 'c_phone', value: phone2 } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='c_phone'){
        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
      }
      
    })}
      
            </div>
            <div className='pb-3'>
                <label htmlFor="">الهاتف الخلوى</label>
                <PhoneInput name='c_CellPhone' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={CcellPhone}
    onChange={(CcellPhone) => {
      setCcellPhone(CcellPhone);
      getOrderData({ target: { name: 'c_CellPhone', value: CcellPhone } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='c_CellPhone'){
        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
      }
      
    })}
      
            </div>
            {/* <div className='pb-3'>
                <label htmlFor="">رقم هاتف اضافى </label>
                <PhoneInput name='c_PhoneNumber1Ext' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={c_PhoneNumber}
    onChange={(c_PhoneNumber) => {
      setc_PhoneNumber1Ext(c_PhoneNumber);
      getOrderData({ target: { name: 'c_PhoneNumber1Ext', value: c_PhoneNumber } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='c_PhoneNumber1Ext'){
        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
      }
      
    })}
      
            </div> */}
            
            <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <input type="text" className="form-control" name='c_city' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            
            <div className='pb-3'>
                <label htmlFor=""> العنوان</label>
                <input type="text" className="form-control" name='c_line1' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_line1'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> عنوان اضافى</label>
                <input type="text" className="form-control" name='c_line2' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_line2'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            
            <button className="btn btn-orange"> <i className='fa-solid fa-plus'></i> اضافة مستلم</button>
            </div>
            </div>
            </div>
        </form>
        
        </div>
        <div className="clients-table p-4 mt-5">
            <h6 className='text-center'>بيانات المستلم</h6>
        <table className="table">
        <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">الأسم</th>
      <th scope="col">البريد الالكترونى</th>
      <th scope="col">الهاتف </th>
      <th scope="col">الموقع</th>
      <th scope="col">الدفع عند الاستلام</th>
      <th scope="col">الاجراءات</th>
    </tr>
  </thead>
        </table>
      </div>
    </div>
      )
}
