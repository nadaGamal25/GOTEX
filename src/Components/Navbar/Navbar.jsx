import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'

export default function Navbar() {
  const menuBar =document.querySelector('nav .fa-bars');
const sideBar = document.getElementById('sidebar');

  // function sideToggle(){
  //   sideBar.classList.toggle('hide');
  // };
  const [sideToggle ,setSideToggle]=useState(false);
  return (
    <>
    {/* <!-- start side navbar --> */}
    <section id="sidebar" className={sideToggle? "hide" :""}>
        <a href="#" class="brand">
            <img src={logo} alt='logo'/>
        </a>
        <ul class="side-menu top">
            <li class="active">
                <a href="#">
                    <i class="bx fa-solid fa-table-columns"></i>
                    <span class="text">لوحة التحكم</span>
                </a>
            </li>
            <li>
                <a href="#">
                <i class="fa-solid fa-sack-dollar bx"></i>
                <span class="text">المحفظة(ر.س0)</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa-solid fa-users bx"></i>
                    <span class="text">العملاء</span>
                </a>
            </li>
            <li>
                <a href="#">
                <i class="fa-solid fa-box-open bx"></i>
                    <span class="text">الشحنات</span>
                </a>
            </li>
            <li>
                <Link to="/companies">
                    <i class="fa-solid fa-truck-fast bx"></i>
                    <span class="text">شركات الشحن</span>
                </Link>
            </li>
        </ul>
        <ul class="side-menu">
            
            <li>
                <a href="#" class="logout">
                <i class="fa-solid fa-right-from-bracket bx"></i>
                    <span class="text">تسجيل الخروج</span>
                </a>
            </li>
        </ul>
    </section>
    
        {/* <!-- end side navbar --> */}
    <section id="content">
        {/* <!--start navbar --> */}
        <nav class="d-flex align-items-center">
            <i class="fa-solid fa-bars" onClick={()=> setSideToggle(!sideToggle)}></i>
            
            
            {/* <a href="#" class="profile">
                <img src="image/profile.jpg" alt="profile image"/>
            </a> */}
        </nav>
        {/* <!--end navbar --> */}
        </section>
        
    </>
  )
}
