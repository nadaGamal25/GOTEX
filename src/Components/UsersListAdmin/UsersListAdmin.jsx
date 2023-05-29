import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavAdmin from '../NavAdmin/NavAdmin'

export default function UsersListAdmin() {
    useEffect(()=>{
        getUsersListsAdmin()
      },[])
      const [usersListAdmin,setUsersListsAdmin]=useState([])
      const [showModal, setShowModal] = useState(false);
      const [depositAmount, setDepositAmount] = useState('');
      const [selectedUserId, setSelectedUserId] = useState(null);
    
      async function getUsersListsAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/admin/get-all-users',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const usersList = response.data.data;
          console.log(usersList)
          setUsersListsAdmin(usersList)
        } catch (error) {
          console.error(error);
        }
      }

      async function addDepositToUser() {
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/api/admin/add-deposit-to-user',
            {
              id: selectedUserId,
              deposit: depositAmount,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }

          );
          // Handle the response as per your requirement
          console.log(response.data);
          if (response.data.msg === 'ok') {
            closeModal();
            getUsersListsAdmin();
          }
        } catch (error) {
          console.error(error);
        }
      }

      const openModal = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true);
      };
    
      const closeModal = () => {
        setSelectedUserId(null);
        setShowModal(false);
        setDepositAmount('');
      };
    
      const handleDepositChange = (event) => {
        setDepositAmount(Number(event.target.value));
      };

      const [search, setSearch]= useState('')
      
  
  return (
    <>
    <NavAdmin/>
    <div className='p-5' id='content'>
    <div className="search-box p-4 mt-2 row g-1">
        <div className="col-md-2">
        <button className="btn"><i class="fa-solid fa-magnifying-glass"></i> بحث</button>
        </div>
        <div className="col-md-10">
        <input className='form-control' name="search" onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='الايميل' />
        </div>
      </div>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">اسم المستخدم </th>
            {/* <th scope="col">id_المسخدم</th> */}
            <th scope="col"> المحفظة </th>
            <th scope="col">الهاتف </th>
            <th scope="col">الايميل </th>
            <th scope="col">العنوان </th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {usersListAdmin.filter((item)=>{
          return search === ''? item : item.email.includes(search);
          }).map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                
                {/* {item._id?<td>{item._id}</td>:<td>_</td>} */}
                {item.name? <td>{item.name}</td> :<td>_</td>}
                {item.wallet?<td>{item.wallet}</td>:<td>0</td>}
                {item.mobile?<td>{item.mobile}</td>:<td>_</td>}
                {item.email?<td>{item.email}</td>:<td>_</td>}
                {item.address?<td>{item.address}</td>:<td>_</td>}
                <td>
                <button
                        className='sdd-deposite btn btn-success mt-2'
                        onClick={() => openModal(item._id)}
                      >
                        إضافة رصيد
                      </button>
              </td>
                
              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div>
    </div>
    {showModal && (
        <div className='modal' style={{ display: 'block' }}>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>إضافة رصيد</h5>
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
                  <label htmlFor='deposit'>الرصيد :</label>
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
      )}
    </>
  )
}
