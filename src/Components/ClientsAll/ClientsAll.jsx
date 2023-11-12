import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EditClientModal from '../EditClientModal/EditClientModal';
import {Modal , Button} from 'react-bootstrap';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import ar from 'react-phone-number-input/locale/ar'

export default function ClientsAll() {
    useEffect(()=>{
        getClientsList()
      },[])

      

      const [showModal, setShowModal] = useState(false);
      const [depositAmount, setDepositAmount] = useState('');
      const [selectedUserId, setSelectedUserId] = useState(null);
      async function addDepositToUser() {
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/api/user/add-credit-to-client',
            {
              clientid : selectedUserId,
              cartid_limit: depositAmount,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }

          );
          // Handle the response as per your requirement
          console.log(response.data);
          window.alert('الرصيد معلق حتى تتم الموافقه من قبل الادارة')
          // if (response.data.msg === 'ok') {
            closeModal2();
            getClientsList();
          // }
        } catch (error) {
          console.error(error);
        }
      }
      const openModal2 = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true);
      };
    
      const closeModal2 = () => {
        setSelectedUserId(null);
        setShowModal(false);
        setDepositAmount('');
      };
      const handleDepositChange = (event) => {
        setDepositAmount(Number(event.target.value));
      };
      const [search, setSearch]= useState('')

      const[clients,setClients]=useState([])
      async function getClientsList() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/clients/get-all-clients',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const List = response.data.data
          console.log(List)
          setClients(List)
        } catch (error) {
          console.error(error);
        }
      }
      const [isModalOpen, setIsModalOpen] = useState(false);
      
      const [editedClient, setEditedClient] = useState(null);
      const [eClient, setEClient] = useState(null);
  const handleEditClick = (client) => {
    setEClient(client);
    setEditedClient(
      {
        company: client?.company || '',
        first_name: client?.name || '',
        city: client?.city || '',
        state: client?.state || '', // optional
        address: client?.address || '',
        mobile: client?.mobile || '',
        email: client?.email || '', // optional
        notes: client?.notes || '', // optional
        category: client?.category || '', // optional
        birth_date: client?.birth_date || '', // optional
        street: client?.street || '',
        // branches:client?.branches || '',
    }
    )
    setIsModalOpen(true);

    console.log(client)
    console.log(editedClient)
    console.log("yes")
  }
  const [selectedClientId, setSelectedClientId] = useState(null);

      const openModal = (clientId) => {
        setSelectedClientId(clientId)
        setIsModalOpen(true);
        
      };
      const closeModal = () => {
        setIsModalOpen(false);
        setEditedClient(null)
      };
      
      const [formData, setFormData] = useState({
        name: editedClient?.name || '',
        // Add other fields here with default values if needed
      });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedClient({ ...editedClient, [name]: value });
        console.log(editedClient)
      }
      const handleSubmit = async (event) => {
        console.log(editedClient)
        event.preventDefault();
        try {
          const response = await axios.post(
            `https://dashboard.go-tex.net/api/clients/edit-client/${eClient._id}`,
            editedClient,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }
          );
          console.log(editedClient)
          console.log(response);
    
          closeModal();
          window.alert("تم تعديل بيانات العميل بنجاح")
          getClientsList()
          
        } catch (error) {
          console.error(error);
          alert(error.response.data.err.message)
        }
      }     
      const [value ,setPhoneValue]=useState()

      const [searchName, setSearchName] = useState('');
      const [searchEmail, setSearchEmail] = useState('');
      const [searchPhone, setSearchPhone] = useState('');
      const [searchCity, setSearchCity] = useState('');
      const [searchCompany, setSearchCompany] = useState('');

      const filteredClients = clients.filter((item) => {
        return (
          (searchPhone === '' || item.mobile?.includes(searchPhone)) &&
          (searchName === '' || (item.name?.includes(searchName)) )&&
          (searchEmail === '' || item.email?.includes(searchEmail)) &&
          (searchCity === '' || item.city.includes(searchCity)) &&
          (searchCompany === '' || item.company?.includes(searchCompany))
         
        );
    
      });

  return (
    <>
    <div className='p-5' id='content'>
    <div className="gray-table p-4 mb-4">
      <div className="row">
        
        <div className="col-md-4">
          <label htmlFor="">اسم العميل:</label>
          <input className='form-control' type="search" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">الشركة :</label>
          <input className='form-control' type="search" value={searchCompany} onChange={(e) => setSearchCompany(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">الايميل:</label>
          <br/><input className='form-control' type="search" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">الهاتف:</label>
          <input className='form-control' type="search" value={searchPhone} onChange={(e) => setSearchPhone(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="">المدينة :</label>
          <input className='form-control' type="search" value={searchCity} onChange={(e) => setSearchCity(e.target.value)} />
        </div>
        
       
        <div className="text-center mt-3">
          <button className="btn dark"><i class="fa-solid fa-magnifying-glass"></i> بحث</button>
        </div>
      </div>
    </div>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
          <th scope="col">#</th>
            <th scope="col">العميل </th>
            <th scope="col">الشركة </th>
            <th scope="col">الهاتف </th>
            <th scope="col">الايميل </th>
            <th scope="col">المدينة </th>
            <th scope="col">العنوان </th>
            <th scope="col">الشارع  </th>
            <th scope="col">الفروع  </th>
            <th scope="col">المحفظة </th>
            <th scope="col"> credit </th>
            {/* <th scope="col">الشحنات </th>
            <th scope="col">ملاحظات </th> */}
            <th scope="col"></th>            
            <th scope="col"></th>            

           
          </tr>
        </thead>
        <tbody>
          {filteredClients && filteredClients.filter((item)=>{
          return search === ''? item : item.email.includes(search);
          }).map((item,index) =>{
            return(
              <tr key={index}>
                

                <td>{index+1}</td>
                {item.name?<td>{item.name}</td>:<td>_</td>}
                {item.company?<td>{item.company}</td>:<td>_</td>}
                {item.mobile?<td>{item.mobile} </td>:<td>_</td>}
                {item.email?<td>{item.email}</td>:<td>_</td>}
                {item.city?<td>{item.city}</td>:<td>_</td>}
                {item.address?<td>{item.address}</td>:<td>_</td>}
                {item.street?<td>{item.street}</td>:<td>_</td>}
                 {item.branches ? (
          <td>
            {item.branches.map((branche) => (
              <span key={branche._id}>{branche.city}  {branche.address} & </span>
            ))}
          </td>
        ) : (
          <td>_</td>
        )}
                {item.wallet?<td>{item.wallet}</td>:<td>_</td>}
                {item.credit?<td>{item.credit.limet} <br/> '{item.credit.status}'</td>:<td>_</td>}
               
                 {/* {item.notes?<td>{item.notes}</td>:<td>_</td>} */}

                 <td>
                <button
                        className='sdd-deposite btn btn-success '
                        onClick={() => openModal2(item._id)}
                      >
                        إضافة credit 
                      </button>
              </td>
              <td>
  <button className="btn btn-dark" onClick={() => handleEditClick(item)}>تعديل</button>
</td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div>
         </div>
         
         {/* <EditClientModal isOpen={isModalOpen} closeModal={closeModal} client={editedClient} /> */}
{isModalOpen && (<Modal show={isModalOpen} onHide={closeModal} >
        <Modal.Header >
          <Modal.Title>تعديل بيانات العميل
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <form onSubmit={handleSubmit}>
        {/* <input type="text" name="name" value={editedClient.name} onChange={handleInputChange} /> */}
        <div className="row">
                <div className="col-md-6 pb-1">
        <label htmlFor="first_name">الاسم   :</label>
      <input onChange={handleInputChange} value={editedClient.first_name} type="text" className='my-input my-2 form-control' name='first_name' />
      
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="company"> الشركة   :</label>
      <input onChange={handleInputChange} value={editedClient.company} type="text" className='my-input my-2 form-control' name='company' />
      
    </div>
    {/* <div className="col-md-6 pb-3">
        <label htmlFor="birth_date">تاريخ الميلاد   :</label>
      <input onChange={handleInputChange} value={editedClient.name} type="date" className='my-input my-2 form-control' name='birth_date' />
      
     
    </div> */}
    <div className="col-md-6 pb-1">
    <label htmlFor="mobile">رقم الهاتف</label>
    {/* <PhoneInput name='mobile' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput my-2' value={value}
    onChange={(value) => {
      setPhoneValue(value);
      handleInputChange({ target: { name: 'mobile', value } });
    }}/> */}
      <input onChange={handleInputChange} value={editedClient.mobile} type="text" className='my-input my-2 form-control' name='mobile' />
       {/* <input type="text" className="form-control" /> */}
                {/* <PhoneInput name='mobile' 
    labels={ar} defaultCountry='SA' dir='ltr' className='phoneInput my-2' value={value}
    onChange={(value) => {
      // setPhoneValue(value);
      onChange={handleInputChange}
      // getData({ target: { name: 'mobile', value } });
    }}/> */}
      
    </div>
               
    
    {/* </div> */}
    <div className="col-md-6 pb-1">
        <label htmlFor="email"> الايميل  :</label>
      <input onChange={handleInputChange} value={editedClient.email} type="email" className='my-input my-2 form-control' name='email' />
      
      
    </div>
    <div className='col-md-6 pb-1 ul-box'>
                <label htmlFor=""> المدينة</label>
                <input onChange={handleInputChange} value={editedClient.city} type="text" className='my-input my-2 form-control' name='city' />

                {/* <input type="text" className="form-control" name='city'
                onChange={(e)=>{ 
                  const searchValue = e.target.value;
                  setSearch2(searchValue);
                  getData(e)
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
                  /> */}
                  {/* {showCitiesList2 && (
                    <ul  className='ul-cities' ref={citiesListRef2}>
                    {cities && cities.filter((item)=>{
                    return search2 === ''? item : item.toLowerCase().includes(search2.toLowerCase());
                    }).map((item,index) =>{
                     return(
                      <li key={index} name='city' 
                      onClick={(e)=>{ 
                        const selectedCity = e.target.innerText;
                        getData({ target: { name: 'city', value: selectedCity } });
                        document.querySelector('input[name="city"]').value = selectedCity;
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
            </div>
    {/* <div className="col-md-6 pb-3">
        <label htmlFor="state">المنطقة   :</label>
      <input onChange={handleInputChange} value={editedClient.name} type="text" className='my-input my-2 form-control' name='state' />
      
    </div> */}
    
    <div className="col-md-6 pb-1">
        <label htmlFor="address">العنوان   :</label>
      <input onChange={handleInputChange} value={editedClient.address} type="text" className='my-input my-2 form-control' name='address' />
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="street">الشارع   :</label>
      <input onChange={handleInputChange} value={editedClient.street} type="text" className='my-input my-2 form-control' name='street' />
      
    </div>
    <div className="col-md-6 pb-1">
        <label htmlFor="category">الفئة   :</label>
      <input onChange={handleInputChange} value={editedClient.category} type="text" className='my-input my-2 form-control' name='category' />
      
    </div>
    {/* <div className="col-md-6 pb-3">
        <label htmlFor="notes">ملاحظات   :</label>
        <textarea className="form-control my-2" name='notes' onChange={handleInputChange} value={editedClient.notes} cols="70" rows="2"></textarea>
               
    </div> */}
      
    
     
      <div className="text-center pt-1">
      <button className='btn btn-dark'>
      تعديل  
      </button>
      </div>
      </div>
        {/* <button type="submit">Save</button> */}
      </form>  
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
          إغلاق
          </Button>
        </Modal.Footer>
      </Modal>)}
    {showModal && (
        <div className='modal' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>إضافة credit </h5>
                <button
                  type='button'
                  className='close'
                  onClick={closeModal2}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='form-group'>
                  <label htmlFor='deposit'>السعة :</label>
                  <input
                    type='number'
                    className='form-control'
                    id='deposit'
                    value={depositAmount}
                    onChange={handleDepositChange}
                   
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={addDepositToUser}
                >
                  إضافة
                </button>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeModal2}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}     
    </>
  )
}
