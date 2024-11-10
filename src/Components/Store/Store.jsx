import axios from 'axios'
import React from 'react'
import { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function Store(userData) {
    useEffect(()=>{
        getCategories()
        getProducts()
        getCart()
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
          
          console.log("Total quantity:", totalQuantity);
        } catch (error) {
          console.error(error);
        }
      }
  return (
<>    
<div className='p-4' id='content'>
      <div className=" pb-2 d-flex justify-content-between ">
        <h3 className='fw-bold'><i class="fa-solid fa-layer-group"></i>
الفئات</h3>
        <Link to="/cart" className='btn fw-bold  btn-outline-primary'><i class="fa-solid fa-cart-shopping"></i>العربة 
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
                                <Link to="/cart" className="text-center link-primary mt-auto">
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
    </>  
    )
}
