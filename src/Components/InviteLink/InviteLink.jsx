import React from 'react'

export default function InviteLink() {
  return (
    <>
    <div className='py-4' id='content'>
    <div className="d-flex px-3 mt-3">
    <div className="invit-box p-4 brdr-grey m-auto">
        <div className="text-center">
           <h4>إنشاء رابط دعوة</h4>
        </div>
    <form className='my-3' action="">
        <div className="row px-2">
        <div className=''>
                <label htmlFor=""> الايميل</label>
                <input type="email" className="form-control"/>
            </div>
            <label htmlFor="" className=' label-company'>شركة gotex :</label>
        <div className="col-md-6">
            <label htmlFor="">سعر الدفع اونلاين</label>
            <input type="number" className="form-control" />
        </div>
        <div className="col-md-6">
            <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
            <input type="number" className="form-control" />
        </div>
        <label htmlFor="" className=' label-company'>شركة Saee :</label>
        <div className="col-md-6">
            <label htmlFor="">سعر الدفع اونلاين</label>
            <input type="number" className="form-control" />
        </div>
        <div className="col-md-6">
            <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
            <input type="number" className="form-control" />
        </div>
        <label htmlFor="" className='label-company'>شركة glt :</label>
        <div className="col-md-6">
            <label htmlFor="">سعر الدفع اونلاين</label>
            <input type="number" className="form-control" />
        </div>
        <div className="col-md-6">
            <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
            <input type="number" className="form-control" />
        </div>
        <label htmlFor="" className=' label-company'>شركة smsa :</label>
        <div className="col-md-6">
            <label htmlFor="">سعر الدفع اونلاين</label>
            <input type="number" className="form-control" />
        </div>
        <div className="col-md-6">
            <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
            <input type="number" className="form-control" />
        </div>
        <label htmlFor="" className='label-company'>شركة aramex :</label>
        <div className="col-md-6">
            <label htmlFor="">سعر الدفع اونلاين</label>
            <input type="number" className="form-control" />
        </div>
        <div className="col-md-6">
            <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
            <input type="number" className="form-control" />
        </div>
        </div>
        <div className="text-center">
        <button className='btn btn-orange mt-3'>
        إنشاء
                     </button>
        </div>
        

    </form>
    </div>
    </div>
    </div>
    </>
  )
}
