import axios from 'axios'
import React, { useRef } from 'react'
import { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Modal, Button } from 'react-bootstrap';

export default function MarketerStore(userData) {
    useEffect(()=>{
        getCategories()
        getProducts()
        getCart()
        getClientsList()
      },[])
      const [products,setProducts]=useState([])
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
      async function getProductsByCategory(id) {
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/test/products/get-products/${id}`);
          console.log(response)
          setProducts(response.data)
          
        } catch (error) {
          console.error(error);
        }
      }
      const [cartItems, setCartItems] = useState(new Set());

      async function addToCart(productId) {
          try {
              const response = await axios.post('https://dashboard.go-tex.net/test/cart/add', {
                  "userId": userData.userData.data.user.id,
                  "productId": productId,
                  "quantity": 1
              },{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
              });
              console.log(response);
              getCart()
              // Update the cartItems state to include the new product
              setCartItems(prevItems => new Set(prevItems).add(productId));
          } catch (error) {
              console.error(error);
          }
      }
      const [cartData, setCartData] = useState([]);
      const [cartNums, setCartNums] = useState(0);
      const userId =userData.userData.data.user.id;
      async function getCart() {
        try {
          const response = await axios.get(`https://dashboard.go-tex.net/test/cart`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const cartItems = response.data.items || [];
    
          // Calculate the total quantity of all products in the cart
          const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
          setCartNums(totalQuantity);
          setCartData(response.data);
          console.log(response)
          console.log("Total quantity:", totalQuantity);
        } catch (error) {
          console.error(error);
        }
      }

      const [searchClients, setSearchClients]= useState('')

      const [showClientsList, setClientsList] = useState(false);
      const openClientsList = () => {
        setClientsList(true);
      };
    
      const closeClientsList = () => {
        setClientsList(false);
      };
      const [itemClientId, setItemClientId] = useState('');
      const[clients,setClients]=useState([])
      const [clientWallet, setClientWallet] = useState('');
      const [clientCredit, setClientCredit] = useState('');
      const [clientCreditStatus, setClientCreditStatus] = useState('');
      const [isWallet,setIsWallet]=useState(false);
      const [isClient,setIsClient]=useState(false);
      async function getClientsList() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/test/clients/get-all-clients',
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


      //cart    
     
      async function deleteFromCart(id) {
        console.log(localStorage.getItem('userToken'));
        try {
          const response = await axios.delete('https://dashboard.go-tex.net/test/cart/remove', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
            data: {
              productId: id,
            },
          });
          console.log(response);
          getCart(); // Refresh cart data
        } catch (error) {
          console.error(error);
        }
      }
      async function updateCart(productId, quantity) {
        try {
          const response = await axios.put('https://dashboard.go-tex.net/test/cart/update', {
            productId,
            quantity
          },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          console.log(response)
          getCart();  // Refresh cart data
        } catch (error) {
          console.error(error);
        }
      }
    
      async function clearCart() {
        try {
          const response = await axios.delete('https://dashboard.go-tex.net/test/cart/clear', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          console.log(response)
          setCartData([]);  // Clear local cart data
          getCart()
        } catch (error) {
          console.error(error);
        }
      }
      const [showModalCart, setShowModalCart] = useState(false);
  const openModalCart = () => {
    setShowModalCart(true);
  };

  const closeModalCart = () => {
    setShowModalCart(false);
  };
      //checkout
      const [shippingAddress, setShippingAddress] = useState("");
      const [paymentMethod, setPaymentMethod] = useState("cc");
  
      async function createOrder(event) {
          event.preventDefault();
              const items = cartData.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity
          }));
              const orderData = {
            clientId: itemClientId,
            items,
            shippingAddress,
            paymentMethod,
          };
      
          try {
            const response = await axios.post("https://dashboard.go-tex.net/test/store-orders", orderData,{
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            });
            console.log( response);
            alert("تم انشاء طلبك بنجاح");
            clearCart()
          } catch (error) {
            console.error("Error:", error);
          }
        }
  
       
        const [showModalCheckout, setShowModalCheckout] = useState(false);
        const openModalCheckout = () => {
          setShowModalCheckout(true);
        };
      
        const closeModalCheckout = () => {
          setShowModalCheckout(false);
        };
  return (
<>    
<div className='p-4' id='content'> 
{ userData.userData.data.user.rolle === "marketer"?(
           <div className="search-box p-4  mb-1 row g-1">
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
                         <li key={index} name='' 
                         onClick={(e)=>{ 
                           const selected = e.target.innerText;
                           
                       setItemClientId(item._id);
                       setIsClient(true)
                       setIsWallet(true)
                       setClientWallet(item.wallet)
                          {item.credit && item.credit.status== 'accepted'? (
                           <>
                             {setClientCredit(item.credit.limet)}
                             {setClientCreditStatus(item.credit.status)}
                           </>
                         ):(
                            <>
                            {setClientCredit(0)}
                            </>
                         )}
                      document.querySelector('input[name="client"]').value = selected;
                           closeClientsList();
                       }}
                         >
                           {item.name} , {item.company} , {item.email} , {item.mobile} , {item.city} , {item.address}
                        </li>
                        </>
                        )
                       }
                       )}
                       <li onClick={(e)=>{ 
                           const selected = e.target.innerText;
                           document.querySelector('input[name="client"]').value = selected;
                           closeClientsList();
                       }}>غير ذلك</li>
                       </ul>
                     )}
                   
                   
           </div>
         </div>
          ): null}
          { userData.userData.data.user.rolle === "marketer" &&  isWallet  ?(
                    <div className="gray-box  mb-3">
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="">محفظة العميل : </label>
                          <span className='fw-bold text-primary px-1'>{clientWallet}</span>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="">credit_العميل : </label>
                          {clientCreditStatus && clientCreditStatus == 'accepted'?
                          <span className='fw-bold text-primary px-1'>{clientCredit}</span>:
                          <span className='fw-bold text-primary px-1'>0</span>}
                        </div>
                      </div>
                    </div>
                    ):
                    null}
      <div className=" pb-2 d-flex justify-content-between ">
        <h3 className='fw-bold'><i class="fa-solid fa-layer-group"></i>
الفئات</h3>
        <Link to="#" onClick={openModalCart} className='btn fw-bold  btn-outline-primary'><i class="fa-solid fa-cart-shopping"></i>العربة 
       [<span className=''>{cartNums}</span>]
          </Link>
      </div>
      <div className="row">
        {Categories && Categories.map((category, index) => (
            <div key={index} className="col-md-3 col-sm-6 col-12 p-2">
                <div className="card bg-orange h-100">
                    <div className="card-body ">
                        <h5 className="card-title fw-bold">
                            {/* <i class="fa-solid fa-backward"></i> */}
                             {category.name}</h5>
                        <p className="card-text text-secondary">{category.description}</p>
                        <button onClick={()=>{ getProductsByCategory(category._id)}} className="btn btn-orange">عرض</button>

                    </div>
                </div>
                </div>
        ))}
      </div>
      <div className="clients-heading py-2 d-flex justify-content-between ">
        <h3><i class="fa-solid fa-layer-group"></i>
المنتجات</h3>
        
      </div>
      <div className="row">
      {products && products.map((product, index) => (
    <div key={index} className="col-md-3 col-sm-6 col-12 mb-4">
        <div className="card bg-product h-100">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold text-center">{product.name}</h5>

                <div className="text-center mb-3">
                    {product.images && product.images.length > 0 ? (
                        <img src={product.images[0].replace('public', 'https://dashboard.go-tex.net/test')} alt={product.name} className="img-fluid rounded" style={{ height: '120px', objectFit: 'cover' }} />
                    ) : (
                        <p>No Image Available</p>
                    )}
                </div>

                <p className="card-text text-secondary">{product.description}</p>

                <p className="text-primary fw-bold"> {product.price} ريال</p>

                <p className="text-warning">
                    {/* تقييم:  */}
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <span className="text-success"> ({product.stock})</span>
                    </p>
                    {cartItems.has(product._id) ? (
                                <Link onClick={openModalCart} className="text-center link-primary mt-auto">
                                    رؤية العربة <i class="fa-solid fa-arrow-left-long"></i>
                                </Link>
                            ) : (
                               null
                            )}
                {product.stock > 0 ? (
                     <Link onClick={() => addToCart(product._id)} className="btn btn-outline-primary mt-auto">
                     <i className="fa-solid fa-cart-shopping"></i> اضافة للعربة
                 </Link>
                    // <p className="text-success">الكمية المتاحة: {product.stock}</p>
                ) : (
                    <p className="text-danger text-center fw-bold">الكمية نفذت</p>
                )}

              
            </div>
        </div>
    </div>
))}

      </div>
     
     
    </div>  
    <Modal show={showModalCart} onHide={closeModalCart}>
        <Modal.Header >
          <Modal.Title><i class="fa-solid fa-cart-shopping"></i>
          عربة التسوق </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Cart Items */}
          <div className="">
          <div className="clients-table p-4 my-4">
<table className="table">
<thead>
  <tr>
    <th scope="col"></th>
    <th scope="col">المنتج  </th>
    <th scope="col"> </th>
    <th scope="col">الكمية </th>
             
    
  </tr>
</thead>
<tbody>
  {cartData.items && cartData.items.length > 0  ? (
              cartData.items.filter(item=> item.product !=null).map((item, index) => (
     
      <tr key={index}>
        <td>
           <a onClick={() => deleteFromCart(item.product._id)} className="">
           <i class="fa-regular fw-bold fa-circle-xmark text-secondary"></i>
            </a>
        </td>
        {item.product !=null  && item.product?.images && item.product?.images.length > 0 ? (
            <td>
    <img 
        src={item.product.images[0].replace('public', 'https://dashboard.go-tex.net/test')} 
        alt={item.product.name} 
        className="img-fluid rounded " 
        style={{ maxHeight: '60px', objectFit: 'cover' }} 
    />
    </td>
) : (
    <td className="text-center text-muted">No Image Available</td>
)}               
        {item.product?.name?<td>{item.product.name} <br/> 
        <span dir='ltr' className='fw-bold cart-price'>{item.product.price} ريال</span>
         {/* <span dir='ltr' className='text-muted'> {item.quantity} x </span>   */}
         
         </td>:<td>_</td>}
        {item.quantity?<td>
            <input 
                            type="number" 
                            min="1" 
                            value={item.quantity} 
                            onChange={(e) => updateCart(item.product._id, e.target.value)} 
                            className="form-control d-inline-block mx-2" 
                            style={{ width: '60px' }} 
                          />
        </td>:<td>_</td>}
        


      </tr>
    
  )  ) ): (
    <p className="text-center fw-bold">العربة فارغة</p>
  )}
  
  
  
</tbody>
</table>


</div>

          </div>
          {/* Total Price Box */}
          <div className="">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fw-bold">إجمالي السعر</h5>
                <hr/>
                <p className="card-text fw-bold">{cartData.totalPrice} ريال</p>
                
               
                            <Link to="#" onClick={openModalCheckout} className="btn btn-outline-success m-1">
                                <i class="fa-solid fa-check"></i>    اتمام الطلب  
                                </Link>             

                <button onClick={clearCart} className="btn btn-outline-danger m-1"> 
                <i class="fa-solid fa-xmark"></i> تفريغ العربة</button>
   
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalCart}>
          إغلاق
          </Button>
          {/* Additional buttons or actions can be added here */}
        </Modal.Footer>
      </Modal>
      <Modal show={showModalCheckout} onHide={closeModalCheckout}>
        <Modal.Header >
          <Modal.Title><i class="fa-regular fa-circle-check"></i>
          اتمام الطلب </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="">
          <div className="clients-table p-4 my-4">
<table className="table bg-light">
<thead>
  <tr>
    <th scope="col">المنتج  </th>
    <th scope="col"> السعر</th>
    <th scope="col">الكمية </th>
             
    
  </tr>
</thead>
<tbody>
  {cartData.items && cartData.items.length > 0 ? (
              cartData.items.filter(item=> item.product !=null).map((item, index) => (
     
      <tr key={index}>
        
                 
        {item.product.name?<td>{item.product.name} </td>:<td>_</td>}
        {item.product.price?<td>{item.product.price} </td>:<td>_</td>}
        {item.quantity?<td>{item.quantity} </td>:<td>_</td>}
        
        


      </tr>
    
  )  ) ): (
    null
  )}
  
  
  
</tbody>
</table>


</div>
<div>
    <p className="fw-bold py-2 px-4 bg-light">
 الإجمالي : 
    <span className='text-success'>  {cartData.totalPrice} ريال </span>
    </p>
</div>

          </div>
          <div className="">
            <div className="p-saee p-3">
            <form onSubmit={createOrder}>
              <div className="mb-3">
                <label htmlFor="shippingAddress" className="form-label">عنوان الشحن : <span className="star-requered">*</span></label>
                <textarea
                  id="shippingAddress"
                  className="form-control"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">طريقة الدفع : <span className="star-requered">*</span></label>
                <div>
                  <input
                    type="radio"
                    id="cc"
                    name="paymentMethod"
                    value="cc"
                    checked={paymentMethod === "cc"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="cc" className="ms-2">الدفع اونلاين </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="cod" className="ms-2">الدفع عند الاستلام</label>
                </div>
              </div>
              <button type="submit" className="btn btn-success">إتمام الطلب</button>
            </form>
            </div>
          
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModalCheckout}>
          إغلاق
          </Button>
          {/* Additional buttons or actions can be added here */}
        </Modal.Footer>
      </Modal>
    </>  
    )
}
