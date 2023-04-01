import React from 'react'
import glt from '../../assets/glt.jpg'
import imile from '../../assets/imile.jpg'
import jonex from '../../assets/jonex.jpg'
import jt from '../../assets/jt.jpg'
import mkan from '../../assets/mkan.jpg'
import sae from '../../assets/sae.jpg'
import sms from '../../assets/sms.jpg'
import spl from '../../assets/spl.jpg'
import armx from '../../assets/armx.jpg'

export default function Companies() {
  return (
    <>
    <div className='p-5' id='content'>
      <div className="container">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={glt} alt="company" />
              </div>
              <div className="d-flex pt-5 justify-content-between">
                <h4>SAR 28.75</h4>
                <button className="btn btn-choose">أختر</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={armx} alt="company" />
              </div>
              <div className="d-flex pt-5 justify-content-between">
                <h4>SAR 28.75</h4>
                <button className="btn btn-choose">أختر</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={imile} alt="company" />
              </div>
              <div className="d-flex pt-5 justify-content-between">
                <h4>SAR 28.75</h4>
                <button className="btn btn-choose">أختر</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={jonex} alt="company" />
              </div>
              <div className="d-flex pt-5 justify-content-between">
                <h4>SAR 28.75</h4>
                <button className="btn btn-choose">أختر</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={jt} alt="company" />
              </div>
              <div className="d-flex pt-5 justify-content-between">
                <h4>SAR 28.75</h4>
                <button className="btn btn-choose">أختر</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={mkan} alt="company" />
              </div>
              <div className="d-flex pt-5 justify-content-between">
                <h4>SAR 28.75</h4>
                <button className="btn btn-choose">أختر</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={sae} alt="company" />
              </div>
              <div className="d-flex pt-5 justify-content-between">
                <h4>SAR 28.75</h4>
                <button className="btn btn-choose">أختر</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={sms} alt="company" />
              </div>
              <div className="d-flex pt-5 justify-content-between">
                <h4>SAR 28.75</h4>
                <button className="btn btn-choose">أختر</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="company">
              <div className="text-center">
              <img src={spl} alt="company" />
              </div>
              <div className="d-flex pt-5 justify-content-between">
                <h4>SAR 28.75</h4>
                <button className="btn btn-choose">أختر</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
      )
}
