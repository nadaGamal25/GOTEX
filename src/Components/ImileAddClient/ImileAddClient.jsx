import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';

export default function ImileAddClient() {
  const [value ,setPhoneValue]=useState();
  const [phone2,setPhone2] =useState();

  const [errorList, seterrorList]= useState([]); 
const [clientData,setClientData] =useState({
  companyName: "",
  contacts: "",
  city: "",
  area: "",
  address: "",
  phone: "",
  email: "",
  backupPhone: "",
  attentions: ""
})
const [error , setError]= useState('')
const [isLoading, setisLoading] =useState(false)

async function sendDataToApi() {
  console.log(localStorage.getItem('userToken'))
  try {
    const response = await axios.post(
      "https://dashboard.go-tex.net/api/imile/add-client",
      clientData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      }
    );

    if (response.status === 200) {
      setisLoading(false);
      window.alert("تمت اضافة العميل بنجاح");
      console.log(response.data);
      const clients = response.data.data;
      console.log(clients)      
  }
      else if (response.status === 400) {
      setisLoading(false);
      const errorMessage = response.data?.msg?.message || "An error occurred.";
      window.alert(`${errorMessage}`);
      console.log(response.data);
    }
  } catch (error) {
    // Handle error
    console.error(error);
    setisLoading(false);
    const errorMessage = error.response?.data?.msg?.message || "An error occurred.";
    window.alert(`${errorMessage}`);
  }
}

function submitForm(e){
e.preventDefault();
setisLoading(true)
let validation = validateForm();
console.log(validation);
if(validation.error){
  setisLoading(false)
  seterrorList(validation.error.details)

}else{
  sendDataToApi();
}

}

function getData(e) {
let myData = { ...clientData };
if (e.target.type === "number") { // Check if the value is a number
  myData[e.target.name] = Number(e.target.value);
} else if (e.target.value === "true" || e.target.value === "false") {
  myData[e.target.name] = e.target.value === "true";
} else {
  if (e.target.name === "phone" || e.target.name === "backupPhone") {
    const phoneNumber = e.target.value ? e.target.value.replace(/\+/g, '') : '';
    myData[e.target.name] = phoneNumber;
  } else {
    myData[e.target.name] = e.target.value;
  }}

setClientData(myData);
console.log(myData);
}


function validateForm(){
  let scheme= Joi.object({
    companyName:Joi.string().required(),
    contacts:Joi.string().required(),
    email:Joi.string().email({ tlds: { allow: ['com', 'net','lol'] }}).allow(null, ''),
    city:Joi.string().required(),
    area:Joi.string().required(),
    address:Joi.string().required(),
    phone:Joi.string().required(),
    backupPhone:Joi.string().allow(null, ''), 
    attentions:Joi.string().required(),
  });
  return scheme.validate(clientData, {abortEarly:false});
} 
  return (
    <>
    <div className='p-4' id='content'>
        <div className="shipmenForm marginForm">
        <form onSubmit={submitForm} className='my-3' action="">
            <div className="row">
                <div className="col-md-6 pb-3">
        <label htmlFor="companyName"> اسم الشركة  :<span className="star-requered">*</span></label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='companyName' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='companyName'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="col-md-6 pb-3">
        <label htmlFor="contacts"> الاسم   :<span className="star-requered">*</span></label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='contacts' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='contacts'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    
    <div className="col-md-6 pb-3">
    <label htmlFor="phone">رقم الهاتف:<span className="star-requered">*</span></label>
                {/* <input type="text" className="form-control" /> */}
                <PhoneInput name='phone' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput my-2' value={value}
    onChange={(value) => {
      setPhoneValue(value);
      getData({ target: { name: 'phone', value } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='phone'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="col-md-6 pb-3">
    <label htmlFor="">  رقم هاتف اضافى:
    <span className="star-requered"> </span>
    </label>
              <PhoneInput name='backupPhone' 
  labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput my-2' value={phone2}
  onChange={(phone2) => {
    setPhone2(phone2);
    getData({ target: { name: 'backupPhone', value: phone2 } });
  }}/>
  {errorList.map((err,index)=>{
    if(err.context.label ==='backupPhone'){
      return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
    }
    
  })}
    </div>
    <div className="col-md-6 pb-3">
        <label htmlFor="email"> البريد الالكترونى   :<span className="star-requered">*</span></label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='email' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='email'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="col-md-6 pb-3">
        <label htmlFor="city">المدينة    :<span className="star-requered">*</span></label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='city' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    
    <div className="col-md-6 pb-3">
        <label htmlFor="area"> المنطقة  :<span className="star-requered">*</span></label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='area' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='area'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    <div className="col-md-6 pb-3">
        <label htmlFor="address">العنوان   :<span className="star-requered">*</span></label>
      <input onChange={getData} type="text" className='my-input my-2 form-control' name='address' />
      
      {errorList.map((err,index)=>{
      if(err.context.label ==='address'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
    </div>
    
    
    <div className="col-md-6 pb-3">
        <label htmlFor="attentions">ملاحظات   :<span className="star-requered">*</span></label>
        <textarea className="form-control" name='attentions' onChange={getData} cols="70" rows="3"></textarea>
                {errorList.map((err,index)=>{
      if(err.context.label ==='attentions'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
    </div>
      
    
     
      
      </div>
      <div className="text-center pt-2">
      <button className='btn btn-dark my-2'>
      إضافة عميل 
      </button>
      </div>
     </form>
        </div>
        </div>

</> 
  )
}
