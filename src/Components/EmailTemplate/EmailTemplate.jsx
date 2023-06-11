import React from 'react'
import logo from '../../assets/logo.png';

export default function EmailTemplate() {
  return (
    <>
    <div className="d-flex min-vh-100 p-5 email-container">
    <div className="emailtemplate-box m-auto p-5">
    <div className="text-center mb-3">
    <img className='m-auto logo' src={logo} alt="logo" />
    </div>
    <h3>مرحبا..</h3>
    <h6>من فضلك اضغط فوق الزر بالأسفل للتحقق من عنوان بريدك الإلكتروني.</h6>
    <div className="text-center pb-4">
    <button className="btn btn-email my-3">توثيق البريد الالكترونى</button>
    </div>
    <h6>إذا لم تقم بإنشاء حساب ، فلا داعي لاتخاذ أي إجراء آخر.</h6>
    </div>
    </div>
    </>
  )
}
