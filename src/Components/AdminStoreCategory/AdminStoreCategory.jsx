import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'
import {Modal, Button } from 'react-bootstrap';

export default function AdminStoreCategory() {
    useEffect(()=>{
        getCategories()
      },[])
      const [Categories,setCategories]=useState([])
      async function getCategories() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/test/category');
          console.log(response)
          setCategories(response.data)
          
        } catch (error) {
          console.error(error);
        }
      }
      const [errorList, seterrorList]= useState([]); 

      const [newCategory,setNewCategory] =useState({
        name :'',
        description :'',        
      })

    
      const [error , setError]= useState('')
      const [isLoading, setisLoading] =useState(false)
      
      async function sendDataToApi() {
        try {
          const response = await axios.post(`https://dashboard.go-tex.net/test/category`,
           newCategory,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          }
        );
            console.log(response)
            setisLoading(false)
            window.alert("تمت اضافة الفئة بنجاح");
            getCategories()
          
        } catch (error) {
          console.log(error);
          setisLoading(false)
          alert(error.response.data.message)
        //   window.alert('somthing wrong');
        }
      }
      
    function submitForm(e){
      e.preventDefault();
      setisLoading(true)
      let validation = validateForm();
      console.log(validation);
      if(validation.error){
        setisLoading(false)
        seterrorList(validation.error.details)
    
      }else{
        sendDataToApi();
      }
    
    }
    
      function getNewCategory(e){
        let mynewCategory={...newCategory};
        mynewCategory[e.target.name]= e.target.value;
        setNewCategory(mynewCategory);
        console.log(mynewCategory);
      }
    
      function validateForm() {
        let schema = Joi.object({
          name: Joi.string().required(),
          description: Joi.string().required(),
        });
      
        return schema.validate(newCategory, { abortEarly: false });
      }

    //edit Data
const [isModalOpenData, setIsModalOpenData] = useState(false);
const [editedData, setEditedData] = useState(null);
const [eData, seteData] = useState(null);
const handleEditClickData = (data) => {
  seteData(data);
  setEditedData(
    {
      name: data?.name || '',
      description: data?.description || '',
     
      
  }
  )
  setIsModalOpenData(true);

  console.log(data)
  console.log(editedData)
  console.log("yes")
}
const closeModalData = () => {
  setIsModalOpenData(false);
  setEditedData(null)
};
const handleInputChangeData = (event) => {
  const { name, value } = event.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    })); 
};
const handleEditSubmitData = async (event) => {
  console.log(editedData)
  event.preventDefault();
  try {
    const response = await axios.put(
      `https://dashboard.go-tex.net/test/category/${eData._id}`,
      {...editedData},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      }
    );
    console.log(editedData)
    console.log(response);

    closeModalData();
    window.alert("تم التعديل بنجاح")
    getCategories()
    
  } catch (error) {
    console.error(error);
    alert(error.response.data.message)
  }
} 

  return (
    <>
     <div className='p-4 admin' id='content'>
    
    <div className=" py-3">
      <div className="edit-form">
        <div className="p-saee p-3">
          <h5 className="text-center mb-3">إضافة فئة جديدة   </h5>
          <form onSubmit={submitForm} action="">
            <label htmlFor="name">الاسم :</label>
            <input onChange={getNewCategory} type='string' className='my-input my-2 form-control' name='name' />
            {errorList.map((err,index)=>{
if(err.context.label ==='name'){
return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
}

})}
            <label htmlFor="description">الوصف  :</label>
            <textarea onChange={getNewCategory} type="string"  className='my-input my-2 form-control' name='description' />
            {errorList.map((err,index)=>{
if(err.context.label ==='description'){
return <div key={index} className="alert alert-danger my-2">يجب ملىء جميع البيانات</div>
}

})}


           <div className="text-center">
            <button className='btn btn-primary mt-3'>
            {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'إضافة فئة'}
           </button>
           </div>
          </form>
        </div>
      </div>
    </div>


    <div className="clients-table p-4 my-4">
<table className="table">
<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">اسم الفئة </th>
    <th scope="col">الوصف </th>
    <th></th>           
    <th></th>           
    
  </tr>
</thead>
<tbody>
  {Categories && Categories.map((item,index) =>(
    item !== null ? (
      <tr key={index}>
        <td>{index+1}</td>
        {item.name?<td>{item.name}</td>:<td>_</td>}
        {item.description?<td>{item.description}</td>:<td>_</td>}
        
<td>
<button
    className="btn btn-danger"
    onClick={() => {
      if (window.confirm('هل انت بالتأكيد تريد حذف هذه الفئة ؟')) {
        axios
          .delete(`https://dashboard.go-tex.net/test/category/${item._id}`, 
           {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          }
        )
          .then((response) => {
            if (response.status === 200) {
              console.log(response)
              getCategories();
                      window.alert('تم الحذف بنجاح')

            }
          })
          .catch((error) => {
            console.error(error);
                // window.alert(error.response.data.data.error)
          });
      }
    }}
  >
     حذف 
  </button>
</td>
<td>
<button className=" btn btn-secondary" onClick={()=>{handleEditClickData(item)}}>  تعديل </button>
</td>
      </tr>
    ): null
  )
  
  
  )}
</tbody>
</table>
</div>
    </div>
    {isModalOpenData && (<Modal show={isModalOpenData} onHide={closeModalData} >
        <Modal.Header >
          <Modal.Title>تعديل البيانات 
             </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <form onSubmit={handleEditSubmitData}>
        <div className="row">
                <div className="col-md-12 pb-1">
        <label htmlFor="">اسم الفئة     :</label>
      <input onChange={handleInputChangeData} value={editedData.name} type="text" className='my-input my-2 form-control' name='name' />
      
      
    </div>
    <div className="col-md-12 pb-1">
        <label htmlFor=""> الوصف    :</label>
      <input onChange={handleInputChangeData} value={editedData.description} type="text" className='my-input my-2 form-control' name='description' />
      
    </div>
   
    
  

    <div className="text-center pt-1">
      <button className='btn btn-primary'>
      تعديل  
      </button>
      </div>
      </div>
      </form>  
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalData}>
          إغلاق
          </Button>
        </Modal.Footer>
      </Modal>)} 
    </>
  )
}
