import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';
import { Link } from 'react-router-dom';

export default function SaeeShipments(userData) {
//   useEffect(()=>{
//     console.log(userData)
//   },[])
    const [value ,setPhoneValue]=useState()
    const [phone2,setPhone2] =useState()

    const [errorList, seterrorList]= useState([]); 
  const [orderData,setOrderData] =useState({
    p_name:'',
    p_city:'',
    p_mobile:'',
    p_streetaddress:'',
    weight:'',
    quantity:'',
    c_name:'',
    c_city:'',
    c_streetaddress:'',
    c_mobile:'',
    cod: false,
    markterCode:'',
  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  const [shipments,setShipments]=useState([])

  async function sendOrderDataToApi() {
    console.log(localStorage.getItem('userToken'))
    try {
      const response = await axios.post(
        "https://dashboard.go-tex.net/api/saee/create-user-order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
  
      if (response.status === 200) {
        setisLoading(false);
        window.alert("تم تسجيل الشحنة بنجاح");
        console.log(response.data.data);
        const shipment = response.data.data;
        setShipments(prevShipments => [...prevShipments, shipment]);
        console.log(shipments)      }else if (response.status === 400) {
        setisLoading(false);
        const errorMessage = response.data?.msg || "An error occurred.";
        window.alert(`${errorMessage}`);
        console.log(response.data);
      }
    } catch (error) {
      // Handle error
      console.error(error);
      setisLoading(false);
      const errorMessage = error.response?.data?.msg || "An error occurred.";
      window.alert(`${errorMessage}`);
    }
  }
  
// async function sendOrderDataToApi(){
//       console.log(localStorage.getItem('userToken'))
//   let response= await axios.post(`https://dashboard.go-tex.net/api/saee/create-user-order`,orderData,
//   {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//     },
//   });
//   // if (response.status === 200) {
//   //   setisLoading(false);
//   //   window.alert("تم تسجيل الشحنة بنجاح");
//   //   console.log(response.data);
//   //   console.log("okkkkkkkkkkk")
//   // }

//   if(response.data.msg==="ok"){
//     setisLoading(false);
//     // setError(response.data.msg);
//     // window.alert(response.data.msg)
//     console.log("okkkkkkkkkkk")

//     }else if (response.status === 400) {
//       setisLoading(false);
//       const errorMessage = response.data.msg || "An error occurred.";
//       window.alert(`Error: ${errorMessage}`);
//       console.log(response.data);
//     }
// }

function submitOrderUserForm(e){
  e.preventDefault();
  setisLoading(true)
  let validation = validateOrderUserForm();
  console.log(validation);
  if(validation.error){
    setisLoading(false)
    seterrorList(validation.error.details)

  }else{
    sendOrderDataToApi();
  }

}

function getOrderData(e) {
  let myOrderData = { ...orderData };
  if (e.target.type === "number") { // Check if the value is a number
    myOrderData[e.target.name] = Number(e.target.value);
  } else if (e.target.value === "true" || e.target.value === "false") {
    myOrderData[e.target.name] = e.target.value === "true";
  } else {
    myOrderData[e.target.name] = e.target.value;
  }

  setOrderData(myOrderData);
  console.log(myOrderData);
  console.log(myOrderData.cod);
}

  // function getOrderData(e){
  //   let myOrderData={...orderData};
  //   myOrderData[e.target.name]= e.target.value;
  //   setOrderData(myOrderData);
  //   console.log(myOrderData);
  // }

  function validateOrderUserForm(){
    let scheme= Joi.object({
        p_name:Joi.string().required(),
        p_city:Joi.string().required(),
        p_mobile:Joi.string().required(),
        p_streetaddress:Joi.string().required(),
        weight:Joi.number().required(),
        quantity:Joi.number().required(),
        c_name:Joi.string().required(),
        c_city:Joi.string().required(),
        c_streetaddress:Joi.string().required(),
        c_mobile:Joi.string().required(),
        cod:Joi.required(),
        shipmentValue:Joi.number().allow(null, ''),
        markterCode:Joi.string().allow(null, ''),

    });
    return scheme.validate(orderData, {abortEarly:false});
  }
  
  useEffect(()=>{
    getCities()
    getCompaniesDetailsOrders()
  },[])
  const [cities,setCities]=useState()
  async function getCities() {
    console.log(localStorage.getItem('userToken'))
    try {
      const response = await axios.get('https://dashboard.go-tex.net/api/saee/get-cities',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      setCities(response.data.data.cities)
      console.log(response.data.data.cities)
    } catch (error) {
      console.error(error);
    }
  }
  const [companiesDetails,setCompaniesDetails]=useState([])
  async function getCompaniesDetailsOrders() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/api/companies/get-all');
      const companiesPrices = response.data.data;
      console.log(companiesPrices)
      setCompaniesDetails(companiesPrices)
    } catch (error) {
      console.error(error);
    }
  }
  const [search, setSearch]= useState('')
  const [search2, setSearch2]= useState('')

  const [showCitiesList, setCitiesList] = useState(false);
  const openCitiesList = () => {
    setCitiesList(true);
  };

  const closeCitiesList = () => {
    setCitiesList(false);
  };
  const [showCitiesList2, setCitiesList2] = useState(false);
  const openCitiesList2 = () => {
    setCitiesList2(true);
  };

  const closeCitiesList2 = () => {
    setCitiesList2(false);
  };

  async function getOrderSticker(orderId) {
    try {
      const response = await axios.get(
        `https://dashboard.go-tex.net/api/saee/print-sticker/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      let sticker = response.data.data;
      sticker = sticker.replace(/src="\/images\/logo-b.png"/g, 'src="data:image/jpeg;base64,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"');
      const newWindow = window.open();
      newWindow.document.open();
      newWindow.document.write(sticker);
      newWindow.document.close();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='p-4' id='content'>
        <div className="shipmenForm">
        { userData.userData.data.user.rolle === "marketer"?(
            <div className="prices-box text-center">
            {companiesDetails.map((item, index) => (
                item === null?(<div></div>):
                item.name === "saee" ? (<p>قيمة الشحن من <span>{item.mincodmarkteer} ر.س</span> الى <span>{item.maxcodmarkteer} ر.س</span></p>):
                null))}
          </div>
          ): null}
        <form onSubmit={submitOrderUserForm} className='' action="">
            <div className="row">
            <div className="col-md-6">
            <div className="shipper-details brdr-grey p-4">
                <h3>تفاصيل المرسل</h3>
                
                <div className='pb-3'>
                <label htmlFor=""> الاسم</label>
                <input type="text" className="form-control" name='p_name' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor="">رقم الهاتف</label>
                {/* <input type="text" className="form-control" /> */}
                <PhoneInput name='p_mobile' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={value}
    onChange={(value) => {
      setPhoneValue(value);
      getOrderData({ target: { name: 'p_mobile', value } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='p_mobile'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
      
            </div>
            <div className='pb-3 ul-box'>
                <label htmlFor=""> الموقع</label>
                <input type="text" className="form-control" name='p_city'
                onChange={(e)=>{ 
                  const searchValue = e.target.value;
                  setSearch(searchValue);
                  getOrderData(e)
                  const matchingCities = cities.filter((item) => {
                    return searchValue === '' ? item : item.name.toLowerCase().includes(searchValue.toLowerCase());
                  });
              
                  if (matchingCities.length === 0) {
                    closeCitiesList();
                  } else {
                    openCitiesList();
                  }
                  }}
                  onClick={openCitiesList}
                  />
                  {showCitiesList && (
                    <ul  className='ul-cities'>
                    {cities && cities.filter((item)=>{
                    return search === ''? item : item.name.toLowerCase().includes(search.toLowerCase());
                    }).map((item,index) =>{
                     return(
                      <li key={index} name='p_city' 
                      onClick={(e)=>{ 
                        const selectedCity = e.target.innerText;
                        getOrderData({ target: { name: 'p_city', value: selectedCity } });
                        document.querySelector('input[name="p_city"]').value = selectedCity;
                        closeCitiesList();
                    }}
                      >
                        {item.name}
                     </li>
                     )
                    }
                    )}
                    </ul>
                  )}
                 
                {/* <select className="form-control" name='p_city' onChange={getOrderData}>
                <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}
                </select> */}
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            {/* <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <select className="form-control" name='p_city' onChange={getOrderData}>
                <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}
                  </select>

                {errorList.map((err,index)=>{
      if(err.context.label ==='p_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div> */}
            <div className='pb-3'>
                <label htmlFor=""> العنوان </label>
                <input type="text" className="form-control" name='p_streetaddress' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_streetaddress'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            { userData.userData.data.user.rolle === "marketer"?(
              <div className='pb-3'>
              <label htmlFor=""> كود المسوق </label>
              <input type="text" className="form-control" name='markterCode' onChange={getOrderData} required/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='markterCode'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
            ):null}
            
            {/* <div className="pb-3">
            <label htmlFor="" className='d-block'>طريقة الدفع:</label>
                    <div className='pe-2'>
                    <input  type="radio" value="true" name='cod' onChange={getOrderData}/>
                    <label className='label-cod' htmlFor="cod"  >الدفع عند الاستلام(COD)</label>
                    </div>
                    <div className='pe-2'>
                    <input type="radio" value="false"  name='cod' onChange={getOrderData}/>
                    <label className='label-cod' htmlFor="cod">الدفع اونلاين </label>
                    </div>
                    {errorList.map((err,index)=>{
      if(err.context.label ==='cod'){
        return <div key={index} className="alert alert-danger my-2">يجب اختيار طريقة الدفع </div>
      }
      
    })}
            </div> */}
           
            
            </div>
            <div className="package-info brdr-grey p-3 my-3 ">
                <h3>بيانات الشحنة</h3>
                <div className="row">
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> الوزن</label>
                <input type="number" step="0.001" className="form-control" name='weight' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='weight'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                </div>
                
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> عدد القطع</label>
                <input type="number" className="form-control" name='quantity' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='quantity'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                </div>
                {userData.userData.data.user.rolle === "user"?(
              <>
              <div className="pb-3">
              <label htmlFor="" className='d-block'>طريقة الدفع:</label>
                      <div className='pe-2'>
                      <input  type="radio" value={true} name='cod' onChange={getOrderData}/>
                      <label className='label-cod' htmlFor="cod"  >الدفع عند الاستلام(COD)</label>
                      </div>
                      <div className='pe-2'>
                      <input type="radio" value={false}  name='cod' onChange={getOrderData}/>
                      <label className='label-cod' htmlFor="cod">الدفع اونلاين </label>
                      </div>
                      {errorList.map((err,index)=>{
        if(err.context.label ==='cod'){
          return <div key={index} className="alert alert-danger my-2">يجب اختيار طريقة الدفع </div>
        }
        
      })}
              </div>
              {orderData.cod === true && (
    <div className='pb-3'>
      <label htmlFor=""> قيمة الشحنة</label>
      <input type="number" step="0.001" className="form-control" name='shipmentValue' onChange={getOrderData} required />
      {errorList.map((err, index) => {
        if (err.context.label === 'shipmentValue') {
          return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة</div>
        }
      })}
    </div>
              )}
              {orderData.cod === false && (
                <div></div>
              )}
               
              </>
   
            ):userData.userData.data.user.rolle === "marketer"?(
              <>
              <div className="pb-3">
              <label htmlFor="" className='d-block'>طريقة الدفع:</label>
                      <div className='pe-2'>
                      <input  type="radio" value={true} name='cod' onChange={getOrderData}/>
                      <label className='label-cod' htmlFor="cod"  >الدفع عند الاستلام(COD)</label>
                      </div>
                      <div className='pe-2'>
                      <input type="radio" value={false}  name='cod' onChange={getOrderData}/>
                      <label className='label-cod' htmlFor="cod">الدفع اونلاين </label>
                      </div>
                      {errorList.map((err,index)=>{
        if(err.context.label ==='cod'){
          return <div key={index} className="alert alert-danger my-2">يجب اختيار طريقة الدفع </div>
        }
        
      })}
              </div>
              {orderData.cod !== false && (
                <>
                <div className='pb-3'>
                <label htmlFor=""> قيمة الشحن (cod)</label>
                <input type="number" step="0.001" className="form-control" name='cod' onChange={getOrderData} required/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='cod'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
    <div className='pb-3'>
      <label htmlFor=""> قيمة الشحنة</label>
      <input type="number" step="0.001" className="form-control" name='shipmentValue' onChange={getOrderData} required />
      {errorList.map((err, index) => {
        if (err.context.label === 'shipmentValue') {
          return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة</div>
        }
      })}
    </div>
    </>
              )}
              {/* {orderData.cod === false && (
                <div></div>
              )} */}
               
              </>
   
                   
                   ):
                   <h4></h4>}
                
                </div>
            </div>
            </div>
            <div className="col-md-6">
            <div className="reciever-details brdr-grey p-3">
                <h3>تفاصيل المستلم</h3>
                {/* <div className=" mb-4 mt-2">
        <input className='form-control' type="search" placeholder='بحث بالأسم' />
        </div> */}
        <div className='pb-3'>
                <label htmlFor=""> الاسم</label>
                <input type="text" className="form-control" name='c_name' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> رقم الهاتف</label>
                {/* <input type="text" className="form-control"/> */}
                <PhoneInput name='c_mobile' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone2}
    onChange={(phone2) => {
      setPhone2(phone2);
      getOrderData({ target: { name: 'c_mobile', value: phone2 } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='c_mobile'){
        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
      }
      
    })}
      
            </div>
            <div className='pb-3 ul-box'>
                <label htmlFor=""> الموقع</label>
                <input type="text" className="form-control" name='c_city'
                onChange={(e)=>{ 
                  const searchValue = e.target.value;
                  setSearch2(searchValue);
                  getOrderData(e)
                  const matchingCities = cities.filter((item) => {
                    return searchValue === '' ? item : item.name.toLowerCase().includes(searchValue.toLowerCase());
                  });
              
                  if (matchingCities.length === 0) {
                    closeCitiesList2();
                  } else {
                    openCitiesList2();
                  }
                  }}
                  onClick={openCitiesList2}
                  />
                  {showCitiesList2 && (
                    <ul  className='ul-cities'>
                    {cities && cities.filter((item)=>{
                    return search2 === ''? item : item.name.toLowerCase().includes(search2.toLowerCase());
                    }).map((item,index) =>{
                     return(
                      <li key={index} name='c_city' 
                      onClick={(e)=>{ 
                        const selectedCity = e.target.innerText;
                        getOrderData({ target: { name: 'c_city', value: selectedCity } });
                        document.querySelector('input[name="c_city"]').value = selectedCity;
                        closeCitiesList2();
                    }}
                      >
                        {item.name}
                     </li>
                     )
                    }
                    )}
                    </ul>
                  )}
                {/* <select className="form-control" name='c_city' onChange={getOrderData}>
                  <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}                
                </select> */}
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            {/* <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <select className="form-control" name='c_city' onChange={getOrderData}>
                <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}
                  </select>

                {errorList.map((err,index)=>{
      if(err.context.label ==='c_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div> */}
            <div className='pb-3'>
                <label htmlFor=""> العنوان</label>
                <input type="text" className="form-control" name='c_streetaddress' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_streetaddress'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            
            {/* <h6 className='text-center py-2'>{'<<'}  معلومات اضافية  {'>>'}</h6> */}
            
            <button className="btn btn-orange"> <i className='fa-solid fa-plus'></i> إضافة مستلم</button>
            </div>
            </div>
            </div>
        </form>
        
        </div>
        <div className="clients-table p-4 mt-4">
          <table className="table">
            <thead>
              <tr>
               <th scope="col">#</th>
               <th scope="col"> الشركة</th>
               <th scope="col">رقم التتبع</th>
               <th scope="col">طريقة الدفع</th>
               <th scope="col">السعر </th>
                <th scope="col">message</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
  {Array.isArray(shipments) && shipments.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.company}</td>
        <td>{item.data.waybill}</td>
        <td>{item.paytype}</td>
        <td>{item.price}</td>
        <td>{item.data.message}</td>
        <td>
                <button
      
      className="btn btn-success"
      onClick={() => getOrderSticker(item._id)}
    >
      عرض الاستيكر
    </button>
                </td>
      </tr>
    );
  })}
</tbody>


         </table>
        </div>
    </div>
  )
}
