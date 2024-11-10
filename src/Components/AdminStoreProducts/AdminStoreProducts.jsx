import React ,{ useState ,useEffect } from 'react'
import axios from 'axios'
import Joi from 'joi'
import {Modal, Button } from 'react-bootstrap';

export default function AdminStoreProducts() {
  useEffect(()=>{
    getCategories()
    getProducts()
  },[])
  const [Products,setProducts]=useState([])
  async function getProducts() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/test/products');
      console.log(response)
      setProducts(response.data)
      
    } catch (error) {
      console.error(error);
    }
  }

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


  const [error , setError]= useState('')
  const [isLoading, setisLoading] =useState(false)
  const [selectedID, setSelectedID] = useState(null);
  const [selectedFilesProduct, setSelectedFilesProduct] = useState([]);
  const [nameProduct, setNameProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState('');
  const [stockProduct, setStockProduct] = useState('');
  const [categoryProduct, setCategoryProduct] = useState('');
  const [descProduct, setDescProduct] = useState('');


  async function sendDataToApi() {
    console.log(selectedFilesProduct)
    const formData = new FormData();
    formData.append('name', nameProduct);
    formData.append('price', priceProduct);
    formData.append('stock', stockProduct);
    formData.append('category', categoryProduct);
    formData.append('description', descProduct);
    
    selectedFilesProduct.forEach((file) => {
      formData.append('images', file);
    });
  
    try {
      const response = await axios.post(
        `https://dashboard.go-tex.net/test/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );

      alert("تمت اضافة المنتج بنجاح")
      console.log(response);
      setSelectedFilesProduct([]);
      getProducts();
    } catch (error) {
      console.error(error);
      alert(error.response.data.msg);
    }
  }
  
  function handleFileChangeProduct(event) {
    const files = Array.from(event.target.files);
    setSelectedFilesProduct((prevFiles) => [...prevFiles, ...files]);
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
  price: data?.price || '',
  stock: data?.stock || '',
  category: data?.category.name || '',
 
  
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
  `https://dashboard.go-tex.net/test/products/${eData._id}`,
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
getProducts()

} catch (error) {
console.error(error);
alert(error.response.data.message)
}
} 

// const handleEditClickData = (data) => {
//   seteData(data);
//   setEditedData({
//     name: data?.name || '',
//     description: data?.description || '',
//     price: data?.price || '',
//     stock: data?.stock || '',
//     category: data?.category || '',
//     images: data?.images || [],
//   });
//   setIsModalOpenData(true);
// };

// const closeModalData = () => {
//   setIsModalOpenData(false);
//   setEditedData(null);
// };

// const handleInputChangeData = (event) => {
//   const { name, value } = event.target;
//   setEditedData((prev) => ({ ...prev, [name]: value }));
// };

// const handleFileChangeEdit = (event) => {
//   const files = Array.from(event.target.files);
//   setEditedData((prev) => ({
//     ...prev,
//     images: [...prev.images, ...files],
//   }));
// };

// const handleEditSubmitData = async (event) => {
//   console.log("Edited Data to Submit:", editedData);

//   event.preventDefault();
//   const formData = new FormData();
//   formData.append('name', editedData.name);
//   formData.append('description', editedData.description);
//   formData.append('price', editedData.price);
//   formData.append('stock', editedData.stock);
//   formData.append('category', editedData.category);
//   editedData.images.forEach((file) => formData.append('images', file));

//   try {
//     const response = await axios.put(`https://dashboard.go-tex.net/test/products/${eData._id}`, formData);
//     alert("تم التعديل بنجاح");
//     console.log(response)
//     closeModalData();
//     getProducts();
//   } catch (error) {
//     console.error(error);
//     alert(error.response.data.message);
//   }
// };

const [selectedImages, setSelectedImages] = useState([]);
      const [showModal, setShowModal] = useState(false);
      function openCarousel(images) {
        const formattedImages = images.map(img => img.replace('public', 'https://dashboard.go-tex.net/test'));
        setSelectedImages(formattedImages);
        setShowModal(true);
      }
  return (
    <>
    <div className='p-4 admin' id='content'>
   
   <div className=" py-3">
     <div className="edit-form">
       <div className="p-saee p-3">
         <h5 className="text-center mb-3">إضافة منتج جديدة   </h5>
         <form onSubmit={(e) => { e.preventDefault(); sendDataToApi(); }} action="">
           <label htmlFor="name">الاسم :</label>
           <input onChange={(e) => { setNameProduct(e.target.value); }} required type='string' className='my-input my-2 form-control' name='name' />
           <label htmlFor="description">الوصف :</label>
           <input onChange={(e) => { setDescProduct(e.target.value); }} required type='string' className='my-input my-2 form-control' name='description' />
          
           <label htmlFor="price">السعر :</label>
           <input onChange={(e) => { setPriceProduct(e.target.value); }} required type='number' step="0.001" className='my-input my-2 form-control' name='price' />
           <label htmlFor="stock">الكمية :</label>
           <input onChange={(e) => { setStockProduct(e.target.value); }} required type='number' className='my-input my-2 form-control' name='stock' />
           <label htmlFor="category">الفئة :</label>
           <select className='form-control my-2' name='category'
                    onChange={(e) => { setCategoryProduct(e.target.value); }} required >
            <option value=""> </option>
            {Categories && Categories.map((item, index) => {
    return <option key={index} value={item._id}>{item.name}</option>
  })}
            </select>
           <label htmlFor="">الصور </label>
        <input
          type="file"
          className="my-2 my-input form-control"
          name="images"
          multiple
          onChange={handleFileChangeProduct} required
        />
           


          <div className="text-center">
           <button className='btn btn-primary mt-3'>
           {isLoading == true?<i class="fa-solid fa-spinner fa-spin"></i>:'إضافة منتج'}
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
   <th scope="col"> المنتج </th>
   <th scope="col">الوصف </th>
   <th scope="col">السعر </th>
   <th scope="col">الكمية </th>
   <th scope="col">الفئة </th>
   <th scope="col">الصور </th>
   <th></th>           
   <th></th>           
   
 </tr>
</thead>
<tbody>
 {Products && Products.map((item,index) =>(
   item !== null ? (
     <tr key={index}>
       <td>{index+1}</td>
       {item.name?<td>{item.name}</td>:<td>_</td>}
       {item.description?<td>{item.description}</td>:<td>_</td>}
       {item.price?<td>{item.price}</td>:<td>_</td>}
       {item.stock?<td>{item.stock}</td>:<td>_</td>}
       {item.category.name?<td>{item.category.name}</td>:<td>_</td>}
       {item.images && item.images?.length !== 0 ?<td>
        <a className="text-primary" onClick={() => openCarousel(item.images)}>الصور</a>
       </td>:<td>_</td>}
       
<td>
<button
   className="btn btn-danger"
   onClick={() => {
     if (window.confirm('هل انت بالتأكيد تريد حذف هذه المنتج ؟')) {
       axios
         .delete(`https://dashboard.go-tex.net/test/products/${item._id}`, 
          {
           headers: {
             Authorization: `Bearer ${localStorage.getItem('userToken')}`,
           },
         }
       )
         .then((response) => {
           if (response.status === 200) {
             console.log(response)
             getProducts();
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
   {/* {isModalOpenData && (
        <Modal show={isModalOpenData} onHide={closeModalData}>
          <Modal.Header>
            <Modal.Title>تعديل البيانات</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditSubmitData}>
              <div className="row">
                <div className="col-md-12 pb-1">
                  <label htmlFor="name">اسم المنتج :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.name}
                    type="text"
                    className="my-input my-2 form-control"
                    name="name"
                  />
                </div>
                <div className="col-md-12 pb-1">
                  <label htmlFor="description">الوصف :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.description}
                    type="text"
                    className="my-input my-2 form-control"
                    name="description"
                  />
                </div>
                <div className="col-md-12 pb-1">
                  <label htmlFor="price">السعر :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.price}
                    type="number"
                    className="my-input my-2 form-control"
                    name="price"
                  />
                </div>
                <div className="col-md-12 pb-1">
                  <label htmlFor="stock">المخزون :</label>
                  <input
                    onChange={handleInputChangeData}
                    value={editedData.stock}
                    type="number"
                    className="my-input my-2 form-control"
                    name="stock"
                  />
                </div>
                <div className="col-md-12 pb-1">
                  <label htmlFor="category">الفئة :</label>
                  <select
                    className="form-control my-2"
                    name="category"
                    value={editedData.category}
                    onChange={handleInputChangeData}
                    required
                  >
                    <option value="">اختر الفئة</option>
                    {Categories &&
                      Categories.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-12 pb-1">
                  <label htmlFor="images">صور المنتج :</label>
                  <input
                    type="file"
                    className="form-control my-2"
                    multiple
                    onChange={handleFileChangeEdit}
                  />
                </div>
                <div className="text-center pt-1">
                  <button className="btn btn-primary">تعديل</button>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModalData}>
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
   )} */}
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
       <label htmlFor="">اسم المنتج     :</label>
     <input onChange={handleInputChangeData} value={editedData.name} type="text" className='my-input my-2 form-control' name='name' />
     
     
   </div>
   <div className="col-md-12 pb-1">
       <label htmlFor=""> الوصف    :</label>
     <input onChange={handleInputChangeData} value={editedData.description} type="text" className='my-input my-2 form-control' name='description' />
     
   </div>
   <div className="col-md-12 pb-1">
       <label htmlFor=""> السعر    :</label>
     <input onChange={handleInputChangeData} value={editedData.price} type="number" step="0.001" className='my-input my-2 form-control' name='price' />
     
   </div>
   <div className="col-md-12 pb-1">
       <label htmlFor=""> الكمية    :</label>
     <input onChange={handleInputChangeData} value={editedData.stock} type="number" className='my-input my-2 form-control' name='stock' />
     
   </div>
   <div className="col-md-12 pb-1">
                  <label htmlFor="category">الفئة :</label>
                  <select
                    className="form-control my-2"
                    name="category"
                    value={editedData.category.name}
                    onChange={handleInputChangeData}
                    required
                  >
                    <option value="">اختر الفئة</option>
                    {Categories &&
                      Categories.map((item, index) => (
                        <option key={index} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
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

     <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton >
          <Modal.Title> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
  {selectedImages.map((img, index)=>{
            return(
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={img} class="d-block w-100" alt="..."/>
              </div>
            )
        })}
   
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
          
        </Modal.Body>
      </Modal>
   </>
     )
}
