import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';

export default function InviteLink() {
  const navigate = useNavigate();
  const [errorList, setErrorList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [invCode, setInvCode] = useState('');
  const [formData, setFormData] = useState({
    companies: [
      {
        name: 'anwan',
        onlinePayment: '',
        cod: '',
      },
      {
        name: 'saee',
        onlinePayment: '',
        cod: '',
      },
      {
        name: 'glt',
        onlinePayment: '',
        cod: '',
      },
      {
        name: 'smsa',
        onlinePayment: '',
        cod: '',
      },
      {
        name: 'aramex',
        onlinePayment: '',
        cod: '',
      },
    ],
    clintemail: '',
  });

  async function sendRegisterDataToApi() {
    try {
      const response = await axios.post(
        'https://dashboard.go-tex.net/api/invatation/create-invitation',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        console.log(response.data);
        window.alert('تم انشاء رابط الدعوة بنجاح');
        setInvCode(response.data.code);
      } else {
        setIsLoading(true);
        console.log(response.data.msg);
      }
    } catch (error) {
      console.error(error);
      window.alert(error.response.data.msg);
    }
  }

  function submitRegisterForm(e) {
    e.preventDefault();
    setIsLoading(true);
    let validation = validateRegisterForm();
    console.log(validation);
    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
      console.log('no');
    } else {
      sendRegisterDataToApi();
      console.log('yes');
    }
  }

  function getUserData(e) {
    const { name, value } = e.target;
    const { companies } = formData;

    const updatedCompanies = [...companies];
    const index = Number(name.split('-')[1]);

    if (name.startsWith('onlinePayment')) {
      updatedCompanies[index].onlinePayment = value;
    } else if (name.startsWith('cod')) {
      updatedCompanies[index].cod = value;
    } else if (name === 'clintemail') {
      setFormData((prevState) => ({
        ...prevState,
        clintemail: value,
      }));
    }

    setFormData((prevState) => ({
      ...prevState,
      companies: updatedCompanies,
    }));
  }

  function validateRegisterForm() {
    const schema = Joi.object({
      companies: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          onlinePayment: Joi.number().required(),
          cod: Joi.number().required(),
        })
      ),
      clintemail: Joi.string().email({ tlds: { allow: ['com', 'net', 'lol'] } }).required(),
    });

    return schema.validate(formData, { abortEarly: false });
  }

  return (
    <>
      <div className='py-4' id='content'>
        {invCode && (
          <div className='d-flex brdr-grey p-3 w-75 m-auto'>
            <h4>كود الدعوة : </h4>
        <h5 className='pt-1 pe-2'>{invCode}</h5>
          </div>
        )}
        <div className='d-flex px-3 mt-3'>
          <div className='invit-box p-4 brdr-grey m-auto'>
            <div className='text-center'>
              <h4>إنشاء رابط دعوة</h4>
            </div>
            <form onSubmit={submitRegisterForm} className='my-3' action=''>
            <div className='row px-2'>
                <div className='col-12'>
                  <label htmlFor='clintemail'>ايميل العميل</label>
                  <input
                    type='email'
                    name='clintemail'
                    className='form-control'
                    onChange={getUserData}
                  />
                </div>
              </div>
              {formData.companies.map((company, index) => (
                <React.Fragment key={index}>
                  <div className='label-company'>
                    <label htmlFor={`cod-${index}`} className=' label-company'>
                      اسم الشركة: {company.name=== 'anwan'? ('gotex'):(`${company.name}`)}
                    </label>
                  </div>
                  <div className='row px-2'>
                    <div className='col-md-6'>
                      <label htmlFor={`onlinePayment-${index}`} className=''>
                        سعر الدفع اونلاين
                      </label>
                      <input
                        type='number'
                        name={`onlinePayment-${index}`}
                        className='form-control'
                        onChange={getUserData}
                      />
                    </div>
                    <div className='col-md-6'>
                      <label htmlFor={`cod-${index}`} className=''>
                        سعر الدفع عند الاستلام (COD)
                      </label>
                      <input
                        type='number'
                        name={`cod-${index}`}
                        className='form-control'
                        onChange={getUserData}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}
              
              <div className="text-center">
        {errorList && ( 
          <div className="alert alert-danger mt-2 fs-4">يجب ملىء جميع البيانات</div>
      
          )
     }
         <button className='btn btn-dark mt-3'>
          إنشاء 
                      </button>
        </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}




// import React, { useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Joi from 'joi';

// export default function InviteLink() {
//     const [visible , setVisible] =useState(false);  
//     let navigate= useNavigate(); //hoke
//     const [errorList, seterrorList]= useState(null); 
//     const [value ,setPhoneValue]=useState()
//     const [error , setError]= useState('')
//     const [isLoading, setisLoading] =useState(false)
//     const [invCode,setInvCode]=useState('')
//     const [formData, setFormData] = useState({
//         companies: [
//           {
//             name: "",
//             onlinePayment: "",
//             cod: "",
//           },
//         ],
//         clintemail: "",
//       });
      
//     async function sendRegisterDataToApi() {      
//         try {
//           const response = await axios.post(
//             "https://dashboard.go-tex.net/api/invatation/create-invitation",
//             formData,
//             {
//                 headers: {
//                   Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//                 },
//               }
//           );
      
//           if (response.status=== 200) {
//             setisLoading(false);
//             console.log(response.data);
//             window.alert("تم التسجيل بنجاح");
//             setInvCode(response.data.code)
//           } else {
//             setisLoading(true);
//             setError(response.data.msg);
//           }
//         } catch (error) {
//           console.error(error);
//           window.alert(error.response.data.msg)
//         }
//       }
//       function submitRegisterForm(e){
//         e.preventDefault();
//         setisLoading(true)
//         let validation = validateRegisterForm();
//         console.log(validation);
//         if(validation.error){
//           setisLoading(false)
//           seterrorList(validation.error.details)
//       console.log("no")
//         }else{
//           sendRegisterDataToApi();
//           console.log("yes")
    
//         }
      
//       }
//       const getUserData = (e) => {
//         const { name, value } = e.target;
//         const { companies } = formData;
      
//         if (name.startsWith("name")) {
//           const index = Number(name.split("-")[1]);
//           const updatedCompanies = [...companies];
//           if (!updatedCompanies[index]) {
//             updatedCompanies[index] = {}; // Initialize the object if it's undefined
         
//           }
//           updatedCompanies[index].name = value === 'gotex' ? 'anwan' : value;
//           setFormData((prevState) => ({
//             ...prevState,
//             companies: updatedCompanies,
//           }));
//         } else if (name.startsWith("cod")) {
//           const index = Number(name.split("-")[1]);
//           const updatedCompanies = [...companies];
//           if (!updatedCompanies[index]) {
//             updatedCompanies[index] = {}; // Initialize the object if it's undefined
//           }
//           updatedCompanies[index].cod = value;
//           setFormData((prevState) => ({
//             ...prevState,
//             companies: updatedCompanies,
//           }));
//         } else if (name.startsWith("onlinePayment")) {
//           const index = Number(name.split("-")[1]);
//           const updatedCompanies = [...companies];
//           if (!updatedCompanies[index]) {
//             updatedCompanies[index] = {}; // Initialize the object if it's undefined
//           }
//           updatedCompanies[index].onlinePayment = value;
//           setFormData((prevState) => ({
//             ...prevState,
//             companies: updatedCompanies,
//           }));
//         } else if (name === "clintemail") {
//           setFormData((prevState) => ({
//             ...prevState,
//             clintemail: value,
//           }));
//         }
//       };
      
      
//     //   function getUserData(e){
//     //     let mydata={...data};
//     //     mydata[e.target.name]= e.target.value;
//     //     setData(mydata);
//     //     console.log(mydata);
//     //   }
    
//       function validateRegisterForm() {
//         const scheme = Joi.object({
//           companies: Joi.array().items(
//             Joi.object({
//               name: Joi.string().required(),
//               onlinePayment: Joi.number().required(),
//               cod: Joi.number().required(),
//             })
//           ),
//           clintemail: Joi.string().email({ tlds: { allow: ["com", "net","lol"] } }).required(),
//         });
    
//         return scheme.validate(formData, { abortEarly: false });
//       }

//   return (
//     <>
//     <div className='py-4' id='content'>
//     {invCode && (
//             <div className="d-flex brdr-grey p-3 w-75 m-auto">
//             <h4>كود الدعوة : </h4>
//             <h5 className='pt-1 pe-2'>{invCode}</h5>
//         </div>
//         )}
//     <div className="d-flex px-3 mt-3">
        
        
//     <div className="invit-box p-4 brdr-grey m-auto">
//         <div className="text-center">
//            <h4>إنشاء رابط دعوة</h4>
//         </div>
//     <form onSubmit={submitRegisterForm} className='my-3' action="">
//         <div className="row px-2">
//         <div className=''>
//                 <label htmlFor=""> ايميل العميل</label>
//                 <input type="email" name='clintemail' className="form-control" onChange={getUserData}/>
//             </div>
//             <label htmlFor="" className=' label-company'>شركة gotex :</label>
//             <div className='pb-2'>
//                 <label htmlFor=""> اسم الشركة</label>
//                 <input type="text"
//                  name={`name-${0}`} className="form-control " onChange={getUserData}/>
                
//             </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع اونلاين</label>
//             <input type="number" name={`onlinePayment-${0}`} className="form-control" onChange={getUserData}/>
//         </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
//             <input type="number" name={`cod-${0}`} className="form-control" onChange={getUserData}/>
//         </div>
//         <label htmlFor="" className=' label-company'>شركة Saee :</label>
//         <div className='pb-2'>
//                 <label htmlFor=""> اسم الشركة</label>
//                 <input type="text" name={`name-${1}`}  className="form-control" onChange={getUserData}/>
//             </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع اونلاين</label>
//             <input type="number" name={`onlinePayment-${1}`} className="form-control" onChange={getUserData}/>
//         </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
//             <input type="number" name={`cod-${1}`}  className="form-control"onChange={getUserData} />
//         </div>
//         <label htmlFor="" className='label-company'>شركة glt :</label>
//         <div className='pb-2'>
//                 <label htmlFor=""> اسم الشركة</label>
//                 <input type="text" name={`name-${2}`} className="form-control" onChange={getUserData}/>
//             </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع اونلاين</label>
//             <input type="number" name={`onlinePayment-${2}`}  className="form-control" onChange={getUserData}/>
//         </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
//             <input type="number" name={`cod-${2}`} className="form-control" onChange={getUserData}/>
//         </div>
//         <label htmlFor="" className=' label-company'>شركة smsa :</label>
//         <div className='pb-2'>
//                 <label htmlFor=""> اسم الشركة</label>
//                 <input type="text" name={`name-${3}`} className="form-control" onChange={getUserData}/>
//             </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع اونلاين</label>
//             <input type="number" name={`onlinePayment-${3}`}  className="form-control" onChange={getUserData}/>
//         </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
//             <input type="number" name={`cod-${3}`} className="form-control" onChange={getUserData}/>
//         </div>
//         <label htmlFor="" className='label-company'>شركة aramex :</label>
//         <div className='pb-2'>
//                 <label htmlFor=""> اسم الشركة</label>
//                 <input type="text"  name={`name-${4}`} className="form-control" onChange={getUserData}/>
//             </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع اونلاين</label>
//             <input type="number" name={`onlinePayment-${4}`}  className="form-control" onChange={getUserData}/>
//         </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
//             <input type="number" name={`cod-${4}`} className="form-control"onChange={getUserData} />
//         </div>
//         </div>
//         <div className="text-center">
//         {errorList && ( 
//          <div className="alert alert-danger mt-2 fs-4">يجب ملىء جميع البيانات</div>
      
//           )
//     }
//         <button className='btn btn-dark mt-3'>
//         إنشاء
//                      </button>
//         </div>
        

//     </form>
//     </div>
//     </div>
//     </div>
//     </>
//   )
// }

// import axios from 'axios';
// import React, { useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Joi from 'joi';

// export default function InviteLink() {
//     const [visible , setVisible] =useState(false);  
//     let navigate= useNavigate(); //hoke
//     const [errorList, seterrorList]= useState(null); 
//     const [value ,setPhoneValue]=useState()
//     const [error , setError]= useState('')
//     const [isLoading, setisLoading] =useState(false)
//     const [invCode,setInvCode]=useState('')
//     const [formData, setFormData] = useState({
//         companies: [
//           {
//             name: "",
//             onlinePayment: "",
//             cod: "",
//           },
//         ],
//         clintemail: "",
//       });
      
      
//     async function sendRegisterDataToApi() {      
//         try {
//           const response = await axios.post(
//             "https://dashboard.go-tex.net/api/invatation/create-invitation",
//             formData,
//             {
//                 headers: {
//                   Authorization: `Bearer ${localStorage.getItem('userToken')}`,
//                 },
//               }
//           );
      
//           if (response.status=== 200) {
//             setisLoading(false);
//             console.log(response.data);
//             window.alert("تم التسجيل بنجاح");
//             setInvCode(response.data.code)
//           } else {
//             setisLoading(true);
//             setError(response.data.msg);
//           }
//         } catch (error) {
//           console.error(error);
//           window.alert(error.response.data.msg)
//         }
//       }
//       function submitRegisterForm(e){
//         e.preventDefault();
//         setisLoading(true)
//         let validation = validateRegisterForm();
//         console.log(validation);
//         if(validation.error){
//           setisLoading(false)
//           seterrorList(validation.error.details)
//       console.log("no")
//         }else{
//           sendRegisterDataToApi();
//           console.log("yes")
    
//         }
      
//       }
//     //   const getUserData = (e) => {
//     //     const { name, value } = e.target;
//     //     const { companies } = formData;
      
//     //     if (name.startsWith("name")) {
//     //       const index = Number(name.split("-")[1]);
//     //       const updatedCompanies = [...companies];
//     //       if (!updatedCompanies[index]) {
//     //         updatedCompanies[index] = {}; // Initialize the object if it's undefined
         
//     //       }
//     //       updatedCompanies[index].name = value === 'gotex' ? 'anwan' : value;
//     //       setFormData((prevState) => ({
//     //         ...prevState,
//     //         companies: updatedCompanies,
//     //       }));
//     //     } else if (name.startsWith("cod")) {
//     //       const index = Number(name.split("-")[1]);
//     //       const updatedCompanies = [...companies];
//     //       if (!updatedCompanies[index]) {
//     //         updatedCompanies[index] = {}; // Initialize the object if it's undefined
//     //       }
//     //       updatedCompanies[index].cod = value;
//     //       setFormData((prevState) => ({
//     //         ...prevState,
//     //         companies: updatedCompanies,
//     //       }));
//     //     } else if (name.startsWith("onlinePayment")) {
//     //       const index = Number(name.split("-")[1]);
//     //       const updatedCompanies = [...companies];
//     //       if (!updatedCompanies[index]) {
//     //         updatedCompanies[index] = {}; // Initialize the object if it's undefined
//     //       }
//     //       updatedCompanies[index].onlinePayment = value;
//     //       setFormData((prevState) => ({
//     //         ...prevState,
//     //         companies: updatedCompanies,
//     //       }));
//     //     } else if (name === "clintemail") {
//     //       setFormData((prevState) => ({
//     //         ...prevState,
//     //         clintemail: value,
//     //       }));
//     //     }
//     // //   };
      
      
//     // //   function getUserData(e){
//     // //     let mydata={...data};
//     // //     mydata[e.target.name]= e.target.value;
//     // //     setData(mydata);
//     // //     console.log(mydata);
//     // //   }

//     // function getUserData(e) {
//     //     const { name, value } = e.target;
//     //     const { companies } = formData;
      
//     //     const index = Number(name.split("-")[1]);
//     //     const companyName = getCompanyNameByIndex(index);
        
//     //     const updatedCompanies = [...companies];
//     //     if (!updatedCompanies[index]) {
//     //       updatedCompanies[index] = {};
//     //     }
//     //     updatedCompanies[index].name = companyName;
        
//     //     setFormData((prevState) => ({
//     //       ...prevState,
//     //       companies: updatedCompanies,
//     //     }));
//     //   }else if (name.startsWith("cod")) {
//     //     const index = Number(name.split("-")[1]);
//     //     const updatedCompanies = [...companies];
//     //     if (!updatedCompanies[index]) {
//     //       updatedCompanies[index] = {}; // Initialize the object if it's undefined
//     //     }
//     //     updatedCompanies[index].cod = value;
//     //     setFormData((prevState) => ({
//     //       ...prevState,
//     //       companies: updatedCompanies,
//     //     }));
//     //   } else if (name.startsWith("onlinePayment")) {
//     //     const index = Number(name.split("-")[1]);
//     //     const updatedCompanies = [...companies];
//     //     if (!updatedCompanies[index]) {
//     //       updatedCompanies[index] = {}; // Initialize the object if it's undefined
//     //     }
//     //     updatedCompanies[index].onlinePayment = value;
//     //     setFormData((prevState) => ({
//     //       ...prevState,
//     //       companies: updatedCompanies,
//     //     }));
//     //   } else if (name === "clintemail") {
//     //     setFormData((prevState) => ({
//     //       ...prevState,
//     //       clintemail: value,
//     //     }));
//     //   }}
//     function getUserData(e) {
//         const { name, value } = e.target;
//         const { companies } = formData;
      
//         const index = Number(name.split("-")[1]);
//         const companyName = getCompanyNameByIndex(index);
        
//         const updatedCompanies = [...companies];
//         if (!updatedCompanies[index]) {
//           updatedCompanies[index] = {};
//         }
//         updatedCompanies[index].name = companyName;
      
//         if (name.startsWith("cod")) {
//           updatedCompanies[index].cod = value;
//         } else if (name.startsWith("onlinePayment")) {
//           updatedCompanies[index].onlinePayment = value;
//         }
      
//         setFormData((prevState) => ({
//           ...prevState,
//           companies: updatedCompanies,
//         }));
      
//         if (name === "clintemail") {
//           setFormData((prevState) => ({
//             ...prevState,
//             clintemail: value,
//           }));
//         }
//       }
      
//       function getCompanyNameByIndex(index) {
//         // Define your logic here to map index to company names
//         switch (index) {
//           case 0:
//             return 'gotex';
//           case 1:
//             return 'saee';
//           case 2:
//             return 'glt';
//           case 3:
//             return 'smsa';
//           case 4:
//             return 'aramex';
//           default:
//             return '';
//         }
//       }
      
//       function validateRegisterForm() {
//         const scheme = Joi.object({
//           companies: Joi.array().items(
//             Joi.object({
//               name: Joi.string().required(),
//               onlinePayment: Joi.number().required(),
//               cod: Joi.number().required(),
//             })
//           ),
//           clintemail: Joi.string().email({ tlds: { allow: ["com", "net","lol"] } }).required(),
//         });
    
//         return scheme.validate(formData, { abortEarly: false });
//       }

//   return (
//     <>
//     <div className='py-4' id='content'>
//     {invCode && (
//             <div className="d-flex brdr-grey p-3 w-75 m-auto">
//             <h4>كود الدعوة : </h4>
//             <h5 className='pt-1 pe-2'>{invCode}</h5>
//         </div>
//         )}
//     <div className="d-flex px-3 mt-3">
        
        
//     <div className="invit-box p-4 brdr-grey m-auto">
//         <div className="text-center">
//            <h4>إنشاء رابط دعوة</h4>
//         </div>
//     <form onSubmit={submitRegisterForm} className='my-3' action="">
//         <div className="row px-2">
//         <div className=''>
//                 <label htmlFor=""> ايميل العميل</label>
//                 <input type="email" name='clintemail' className="form-control" onChange={getUserData}/>
//             </div>
//             <label htmlFor="" className=' label-company'>شركة gotex :</label>
//                 {/* <input type="text"
//                  name={`name-${0}`} value='gotex' className=" d-none" onChange={getUserData}/>
//                  */}
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع اونلاين</label>
//             <input type="number" name={`onlinePayment-${0}`} className="form-control" onChange={getUserData}/>
//         </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
//             <input type="number" name={`cod-${0}`} className="form-control" onChange={getUserData}/>
//         </div>
//         <label htmlFor="" className=' label-company'>شركة Saee :</label>
//         <div className='pb-2'>
//                 {/* <input type="text" name={`name-${1}`} value='saee'  className="d-none" onChange={getUserData}/> */}
//             </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع اونلاين</label>
//             <input type="number" name={`onlinePayment-${1}`} className="form-control" onChange={getUserData}/>
//         </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
//             <input type="number" name={`cod-${1}`}  className="form-control"onChange={getUserData} />
//         </div>
//         <label htmlFor="" className='label-company'>شركة glt :</label>
//         <div className='pb-2'>
//                 {/* <input type="text" name={`name-${2}`} value='glt' className=" hidden" onChange={getUserData}/> */}
//             </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع اونلاين</label>
//             <input type="number" name={`onlinePayment-${2}`}  className="form-control" onChange={getUserData}/>
//         </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
//             <input type="number" name={`cod-${2}`} className="form-control" onChange={getUserData}/>
//         </div>
//         <label htmlFor="" className=' label-company'>شركة smsa :</label>
//         <div className='pb-2'>
//                 {/* <input type="text" name={`name-${3}`} value='smsa' className=" hh" onChange={getUserData}/> */}
//             </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع اونلاين</label>
//             <input type="number" name={`onlinePayment-${3}`}  className="form-control" onChange={getUserData}/>
//         </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
//             <input type="number" name={`cod-${3}`} className="form-control" onChange={getUserData}/>
//         </div>
//         <label htmlFor="" className='label-company'>شركة aramex :</label>
//         {/* <div className='pb-2'>
//                 <input type="text"  name={`name-${4}`} value='aramex' className=" hh" onChange={getUserData}/>
//             </div> */}
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع اونلاين</label>
//             <input type="number" name={`onlinePayment-${4}`}  className="form-control" onChange={getUserData}/>
//         </div>
//         <div className="col-md-6">
//             <label htmlFor="">سعر الدفع عند الاستلام(COD)</label>
//             <input type="number" name={`cod-${4}`} className="form-control"onChange={getUserData} />
//         </div>
//         </div>
//         <div className="text-center">
//         {errorList && ( 
//          <div className="alert alert-danger mt-2 fs-4">يجب ملىء جميع البيانات</div>
      
//           )
//     }
//         <button className='btn btn-dark mt-3'>
//         إنشاء
//                      </button>
//         </div>
        

//     </form>
//     </div>
//     </div>
//     </div>
//     </>
//   )
// }
