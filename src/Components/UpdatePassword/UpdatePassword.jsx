import React, { useState } from 'react'

export default function UpdatePassword() {
    const [visible , setVisible] =useState(false);

  return (
<>
    <div className="d-flex min-vh-100 login-container px-3">
        <div className="email-box m-auto">
            <p>يرجى إدخال كلمة المرور الجديدة</p>
            <label htmlFor="password">كلمة المرور الجديدة:</label>
      <div className='pass-box'>
      <input type={visible? "text" :"password"} className='my-input mb-4 form-control pass' name='password' id='password' />
      <span onClick={()=> setVisible(!visible)} className="seenpass">
      {visible?<i class="fa-regular fa-eye "></i> : <i class="fa-regular fa-eye-slash "></i> }
      </span>
      {/* {errorList.map((err,index)=>{
      if(err.context.label ==='password'){
        return <div key={index} className="alert alert-danger my-2">كلمة المرور غير صحيحة</div>
      }
      
    })} */}
    </div>
                <hr />
            <button className="btn btn-primary">تغيير</button>
        </div>
    </div>
    </>
      )
}
