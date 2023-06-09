import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'
import axios from 'axios';
import Joi from 'joi';

export default function AnwanShippments(userData) {
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
      useEffect(()=>{
          getCompaniesDetailsOrders()
          // getCities()
      },[])
      const [value ,setPhoneValue]=useState()
      const [phone2,setPhone2] =useState()
    
      const [errorList, seterrorList]= useState([]); 
    const [orderData,setOrderData] =useState({
      pieces: '',
      description: '',
      s_email:'',
      c_email:'',
      weight: '',
      s_address: '',
      s_city: '',
      s_phone: '',
      s_name: '',
      c_name: "",
      c_address: "",
      c_city: '',
      c_phone: '',
      cod: false,
      shipmentValue:'',
      markterCode:'',

  
    })
    const [error , setError]= useState('')
    const [isLoading, setisLoading] =useState(false)
    const [shipments,setShipments]=useState([])

    async function sendOrderDataToApi() {
      console.log(localStorage.getItem('userToken'))
      try {
        const response = await axios.post(
          "https://dashboard.go-tex.net/api/anwan/create-user-order",
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
          console.log(shipments)
          }else if (response.status === 400) {
          setisLoading(false);
          const errorMessage = response.data.msg || "An error occurred.";
          window.alert(`${errorMessage}`);
          console.log(response.data);
        }
      } catch (error) {
        // Handle error
        console.error(error);
        setisLoading(false);
        const errorMessage = error.response.data?.error?.msg || error.response.data?.msg ||   "An error occurred.";
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
      //   console.log(myOrderData.cod);
        
      // }
    
      function validateOrderUserForm(){
        let scheme= Joi.object({
            s_name:Joi.string().required(),
            s_city:Joi.string().required(),
            s_phone:Joi.string().required(),
            s_address:Joi.string().required(),
            weight:Joi.number().required(),
            pieces:Joi.number().required(),
            c_name:Joi.string().required(),
            c_city:Joi.string().required(),
            c_address:Joi.string().required(),
            c_phone:Joi.string().required(),
            description:Joi.string().required(),
            s_email:Joi.string().email({ tlds: { allow: ['com', 'net','lol'] }}).required(),
            c_email:Joi.string().email({ tlds: { allow: ['com', 'net','lol'] }}).required(),
            // value:Joi.string().required(),
            cod:Joi.required(),
            shipmentValue:Joi.number().allow(null, ''),  
            markterCode:Joi.string().allow(null, ''),

        });
        return scheme.validate(orderData, {abortEarly:false});
      }
      // const [cities,setCities]=useState()
      async function getCities() {
        console.log(localStorage.getItem('userToken'))
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/anwan/cities',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          // setCities(response.data.data.data)
          console.log(response.data.data)
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
    
      const cities=['Buraydah','Al Badayea','Al Bukayriyah','Al Fuwaileq','Al Hilaliyah','Al Mithnab',
        'Alnabhanya','Alrass','Ayn Fuhayd','Badaya','Bukeiriah','Midinhab','Muzneb','Onaiza','Oyoon Al Jawa',
        'Riyadh Al Khabra','Unayzah','Uyun Al Jawa','Al Asyah','Al Batra','Uqlat Al Suqur',
        'Al Amar in qasim','Al Dalemya','Al Khishaybi','AlDalemya','Dulay Rashid','Qusayba',
        'Ar Rishawiyah','Al Wasayta','An Nuqrah','Hail','Qufar','Sadyan','Baqa Ash Sharqiyah','Baqaa',
        'Ghazalah','Mawqaq','Moqaq','Munifat Al Qaid','Al Ajfar','Al hait','Ash Shamli','Ash Shananah',
        'Shinanh','Simira','Al Jawf','Qurayat','Sakaka','Al Laqayit','Ar Radifah','At Tuwayr','Domat Al Jandal',
        'Hadeethah','Qara','Tabrjal','Zallum','Abu Ajram','Al Adari','An Nabk Abu Qasr',
        'Jouf','Arar','Hazm Al Jalamid','Rafha','Turaif',
        'Abha','Ahad Rufaidah','Al Wadeen','Asir','Balahmar','Balasmar','Harajah',
'Khamis Mushait','Sarat Abidah','Sarat Obeida','Tendaha','Wadeien','Wadi Bin Hasbal','Samakh',
'Khaiber Al Janoub','Mohayel Aseer','Muhayil','Al Namas','Almajaridah',`Rejal Alma'A`,'Tanomah',
'Tanuma','turaib','Al Birk',`Kara'a`,'Subheka','Tatleeth','Al Baha','Bisha','Biljurashi','Majarda',
'Namas','Adham','Bareq','Bariq','Al Mada','Sabt El Alaya','Aqiq','Atawleh','Gilwa','Mandak','Nimra',
'Almuzaylif','Al Qunfudhah','Al Salamah','Birk','Amaq','Muthaleif','Rania','Qunfudah','Al Jifah',
'Bani Hamim','Al Majma','Al Khaniq','Haddadah','Hubuna','Lahumah','Al Husayniyah','Al Mishaliah',
'Najran','Khbash','Dhahran Al Janoob','Badr Al Janoub','Bir Askar','Khabash','Al Harajah','Al Hijf',
'Thar','Sharourah','Al Wadiah','Yadamah','Jazan','Sabkah','Al Husayni','Alarjeen','Sunbah',
'Al Gamri','Al Rayyan','Al Ataya','Either','Alabadilah','Al-Batna','Al Haqu','Harub','El Edabi',
'Al Henayah','Al khoba','Al Fatiha','Fayfa','Alaliya','Alshuqayri','Al-MNSALA','Samrat Al Jed',
'Al kadami','Al Sahalil','Alshqayri','Ad Darb','Al Reeth','Al Araq','Al Kadarah','Al Aridhah',
'Al Edabi','Al Idabi','Khasawyah','Abu Areish','Abu Arish','Ahad Al Masarihah','Ahad Masarha',
'Al Jaradiyah','Al Madaya','Al-Matan','Algayed','Alsilaa','Bish','Darb','Gizan','Jazan Economic City',
'Mahalah','Sabya','Samtah','Thabya','Addayer','Al Ardah','Al Harth','Al Mubarakah','Al Shuqaiq','Al Tuwal',
'Damad','Karboos','Shoaiba','Al Shuqaiq Hofuf','Al Hassa','Al Hofuf','Hofuf','Mubaraz','Al Qarah' ,
'Uyun',
'Juatha',
'Abqaiq',
'Baqayq - Hofuf',
'Baqiq',
'Othmanyah',
'Ain Dar',
'Salwa',
'Udhailiyah',
'Harad',
'Al Oyun Hofuf',
'Qarah',
'Al Khobar',
'Dammam',
'Dhahran',
'Khobar',
'Rahima',
'Thuqba',
'Al Jsh',
'Al Qatif',
'Anak',
'Awamiah',
'Nabiya',
'Al Awjam',
'Qatif',
'Ras Tanura',
'Safwa',
'Seihat',
'Tarout',
'Tarut',
'AlQaisumah',
'Hafer Al Batin',
'Nisab',
'As Sufayri',
'Qaisumah',
'As Sadawi',
'An Nazim',
'Rafha',
'King Khalid Military City',
'Ath Thybiyah',
'Rawdat Habbas',
'Al Jubail',
'Jubail',
'Satorp tank farm',
'Tanjeeb',
'Ras Al Kheir',
'As sarar' ,
'Satorp',
'Nayriyah',
'Khafji',
'Mulaija',
'Qariya Al Olaya',
'Safanyah',
'Jeddah',
'Taiba',
'Asfan',
'Bahara',
'Bahrat Al Moujoud',
'Dhahban',
'Khulais',
'King Abdullah Economic City',
'Mastorah',
'Mastura',
'Thuwal',
'Zahban',
'Laith',
'Rabigh',
'An Nawwariyyah',
`Ja'araneh`,
'Jumum',
'Makkah',
'Mecca',
'Nwariah',
`Shraie'E`,
'Shumeisi',
'Al Jumum',
'Al Huwaya',
'Alhada',
`Ash-Sharaʼi`,
'Taif',
`Hawea/Taif`,
'Khurma',
'Turba',
'Al Ais',
'Wadi farah',
'Madinah',
'Hinakeya',
'Khaibar',
'Umluj',
'Oula',
'Yanbu',
'Bader',
'Mahad Al Dahab',
'Yanbu Al Baher',
'Yanbu Al Sinaiyah',
'Yanbu Nakhil',
'Tabuk',
'Al Bada',
'Duba',
'Halat Ammar',
'Haqil',
'Sharmaa',
'Tayma',
`Wajeh (Al Wajh)`,
'Ad Diriyah',
'Dhurma',
'Huraymila',
'Muzahmiyah',
'Uyaynah',
'Remah',
'Salbookh',
'Thadek',
'Hawtat Bani Tamim',
'Ad Dilam',
'Al Kharj',
'Al Hariq',
'Al Jubaylah',
'Ar Ruwaydah',
'Quweiyah',
'Malham',
'Mrat',
'Tebrak',
'Qasab',
'Ar Rayn',
'Al Furuthi',
'Jalajil',
'Al Dahinah',
'Al Jurayfah',
'Al Muashibah',
'As Suh',
'Umm Tulayhah',
'Al Ghurabah',
'Shaqra',
'Ushaiqer',
'Hautat Sudair',
'Al Hurayyiq',
'Raudat Sudair',
'Audat Sudair',
'Ushairat Sudair',
'Al Hasi',
'Al Tuwaim',
'Tumair',
'Sudair Industry and Business City',
'Mabayid',
'Al Sheib',
'Al Shahmah',
'Al Ghat',
'Al Wusayyiah',
'Mulayh',
'Al Zulfi',
'Al Zulfi -North  Albutain',
'Imarat Almistawi',
'Mushrifa',
'Mishash Awad',
'Al Uqlah',
'Al Artawiyah',
'Al Qaiyah',
'An Nughayq',
'Masada Artawiyah',
'Umm Al Jamajm',
'Afif',
'Sajir',
'Bejadiyah',
'Nifi',
'Al Artawi',
'Arja',
'AL Qaiyah',
'Alsalhiya',
'Wabrah',
'Hadri',
'Al Qurayn',
'Afqara',
'Musaddah',
'Al Ulu',
'As sumayrah',
'Ash Shuara',
'Jefin',
'Abu sidayrah',
'Sulaiyl',
'Khamaseen',
'Khairan',
'Wadi', 
'Kumdah',
        ]

        async function getGotexSticker(orderId) {
          try {
            const response = await axios.get(`https://dashboard.go-tex.net/api/anwan/print-sticker/${orderId}`, {
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
                {/* <p>{cities[0].name}</p> */}
                <div className='pb-3'>
                <label htmlFor=""> الاسم</label>
                <input type="text" className="form-control" name='s_name' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='s_name'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> الايميل</label>
                <input type="email" className="form-control" name='s_email' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='s_email'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor="">رقم الهاتف</label>
                {/* <input type="text" className="form-control" /> */}
                <PhoneInput name='s_phone' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput' value={value}
    onChange={(value) => {
      setPhoneValue(value);
      getOrderData({ target: { name: 's_phone', value } });
    }}/>
    {errorList.map((err,index)=>{
      if(err.context.label ==='s_phone'){
        return <div key={index} className="alert alert-danger my-2">يجب ملئ جميع البيانات </div>
      }
      
    })}
      
            </div>
            <div className='pb-3 ul-box'>
                <label htmlFor=""> الموقع</label>
                <input type="text" className="form-control" name='s_city'
                onChange={(e)=>{ 
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
                    <ul  className='ul-cities'>
                    {cities && cities.filter((item)=>{
                    return search === ''? item : item.toLowerCase().includes(search.toLowerCase());
                    }).map((item,index) =>{
                     return(
                      <li key={index} name='s_city' 
                      onClick={(e)=>{ 
                        const selectedCity = e.target.innerText;
                        getOrderData({ target: { name: 's_city', value: selectedCity } });
                        document.querySelector('input[name="s_city"]').value = selectedCity;
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
                 
                {/* <select className="form-control" name='s_city' onChange={getOrderData}>
                <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}
                </select> */}
                {errorList.map((err,index)=>{
      if(err.context.label ==='s_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            {/* <div className='pb-3'>
                <label htmlFor=""> الموقع</label>
                <select className="form-control" name='s_city' onChange={getOrderData}>
                <option></option>
                {cities && cities.map((item, index) => (
                  <option key={index}>{item.name}</option>
                  ))}
                </select>
                {errorList.map((err,index)=>{
      if(err.context.label ==='s_city'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div> */}
            <div className='pb-3'>
                <label htmlFor=""> العنوان </label>
                <input type="text" className="form-control" name='s_address' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='s_address'){
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
            
            

           {/* <div className='pb-3'>
                <label htmlFor=""> قيمة الشحنة</label>
                <input type="number" className="form-control" name='shipmentValue' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='shipmentValue'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
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
                {/* <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> القيمة</label>
                <input type="text" className="form-control" name='value' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='value'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                </div>
                 */}
                <div className="col-md-6">
                <div className='pb-3'>
                <label htmlFor=""> عدد القطع</label>
                <input type="number" className="form-control" name='pieces' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='pieces'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                </div>
                <div className="">
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

{/* <>
                    <div className='pb-3'>
                <label htmlFor=""> قيمة الشحن (cod)</label>
                <input type="number" className="form-control" name='cod' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='cod'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> قيمة الشحنة</label>
                <input type="number" className="form-control" name='shipmentValue' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='shipmentValue'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
                    </> */}
                <div className='pb-3'>
                <label htmlFor=""> الوصف </label>
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
                <label htmlFor=""> الايميل</label>
                <input type="email" className="form-control" name='c_email' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_email'){
        return <div key={index} className="alert alert-danger my-2">يجب ملىء هذه الخانة </div>
      }
      
    })}
            </div>
            <div className='pb-3'>
                <label htmlFor=""> رقم الهاتف</label>
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
            <div className='pb-3 ul-box'>
                <label htmlFor=""> الموقع</label>
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
                    <ul  className='ul-cities'>
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
                <input type="text" className="form-control" name='c_address' onChange={getOrderData}/>
                {errorList.map((err,index)=>{
      if(err.context.label ==='c_address'){
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
               <th scope="col">رقم الشحنة</th>
               <th scope="col">طريقة الدفع</th>
               <th scope="col">السعر </th>
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
        <td>{item.ordernumber}</td>
        <td>{item.paytype}</td>
        <td>{item.price}</td>
        <td>
                <button
      
      className="glt-btn btn btn-success"
      onClick={() => getGotexSticker(item._id)}
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
        
    </div>  )
}
