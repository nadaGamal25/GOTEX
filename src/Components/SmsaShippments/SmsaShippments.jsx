import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';

export default function SmsaShippments(userData) {
  const [companiesDetails,setCompaniesDetails]=useState([])
  async function getCompaniesDetailsOrders() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/api/companies/get-all');
      const companiesPrices = response.data.data;
      console.log(companiesPrices)
      setCompaniesDetails(companiesPrices)
    } catch (error) {
      console.error(error);
    }
  }
    const [value ,setPhoneValue]=useState()
    const [phone2,setPhone2] =useState()
    const [cPhoneNumber2,setcPhone] =useState()
    const [CcellPhone,setCcellPhone] =useState()
    const [p_PhoneNumber,setp_PhoneNumber1Ext] =useState()
    const [c_PhoneNumber,setc_PhoneNumber1Ext] =useState()

    const [errorList, seterrorList]= useState([]); 
  const [orderData,setOrderData] =useState({
    c_name: "",
    c_ContactPhoneNumber: "",
    c_ContactPhoneNumber2: "",
    c_District: "",
    c_City: "",
    c_AddressLine1: "",
    c_AddressLine2: "",
    p_name: "",
    p_ContactPhoneNumber: "",
    p_District: "",
    p_City: "",
    p_AddressLine1: "",
    p_AddressLine2: "",
    pieces: "",
    weight: "",
    description: "",
    Value: "",
    cod: false,
    shipmentValue:'',

  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)

  async function sendOrderDataToApi() {
    console.log(localStorage.getItem('userToken'))
    try {
      const response = await axios.post(
        "https://dashboard.go-tex.net/api/smsa/create-user-order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
  
      if (response.status === 200) {
        setisLoading(false);
        window.alert(`تم تسجيل الشحنة بنجاح`);
        console.log(response.data);
      
        console.log("okkkkkkkkkkk")
      }else if (response.status === 400) {
        setisLoading(false);
        const errorMessage = response.data.msg || "An error occurred.";
        window.alert(errorMessage);
        console.log(response.data);
      }
    } catch (error) {
      // Handle error
      console.error(error);
      setisLoading(false);
      const errorMessage = error.response.data.msg || "An error occurred.";
      window.alert(errorMessage);
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

  function getOrderData(e) {
    let myOrderData = { ...orderData };
    if (e.target.type === "number") { // Check if the value is a number
      myOrderData[e.target.name] = Number(e.target.value);
    } else if (e.target.value === "true" || e.target.value === "false") {
      myOrderData[e.target.name] = e.target.value === "true";
    } else {
      myOrderData[e.target.name] = e.target.value;
    }
  
    setOrderData(myOrderData);
    console.log(myOrderData);
    console.log(myOrderData.cod);
  }
  
    // function getOrderData(e){
    //   let myOrderData={...orderData};
    //   myOrderData[e.target.name]= e.target.value;
    //   setOrderData(myOrderData);
    //   console.log(myOrderData);
    // }
  
    function validateOrderUserForm(){
      let scheme= Joi.object({
          c_name: Joi.string().required(),
          c_ContactPhoneNumber: Joi.string().required(),
          c_ContactPhoneNumber2: Joi.string().allow(null, ''),
          c_District: Joi.string().required(),
          c_AddressLine1: Joi.string().required(),
          c_AddressLine2: Joi.string().allow(null, ''),
          c_City: Joi.string().required(),
          p_name: Joi.string().required(),
          p_ContactPhoneNumber: Joi.string().required(),
          p_AddressLine2:Joi.string().allow(null, ''),
          p_AddressLine1: Joi.string().required(),
          p_City: Joi.string().required(),
          p_District: Joi.string().required(),
          weight: Joi.number().required(),
          pieces: Joi.number().required(),
          Value: Joi.number().required(),
          description:Joi.string().required(),
          cod:Joi.required(),
          shipmentValue:Joi.number().allow(null, ''),
    

  
      });
      return scheme.validate(orderData, {abortEarly:false});
    }
    useEffect(()=>{
      getCities()
      getCompaniesDetailsOrders()
  },[])
    const [cities,setCities]=useState()
    async function getCities() {
      console.log(localStorage.getItem('userToken'))
      try {
        const response = await axios.get('https://dashboard.go-tex.net/api/glt/cities',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        setCities(response.data.data.data)
        console.log(response.data.data.data)
      } catch (error) {
        console.error(error);
      }
    }
  return (
<div className='p-4' id='content'>
        <div className="shipmenForm">
        { userData.userData.data.user.rolle === "marketer"?(
            <div className="prices-box text-center">
            {companiesDetails.map((item, index) => (
                item === null?(<div></div>):
                item.name === "smsa" ? (<p>قيمة الشحن من <span>{item.mincodmarkteer} ر.س</span> الى <span>{item.maxcodmarkteer} ر.س</span></p>):
                null))}
          </div>
          ): null}
        <form onSubmit={submitOrderUserForm} className='' action="">
            <div className="row">
            <div className="col-md-6">
            <div className="shipper-details brdr-grey p-4">
                <h3>تفاصيل المرسل</h3>
                <div className='pb-3'>
                <label htmlFor=""> الاسم </label>
                <input type="text" className="form-control" name='p_name' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor="">رقم الهاتف</label>
                {/* <input type="text" className="form-control" /> */}
                <PhoneInput name='p_ContactPhoneNumber' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={value}
    onChange={(value) => {
      setPhoneValue(value);
      getOrderData({ target: { name: 'p_ContactPhoneNumber', value } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='p_ContactPhoneNumber'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
      
            </div>            
            <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <select className="form-control" name='p_City' onChange={getOrderData}>
                <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}
                  </select>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_City'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> المنطقة</label>
                <input type="text" className="form-control" name='p_District' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_District'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> العنوان</label>
                <input type="text" className="form-control" name='p_AddressLine1' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_AddressLine1'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> عنوان اضافى</label>
                <input type="text" className="form-control" name='p_AddressLine2' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_AddressLine2'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            
            {/* <div className="pb-3">
            <label htmlFor="" className='d-block'>طريقة الدفع:</label>
                    <div className='pe-2'>
                    <input  type="radio" value="true" name='cod' onChange={getOrderData}/>
                    <label className='label-cod' htmlFor="cod"  >الدفع عند الاستلام(COD)</label>
                    </div>
                    <div className='pe-2'>
                    <input type="radio" value="false"  name='cod' onChange={getOrderData}/>
                    <label className='label-cod' htmlFor="cod">الدفع اونلاين </label>
                    </div>
                    {errorList.map((err,index)=>{
      if(err.context.label ==='cod'){
        return <div key={index} className="alert alert-danger my-2">يجب اختيار طريقة الدفع </div>
      }
      
    })}
            </div>
            */}
            
            </div>
            <div className="package-info brdr-grey p-3 my-3 ">
                <h3>بيانات الشحنة</h3>
                <div className="row">
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> الوزن</label>
                <input type="number" step="0.001" className="form-control" name='weight' onChange={getOrderData}/>
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
                <label htmlFor=""> قيمة الشحنة </label>
                <input type="number" step="0.001" className="form-control" name='Value' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='Value'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}               
            </div>
                </div> 
                {userData.userData.data.user.rolle === "user"?(
              <>
              <div className="pb-3">
              <label htmlFor="" className='d-block'>طريقة الدفع:</label>
                      <div className='pe-2'>
                      <input  type="radio" value={true} name='cod' onChange={getOrderData}/>
                      <label className='label-cod' htmlFor="cod"  >الدفع عند الاستلام(COD)</label>
                      </div>
                      <div className='pe-2'>
                      <input type="radio" value={false}  name='cod' onChange={getOrderData}/>
                      <label className='label-cod' htmlFor="cod">الدفع اونلاين </label>
                      </div>
                      {errorList.map((err,index)=>{
        if(err.context.label ==='cod'){
          return <div key={index} className="alert alert-danger my-2">يجب اختيار طريقة الدفع </div>
        }
        
      })}
              </div>
              {orderData.cod === true && (
    <div className='pb-3'>
      <label htmlFor=""> قيمة الشحنة</label>
      <input type="number" step="0.001" className="form-control" name='shipmentValue' onChange={getOrderData} required />
      {errorList.map((err, index) => {
        if (err.context.label === 'shipmentValue') {
          return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة</div>
        }
      })}
    </div>
              )}
              {orderData.cod === false && (
                <div></div>
              )}
               
              </>
   
            ):userData.userData.data.user.rolle === "marketer"?(
              <>
              <div className="pb-3">
              <label htmlFor="" className='d-block'>طريقة الدفع:</label>
                      <div className='pe-2'>
                      <input  type="radio" value={true} name='cod' onChange={getOrderData}/>
                      <label className='label-cod' htmlFor="cod"  >الدفع عند الاستلام(COD)</label>
                      </div>
                      <div className='pe-2'>
                      <input type="radio" value={false}  name='cod' onChange={getOrderData}/>
                      <label className='label-cod' htmlFor="cod">الدفع اونلاين </label>
                      </div>
                      {errorList.map((err,index)=>{
        if(err.context.label ==='cod'){
          return <div key={index} className="alert alert-danger my-2">يجب اختيار طريقة الدفع </div>
        }
        
      })}
              </div>
              {orderData.cod !== false && (
                <>
                <div className='pb-3'>
                <label htmlFor=""> قيمة الشحن (cod)</label>
                <input type="number" step="0.001" className="form-control" name='cod' onChange={getOrderData} required/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='cod'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
    <div className='pb-3'>
      <label htmlFor=""> قيمة الشحنة</label>
      <input type="number" step="0.001" className="form-control" name='shipmentValue' onChange={getOrderData} required />
      {errorList.map((err, index) => {
        if (err.context.label === 'shipmentValue') {
          return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة</div>
        }
      })}
    </div>
    </>
              )}
              {/* {orderData.cod === false && (
                <div></div>
              )} */}
               
              </>
   
                   
                   ):
                   <h4></h4>}
                <div className="">
                <div className='pb-3'>
                <label htmlFor=""> الوصف </label>
                <textarea className="form-control" name='description' onChange={getOrderData} cols="30" rows="4"></textarea>
                {errorList.map((err,index)=>{
      if(err.context.label ==='description'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
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
                <label htmlFor=""> رقم الهاتف</label>
                {/* <input type="text" className="form-control"/> */}
                <PhoneInput name='c_ContactPhoneNumber' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone2}
    onChange={(phone2) => {
      setPhone2(phone2);
      getOrderData({ target: { name: 'c_ContactPhoneNumber', value: phone2 } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='c_ContactPhoneNumber'){
        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
      }
      
    })}
      
            </div>
            <div className='pb-3'>
                <label htmlFor=""> رقم هاتف اضافى</label>
                {/* <input type="text" className="form-control"/> */}
                <PhoneInput name='c_ContactPhoneNumber2' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={cPhoneNumber2}
    onChange={(cPhoneNumber2) => {
      setcPhone(cPhoneNumber2);
      getOrderData({ target: { name: 'c_ContactPhoneNumber2', value: cPhoneNumber2 } });
    }}/>
   
      
            </div>
            
            <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <select className="form-control" name='c_City' onChange={getOrderData}>
                <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}
                </select>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_City'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> المنطقة</label>
                <input type="text" className="form-control" name='c_District' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_District'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            
            <div className='pb-3'>
                <label htmlFor=""> العنوان</label>
                <input type="text" className="form-control" name='c_AddressLine1' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_AddressLine1'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> عنوان اضافى</label>
                <input type="text" className="form-control" name='c_AddressLine2' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_AddressLine2'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            
            <button className="btn btn-orange"> <i className='fa-solid fa-plus'></i> إضافة مستلم</button>
            </div>
            </div>
            </div>
        </form>
        
        </div>
        
    </div> 
     )
}
