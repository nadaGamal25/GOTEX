import React, { useEffect, useState } from 'react'
import glt from '../../assets/glt.jpg'
import imile from '../../assets/imile.jpg'
import jonex from '../../assets/jonex.jpg'
import jt from '../../assets/jt.jpg'
import mkan from '../../assets/mkan.jpg'
import sae from '../../assets/sae.jpg'
import sms from '../../assets/sms.jpg'
import spl from '../../assets/spl.jpg'
import armx from '../../assets/armx.jpg'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Companies() {
  useEffect(()=>{
    getCompaniesDetailsOrders()
  },[])
  const [companiesDetails,setCompaniesDetails]=useState([])

  async function getCompaniesDetailsOrders() {
    try {
      const response = await axios.get('https://dashboard.go-tex.net/api/companies/get-all');
      const companiesPrices = response.data.data;
      // Process the orders as needed
      console.log(companiesPrices)
      setCompaniesDetails(companiesPrices)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
    <div className='p-5' id='content'>
      <div className="container">
        {/* <p>{companiesDetails[0].name}</p> */}
      <div className="clients-table p-4 my-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"> الشركة</th>
            <th scope="col">سعر المستخدم</th>
            <th scope="col">سعر المتاجر</th>
            <th scope="col">سعر الزيادة </th>
          </tr>
        </thead>
        <tbody>
          {companiesDetails.map((item,index) =>{
            return(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.userprice}</td>
                <td>{item.marketerprice}</td>
                <td>{item.kgprice}</td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
     </div>
        <div className="row g-4">
        <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={sae} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4>SAR 28.75</h4>
                <Link to="/saeeShipments" className="btn btn-choose">أختر</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={glt} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4>SAR 28.75</h4>
                <Link to="/gltOrders" className="btn btn-choose">أختر</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={armx} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4>SAR 28.75</h4>
                <Link to="/shipmentForms" className="btn btn-choose">أختر</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={imile} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4>SAR 28.75</h4>
                <Link to="/shipmentForms" className="btn btn-choose">أختر</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={jonex} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4>SAR 28.75</h4>
                <Link to="/shipmentForms" className="btn btn-choose">أختر</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={jt} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4>SAR 28.75</h4>
                <Link to="/shipmentForms" className="btn btn-choose">أختر</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={mkan} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4>SAR 28.75</h4>
                <Link to="/shipmentForms" className="btn btn-choose">أختر</Link>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={sms} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4>SAR 28.75</h4>
                <Link to="/shipmentForms" className="btn btn-choose">أختر</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={spl} alt="company" />
              </div>
              <div className="stars text-center mt-3">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              </div>
              <div className="d-flex pt-4 justify-content-between">
                <h4>SAR 28.75</h4>
                <Link to="/shipmentForms" className="btn btn-choose">أختر</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
      )
}
