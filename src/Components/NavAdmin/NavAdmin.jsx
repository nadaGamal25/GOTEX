import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';

export default function NavAdmin(setuserData) {
    let navigate= useNavigate();
    function logout(){
      localStorage.removeItem('userToken');
      setuserData(null);
      navigate('/')
    }
    const [sideToggle ,setSideToggle]=useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSideToggle(true);
      } else {
        setSideToggle(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    {/* <!-- start side navbar --> */}
    <section id="sidebar" className={sideToggle? "hide" :""}>
        <a href="#" class="brand">
            <img src={logo} alt='logo'/>
        </a>
        {/* <div>
        <p className='iclose'><i class="fa-solid fa-xmark"></i></p>
        </div> */}
        <ul class="side-menu top">
            <li>
                <a>
                    <i class="bx fa-solid fa-table-columns"></i>
                    <span class="text">لوحة تحكم الادمن </span>
                </a>
            </li>
            <li>
                <Link to="/companiesAdmin">
                    <i class="fa-solid fa-truck-fast bx"></i>
                    <span class="text">شركات الشحن</span>
                </Link>
            </li>
            <li>
                <Link to="/shipmentsAdmin">
                <i class="fa-solid fa-box-open bx"></i>
                    <span class="text">الشحنات </span>
                </Link>
            </li>
            
            <li>
                <Link to="/userListAdmin">
                    <i class="fa-solid fa-users bx"></i>
                    <span class="text">المستخدمين</span>
                </Link>
            </li>
            <li>
                <Link to="/InvitedWaiting">
                <i class="fa-solid fa-clipboard-list bx"></i>
                    <span class="text">قائمة انتظار المدعويين</span>
                </Link>
            </li>
            <li>
                <Link to="/daftraStaff">
                <i class="bx fa-solid fa-clipboard-user"></i>
                    <span class="text">الموظفين  </span>
                </Link>
            </li>
            <li>
                <Link to="/clientsAdmin">
                <i class="fa-solid fa-users bx"></i>
                <span class="text">العملاء</span>
                </Link>
            </li>
            {/* <li>
                <Link to="/addDepositAdmin">
                <i class="fa-solid fa-dollar-sign bx"></i>
                    <span class="text">اضافة رصيد</span>
                </Link>
            </li> */}
           
        </ul>
        <ul class="side-menu">
            
            <li>
                <Link onClick={logout} class="logout" to='/'>
                <i class="fa-solid fa-right-from-bracket bx"></i>
                    <span class="text">تسجيل الخروج</span>
                </Link>
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
        
    </>  )
}
