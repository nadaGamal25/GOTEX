import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'

export default function Login({saveUserData}) {

  let navigate= useNavigate(); //hoke
  const [errorList, seterrorList]= useState([]); 
  const [user,setUser] =useState({
    email:'',
    password:''
  })
  const [visible , setVisible] =useState(false);
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)

async function sendLoginDataToApi(){
//   let {data}= await axios.post(``,user);
//   if(data.message == 'success'){
//     setisLoading(false)
//     localStorage.setItem('userToken', data.token);
//     saveUserData();
//     navigate('/');
//   }
//   else{
//     setisLoading(false)
//     setError(data.message)
//   }
}
function submitLoginForm(e){
  e.preventDefault();
  setisLoading(true)
  let validation = validateLoginForm();
  console.log(validation);
  if(validation.error){
    setisLoading(false)
    seterrorList(validation.error.details)

  }else{
    sendLoginDataToApi();
  }

}

  function getUserData(e){
    let myUser={...user};
    myUser[e.target.name]= e.target.value;
    setUser(myUser);
    console.log(myUser);
  }

  function validateLoginForm(){
    let scheme= Joi.object({
      email:Joi.string().email({ tlds: { allow: ['com', 'net'] }}).required(),
      password:Joi.string().pattern(/^[a-zA-Z0-9]{8,}$/)

    });
    return scheme.validate(user, {abortEarly:false});
  }
  return (
    <>
    <div className="d-flex min-vh-100 login-container">
    <div className="login-box m-auto">
        <div className="text-center">
    <img className='m-auto' src={logo} alt="logo" />
    </div>
    {error.length >0 ?<div className='alert alert-danger my-2'>{error}</div>:''}
    <form onSubmit={submitLoginForm} className='my-3' action="">
      <label htmlFor="email">البريد الالكترونى :</label>
      <input onChange={getUserData} type="email" className='my-input my-2 form-control' name='email' id='email' />
      {/* {errorList.filter((err)=> err.context.label == 'email')[0]?
      <div className="alert alert-danger my-2">{errorList.filter((err)=> err.context.label =='email')[0]?.message}</div>:''
      } */}
      {errorList.map((err,index)=>{
      if(err.context.label ==='email'){
        return <div key={index} className="alert alert-danger my-2">الايميل يجب ان يكون بريدا الكتروني صحيح</div>
      }
      
    })}
      <label htmlFor="password">كلمة المرور :</label>
      <div className='pass-box'>
      <input onChange={getUserData} type={visible? "text" :"password"} className='my-input my-2 form-control pass' name='password' id='password' />
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      {visible?<i class="fa-regular fa-eye "></i> : <i class="fa-regular fa-eye-slash "></i> }
      </span>
      {errorList.map((err,index)=>{
      if(err.context.label ==='password'){
        return <div key={index} className="alert alert-danger my-2">كلمة المرور غير صحيحة</div>
      }
      
    })}
    </div>
      <button className='btn btn-login'>
        {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'تسجيل الدخول'}
      </button>
     </form>
     <div className='text-center sign-footer'>
      <p>هل انت جديد فى المنصة؟ <Link className='sign-link' to='/register'>قم بعمل حساب جديد..</Link> </p>
     </div>
     </div>
     </div>
    </>
  )
}
