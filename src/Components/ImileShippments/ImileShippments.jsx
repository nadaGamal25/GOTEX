import React, { useState, useEffect, useRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';
import { Link } from 'react-router-dom';
import SplSticker from '../SplSticker/SplSticker';
import { saveAs } from 'file-saver';
import { atob } from 'js-base64';

export default function ImileShippments(userData) {
    const [value ,setPhoneValue]=useState()
    const [errorList, seterrorList]= useState([]); 

  const [itemName, setItemName] = useState('');
  const [itemMobile, setItemMobile] = useState('');
  const [itemCity, setItemCity] = useState('');
  const [itemAddress, setItemAddress] = useState('');
  const [itemId, setItemId] = useState('');

  const [theSkuDetailList, setSkuDetailList] = useState([
    {
        skuName: "",
        skuNo: "",
        skuDesc: "",
        skuQty: "",
        skuGoodsValue: "",
        skuUrl: "",
        skuWeight: "",
        skuHsCode: ""
    },
  ]);


  const [orderData,setOrderData] =useState({
    p_company: "",
    c_company: "",
    c_name: "",
    c_mobile: "",
    c_city: "",
    c_area: "",
    c_street: "",
    c_address: "",
    goodsValue: "",
    skuName: "",
    weight: 10,
    description:"",
    skuDetailList: theSkuDetailList, 
    markterCode:"",
    cod:false, 
    // clintid:'',
    daftraid:'',
    shipmentValue:"",

  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  const [shipments,setShipments]=useState([])
  const [tbase64String,setbase64String]=useState('')
  async function sendOrderDataToApi() {
    console.log(localStorage.getItem('userToken'))

    try {
      const response = await axios.post(
        "https://dashboard.go-tex.net/api/imile/create-user-order",
        {
            ...orderData,
            skuDetailList: theSkuDetailList
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
      myOrderData = { ...orderData
        // , SenderName: itemName,
        // pickUpDistrictID: itemCity,
        // SenderMobileNumber: itemMobile,
        // pickUpAddress1: itemAddress,
        // // clintid: itemId,
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
    const skuDetailsSchema = Joi.object({
        skuQty: Joi.number().allow(null, ''),
        skuGoodsValue: Joi.number().required(),
        skuWeight: Joi.number().allow(null, ''),
        skuName: Joi.string().required(),
        skuNo: Joi.string().required(),
        skuDesc: Joi.string().required(),
        skuUrl: Joi.string().allow(null, ''),
        skuHsCode: Joi.string().allow(null, ''),
    });
    let scheme= Joi.object({
        p_company:Joi.string().required(),
        c_company:Joi.string().required(),
        c_name:Joi.string().required(),
        c_mobile:Joi.string().required(),
        c_city:Joi.string().required(),
        c_area:Joi.string().required(),
        c_street:Joi.string().required(),
        c_address:Joi.string().required(),
        skuName:Joi.string().required(),
        description:Joi.string().required(),
        goodsValue:Joi.number().required(),  
        weight:Joi.number().required(),  
        cod:Joi.required(),
        skuDetailList: Joi.array().items(skuDetailsSchema),
        shipmentValue:Joi.number().allow(null, ''),
        markterCode:Joi.string().allow(null, ''),
        // clintid:Joi.string().allow(null, ''),
        daftraid:Joi.number().allow(null, ''),

    });
    return scheme.validate(orderData, {abortEarly:false});
  }
  
  function addSku() {
    setSkuDetailList(prevSku => [
      ...prevSku,
      {
        skuName: "",
        skuNo: "",
        skuDesc: "",
        skuQty: "",
        skuGoodsValue: "",
        skuUrl: "",
        skuWeight: "",
        skuHsCode: ""
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
    getimileClientsList()
    // getClientsList()
  },[])
//   const [cities,setCities]=useState()
//   async function getCities() {
//     console.log(localStorage.getItem('userToken'))
//     try {
//       const response = await axios.get('',
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//         },
//       });
//       setCities(response.data.data.Cities)
//       console.log(response.data.data.Cities)
//     } catch (error) {
//       console.error(error);
//     }
//   }

  const [search, setSearch]= useState('')
  const [showCitiesList, setCitiesList] = useState(false);
  const openCitiesList = () => {
    setCitiesList(true);
  };

  const closeCitiesList = () => {
    setCitiesList(false);
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
      const response = await axios.get('https://dashboard.go-tex.net/api/daftra/get-markter-clints',
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
  const citiesListRef = useRef(null);
  
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
  // const base64String = tbase64String ; // Replace with your actual base64 string

  function openBase64PDFInNewWindow(base64String) {
    // Create a new Blob with the base64 data and a PDF content type
    const blob = new Blob([base64String], { type: 'application/pdf' });

    // Create a URL for the Blob
    const pdfUrl = URL.createObjectURL(blob);

    // Open the PDF in a new browser window
    // window.open(pdfUrl);
    const stickerUrl = `https://dashboard.go-tex.net/api/${pdfUrl}`;
      const newTab = window.open();
      newTab.location.href = stickerUrl;
  }

  function convertBase64ToPDF(base64String, filename) {
    // Decode the base64 string
    const byteCharacters = atob(base64String);
  
    // Convert the binary data to an array buffer
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
  
    // Create a Blob from the array buffer
    const blob = new Blob([byteArray], { type: 'application/pdf' });
  
    // Use file-saver to save the Blob as a PDF file
    saveAs(blob, filename);
  }
    const filename = 'sticker.pdf'; // Replace with your desired filename
  
    function handleConvertAndDownload(base64String) {
      convertBase64ToPDF(base64String, filename);
      // const stickerUrl=filename
      // const newTab = window.open();
      // newTab.location.href = stickerUrl;
    } 
    const[imileclients,setimileClients]=useState([])


      async function getimileClientsList() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/imile/get-all-clients',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const List = response.data.data
          console.log(List)
          setimileClients(List)
        } catch (error) {
          console.error(error);
        }
      } 

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
  return (
    <>
     <div className='p-4' id='content'>
{/*         
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
                     return searchValue === '' ? item : item.Client.first_name.toLowerCase().includes(searchValue.toLowerCase());
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
                     return searchClients === ''? item : item.Client.first_name.toLowerCase().includes(searchClients.toLowerCase());
                     }).map((item,index) =>{
                      return(
                       <>
                       <li key={index} name='' 
                       onClick={(e)=>{ 
 
                         const selectedCity = e.target.innerText;
 
                        //  setItemName(item.name);
                        //  setItemMobile(item.mobile);
                        //  setItemCity(item.city);
                        //  setItemAddress(item.address);
                        //  setItemId(item._id);
                        //  setPhoneValue(item.mobile)
                        setItemName(item.Client.first_name && item.Client.last_name ? `${item.Client.first_name} ${item.Client.last_name}` : '');
                       setItemMobile(item.Client.phone1);
                       setItemCity(item.Client.city);
                       setItemAddress(item.Client.address1);
                      //  setItemEmail(item.Client.email);
                       setItemId(Number(item.Client.id));
                       setPhoneValue(item.Client.phone1)
                        
                        //  document.querySelector('input[name="SenderName"]').value = item.name;
                        //  document.querySelector('input[name="SenderMobileNumber"]').value = value;
                        //  document.querySelector('input[name="pickUpDistrictID"]').value = item.city;
                        //  document.querySelector('input[name="pickUpAddress1"]').value = item.address;
                        document.querySelector('input[name="SenderName"]').value = item.Client.first_name && item.Client.last_name ? `${item.Client.first_name} ${item.Client.last_name}` : '';

                        document.querySelector('input[name="SenderMobileNumber"]').value = value;
                        document.querySelector('input[name="pickUpDistrictID"]').value = item.Client.city;
                        document.querySelector('input[name="pickUpAddress1"]').value = item.Client.address1;
    
                         
                         document.querySelector('input[name="client"]').value = selectedCity;
                         // getOrderData(e)
                         closeClientsList();
                     }}
                       >
                         {item.Client.first_name} {item.Client.last_name}, {item.Client.email} , {item.Client.phone1} , {item.Client.city} , {item.Client.address1}

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
      */}
      <div className="shipmenForm">
      { userData.userData.data.user.rolle === "marketer"?(
          <div className="prices-box text-center">
          {companiesDetails.map((item, index) => (
              item === null?(<div></div>):
              item.name === "imile" ? (<p>قيمة الشحن من <span>{item.mincodmarkteer} ر.س</span> الى <span>{item.maxcodmarkteer} ر.س</span></p>):
              null))}
        </div>
        ): null}
      <form onSubmit={submitOrderUserForm} className='' action="">
          <div className="row">
          <div className="col-md-6">
          <div className="shipper-details brdr-grey p-3">
              <h3> </h3>
              
              <div className='pb-1'>
              <label htmlFor="">  المرسل<span className="star-requered">*</span></label>
              {/* <input type="text" className="form-control" name='p_company'  onChange={(e) => {
//   setItemName(e.target.value);
  getOrderData(e);
}}/> */}
             {/* <select className="form-control" name='c_company' onChange={getOrderData}>
              <option value=""></option>
              {imileclients.map((item,index) =>{
            return(
              <option value={item.companyName}>
                {item.companyName} , {item.contacts} , {item.city} , {item.phone} , {item.email}
              </option>
              )
          }
          )}
             </select> */}
             <input type="text" className="form-control" name='p_company' placeholder='اسم المرسل'
              onChange={(e)=>{ 
                openCitiesList();
                setItemCity(e.target.value);
                const searchValue = e.target.value;
                setSearch(searchValue);
                getOrderData(e)
                const matchingCities = imileclients.filter((item) => {
                  return searchValue === '' ? item : item.contacts.toLowerCase().includes(searchValue.toLowerCase());
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
                  {imileclients && imileclients.filter((item)=>{
                  return search === ''? item : item.contacts.toLowerCase().includes(search.toLowerCase());
                  }).map((item,index) =>{
                   return(
                    <li key={index} name='p_company' 
                    onClick={(e)=>{ 
                      const selectedCity = item.companyName;
                      setItemCity(selectedCity)
                      getOrderData({ target: { name: 'p_company', value: selectedCity } });
                      document.querySelector('input[name="p_company"]').value = selectedCity;
                      closeCitiesList();
                  }}
                    >
                      {item.companyName} , {item.contacts} , {item.city} , {item.phone} , {item.email}
                   </li>
                   )
                  }
                  )}
                  </ul>
                )}
              {errorList.map((err,index)=>{
    if(err.context.label ==='p_company'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-1'>
              <label htmlFor=""> اسم المستلم<span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='c_name'  onChange={(e) => {
//   setItemName(e.target.value);
  getOrderData(e);
}}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='c_name'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-1'>
              <label htmlFor=""> الشركة <span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='c_company'  onChange={(e) => {
//   setItemName(e.target.value);
  getOrderData(e);
}}/>
             
              {errorList.map((err,index)=>{
    if(err.context.label ==='c_company'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-1'>
              <label htmlFor="">رقم الهاتف<span className="star-requered">*</span></label>
              {/* <input type="text" className="form-control" /> */}
              <PhoneInput name='c_mobile' 
  labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={value}
  onChange={(value) => {
    getOrderData({ target: { name: 'c_mobile', value } });
  }}/>
  {errorList.map((err,index)=>{
    if(err.context.label ==='c_mobile'){
      return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
    }
    
  })}
    
          </div>
          {/* <div className='pb-3 ul-box'>
              <label htmlFor=""> الموقع<span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='pickUpDistrictID'
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
                    <li key={index} name='pickUpDistrictID' 
                    onClick={(e)=>{ 
                      const selectedCity = e.target.innerText;
                      setItemCity(selectedCity)
                      getOrderData({ target: { name: 'pickUpDistrictID', value: selectedCity } });
                      document.querySelector('input[name="pickUpDistrictID"]').value = selectedCity;
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
               
             
              {errorList.map((err,index)=>{
    if(err.context.label ==='pickUpDistrictID'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div> */}
           <div className='pb-1'>
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
          </div>
          <div className='pb-1'>
              <label htmlFor=""> المنطقة <span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='c_area'  onChange={(e) => {
//   setItemName(e.target.value);
  getOrderData(e);
}}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='c_area'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-1'>
              <label htmlFor=""> العنوان<span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='c_address'  onChange={(e) => {
//   setItemName(e.target.value);
  getOrderData(e);
}}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='c_address'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
          <div className='pb-1'>
              <label htmlFor=""> الشارع <span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='c_street'  onChange={(e) => {
//   setItemName(e.target.value);
  getOrderData(e);
}}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='c_street'){
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
          {/* { userData.userData.data.user.rolle === "marketer"?(
            <div className='pb-3'>
            <label htmlFor=""> id_العميل  </label>
            <input type="text" className="form-control" name='clintid' onChange={getOrderData}/>
            {errorList.map((err,index)=>{
  if(err.context.label ==='clintid'){
    return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
  }
  
})}
        </div>
          ):null}            */}
          </div>
          <div className="package-info brdr-grey p-3 my-3 ">
              <h3>بيانات الشحنة :</h3>
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

              <div className="">
              <div className='pb-1'>
              <label htmlFor=""> اسم المنتج<span className="star-requered">*</span></label>
              <input type="text" className="form-control" name='skuName' onChange={getOrderData}/>
              {errorList.map((err,index)=>{
    if(err.context.label ==='skuName'){
      return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
    }
    
  })}
          </div>
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
          <div className="reciever-details brdr-grey p-3">
              <h3>تفاصيل المنتج :</h3>
              {theSkuDetailList.map((piece, index) => (
      <div className='my-1' key={index}>
        <input
          type="text"
          name="skuName"
          className='form-control mb-2'
          placeholder="اسم المنتج  "
          value={piece.skuName}
          onChange={e => updateSku(index, 'skuName', e.target.value)}
        /> 
        <input
          type="text"
          name="skuNo"
          className='form-control mb-2'
          placeholder=" رقم المنتج"
          value={piece.skuNo}
          onChange={e => updateSku(index, 'skuNo', e.target.value)}
        />
        
        <input
          type="number"
          name="skuGoodsValue"
          className='form-control mb-2'
          placeholder="قيمة المنتج " step="0.001"
          value={piece.skuGoodsValue}
          onChange={e => updateSku(index, 'skuGoodsValue', e.target.value)}
        />
        <input
          type="text"
          name="skuDesc"
          className='form-control mb-2'
          placeholder="الوصف "
          value={piece.skuDesc}
          onChange={e => updateSku(index, 'skuDesc', e.target.value)}
        />
         <button className=' btn-addPiece m-2' type="button" onClick={addSku}>
         إضافة منتج اخر
      </button>
      <hr/>
      </div>
      
    ))}
          </div>
          {errorList && <div className="text-danger m-3">يجب ملئ جميع البيانات</div> }
          <button type="submit" className="btn btn-orange m-3"> <i className='fa-solid fa-plus'></i> عمل شحنة</button>

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
              {/* <th scope="col">id_الفاتورة</th>                 */}
              <th scope="col"></th>
              
            </tr>
          </thead>
          <tbody>
{Array.isArray(shipments) && shipments.map((item, index) => {
  // const bs =item.data.data.imileAwb
  return (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.company}</td>
      <td>{item.data.data.expressNo}</td>
      <td>{item.price}</td>
      <td>
        <button className="btn btn-success"  onClick={() => {
        //  setbase64String(bs)
        handleConvertAndDownload(item.data.data.imileAwb)
        // openBase64PDFInNewWindow(item.data.data.imileAwb)
      }}>تحميل الاستيكر</button>
      </td>
      {/* <td>{item.data.Items[0].Barcode}</td>
      <td>{item.data.Message}</td>
      {item.inovicedaftra?.id?(<td>{item.inovicedaftra.id}</td>):(<td>_</td>)} */}

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
