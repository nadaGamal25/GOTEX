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
            'https://dashboard.go-tex.net/api/daftra/markter-add-credit-for-client',
            {
              client_id: selectedUserId,
              credit_limit: depositAmount,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }

          );
          // Handle the response as per your requirement
          console.log(response.data);
          window.alert(response.data.msg)
          // if (response.data.msg === 'ok') {
            closeModal();
            // getUsersListsAdmin();
          // }
        } catch (error) {
          console.error(error);
        }
      }
      // const openModal = (userId) => {
      //   setSelectedUserId(userId);
      //   setShowModal(true);
      // };
    
      // const closeModal = () => {
      //   setSelectedUserId(null);
      //   setShowModal(false);
      //   setDepositAmount('');
      // };
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
  const handleEditClick = (client) => {
    setIsModalOpen(true);
    setEditedClient(client);
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
        event.preventDefault();
        try {
          const response = await axios.post(
            `https://dashboard.go-tex.net/api/clients/edit-client/${editedClient._id}`,
            editedClient,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          console.log(response);
          console.log(response.data.msg);
    
          closeModal();
          window.alert("تم تعديل بيانات العميل بنجاح")
          
        } catch (error) {
          console.error(error);
        }
      }     
      const [value ,setPhoneValue]=useState()

  return (
    <>
    <div className='p-5' id='content'>
    <div className="search-box p-4 mt-2 row g-1">
        <div className="col-md-2">
        <button className="btn"><i class="fa-solid fa-magnifying-glass"></i> بحث</button>
        </div>
        <div className="col-md-10">
        <input className='form-control' name="search" onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='الإيميل' />
        </div>
      </div>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
          {/* <th scope="col"></th>             */}
          <th scope="col">#</th>
            <th scope="col">العميل </th>
            <th scope="col">الشركة </th>
            <th scope="col">الهاتف </th>
            <th scope="col">الايميل </th>
            <th scope="col">المدينة </th>
            <th scope="col">العنوان </th>
            <th scope="col">الشارع  </th>
            <th scope="col">الفئة </th>
            <th scope="col"> credit  </th>
            <th scope="col">الشحنات </th>
            <th scope="col">ملاحظات </th>
           
          </tr>
        </thead>
        <tbody>
          {clients && clients.filter((item)=>{
          return search === ''? item : item.email.includes(search);
          }).map((item,index) =>{
            return(
              <tr key={index}>
                {/* <td>
  <button className="btn btn-dark" onClick={() => handleEditClick(item)}>تعديل</button>
</td> */}

                <td>{index+1}</td>
                {item.name?<td>{item.name}</td>:<td>_</td>}
                {item.company?<td>{item.company}</td>:<td>_</td>}
                {item.mobile?<td>{item.mobile} </td>:<td>_</td>}
                {item.email?<td>{item.email}</td>:<td>_</td>}
                {item.city?<td>{item.city}</td>:<td>_</td>}
                {item.address?<td>{item.address}</td>:<td>_</td>}
                {item.street?<td>{item.street}</td>:<td>_</td>}
                {item.category?<td>{item.category}</td>:<td>_</td>}
                {item.wallet?<td>{item.wallet}</td>:<td>_</td>}
                {item.orders ? (
          <td>
            {item.orders.map((order) => (
              <span key={order.id}>{order.company}, </span>
            ))}
          </td>
        ) : (
          <td>_</td>
        )}
                 {item.notes?<td>{item.notes}</td>:<td>_</td>}

                
              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div>
         </div>
         
         {/* <EditClientModal isOpen={isModalOpen} closeModal={closeModal} client={editedClient} /> */}
{editedClient && (<Modal show={isModalOpen} onHide={closeModal} >
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
      <input onChange={handleInputChange} value={editedClient.name} type="text" className='my-input my-2 form-control' name='name' />
      
      
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
      <input onChange={handleInputChange} value={editedClient.email} type="text" className='my-input my-2 form-control' name='email' />
      
      
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
    {/* {showModal && (
        <div className='modal' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>إضافة حد ائتمانى</h5>
                <button
                  type='button'
                  className='close'
                  onClick={closeModal}
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
                  onClick={closeModal}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}      */}
    </>
  )
}
