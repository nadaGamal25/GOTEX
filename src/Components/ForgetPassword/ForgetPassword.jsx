import React from 'react'
import { Link } from 'react-router-dom'

export default function ForgetPassword() {
  return (
    <>
    <div className="d-flex min-vh-100 login-container px-3">
        <div className="email-box m-auto">
            <p>يرجى إدخال بريدك الإلكتروني لتغيير كلمة المرور</p>
            <input className='form-control mb-4' type="email" placeholder='البريد الإلكتروني' />
            <hr />
            <Link to="/" className="btn btn-secondary">إغلاق</Link>
            <button className="btn btn-primary">إدخال</button>
        </div>
    </div>
    </>

    )
}
