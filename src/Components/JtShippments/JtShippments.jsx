import React, { useState, useEffect, useRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';
import PdfViewer from '../PdfViewer/PdfViewer';
import base64js from 'base64-js';
import { saveAs } from 'file-saver';


export default function JtShippments(userData) {
    const [value ,setPhoneValue]=useState()
    const [phone2,setPhone2] =useState()
    const [errorList, seterrorList]= useState([]); 

  const [itemName, setItemName] = useState('');
  const [itemMobile, setItemMobile] = useState('');
  const [itemCity, setItemCity] = useState('');
  const [itemAddress, setItemAddress] = useState('');
  const [itemId, setItemId] = useState('');

  const [theSkuDetailList, setSkuDetailList] = useState([
    {
        englishName: "",
        number: "",
        itemType: "",
        itemName: "",
        priceCurrency: "",
        itemValue: "",
        itemUrl: "",
        desc: ""
    },
  ]);


  const [orderData,setOrderData] =useState({
    weight: "",
    description: "",
    re_address: "",
    re_city: "",
    re_mobile: "",
    re_name: "",
    re_prov: "",
    goodsType: "", //ITN1  = Clothes ,ITN2 Document, ITN3 = Food ,ITN4 = others ,ITN5 = Digital product ,ITN6 = Daily necessities ,ITN7 = Fragile Items
    s_address: "",
    s_city: "",
    s_mobile: "",
    s_name: "",
    s_prov: "",
    goodsValue: "",
    items: theSkuDetailList, 
    markterCode:"", 
    // clintid:'',
    cod: false,
    // daftraid:'',
    shipmentValue:"",
  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  const [shipments,setShipments]=useState([])

  async function sendOrderDataToApi() {
    console.log(localStorage.getItem('userToken'))

    try {
      const response = await axios.post(
        "https://dashboard.go-tex.net/api/jt/create-user-order",
        {
            ...orderData,
            items: theSkuDetailList
          },
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
        console.log(response);
        const shipment = response.data.data;
        setShipments(prevShipments => [...prevShipments, shipment]);
        console.log(shipments)      
    }else if (response.status === 400) {
        setisLoading(false);
        const errorMessage = response.data?.data?.Message || "An error occurred.";
        window.alert(`${errorMessage}`);
        console.log(response.data);
      }
    } catch (error) {
      // Handle error
      console.error(error);
      setisLoading(false);
      const errorMessage = error.response?.data?.data?.Message || "An error occurred.";
      window.alert(`${errorMessage}`);
    }
  }
  
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
  let myOrderData;

    if (userData.userData.data.user.rolle === "marketer") {
      myOrderData = { ...orderData, s_name: itemName,
        s_city: itemCity,
        s_mobile: itemMobile,
        s_address: itemAddress,
        // clintid: itemId,
        // daftraid:itemId,
      };
    } else {
      myOrderData = { ...orderData };
    }

  if (e.target.type === "number") {
    myOrderData[e.target.name] = Number(e.target.value);
  } else if (e.target.value === "true" || e.target.value === "false") {
    myOrderData[e.target.name] = e.target.value === "true";
  } else {
    myOrderData[e.target.name] = e.target.value || e.target.innerText;
  }
    setOrderData(myOrderData);
    console.log(myOrderData);
  console.log(myOrderData.cod);
}
function validateOrderUserForm(){
    const pieceSchema = Joi.object({
        itemName: Joi.string().allow(null, ''),
        priceCurrency: Joi.string().allow(null, ''),
        itemUrl: Joi.string().allow(null, ''),
        englishName:Joi.string().required(),
        itemType:Joi.string().required(),
        desc:Joi.string().required(),
        number:Joi.number().required(),
        itemValue:Joi.number().required(),

    });
    let scheme= Joi.object({
        description:Joi.string().required(),
        re_address:Joi.string().required(),
        re_city:Joi.string().required(),
        re_mobile:Joi.string().required(),
        re_name:Joi.string().required(),
        re_prov:Joi.string().required(),
        s_address:Joi.string().required(),
        s_city:Joi.string().required(),
        s_mobile:Joi.string().required(),
        s_name:Joi.string().required(),
        s_prov:Joi.string().required(),
        goodsType:Joi.string().required(),
        weight:Joi.number().required(), 
        goodsValue:Joi.number().required(), 
        cod:Joi.required(),
        items: Joi.array().items(pieceSchema),
        shipmentValue:Joi.number().allow(null, ''),
        markterCode:Joi.string().allow(null, ''),
        // clintid:Joi.string().allow(null, ''),
        // daftraid:Joi.number().allow(null, ''),

    });
    return scheme.validate(orderData, {abortEarly:false});
  }
  
  function addSku() {
    setSkuDetailList(prevSku => [
      ...prevSku,
      {
        englishName: "",
        number: "",
        itemType: "",
        itemName: "",
        priceCurrency: "",
        itemValue: "",
        itemUrl: "",
        desc: ""
      }
    ]);
  }

  function updateSku(index, field, value) {
    const updatedSku = [...theSkuDetailList];
    updatedSku[index][field] = value;
    setSkuDetailList(updatedSku);
  }

  
  useEffect(()=>{
    // getCities()
    getCompaniesDetailsOrders()
    getClientsList()
  },[])
  const [cities,setCities]=useState()
  async function getCities() {
    console.log(localStorage.getItem('userToken'))
    try {
      const response = await axios.get('',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      setCities(response.data.data.Cities)
      console.log(response.data.data.Cities)
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

  const [searchClients, setSearchClients]= useState('')

  const [showClientsList, setClientsList] = useState(false);
  const openClientsList = () => {
    setClientsList(true);
  };

  const closeClientsList = () => {
    setClientsList(false);
  };
  const[clients,setClients]=useState([])
  async function getClientsList() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/api/clients/get-all-clients',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      const List = response.data.data;
      console.log(List)
      setClients(List)
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


const citiesListRef = useRef(null);

useEffect(() => {
  const handleOutsideClick = (e) => {
    if (
      citiesListRef.current &&
      !citiesListRef.current.contains(e.target) &&
      e.target.getAttribute('name') !== 'pickUpDistrictID'
    ) {
      closeCitiesList();
    }
  };

  if (showCitiesList) {
    window.addEventListener('click', handleOutsideClick);
  }

  return () => {
    window.removeEventListener('click', handleOutsideClick);
  };
}, [showCitiesList]);

const citiesListRef2 = useRef(null);
useEffect(() => {
  const handleOutsideClick = (e) => {
    if (
      citiesListRef2.current &&
      !citiesListRef2.current.contains(e.target) &&
      e.target.getAttribute('name') !== 'deliveryDistrictID'
    ) {
      closeCitiesList2();
    }
  };

  if (showCitiesList2) {
    window.addEventListener('click', handleOutsideClick);
  }     
  return () => {
    window.removeEventListener('click', handleOutsideClick);
  };
}, [showCitiesList2]);

const clientsListRef = useRef(null);

useEffect(() => {
  const handleOutsideClick = (e) => {
    if (
      clientsListRef.current &&
      !clientsListRef.current.contains(e.target) &&
      e.target.getAttribute('name') !== 'client'
    ) {
      closeClientsList();
    }
  };

  if (showClientsList) {
    window.addEventListener('click', handleOutsideClick);
  }

  return () => {
    window.removeEventListener('click', handleOutsideClick);
  };
}, [showClientsList]);
 
// async function getSticker(orderId) {
//     try {
//       const response = await axios.get(`https://dashboard.go-tex.net/api/jt/print-sticker/${orderId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//         },
//       });
//            console.log(response.data.data)
//       const stickerUrl = `${response.data.data}`;
//       const newTab = window.open();
//       newTab.document.open();
//     //   newTab.document.write(stickerUrl);
//       newTab.document.close();
//     //   newTab.location.href = stickerUrl;
//     } catch (error) {
//       console.error(error);
//     }
//   }

  async function getSticker(orderId) {
    try {
      const response = await axios.get(`https://dashboard.go-tex.net/api/jt/print-sticker/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
           console.log(response.data.data)
      const stickerUrl = `https://dashboard.go-tex.net/api${response.data.data}`;
      const newTab = window.open();
      newTab.location.href = stickerUrl;
    } catch (error) {
      console.error(error);
    }
  }

  // const cities=[]

  
  return (
    <>
    <div className='p-4' id='content'>
         
   { userData.userData.data.user.rolle === "marketer"?(
        <div className="search-box p-4 mt-2 mb-4 row g-1">
        <div className="col-md-2">
        <button className="btn"><i class="fa-solid fa-magnifying-glass"></i> اختيار عميل</button>
        </div>
        <div className="col-md-10">
        <input type="search" className="form-control ic" name='client' placeholder='الاسم'
                onChange={(e)=>{ 
                  const searchValue = e.target.value;
                  setSearchClients(searchValue);
                  // getOrderData(e)
                  const matchingClients = clients.filter((item) => {
                    return searchValue === '' ? item : item.name.toLowerCase().includes(searchValue.toLowerCase());
                  });
              
                  if (matchingClients.length === 0) {
                    closeClientsList();
                  } else {
                    openClientsList();
                  }
                  }}
                  onClick={openClientsList}
                  />
                  {showClientsList && (
                    <ul  className='ul-cities ul-clients' ref={clientsListRef}>
                      
                    {clients && clients.filter((item)=>{
                    return searchClients === ''? item : item.name.toLowerCase().includes(searchClients.toLowerCase());
                    }).map((item,index) =>{
                     return(
                      <>
                      <li key={index} name='' 
                      onClick={(e)=>{ 

                        const selectedCity = e.target.innerText;

                        setItemName(item.name);
                        setItemMobile(item.mobile);
                        // setItemCity(item.city);
                        setItemAddress(item.address);
                        setItemId(item._id);
                        setPhoneValue(item.mobile)
                    //    setItemName(item.Client.first_name && item.Client.last_name ? `${item.Client.first_name} ${item.Client.last_name}` : '');
                    //   setItemMobile(item.Client.phone1);
                    //   setItemCity(item.Client.city);
                    //   setItemAddress(item.Client.address1);
                    //  //  setItemEmail(item.Client.email);
                    //   setItemId(Number(item.Client.id));
                    //   setPhoneValue(item.Client.phone1)
                       
                        document.querySelector('input[name="s_name"]').value = item.name;
                        document.querySelector('input[name="s_mobile"]').value = value;
                        // document.querySelector('input[name="s_city"]').value = item.city;
                        document.querySelector('input[name="s_address"]').value = item.address;
                      //  document.querySelector('input[name="s_name"]').value = item.Client.first_name && item.Client.last_name ? `${item.Client.first_name} ${item.Client.last_name}` : '';

                      //  document.querySelector('input[name="s_mobile"]').value = value;
                      //  document.querySelector('input[name="s_city"]').value = item.Client.city;
                      //  document.querySelector('input[name="s_address"]').value = item.Client.address1;
   
                        
                        document.querySelector('input[name="client"]').value = selectedCity;
                        // getOrderData(e)
                        closeClientsList();
                    }}
                      >
                        {item.name} , {item.company}  , {item.email} , {item.mobile} , {item.city} , {item.address}
                        {/* {item.Client.first_name} {item.Client.last_name}, {item.Client.email} , {item.Client.phone1} , {item.Client.city} , {item.Client.address1} */}

                     </li>
                     </>
                     )
                    }
                    )}
                    <li onClick={(e)=>{ 
                        const selectedCity = e.target.innerText;
                        document.querySelector('input[name="client"]').value = selectedCity;
                        closeClientsList();
                    }}>غير ذلك</li>
                    </ul>
                  )}
                
                
        </div>
      </div>
        ): null}
     
     <div className="shipmenForm">
     { userData.userData.data.user.rolle === "marketer"?(
         <div className="prices-box text-center">
         {companiesDetails.map((item, index) => (
             item === null?(<div></div>):
             item.name === "jt" ? (<p>قيمة الشحن من <span>{item.mincodmarkteer} ر.س</span> الى <span>{item.maxcodmarkteer} ر.س</span></p>):
             null))}
       </div>
       ): null}
     <form onSubmit={submitOrderUserForm} className='' action="">
         <div className="row">
         <div className="col-md-6">
         <div className="shipper-details brdr-grey my-2 p-3">
              <h3>بيانات المرسل</h3>
              
              <div className='pb-1'>
              <label htmlFor=""> الاسم<span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='s_name'  onChange={(e) => {
  setItemName(e.target.value);
  getOrderData(e);
}}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='s_name'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-1'>
              <label htmlFor="">رقم الهاتف<span className="star-requered">*</span></label>
              {/* <input type="text" className="form-control" /> */}
              <PhoneInput name='s_mobile' 
  labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={value}
  onChange={(value) => {
    setItemMobile(value);
    setPhoneValue(value);
    getOrderData({ target: { name: 's_mobile', value } });
  }}/>
  {errorList.map((err,index)=>{
    if(err.context.label ==='s_mobile'){
      return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
    }
    
  })}
    
          </div>
          <div className='pb-1 ul-box'>
              <label htmlFor=""> الموقع<span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='s_city' onChange={getOrderData}/>
              {/* <input type="text" className="form-control" name='s_city'
              onChange={(e)=>{ 
                setItemCity(e.target.value);
                const searchValue = e.target.value;
                setSearch(searchValue);
                getOrderData(e)
                const matchingCities = cities.filter((item) => {
                  return searchValue === '' ? item : item.Name.toLowerCase().includes(searchValue.toLowerCase());
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
                  <ul  className='ul-cities'ref={citiesListRef}>
                  {cities && cities.filter((item)=>{
                  return search === ''? item : item.Name.toLowerCase().includes(search.toLowerCase());
                  }).map((item,index) =>{
                   return(
                    <li key={index} name='s_city' 
                    onClick={(e)=>{ 
                      const selectedCity = e.target.innerText;
                      setItemCity(selectedCity)
                      getOrderData({ target: { name: 's_city', value: selectedCity } });
                      document.querySelector('input[name="s_city"]').value = selectedCity;
                      closeCitiesList();
                  }}
                    >
                      {item.Name}
                   </li>
                   )
                  }
                  )}
                  </ul>
                )}
                */}
             
              {errorList.map((err,index)=>{
    if(err.context.label ==='s_city'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-1'>
                <label htmlFor=""> المنطقة  <span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='s_prov' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='s_prov'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
          <div className='pb-1'>
              <label htmlFor=""> العنوان <span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='s_address' onChange={(e) => {
  setItemAddress(e.target.value);
  getOrderData(e);
}}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='s_address'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          
          { userData.userData.data.user.rolle === "marketer"?(
            <div className='pb-1'>
            <label htmlFor=""> كود المسوق <span className="star-requered">*</span></label>
            <input type="text" className="form-control" name='markterCode' onChange={getOrderData} required/>
            {errorList.map((err,index)=>{
  if(err.context.label ==='markterCode'){
    return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
  }
  
})}
        </div>
          ):null}   
          
          </div>
          <div className="package-info brdr-grey p-3 my-3 ">
             <h3>بيانات الشحنة</h3>
             <div className="row">
             <div className="col-md-6">
             <div className='pb-1'>
             <label htmlFor=""> الوزن<span className="star-requered">*</span></label>
             <input type="number" step="0.001" className="form-control" name='weight' onChange={getOrderData}/>
             {errorList.map((err,index)=>{
   if(err.context.label ==='weight'){
     return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
   }
   
 })}
         </div>
             </div>
             <div className="col-md-6">
             <div className='pb-1'>
             <label htmlFor=""> القيمة<span className="star-requered">*</span></label>
             <input type="number" step="0.001" className="form-control" name='goodsValue' onChange={getOrderData}/>
             {errorList.map((err,index)=>{
   if(err.context.label ==='goodsValue'){
     return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
   }
   
 })}
         </div>
             </div>
             <div className="pb-1">
             <label htmlFor=""> نوع الشحنة <span className="star-requered">*</span></label>
             <select name="goodsType" id=""  className="form-control" onChange={getOrderData}>
                <option value=""></option>
                <option value="ITN1">ملابس</option>
                <option value="ITN2">مستندات /وثائق</option>
                <option value="ITN3">أطعمة</option>
                <option value="ITN5">منتجات رقمية</option>
                <option value="ITN6">منتجات يومية</option>
                <option value="ITN7">منتجات قابلة للكسر</option>
                <option value="ITN4">أخرى</option>
             </select>

             </div>

             <div className="">
             
             </div>
             <div className='pb-1'>
               <label htmlFor=""> الوصف <span className="star-requered">*</span></label>
               <textarea className="form-control" name='description' onChange={getOrderData} cols="30" rows="2"></textarea>
               {errorList.map((err,index)=>{
     if(err.context.label ==='description'){
       return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
     }
     
   })}
           </div>
           {userData.userData.data.user.rolle === "user"?(
           <>
           <div className="pb-3">
           <label htmlFor="" className='d-block'>طريقة الدفع:<span className="star-requered">*</span></label>
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
           <label htmlFor="" className='d-block'>طريقة الدفع:<span className="star-requered">*</span></label>
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
           
            
           </>
                   ):
                <h4></h4>}

<div className='d-flex align-items-center pb-3'>
               <div className="checkbox" onClick={()=>{alert('سوف يكون متاح قريباً ')}}></div>
               <label className='label-cod' htmlFor="">طلب المندوب</label>
               </div>
                
     
          
          
             
             </div>
         </div>
         
         </div>
         <div className="col-md-6">
         <div className="shipper-details brdr-grey my-2 p-3">
             <h3>بيانات المستلم </h3>
             
             
         <div className='pb-1'>
             <label htmlFor=""> الاسم <span className="star-requered">*</span></label>
             <input type="text" className="form-control" name='re_name'  onChange={(e) => {
//   setItemName(e.target.value);
 getOrderData(e);
}}/>
             {errorList.map((err,index)=>{
   if(err.context.label ==='re_name'){
     return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
   }
   
 })}
         </div>
        
         <div className='pb-1'>
             <label htmlFor="">رقم الهاتف<span className="star-requered">*</span></label>
             {/* <input type="text" className="form-control" /> */}
             <PhoneInput name='re_mobile' 
  labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone2}
  onChange={(phone2) => {
    setPhone2(phone2);
    getOrderData({ target: { name: 're_mobile', value: phone2 } });
  }}/>
            
 {errorList.map((err,index)=>{
   if(err.context.label ==='re_mobile'){
     return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
   }
   
 })}
   
         </div>
         
         <div className='pb-1 ul-box'>
               <label htmlFor=""> الموقع<span className="star-requered">*</span></label>
               <input type="text" className="form-control" name='re_city' onChange={getOrderData}/>
               {/* <input type="text" className="form-control" name='c_city'
               onChange={(e)=>{ 
                 const searchValue = e.target.value;
                 setSearch2(searchValue);
                 getOrderData(e)
                 const matchingCities = cities.filter((item) => {
                   return searchValue === '' ? item : item.toLowerCase().includes(searchValue.toLowerCase());
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
                   <ul  className='ul-cities' ref={citiesListRef2}>
                   {cities && cities.filter((item)=>{
                   return search2 === ''? item : item.toLowerCase().includes(search2.toLowerCase());
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
                       {item}
                    </li>
                    )
                   }
                   )}
                   </ul>
                 )}
                */}
               {errorList.map((err,index)=>{
     if(err.context.label ==='re_city'){
       return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
     }
     
   })}
           </div>
          {/* <div className='pb-1'>
             <label htmlFor=""> المدينة <span className="star-requered">*</span></label>
             <input type="text" className="form-control" name='c_city'  onChange={(e) => {
//   setItemName(e.target.value);
 getOrderData(e);
}}/>
             {errorList.map((err,index)=>{
   if(err.context.label ==='c_city'){
     return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
   }
   
 })}
         </div> */}
         <div className='pb-1'>
             <label htmlFor=""> المنطقة <span className="star-requered">*</span></label>
             <input type="text" className="form-control" name='re_prov'  onChange={(e) => {
//   setItemName(e.target.value);
 getOrderData(e);
}}/>
             {errorList.map((err,index)=>{
   if(err.context.label ==='re_prov'){
     return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
   }
   
 })}
         </div>
         <div className='pb-1'>
             <label htmlFor=""> العنوان<span className="star-requered">*</span></label>
             <input type="text" className="form-control" name='re_address'  onChange={(e) => {
//   setItemName(e.target.value);
 getOrderData(e);
}}/>
             {errorList.map((err,index)=>{
   if(err.context.label ==='re_address'){
     return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
   }
   
 })}
         </div>
         
         
            
        
         </div>
         
         <div className="reciever-details brdr-grey mt-3 p-3">
             <h3>تفاصيل المنتج :</h3>
             {theSkuDetailList.map((piece, index) => (
     <div className='my-1' key={index}>
       <input
         type="text"
         name="englishName"
         className='form-control mb-2'
         placeholder="اسم المنتج  "
         value={piece.englishName}
         onChange={e => updateSku(index, 'englishName', e.target.value)}
       /> 
       <select name="itemType" id=""  className="form-control mb-2" 
       value={piece.itemType}
       onChange={e => updateSku(index, 'itemType', e.target.value)}>
                <option value="" >نوع النتج</option>
                <option value="ITN1">ملابس</option>
                <option value="ITN2">مستندات /وثائق</option>
                <option value="ITN3">أطعمة</option>
                <option value="ITN5">منتجات رقمية</option>
                <option value="ITN6">منتجات يومية</option>
                <option value="ITN7">منتجات قابلة للكسر</option>
                <option value="ITN4">أخرى</option>
             </select>
       <input
         type="text"
         name="number"
         className='form-control mb-2'
         placeholder=" رقم المنتج"
         value={piece.number}
         onChange={e => updateSku(index, 'number', e.target.value)}
       />
       
       <input
         type="number"
         name="itemValue"
         className='form-control mb-2'
         placeholder="قيمة المنتج " step="0.001"
         value={piece.itemValue}
         onChange={e => updateSku(index, 'itemValue', e.target.value)}
       />
       <input
         type="text"
         name="desc"
         className='form-control mb-2'
         placeholder="الوصف "
         value={piece.desc}
         onChange={e => updateSku(index, 'desc', e.target.value)}
       />
        <button className=' btn-addPiece m-2' type="button" onClick={addSku}>
        إضافة منتج اخر
     </button>
     <hr/>
     </div>
     
   ))}
         </div>
         {errorList && <div className="text-danger mx-3 my-1">يجب ملئ جميع البيانات</div> }
         <button type="submit" className="btn btn-orange mx-3 my-1"> <i className='fa-solid fa-plus'></i> عمل شحنة</button>

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
            {/* <th scope="col">رقم التتبع</th>
            <th scope="col">طريقة الدفع</th>
            <th scope="col">السعر </th> */}
           <th scope="col">رقم التتبع</th>
           <th scope="col">السعر</th>
             <th scope="col">id_الفاتورة</th>                
             <th scope="col"></th>
             
           </tr>
         </thead>
         <tbody>
 {Array.isArray(shipments) && shipments.map((item, index) => {
 return (
   <tr key={index}>
     <td>{index + 1}</td>
     <td>{item.company}</td>
     <td>{item.data.data.billCode}</td>
     <td>{item.price}</td>
     {item.inovicedaftra?.id?(<td>{item.inovicedaftra.id}</td>):(<td>_</td>)} 
     <td>
       <button className="btn btn-success"  onClick={()=>{getSticker(item._id)}}>عرض الاستيكر</button>
     </td>
     {/* <td>
     <div>
      <button className="btn btn-success" onClick={() => fetchPdfData(item._id)}>عرض الاستيكر</button>
      {pdfData && <PdfViewer pdfData={pdfData} />}
    </div>
</td> */}

     {/* <td>{item.data.Items[0].Barcode}</td>
     <td>{item.data.Message}</td>*/}

   </tr>
   
 );
})} 
</tbody>


      </table>
     </div>
     
 </div>
   </>
  )
}
