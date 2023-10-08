import React, { useState, useEffect, useRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';

export default function SmsaShippments(userData) {
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
    const [value ,setPhoneValue]=useState()
    const [phone2,setPhone2] =useState()
    const [cPhoneNumber2,setcPhone] =useState()
    const [CcellPhone,setCcellPhone] =useState()
    const [p_PhoneNumber,setp_PhoneNumber1Ext] =useState()
    const [c_PhoneNumber,setc_PhoneNumber1Ext] =useState()
    const [itemName, setItemName] = useState('');
  const [itemMobile, setItemMobile] = useState('');
  const [itemCity, setItemCity] = useState('');
  const [itemAddress, setItemAddress] = useState('');
  const [itemId, setItemId] = useState('');

    const [errorList, seterrorList]= useState([]); 
  const [orderData,setOrderData] =useState({
    c_name: "",
    c_ContactPhoneNumber: "",
    c_ContactPhoneNumber2: "",
    c_District: "",
    c_City: "",
    c_AddressLine1: "",
    c_AddressLine2: "",
    p_name: "",
    p_ContactPhoneNumber: "",
    p_District: "",
    p_City: "",
    p_AddressLine1: "",
    p_AddressLine2: "",
    pieces: "",
    weight: "",
    description: "",
    Value: "",
    cod: false,
    shipmentValue:'',
    markterCode:'',
    // clintid:'',
    daftraid:'',

  })
  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  const [shipments,setShipments]=useState([])

  async function sendOrderDataToApi() {
    console.log(localStorage.getItem('userToken'))
    try {
      const response = await axios.post(
        "https://dashboard.go-tex.net/api/smsa/create-user-order",
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
        const shipment = response.data.data;
        setShipments(prevShipments => [...prevShipments, shipment]);
        console.log(shipments)
        }else if (response.status === 400) {
        setisLoading(false);
        const errorMessage = error.response.data?.msg?.message|| "An error occurred.";
        window.alert(errorMessage);
        console.log(response.data);
      }
    } catch (error) {
      // Handle error
      console.error(error);
      setisLoading(false);
      const errorMessage = error.response.data?.msg?.message||error.response.data?.msg || "An error occurred.";
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
      if(userData.userData.data.user.iscrproofed === false){
        window.alert('يجب توثيق السجل التجاري لتتمكن من عمل الشحنة')
      }else{
        sendOrderDataToApi();
      }
    }
  
  }

  function getOrderData(e) {
    let myOrderData;

    if (userData.userData.data.user.rolle === "marketer") {
      myOrderData = { ...orderData, p_name: itemName,
        p_City: itemCity,
        p_ContactPhoneNumber: itemMobile,
        p_AddressLine1: itemAddress,
        // clintid: itemId,
        daftraid:itemId,
      };
    } else {
      myOrderData = { ...orderData };
    }
    // let myOrderData = { ...orderData, p_name: itemName,
    //   p_City: itemCity,
    //   p_ContactPhoneNumber: itemMobile,
    //   p_AddressLine1: itemAddress,
    //   clintid: itemId};
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
          c_ContactPhoneNumber: Joi.string().required(),
          c_ContactPhoneNumber2: Joi.string().allow(null, ''),
          c_District: Joi.string().required(),
          c_AddressLine1: Joi.string().required(),
          c_AddressLine2: Joi.string().allow(null, ''),
          c_City: Joi.string().required(),
          p_name: Joi.string().required(),
          p_ContactPhoneNumber: Joi.string().required(),
          p_AddressLine2:Joi.string().allow(null, ''),
          p_AddressLine1: Joi.string().required(),
          p_City: Joi.string().required(),
          p_District: Joi.string().required(),
          weight: Joi.number().required(),
          pieces: Joi.number().required(),
          Value: Joi.number().required(),
          description:Joi.string().required(),
          cod:Joi.required(),
          shipmentValue:Joi.number().allow(null, ''),
          markterCode:Joi.string().allow(null, ''),
          // clintid:Joi.string().allow(null, ''),
          daftraid:Joi.number().allow(null, ''),

  
      });
      return scheme.validate(orderData, {abortEarly:false});
    }
    useEffect(()=>{
      // getCities()
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
    // const [cities,setCities]=useState()
    // async function getCities() {
    //   console.log(localStorage.getItem('userToken'))
    //   try {
    //     const response = await axios.get('https://dashboard.go-tex.net/api/glt/cities',
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    //       },
    //     });
    //     setCities(response.data.data.data)
    //     console.log(response.data.data.data)
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }

    const cities=["Aqiq",
    "Atawlah",
    "Baha",
    "Baljurashi",
    "Mandaq",
    "Mudhaylif",
    "Mukhwah",
    "Qilwah",
    "Qunfudhah",
    "Al Jouf",
    "Dawmat Al Jandal",
    "Skakah",
    "Bashayer",
    "Bellasmar",
    "Namas",
    "Sapt Al Alaya",
    "Tanumah",
    "Ain Dar",
    "Anak",
    "Bahrain Causeway",
    "Buqaiq",
    "Dammam",
    "Dammam Airport",
    "Dhahran",
    "Jubail",
    "Khafji",
    "Khubar",
    "Muneefa",
    "Nairiyah",
    "Qarya Al Uliya",
    "Qatif",
    "Rahima",
    "Ras Tannurah",
    "Safwa",
    "Saira",
    "Sayhat",
    "Shedgum",
    "Tanajib",
    "Tarut (Darin)",
    "Thqbah",
    "Udhayliyah",
    "Uthmaniyah",
    "Najran",
    "Sharourah",
    "Wadi Al-Dawasir",
    "Badaya",
    "Bukayriyah",
    "Buraydah",
    "Dukhnah",
    "Khabra","Midhnab",
    "Nabaniya",
    "Nabhaniah",
    "Nifi",
    "Qaseem Airport",
    "Rafayaa Al Gimsh",
    "Rass",
    "Riyadh Al Khabra",
    "Sajir",
    "Unayzah",
    "Uqlat As Suqur",
    "Uyun Al Jiwa",
    "Abu Arish",
    "Ahad Al Masarhah",
    "Al Dayer",
    "At Tuwal",
    "Bani Malek",
    "Baysh",
    "Darb",
    "Dhamad",
    "Farasan",
    "Jazan",
    "Sabya",
    "Samtah",
    "Shuqayq",
    "Hail",
    "Sayirah",
    "Al Ruqi",
    "Hafar Al Baten",
    "King Khalid City",
    "Qaysumah",
    "Rafha",
    "Sarrar",
    "Al Ahsa",
    "Al Ayun",
    "Al Jafr",
    "Batha",
    "Hufuf",
    "Mubarraz",
    "Salwa",
    "Badr",
    "Bahrah",
    "Jeddah",
    "Jeddah Airport",
    "Kamil",
    "Khulais",
    "Lith",
    "Masturah",
    "Rabigh",
    "Shaibah","Thuwal",
    "Abha",
    "Ahad Rafidah",
    "Bariq",
    "Bishah",
    "Dhahran Al Janoub",
    "Jash",
    "Khamis Mushayt",
    "Majardah",
    "Muhayil",
    "Nakeea",
    "Rijal Almaa",
    "Sarat Abida",
    "Tarib",
    "Tathlith",
    "Wadi Bin Hashbal",
    "Jamoum",
    "Makkah",
    "Hanakiyah",
    "Khayber",
    "Madinah",
    "Mahd Ad Dhahab",
    "Ula",
    "Afif",
    "Artawiyah",
    "Bijadiyah",
    "Duwadimi",
    "Ghat",
    "Hawtat Sudayr",
    "Majmaah",
    "Shaqra",
    "Zulfi",
    "Arar",
    "Jadidah Arar",
    "Al Aflaj (Layla)",
    "Dhurma",
    "Dilam",
    "Diriyah",
    "Hawtat Bani Tamim",
    "Hayer",
    "Huraymila",
    "Kharj",
    "Muzahmiyah",
    "Quwayiyah",
    "Rayn",
    "Riyadh",
    "Riyadh Airport",
    "Rumah",
    "Ruwaidah",
    "Dhalim","Khurmah",
    "Muwayh",
    "Ranyah",
    "Sayl Al Kabir",
    "Taif",
    "Turbah",
    "Turbah (Makkah)",
    "Bad",
    "Dhuba",
    "Halit Ammar",
    "Haql",
    "Tabuk",
    "Taima",
    "Haditha",
    "Qurayyat",
    "Tabarjal",
    "Turayf",
    "Khamasin",
    "Sulayyil",
    "Badar Hunain",
    "Ummlujj",
    "Wajh",
    "Yanbu",
    "Qaseem"]
   

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
    

    async function getSmsaSticker(orderId) {
      try {
        const response = await axios.get(`https://dashboard.go-tex.net/api/smsa/print-sticker/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
    
        const stickerUrls = response.data.data;
    console.log(response.data.data)
        if (Array.isArray(stickerUrls) && stickerUrls.length > 0) {
          stickerUrls.forEach((stickerUrl) => {
            const newTab = window.open();
            newTab.location.href = `https://dashboard.go-tex.net/api${stickerUrl}`;
          });
        } else {
          console.log("No sticker URLs found in the response.");
        }
      } catch (error) {
        console.error(error);
      }
    }
    // async function getSmsaSticker(orderId) {
    //   try {
    //     const response = await axios.get(`https://dashboard.go-tex.net/api/smsa/print-sticker/${orderId}`, {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    //       },
    //     });
    
    //     const stickerUrls = response.data.data;
    
    //     if (Array.isArray(stickerUrls) && stickerUrls.length > 0) {
    //       stickerUrls.forEach((stickerUrl) => {
    //         const link = document.createElement("a");
    //         link.href = `https://dashboard.go-tex.net/api${stickerUrl}`;
    //         link.target = "_blank";
    //         link.download = "";
    
    //         link.dispatchEvent(new MouseEvent("click"));
    
    //         link.remove();
    //       });
    //     } else {
    //       console.log("No sticker URLs found in the response.");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    
    async function getInvoice(daftraId) {
      try {
        const response = await axios.get(`https://dashboard.go-tex.net/api/daftra/get-invoice/${daftraId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
             console.log(response)
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
          e.target.getAttribute('name') !== 'p_City'
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
          e.target.getAttribute('name') !== 'c_City'
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
                         <li key={item._id} name='' 
                         onClick={(e)=>{ 
   
                           const selectedCity = e.target.innerText;
                       //     const selectedItem = clients[index];
   
                       //     setItemName(selectedItem.name);
                       //     setItemMobile(selectedItem.mobile);
                       //     setItemCity(selectedItem.city);
                       //     setItemAddress(selectedItem.address);
                       //     setItemId(selectedItem._id);
                       //  setPhoneValue(selectedItem.mobile);
                         
                       //     document.querySelector('input[name="p_name"]').value = selectedItem.name;
                       //     document.querySelector('input[name="p_ContactPhoneNumber"]').value = value;
                       //     document.querySelector('input[name="p_City"]').value = selectedItem.city;
                       //     document.querySelector('input[name="p_AddressLine1"]').value = selectedItem.address;
                       
                       setItemName(item.name);
                       setItemMobile(item.mobile);
                      //  setItemCity(item.city);
                       setItemAddress(item.address);
                       setItemId(item.daftraClientId);
                       setPhoneValue(item.mobile);
                      // setItemName(item.Client.first_name && item.Client.last_name ? `${item.Client.first_name} ${item.Client.last_name}` : '');
                      // setItemMobile(item.Client.phone1);
                      // setItemCity(item.Client.city);
                      // setItemAddress(item.Client.address1);
                      // // setItemEmail(item.Client.email);
                      // setItemId(Number(item.Client.id));
                      // setPhoneValue(item.Client.phone1)
   
                       document.querySelector('input[name="p_name"]').value = item.name;
                       document.querySelector('input[name="p_ContactPhoneNumber"]').value = value;
                      //  document.querySelector('input[name="p_City"]').value = item.city;
                       document.querySelector('input[name="p_AddressLine1"]').value = item.address;
                      // document.querySelector('input[name="p_name"]').value = item.Client.first_name && item.Client.last_name ? `${item.Client.first_name} ${item.Client.last_name}` : '';

                      // document.querySelector('input[name="p_ContactPhoneNumber"]').value = value;
                      // document.querySelector('input[name="p_City"]').value = item.Client.city;
                      // document.querySelector('input[name="p_AddressLine1"]').value = item.Client.address1;
  
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
                item.name === "smsa" ? (<p>قيمة الشحن من <span>{item.mincodmarkteer} ر.س</span> الى <span>{item.maxcodmarkteer} ر.س</span></p>):
                null))}
          </div>
          ): null}
        <form onSubmit={submitOrderUserForm} className='' action="">
            <div className="row">
            <div className="col-md-6">
            <div className="shipper-details brdr-grey p-3">
                <h3>تفاصيل المرسل</h3>
                <div className='pb-3'>
                <label htmlFor=""> الاسم <span className="star-requered">*</span></label>
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
                <label htmlFor="">رقم الهاتف<span className="star-requered">*</span></label>
                {/* <input type="text" className="form-control" /> */}
                <PhoneInput name='p_ContactPhoneNumber' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={value}
    onChange={(value) => {
      setItemMobile(value)
      setPhoneValue(value);
      getOrderData({ target: { name: 'p_ContactPhoneNumber', value } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='p_ContactPhoneNumber'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
      
            </div>  
            <div className='pb-3 ul-box'>
                <label htmlFor=""> الموقع<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='p_City'
                onChange={(e)=>{ 
                  // setItemCity(e.target.value);
                  const searchValue = e.target.value;
                  setSearch(searchValue);
                  getOrderData(e)
                  const matchingCities = cities.filter((item) => {
                    return searchValue === '' ? item : item.toLowerCase().includes(searchValue.toLowerCase());
                  });
              
                  // if (matchingCities.length === 0) {
                  //   closeCitiesList();
                  // } else {
                  //   openCitiesList();
                  // }
                  openCitiesList();
                  }}
                  onClick={openCitiesList}
                  />
                  {showCitiesList && (
                    <ul  className='ul-cities'>
                    {cities && cities.filter((item)=>{
                    return search === ''? item : item.toLowerCase().includes(search.toLowerCase());
                    }).map((item,index) =>{
                     return(
                      <li key={index} name='p_City' 
                      onClick={(e)=>{ 
                        const selectedCity = e.target.innerText;
                        setItemCity(selectedCity)
                        getOrderData({ target: { name: 'p_City', value: selectedCity } });
                        document.querySelector('input[name="p_City"]').value = selectedCity;
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
                 
                {/* <select className="form-control" name='p_City' onChange={getOrderData}>
                <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}
                </select> */}
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_City'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>          
            {/* <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <select className="form-control" name='p_City' onChange={getOrderData}>
                <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}
                  </select>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_City'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div> */}
            <div className='pb-3'>
                <label htmlFor=""> المنطقة<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='p_District' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_District'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> العنوان<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='p_AddressLine1' onChange={(e) => {
    setItemAddress(e.target.value);
    getOrderData(e);
  }}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_AddressLine1'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> عنوان اضافى</label>
                <input type="text" className="form-control" name='p_AddressLine2' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='p_AddressLine2'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            { userData.userData.data.user.rolle === "marketer"?(
              <div className='pb-3'>
              <label htmlFor=""> كود المسوق <span className="star-requered">*</span></label>
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
            </div>
            */}
            
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
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> قيمة الشحنة <span className="star-requered">*</span></label>
                <input type="number" step="0.001" className="form-control" name='Value' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='Value'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}               
            </div>
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
                <div className="">
                <div className='pb-3'>
                <label htmlFor=""> الوصف <span className="star-requered">*</span></label>
                <textarea className="form-control" name='description' onChange={getOrderData} cols="30" rows="4"></textarea>
                {errorList.map((err,index)=>{
      if(err.context.label ==='description'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
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
                <label htmlFor=""> رقم الهاتف<span className="star-requered">*</span></label>
                {/* <input type="text" className="form-control"/> */}
                <PhoneInput name='c_ContactPhoneNumber' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={phone2}
    onChange={(phone2) => {
      setPhone2(phone2);
      getOrderData({ target: { name: 'c_ContactPhoneNumber', value: phone2 } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='c_ContactPhoneNumber'){
        return <div key={index} className="alert alert-danger my-2"> يجب ملئ جميع البيانات</div>
      }
      
    })}
      
            </div>
            <div className='pb-3'>
                <label htmlFor=""> رقم هاتف اضافى</label>
                {/* <input type="text" className="form-control"/> */}
                <PhoneInput name='c_ContactPhoneNumber2' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={cPhoneNumber2}
    onChange={(cPhoneNumber2) => {
      setcPhone(cPhoneNumber2);
      getOrderData({ target: { name: 'c_ContactPhoneNumber2', value: cPhoneNumber2 } });
    }}/>
   
      
            </div>
            <div className='pb-3 ul-box'>
                <label htmlFor=""> الموقع<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='c_City'
                onChange={(e)=>{ 
                  const searchValue = e.target.value;
                  setSearch2(searchValue);
                  getOrderData(e)
                  const matchingCities = cities.filter((item) => {
                    return searchValue === '' ? item : item.toLowerCase().includes(searchValue.toLowerCase());
                  });
              
                  // if (matchingCities.length === 0) {
                  //   closeCitiesList2();
                  // } else {
                  //   openCitiesList2();
                  // }
                  openCitiesList2();
                  }}
                  onClick={openCitiesList2}
                  />
                  {showCitiesList2 && (
                    <ul  className='ul-cities'>
                    {cities && cities.filter((item)=>{
                    return search2 === ''? item : item.toLowerCase().includes(search2.toLowerCase());
                    }).map((item,index) =>{
                     return(
                      <li key={index} name='c_City' 
                      onClick={(e)=>{ 
                        const selectedCity = e.target.innerText;
                        getOrderData({ target: { name: 'c_City', value: selectedCity } });
                        document.querySelector('input[name="c_City"]').value = selectedCity;
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
                {/* <select className="form-control" name='c_City' onChange={getOrderData}>
                  <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}                
                </select> */}
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_City'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            {/* <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <select className="form-control" name='c_City' onChange={getOrderData}>
                <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}
                </select>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_City'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div> */}
            <div className='pb-3'>
                <label htmlFor=""> المنطقة<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='c_District' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_District'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            
            <div className='pb-3'>
                <label htmlFor=""> العنوان<span className="star-requered">*</span></label>
                <input type="text" className="form-control" name='c_AddressLine1' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_AddressLine1'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> عنوان اضافى</label>
                <input type="text" className="form-control" name='c_AddressLine2' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_AddressLine2'){
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
        <div className="clients-table p-4 mt-4">
          <table className="table">
            <thead>
              <tr>
               <th scope="col">#</th>
               <th scope="col"> الشركة</th>
               <th scope="col">رقم البوليصة</th>
               <th scope="col">طريقة الدفع</th>
               <th scope="col">التاريخ .</th>
               <th scope="col">id_الفاتورة</th>                
               <th scope="col"></th>
               <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
  {Array.isArray(shipments) && shipments.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.company}</td>
        <td>{item.data.sawb}</td>
        <td>{item.paytype}</td>
        <td>{item.data.createDate.slice(0, 10)}</td>
        {item.inovicedaftra?.id?(<td>{item.inovicedaftra.id}</td>):(<td>_</td>)}

        <td>
                <button
      
      className="smsa-btn btn btn-success"
      onClick={() => getSmsaSticker(item._id)}
    >
      عرض الاستيكر
    </button>
                </td>
                {item.inovicedaftra?.id?(<td><button
      
      className="btn btn-orange"
      onClick={() => getInvoice(item.inovicedaftra.id)}
    >
      عرض الفاتورة
    </button></td>):(<td>_</td>)}
      </tr>
    );
  })}
</tbody>


         </table>
        </div>
        
    </div> 
     )
}
