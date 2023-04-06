import React from 'react'

export default function ShipmentForms() {
  return (
    <div className='p-5' id='content'>
        <form action="">
            <div className="row">
            <div className="col-md-6">
            <div className="shipper-details brdr-grey p-4">
                <h3>تفاصيل الشاحن</h3>
                <h5 className="text-center">
                    اسم الشاحن
                </h5>
                <div className='pb-3'>
                <label htmlFor=""> اسم الشركة/المتجر</label>
                <input type="text" className="form-control"/>
            </div>
            <div className='pb-3'>
                <label htmlFor="">رقم الهاتف</label>
                <input type="text" className="form-control" />
            </div>
            <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <input type="text" className="form-control"/>
            </div>
            </div>
            <div className="package-info brdr-grey p-3 my-3 ">
                <h3>بيانات الشحنة</h3>
                <div className="row">
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> الوزن</label>
                <input type="text" className="form-control"/>
            </div>
                </div>
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> القيمة</label>
                <input type="text" className="form-control"/>
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
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> عدد القطع</label>
                <input type="text" className="form-control"/>
            </div>
                </div>
                </div>
            </div>
            </div>
            <div className="col-md-6">
            <div className="reciever-details brdr-grey p-3">
                <h3>تفاصيل المستلم</h3>
                <div className=" mb-4 mt-2">
        <input className='form-control' type="search" placeholder='بحث بالأسم' />
        </div>
        <div className='pb-3'>
                <label htmlFor=""> الاسم</label>
                <input type="text" className="form-control"/>
            </div>
            <div className='pb-3'>
                <label htmlFor=""> رقم الهاتف</label>
                <input type="text" className="form-control"/>
            </div>
            <div className='pb-3'>
                <label htmlFor=""> العنوان</label>
                <input type="text" className="form-control"/>
            </div>
            <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <input type="text" className="form-control"/>
            </div>
            <button className="btn btn-primary">اضافة عميل</button>
            </div>
            </div>
            </div>
        </form>
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
