import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function GenerateLinkPayment(userData) {
    const [itemClientId, setItemClientId] = useState('');
    const [userId, setUserId] = useState('');
    const [searchClients, setSearchClients]= useState('')

  const [showClientsList, setClientsList] = useState(false);
  const openClientsList = () => {
    setClientsList(true);
  };

  const closeClientsList = () => {
    setClientsList(false);
  };
  useEffect(()=>{
    getClientsList()
    setUserId(userData.userData.data.user.id)
  },[])
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
    <>
    <div className="p-5" id='content'>
      <div className="bg-light">
    <div className="search-box px-4 py-5 mt-2 mb-3 ">
        <div className="row g-1">
           <div className="col-md-2">
           <button className="btn"><i class="fa-solid fa-magnifying-glass"></i> اختيار عميل</button>
           </div>
           <div className="col-md-10">
           <input type="search" className="form-control ic" name='client' placeholder='الاسم'
                   onChange={(e)=>{ 
                     const searchValue = e.target.value;
                     setSearchClients(searchValue);
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
                           
                           setItemClientId(item._id);
                           
                           
                          
                           document.querySelector('input[name="client"]').value = selectedCity;
                           // getOrderData(e)
                           closeClientsList();
                       }}
                         >
                           {item.name} , <br/> {item.mobile} , {item.city}
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
           
         </div>
         <div className="text-center py-5">
            <button className="btn btn-primary">
            إنشاء رابط للعميل
            </button>
            <p>http://localhost:3000/formPayment/{userId}/{itemClientId}</p>
           </div>
           </div>
    </div>
    </>
  )
}
