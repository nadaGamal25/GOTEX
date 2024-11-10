import axios from 'axios'
import React from 'react'
import { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function Cart(userData ) {
    const [cartData, setCartData] = useState([]);
    const userId =userData.userData.data.user.id;
  
    useEffect(() => {
      getCart();
    }, []);
  
    async function getCart() {
      try {
        const response = await axios.get(`https://dashboard.go-tex.net/test/cart`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        setCartData(response.data);
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    }
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
    
  
  
    // async function deleteFromCart(productId) {
    //   console.log(localStorage.getItem('userToken'))
    //   try {
    //     const response = await axios.delete('https://dashboard.go-tex.net/test/cart/remove', 
    //        { productId },{
    //         headers: {
    //           Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    //         },
    //       }
    //     );
    //     console.log(response)
    //     getCart();  // Refresh cart data
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  
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
      } catch (error) {
        console.error(error);
      }
    }
  
    return (
    <div className='p-4' id='content'>
        <div className="clients-heading pb-2 d-flex justify-content-between ">
        <h3><i class="fa-solid fa-cart-shopping"></i>
عربة التسوق</h3>


       
      </div>
        <div className="row pt-4">
          {/* Cart Items */}
          <div className="col-md-8">
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
          <div className="col-md-4">
            <div className="card pt-3">
              <div className="card-body">
                <h5 className="card-title fw-bold">إجمالي السعر</h5>
                <hr/>
                <p className="card-text fw-bold">{cartData.totalPrice} ريال</p>
                
               <Link to="/store" className="btn btn-outline-primary m-1">
                                    العودة للتسوق <i class="fa-solid fa-arrow-left-long"></i>
                                </Link>
                                <Link to="/checkout" className="btn btn-outline-success m-1">
                                <i class="fa-solid fa-check"></i>    اتمام الطلب  
                                </Link>             

                <button onClick={clearCart} className="btn btn-outline-danger m-1"> 
                <i class="fa-solid fa-xmark"></i> تفريغ العربة</button>
   
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
