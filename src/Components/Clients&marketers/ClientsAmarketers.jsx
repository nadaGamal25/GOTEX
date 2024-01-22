import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function ClientsAmarketers() {
    useEffect(()=>{
        getMarketerssAdmin()
      },[])
      const [marketersAdmin,setMarketersAdmin]=useState([])
     
    async function getMarketerssAdmin() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/admin/get-all-clients',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const clients = response.data.data;
          console.log(clients)
          setMarketersAdmin(clients)
        } catch (error) {
          console.error(error);
        }
      }
      const [search, setSearch]= useState('')
      async function connectMarketerWithClient() {
        try {
          const response = await axios.post(
            'https://dashboard.go-tex.net/api/clients/add-client-code',
            {
                clientId: clientid,
                marketerCode: marketerid,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
              },
            }
          );
          window.alert('تم ربط المسوق بالمتجر بنجاح')
          console.log(response.data);
      
          closeModal4();
        } catch (error) {
          console.error(error);
          alert(error.response.data.msg)
        }
      }
      const [clientid, setClientid] = useState('');
      const [marketerid, setMarketerid] = useState('');
      
      const handleMarketeridChange = (event) => {
        setMarketerid(event.target.value);
      };
      const [showModal4, setShowModal4] = useState(false);

const openModal4 = () => {
  setShowModal4(true);
};

const closeModal4 = () => {
  setShowModal4(false);
  setClientid('');
  setMarketerid('');
};


  return (
<>
    <div className='p-5' id='content'>
    <div className="search-box p-4 mt-2 row g-1">
        <div className="col-md-2">
        <button className="btn"><i class="fa-solid fa-magnifying-glass"></i> بحث</button>
        </div>
        <div className="col-md-10">
        <input className='form-control' name="search" onChange={(e)=> setSearch(e.target.value)} type="search" placeholder='الاسم' />
        </div>
      </div>
    <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">الاسم </th>
            {/* <th scope="col">الشركة </th> */}
            <th scope="col">الهاتف </th>
            {/* <th scope="col">الايميل </th> */}
            <th scope="col">المدينة </th>
            <th scope="col">العنوان </th>
            <th scope="col">الفروع  </th>
            <th scope="col"> </th>
            
            
          </tr>
        </thead>
        <tbody>
          {marketersAdmin && marketersAdmin.filter((item)=>{
          return search === ''? item : item.name.includes(search);
          }).map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                {item?<td>{item.name}</td>:<td>_</td>}
                {/* {item?<td>{item.company}</td>:<td>_</td>} */}
                {item?<td>{item.mobile}</td>:<td>_</td>}
                {/* {item.email?<td>{item.email}</td>:<td>_</td>} */}
                {item.code?<td>{item.city}</td>:<td>_</td>}
                {item?<td>{item.address}</td>:<td>_</td>}
                {item.branches ? (
          <td>
            {item.branches.map((branche) => (
              <span key={branche._id}>{branche.city}  {branche.address} & </span>
            ))}
          </td>
        ) : (
          <td>_</td>
        )}
              <td>
              <button className="btn btn-dark"
                onClick={() => {
                  setClientid(item._id); 
                  setMarketerid(''); 
                  setShowModal4(true); 
                }}>
                  الربط بالمسوق
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
         {showModal4 && (
  <div className="modal" style={{ display: 'block' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">ربط المسوّق بالمتجر</h5>
          <button type="button" className="close" onClick={closeModal4}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="">كود المسوق:</label>
            <input
              type="text"
              className="form-control"
              value={marketerid}
              onChange={handleMarketeridChange}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="marketerid">معرّف المسوّق:</label>
            <input
              type="text"
              className="form-control"
              id="marketerid"
              value={marketerid}
              readOnly
            />
          </div> */}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={connectMarketerWithClient}
          >
            ربط
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeModal4}
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  </div>
)}
         </>  )
}
