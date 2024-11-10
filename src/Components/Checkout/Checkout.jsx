import axios from 'axios'
import React from 'react'
import { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function Checkout(userData) {
    const [cartData, setCartData] = useState([]);
    const userId =userData.userData.data.user.id;
    const [shippingAddress, setShippingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cc");
  
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

    async function createOrder(event) {
        event.preventDefault();
            const items = cartData.items.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        }));
            const orderData = {
          user: userId,
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

      async function clearCart() {
        try {
          await axios.delete('https://dashboard.go-tex.net/test/cart/clear', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          setCartData([]);  // Clear local cart data
        } catch (error) {
          console.error(error);
        }
      }
  return (
    <>
     <div className='p-4' id='content'>
        <div className="clients-heading pb-2 d-flex justify-content-between ">
        <h3><i class="fa-regular fa-circle-check"></i>
اتمام الطلب </h3>


       
      </div>
        <div className="row pt-4">
          {/* Cart Items */}
          <div className="col-md-6">
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
    <Link to="/store" className="btn btn-outline-primary m-1">
                                    العودة للتسوق <i class="fa-solid fa-arrow-left-long"></i>
                                </Link>
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
  
          <div className="col-md-6 ">
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
        </div>
      </div>
    </>
  )
}
