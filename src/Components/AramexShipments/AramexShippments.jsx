import React, { useState, useEffect, useRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';

export default function AramexShippments(userData) {
    const [value ,setPhoneValue]=useState()
    const [phone2,setPhone2] =useState()
    const [pcellPhone,setPcellPhone] =useState()
    const [CcellPhone,setCcellPhone] =useState()
    const [p_PhoneNumber,setp_PhoneNumber1Ext] =useState()
    const [c_PhoneNumber,setc_PhoneNumber1Ext] =useState()

    const [itemName, setItemName] = useState('');
  const [itemMobile, setItemMobile] = useState('');
  const [itemCity, setItemCity] = useState('');
  const [itemAddress, setItemAddress] = useState('');
  const [itemId, setItemId] = useState('');
  const [itemEmail, setItemEmail] = useState('');

    const [errorList, seterrorList]= useState([]); 
  const [orderData,setOrderData] =useState({
    c_name: "",
    c_company: "",
    c_email: "",
    c_phone: "",
    c_CellPhone: "",
    // c_PhoneNumber1Ext: "",
    c_line1: "",
    c_line2: "",
    c_city: "",
    pieces: "",
    p_name: "",
    p_company: "",
    p_email: "",
    p_phone: "",
    p_PhoneNumber1Ext: "",
    p_line1: "",
    p_city: "",
    p_CellPhone: "",
    p_postCode: "",
    weight: "",
    cod: false,
    shipmentValue:'',
    markterCode:'',
    description:'',
    // clintid:'',
    // daftraid:'',

  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  const [shipmentst,setShipments]=useState([])
  const [ship,setShips]=useState([])

  async function sendOrderDataToApi() {
    console.log(localStorage.getItem('userToken'))
    try {
      const response = await axios.post(
        "https://dashboard.go-tex.net/api/aramex/create-user-order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
  
      if (response.status === 200) {
        setisLoading(false);
        window.alert(`تم تسجيل الشحنة بنجاح`);
        console.log(response.data.data);
      //   console.log(response.data.data.Shipments[0].ShipmentLabel.LabelURL);
      //   const stickerUrl = `${response.data.data.Shipments[0].ShipmentLabel.LabelURL}`;
      // const newTab = window.open();
      // newTab.location.href = stickerUrl;
      const shipment = response.data.data;
      const tship =response.data.data
      setShipments(prevShipments => [...prevShipments, shipment]);
      console.log(shipment)
        }else if (response.status === 400) {
        setisLoading(false);
        const errorMessage = response.data?.msg || "An error occurred.";
        window.alert(errorMessage);
        console.log(response.data);
      }
    } catch (error) {
      // Handle error
      console.error(error);
      setisLoading(false);
      const errorMessage = error.response?.data?.data.Shipments[0].Notifications[0]?.Message || error.response?.data?.msg || "An error occurred.";
      window.alert(errorMessage);
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
      myOrderData = { ...orderData, p_name: itemName,
        p_city: itemCity,
        p_phone: itemMobile,
        p_line1: itemAddress,
        // clintid: itemId,
        // daftraid:itemId,
        p_email:itemEmail};
    } else {
      myOrderData = { ...orderData };
    }
    // let myOrderData = { ...orderData, p_name: itemName,
    //   p_city: itemCity,
    //   p_phone: itemMobile,
    //   p_line1: itemAddress,
    //   clintid: itemId,
    //   p_email:itemEmail};
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
          c_name: Joi.string().required(),
          c_company: Joi.string().required(),
          c_email: Joi.string().required(),
          c_phone: Joi.string().required(),
          c_CellPhone: Joi.string().required(),
        //   c_PhoneNumber1Ext: Joi.string(),
          c_line1: Joi.string().required(),
          c_line2: Joi.string().allow(null, ''),
          c_city: Joi.string().required(),
          pieces: Joi.number().required(),
          p_name: Joi.string().required(),
          p_company: Joi.string().required(),
          p_email: Joi.string().required(),
          p_phone: Joi.string().required(),
          p_PhoneNumber1Ext: Joi.allow(null, ''),
          p_line1: Joi.string().required(),
          p_city: Joi.string().required(),
          p_CellPhone: Joi.string().required(),
          p_postCode: Joi.string().required(),
          weight: Joi.number().required(),
          cod:Joi.required(),
          shipmentValue:Joi.number().allow(null, ''),      
          markterCode:Joi.string().allow(null, ''),
          description: Joi.string().required(),
          // clintid:Joi.string().allow(null, ''),
          // daftraid:Joi.number().allow(null, ''),
  
      });
      return scheme.validate(orderData, {abortEarly:false});
    }
    useEffect(()=>{
      getCities()
      getCompaniesDetailsOrders()
      getClientsList()

  },[])
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
    const [cities,setCities]=useState()
    async function getCities() {
      console.log(localStorage.getItem('userToken'))
      try {
        const response = await axios.get('https://dashboard.go-tex.net/api/aramex/cities',
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

  async function getAramexSticker(orderId) {
    try {
      const response = await axios.get(`https://dashboard.go-tex.net/api/aramex/print-sticker/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
           console.log(response.data.data)
      const stickerUrl = `${response.data.data}`;
      const newTab = window.open();
      newTab.location.href = stickerUrl;
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
        e.target.getAttribute('name') !== 'p_city'
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
        e.target.getAttribute('name') !== 'c_city'
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
  async function getAramexSticker(orderId) {
    try {
      const response = await axios.get(`https://dashboard.go-tex.net/api/aramex/print-sticker/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
           console.log(response.data.data)
      const stickerUrl = `${response.data.data}`;
      const newTab = window.open();
      newTab.location.href = stickerUrl;
    } catch (error) {
      console.error(error);
    }
  }
  return (
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
                          //  setItemCity(item.city);
                           setItemAddress(item.address);
                           setItemEmail(item.email);
                           setItemId(item._id);
                           setPhoneValue(item.mobile)
                      //     setItemName(item.Client.first_name && item.Client.last_name ? `${item.Client.first_name} ${item.Client.last_name}` : '');
                      //     setItemMobile(item.Client.phone1);
                      //  setItemCity(item.Client.city);
                      //  setItemAddress(item.Client.address1);
                      //  setItemEmail(item.Client.email);
                      //  setItemId(Number(item.Client.id));
                      //  setPhoneValue(item.Client.phone1)
                         
                         
                       document.querySelector('input[name="p_name"]').value = item.name;
                       document.querySelector('input[name="p_phone"]').value = value;
                      //  document.querySelector('input[name="p_city"]').value = item.city;
                       document.querySelector('input[name="p_line1"]').value = item.address;
                       document.querySelector('input[name="p_email"]').value = item.email;                    
                      // document.querySelector('input[name="p_name"]').value = item.Client.first_name && item.Client.last_name ? `${item.Client.first_name} ${item.Client.last_name}` : '';

                      // document.querySelector('input[name="p_phone"]').value = value;
                      // document.querySelector('input[name="p_city"]').value = item.Client.city;
                      // document.querySelector('input[name="p_line1"]').value = item.Client.address1;
                      // document.querySelector('input[name="p_email"]').value = item.Client.email;                    
  
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
                   
                   
           {/* <input className='form-control' name="search" onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='الإيميل' /> */}
           </div>
         </div>
           ): null}

        <div className="shipmenForm">
        { userData.userData.data.user.rolle === "marketer"?(
            <div className="prices-box text-center">
            {companiesDetails.map((item, index) => (
                item === null?(<div></div>):
                item.name === "glt" ? (<p>قيمة الشحن من <span>{item.mincodmarkteer} ر.س</span> الى <span>{item.maxcodmarkteer} ر.س</span></p>):
                null))}
          </div>
          ): null}
        <form onSubmit={submitOrderUserForm} className='' action="">
            <div className="row">
            <div className="col-md-6">
            <div className="shipper-details brdr-grey p-4">
                <h3>تفاصيل المرسل</h3>
                <div className='pb-3'>
                <label htmlFor=""> اسم المرسل<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='p_name' onChange={(e) => {
    setItemName(e.target.value);
    getOrderData(e);
  }}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                <div className='pb-3'>
                <label htmlFor=""> اسم الشركة/المتجر<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='p_company' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_company'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> البريد الالكترونى<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='p_email' onChange={(e) => {
    setItemEmail(e.target.value);
    getOrderData(e);
  }}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_email'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor="">
                  رقم الهاتف
                  <span className="star-requered">*</span></label>
                {/* <input type="text" className="form-control" /> */}
                <PhoneInput name='p_phone' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={value}
    onChange={(value) => {
      setItemMobile(value);
      setPhoneValue(value);
      getOrderData({ target: { name: 'p_phone', value } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='p_phone'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
      
            </div>
            <div className='pb-3'>
                <label htmlFor="">الهاتف الخلوى <span className="star-requered">*</span></label>
                {/* <input type="text" className="form-control"/> */}
                <PhoneInput name='p_CellPhone' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={pcellPhone}
    onChange={(pcellPhone) => {

      setPcellPhone(pcellPhone);
      getOrderData({ target: { name: 'p_CellPhone', value: pcellPhone } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='p_CellPhone'){
        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
      }
      
    })}
      
            </div>
            <div className='pb-3'>
                <label htmlFor="">رقم هاتف اضافى </label>
                {/* <input type="text" className="form-control"/> */}
                <PhoneInput name='p_PhoneNumber1Ext' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={p_PhoneNumber}
    onChange={(p_PhoneNumber) => {
      setp_PhoneNumber1Ext(p_PhoneNumber);
      getOrderData({ target: { name: 'p_PhoneNumber1Ext', value: p_PhoneNumber } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='p_PhoneNumber1Ext'){
        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
      }
      
    })}
      
            </div>
            <div className='pb-3 ul-box'>
                <label htmlFor=""> الموقع<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='p_city'
                onChange={(e)=>{ 
                  // setItemCity(e.target.value);
                  const searchValue = e.target.value;
                  setSearch(searchValue);
                  getOrderData(e)
                  const matchingCities = cities.filter((item) => {
                    return searchValue === '' ? item : item.toLowerCase().includes(searchValue.toLowerCase());
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
                    <ul  className='ul-cities' ref={citiesListRef}>
                    {cities && cities.filter((item)=>{
                    return search === ''? item : item.toLowerCase().includes(search.toLowerCase());
                    }).map((item,index) =>{
                     return(
                      <li key={index} name='p_city' 
                      onClick={(e)=>{ 
                        const selectedCity = e.target.innerText;
                        setItemCity(selectedCity)
                        getOrderData({ target: { name: 'p_city', value: selectedCity } });
                        document.querySelector('input[name="p_city"]').value = selectedCity;
                        closeCitiesList();
                    }}
                      >
                        {item}
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
                  <option key={index}>{item}</option>
                  ))}
                </select>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div> */}
            <div className='pb-3'>
                <label htmlFor=""> العنوان<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='p_line1' onChange={(e) => {
    setItemAddress(e.target.value);
    getOrderData(e);
  }}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_line1'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> الرمز البريدى<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='p_postCode' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_postCode'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
    { userData.userData.data.user.rolle === "marketer"?(
              <div className='py-3'>
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
                <div className='pb-3'>
                <label htmlFor=""> عدد القطع<span className="star-requered">*</span></label>
                <input type="number" className="form-control" name='pieces' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='pieces'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}               
            </div>
                </div>
                <div className='pb-3'>
                <label htmlFor=""> الوصف <span className="star-requered">*</span></label>
                <textarea className="form-control" name='description' onChange={getOrderData} cols="30" rows="4"></textarea>
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
              {/* {orderData.cod === false && (
                <div></div>
              )} */}
               
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
            <div className="reciever-details brdr-grey p-3">
                <h3>تفاصيل المستلم</h3>
                {/* <div className=" mb-4 mt-2">
        <input className='form-control' type="search" placeholder='بحث بالأسم' />
        </div> */}
        <div className='pb-3'>
                <label htmlFor=""> اسم المستلم<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='c_name' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> اسم الشركة<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='c_company' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_company'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
       
            </div>
            <div className='pb-3'>
                <label htmlFor=""> البريد الالكترونى<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='c_email' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_email'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> رقم الهاتف<span className="star-requered">*</span></label>
                {/* <input type="text" className="form-control"/> */}
                <PhoneInput name='c_phone' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone2}
    onChange={(phone2) => {
      setPhone2(phone2);
      getOrderData({ target: { name: 'c_phone', value: phone2 } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='c_phone'){
        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
      }
      
    })}
      
            </div>
            <div className='pb-3'>
                <label htmlFor="">الهاتف الخلوى<span className="star-requered">*</span></label>
                <PhoneInput name='c_CellPhone' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={CcellPhone}
    onChange={(CcellPhone) => {
      setCcellPhone(CcellPhone);
      getOrderData({ target: { name: 'c_CellPhone', value: CcellPhone } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='c_CellPhone'){
        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
      }
      
    })}
      
            </div>
            {/* <div className='pb-3'>
                <label htmlFor="">رقم هاتف اضافى </label>
                <PhoneInput name='c_PhoneNumber1Ext' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={c_PhoneNumber}
    onChange={(c_PhoneNumber) => {
      setc_PhoneNumber1Ext(c_PhoneNumber);
      getOrderData({ target: { name: 'c_PhoneNumber1Ext', value: c_PhoneNumber } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='c_PhoneNumber1Ext'){
        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
      }
      
    })}
      
            </div> */}
            <div className='pb-3 ul-box'>
                <label htmlFor=""> الموقع<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='c_city'
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
                  <option key={index}>{item}</option>
                  ))}
                </select>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div> */}
            
            <div className='pb-3'>
                <label htmlFor=""> العنوان<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='c_line1' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_line1'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> عنوان اضافى</label>
                <input type="text" className="form-control" name='c_line2' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_line2'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            
            <button className="btn btn-orange"> <i className='fa-solid fa-plus'></i> إضافة مستلم</button>
            </div>
            </div>
            </div>
        </form>
        
        </div>
        {/* <div className="clients-table p-4 mt-5">
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
      </div> */}
      <div className="clients-table p-4 mt-4">
          <table className="table">
            <thead>
              <tr>
               <th scope="col">#</th>
               <th scope="col"> الشركة</th>
               <th scope="col">id_الشحنة </th>
               <th scope="col">عدد القطع </th>
               <th scope="col">id_الفاتورة</th>                
               {/* <th scope="col">السعر </th>
                <th scope="col">message</th> */}
                <th></th>
              </tr>
            </thead>
            <tbody>
  {Array.isArray(shipmentst) && shipmentst.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>aramex</td>
        {item?.data.Shipments[0]?.ID?(<td>{item.data.Shipments[0].ID}</td>):(<td>_</td>)}
        {item?.data.Shipments[0]?.ShipmentDetails?.NumberOfPieces?
        (<td>{item.data.Shipments[0].ShipmentDetails.NumberOfPieces}</td>):(<td>_</td>)}
        {item.inovicedaftra?.id?(<td>{item.inovicedaftra.id}</td>):(<td>_</td>)}
        {/* {item?.Shipments[0]?.ShipmentLabel?.LabelURL?(<td>
                <a href={item.Shipments[0].ShipmentLabel.LabelURL}
      
      className=" btn btn-success" target='_blank'
    >
      عرض الاستيكر
    </a>
                </td>):(<td>_</td>)} */}
                <td>
              <button
    
    className="aramex-btn btn btn-success"
    onClick={() => getAramexSticker(item._id)}
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
