import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import logo from '../../assets/logo.png';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'

export default function InvitedSignUp() {
    const [selectedFile, setSelectedFile] = useState(null);

    const [visible , setVisible] =useState(false);  
    let navigate= useNavigate(); //hoke
    const [errorList, seterrorList]= useState([]); 
    const [value ,setPhoneValue]=useState()
    const [error , setError]= useState('')
    const [isLoading, setisLoading] =useState(false)
    const [theUser,setUser] =useState({
      name: "",
      mobile: "",
      email: "",
      password: "",
      passwordconfirm:"",
      address: "",
      location: "",
      cr:"",
      invCode: ""   
    })
    async function sendRegisterDataToApi() {
      const formData = new FormData();
      formData.append('name', theUser.name);
      formData.append('mobile', theUser.mobile);
      formData.append('email', theUser.email);
      formData.append('password', theUser.password);
      formData.append('passwordconfirm', theUser.passwordconfirm);
      formData.append('address', theUser.address);
      formData.append('location', theUser.location);
      formData.append('invCode', theUser.invCode);      
      
      if (selectedFile) {
        formData.append('cr', selectedFile, selectedFile.name);
      }
    
      try {
        const response = await axios.post('https://dashboard.go-tex.net/api/invatation/invited-user-signup', formData
        
        );
    
        if (response.data.msg === 'ok') {
          setisLoading(false);
          console.log(response.data);
          window.alert('تم التسجيل بنجاح');
          navigate('/verifyUser');
        } else {
          setisLoading(true);
          setError(response.data.msg);
        }
      } catch (error) {
        setisLoading(true);
        setError('An error occurred while registering');
      }
    }
  
    function handleFileChange(event) {
      console.log(event.target.files)
      setSelectedFile(event.target.files[0]);
    }
    
  function submitRegisterForm(e){
      e.preventDefault();
      setisLoading(true)
      let validation = validateRegisterForm();
      console.log(validation);
      if(validation.error){
        setisLoading(false)
        seterrorList(validation.error.details)
    console.log("no")
      }else{
        sendRegisterDataToApi();
        console.log("yes")
  
      }
    
    }
    
    function getUserData(e){
      let myUser={...theUser};
      myUser[e.target.name]= e.target.value;
      setUser(myUser);
      console.log(myUser);
    }
  
    function validateRegisterForm(){
      let scheme= Joi.object({
          name:Joi.string().required(),
          mobile:Joi.string().required(),
          email:Joi.string().email({ tlds: { allow: ['com', 'net','lol'] }}).required(),
          password:Joi.string().pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
          ).required(),
          passwordconfirm: Joi.valid(Joi.ref('password')).required().messages({
            'any.only': 'Passwords do not match',
            'any.required': 'Password confirmation is required',
          }),
          address:Joi.string().required(),
          location:Joi.string().required(),
          cr:Joi.allow(null, ''),
          invCode:Joi.string().required(),
      });
  
      return scheme.validate(theUser, {abortEarly:false});
    }
  
    
    function handlePhoneChange(value,e) {
      setPhoneValue(value);
      getUserData(e); // Call getUserData function when phone number changes
    }
  return (
    <>
    <div className="d-flex min-vh-100 p-5 register-container">
    <div className="register-box m-auto">
    <div className="text-center">
    <img className='m-auto logo' src={logo} alt="logo" />
    </div>
    
    {/* {error.length >0 ?<div className='alert alert-danger my-2'>{error}</div>:''} */}
    <form onSubmit={submitRegisterForm} className='my-3' action="">
      <label htmlFor="name">الاسم :</label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='name' id='name' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    <label htmlFor="email">البريد الالكترونى :</label>
      <input onChange={getUserData} type="email" className='my-input my-2 form-control' name='email' id='email' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='email'){
        return <div key={index} className="alert alert-danger my-2">الايميل يجب ان يكون بريدا الكتروني صحيح</div>
      }
      
    })}
    {/* <div id='alerto'></div> */}
    {/* {alertMsg === "exist" && <p id="alerto" className="alert alert-danger my-2">هذا البريد الالكترونى موجود بالفعل</p>} */}

      <label htmlFor="password">كلمة المرور :</label>
      <div className='pass-box'>
      <input onChange={getUserData} type={visible? "text" :"password"} className='my-input my-2 form-control' name='password' id='password' />
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      {visible?<i class="fa-regular fa-eye "></i> : <i class="fa-regular fa-eye-slash "></i> }
      </span>
      {errorList.map((err,index)=>{
      if(err.context.label ==='password'){
        return <div key={index} className="alert alert-danger my-2"> كلمة المرور يجب ان  لا تقل عن ثمانية احرف وارقام على الاقل ويجب ان تحتوى lowercase & uppercase character ورمزاواحدا على الاقل</div>
      }
      
    })}
    </div>
      <label htmlFor="passwordconfirm">تأكيد كلمة المرور :</label>
      <div className='pass-box'>
      <input onChange={getUserData} type={visible? "text" :"password"} className='my-input my-2 form-control' name='passwordconfirm' id='passwordconfirm' />
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      </span>
      {errorList.map((err,index)=>{
      if(err.context.label ==='passwordconfirm'){
        return <div key={index} className="alert alert-danger my-2">كلمة السر غير متطابقة</div>
      }
      
    })}
    </div>
     
    <label htmlFor="mobile">رقم الهاتف :</label>    
    <PhoneInput name='mobile' value={value} 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' onChange={(value) => {
      setPhoneValue(value);
      getUserData({ target: { name: 'mobile', value } });
    }}

    />
    {errorList.map((err,index)=>{
      if(err.context.label ==='mobile'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات</div>
      }
      
    })}
      
      
      <label htmlFor="address">العنوان :</label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='address' id='address' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='address'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
      <label htmlFor="location">الموقع(المدينة-المحافظة) :</label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='location' id='location' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='location'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
    <label htmlFor="invCode">كود الدعوة :</label>
      <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='invCode' id='address' />
      {errorList.map((err,index)=>{
      if(err.context.label ==='invCode'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
      }
      
    })}
      <label htmlFor="cr">توثيق النشاط التجارى :</label><br/>
      <input
        type="file"
        className="my-2"
        name="cr"
        id="cr"
        onChange={(e) => {
          handleFileChange(e);
          getUserData(e);
        }}
        
    
      />
      <br/>
      
      
      <p className="email-note">* يرجى عدم التسجيل بنفس الايميل أكثر من مرة</p>
      <button className='btn btn-signup'>
        {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'انشاء حساب'}
      </button>
     </form>
     
     {/* <div className='text-center'>
      <p>هل لديك حساب بالفعل؟ <Link className='sign-link' to='/'>قم بتسجيل الدخول..</Link> </p>
     </div> */}
     </div>
     </div>
    </>  )
}
