import React from 'react'

export default function AddClient() {
  return (
    <>
    <div className='p-4 clienrformbox' id='content'>
        <h3>اضافة عميل</h3>
        <div className="client-form p-5 mt-3">
            <div className="row pb-4">
                <div className="col-md-4">
                    <label htmlFor="">اسم العميل *</label>
                    <input type="text" className="form-control" placeholder='الاسم'/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="">البريد الالكترونى *</label>
                    <input type="text" className="form-control" placeholder='البريد الالكترونى'/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="">رقم الهاتف *</label>
                    <input type="text" className="form-control" placeholder='الهاتف'/>
                </div>
            </div>
            <div className='pb-3'>
                <label htmlFor="">العنوان *</label>
                <input type="text" className="form-control" placeholder='العنوان'/>
            </div>
            <div>
                <label htmlFor="">الموقع *</label>
                <input type="text" className="form-control" placeholder='الموقع'/>
            </div>

             <button className="btn btn-add">اضافة</button>

        </div>
    </div>
    </>
  )
}
