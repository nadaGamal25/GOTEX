import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import logo from '../../assets/logo.png';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
export default function RegisterForm() {
//   var signEmail=document.getElementById("email");
//   var theAlert =document.getElementById("alerto");
//   var signArray=[];
// if (localStorage.getItem('theUsers') == null) {
//     signArray = [];
// } else {
//     signArray = JSON.parse(localStorage.getItem('theUsers'));
// };
// function existEmailFunc(){
//   let messages = []

// var signup={
//   email:signEmail.value,
// };
// if (signArray.length == 0){
//   signArray.push(signup);
//   localStorage.setItem("theUsers",JSON.stringify(signArray));
// };

// for(i=0;i<signArray.length;i++){
//   if(signArray[i].email.toLowerCase() ==signEmail.value.toLowerCase()){
//       messages.push("email already exists");
//   };
// };
//   if (messages.length > 0) {
//     theAlert.innerText = "exist";
// }else{
//     signArray.push(signup);
//     localStorage.setItem('theUsers', JSON.stringify(signArray));
// };
// }

  const [signEmail, setSignEmail] = useState("");
  const [signArray, setSignArray] = useState(() => {
    if (localStorage.getItem('theUsers') == null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('theUsers'));
    }
  });
  const [alertMsg, setAlertMsg] = useState("");

  function existEmailFunc() {
    let messages = [];

    const signup = {
      email: signEmail,
    };

    if (signArray.length === 0) {
      setSignArray([...signArray, signup]);
      localStorage.setItem("theUsers", JSON.stringify([...signArray, signup]));
    }

    for (let i = 0; i < signArray.length; i++) {
      if (signArray[i].email.toLowerCase() === signEmail.toLowerCase()) {
        messages.push("email already exists");
      }
    }

    if (messages.length > 0) {
      setAlertMsg("exist");
    } else {
      setAlertMsg("")
      setSignArray([...signArray, signup]);
      localStorage.setItem('theUsers', JSON.stringify([...signArray, signup]));
    }
  }

  


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
    location: ""
  })
  async function sendRegisterDataToApi(){
  let response= await axios.post(`https://dashboard.go-tex.net/api/user/signup`,theUser);
  if(response.data.msg == 'ok'){
    setisLoading(false)
    console.log(response.data)
    window.alert("تم التسجيل بنجاح")
    navigate('/')

  }
  else{
    setisLoading(true)
    setError(response.data.msg)
  }
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
        email:Joi.string().email({ tlds: { allow: ['com', 'net'] }}).required(),
        password:Joi.string().pattern(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        ).required(),
        // password:Joi.string().pattern(/^[a-zA-Z0-9]{8,}$/),
      //   passwordconfirm: Joi.any().valid(Joi.ref('password')).required(),
        passwordconfirm: Joi.valid(Joi.ref('password')).required().messages({
          'any.only': 'Passwords do not match',
          'any.required': 'Password confirmation is required',
        }),
        address:Joi.string().required(),
        location:Joi.string().required(),
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
      <label htmlFor="name">اسم المتجر :</label>
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
    {alertMsg === "exist" && <p id="alerto" className="alert alert-danger my-2">هذا البريد الالكترونى موجود بالفعل</p>}

    {/* {messages?<div className="alert alert-danger my-2">الايميل يجب ان يكون   </div>: ''} */}
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
      {/* {error.length >0 ?<div className='alert alert-danger my-2'>{error}</div>:''} */}
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
      <button className='btn btn-signup'>
        {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'انشاء حساب'}
      </button>
     </form>
     
     <div className='text-center'>
      <p>هل لديك حساب بالفعل؟ <Link className='sign-link' to='/'>قم بتسجيل الدخول..</Link> </p>
     </div>
     </div>
     </div>
    </>
  )
}

 // async function sendRegisterDataToApi(theUser) {
  //   axios.post("http://83.136.219.95:5000/user/signup", theUser)
  //     .then(response => console.log(response.data))
  //     .catch(error => console.error(error));
  
  //   try {
  //     const {data} = await axios.post('http://83.136.219.95:5000/user/signup', theUser);
  //     if (data.msg === 'ok') {
  //       console.log(data.user)
  //       window.alert('تم التسجيل');
  //     } else {
  //       console.log(data.error);
  //       window.alert('فشل التسجيل');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     window.alert('An error occurred while sending data to the API.');
  //   }}

// function submitRegisterForm(e){
//   e.preventDefault();
//   setisLoading(true)
//   let validation = validateRegisterForm();
//   console.log(validation);
//   if(validation.error){
//     setisLoading(false)
//     seterrorList(validation.error.details)
//   }
// //   }else{
// //     if (user.password !== user.passwordconfirm) {
// //     setError('Passwords do not match');
// //     setisLoading(false);
// //     return;
// //   }
//   else{
//     sendRegisterDataToApi();
//   }
// //   }

// }

{/* <input onChange={getUserData} type="text" className='my-input my-2 form-control' name='mobile' id='mobile' /> */}
