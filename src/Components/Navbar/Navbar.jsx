import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import axios from 'axios';

export default function Navbar({userData ,logout}) {

  const [sideToggle ,setSideToggle]=useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSideToggle(true);
      } else {
        setSideToggle(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(()=>{
    getUserBalance()
    console.log(userData)
  },[])

      const [userBalance,setUserBalance]=useState('')
      async function getUserBalance() {
        try {
          const response = await axios.get('https://dashboard.go-tex.net/api/user/get-user-balance',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
          });
          const balance = response.data.data;
          console.log(balance)
          console.log(userData)
          // console.log(userData.data.user.rolle)
          setUserBalance(balance)
        } catch (error) {
          console.error(error);
        }
      }
      useEffect(() => {
        const handleClick = (e) => {
          const allSideMenu = document.querySelectorAll('.side-menu.top li a');
          const li = e.currentTarget.parentElement;
    
          allSideMenu.forEach((i) => {
            i.parentElement.classList.remove('active');
          });
          
          li.classList.add('active');
        };
    
        const allSideMenu = document.querySelectorAll('.side-menu.top li a');
        allSideMenu.forEach((item) => {
          item.addEventListener('click', handleClick);
        });
    
        return () => {
          allSideMenu.forEach((item) => {
            item.removeEventListener('click', handleClick);
          });
        };
      }, []);
      function waitingAlert(){
        window.alert('سوف يكون متاح قريباً ')
      }
  return (
    <>
    {/* <!-- start side navbar --> */}
    <section id="sidebar" className={sideToggle? "hide" :""}>
        <a href="#" class="brand">
            <img src={logo} alt='logo'/>
        </a>
       
        <ul class="side-menu top">
            {/* <li class="">
                <a href="#">
                    <i class="bx fa-solid fa-table-columns"></i>
                    <span class="text">لوحة التحكم</span>
                </a>
            </li> */}
            <li className='active'>
                <Link  to="/companies">
                    <i class="fa-solid fa-truck-fast bx"></i>
                    <span class="text">شركات الشحن</span>
                </Link>
            </li>
            <li>
                <Link to="/payment">
                <i class="fa-solid fa-sack-dollar bx"></i>
                <span class="text">المحفظة
                ({userBalance} ر.س)
                </span>
                </Link>
            </li>
            {/* <li>
                <Link to="/clients">
                    <i class="fa-solid fa-users bx"></i>
                    <span class="text">العملاء</span>
                </Link>
            </li> */}
            <li>
                <Link to="shipments">
                <i class="fa-solid fa-box-open bx"></i>
                    <span class="text">الشحنات</span>
                </Link>
            </li>
            
            {userData?.data?.user?.rolle === "marketer"?(
              <li className=''>
              <Link  to="/inviteLink">
              <i class="fa-solid fa-link bx"></i>
                  <span class="text"> إنشاء دعوة</span>
              </Link>
          </li>
            ):null}
            {userData?.data?.user?.rolle === "marketer"?(
              <li className=''>
              <Link  to="/addClientMarketer">
              <i class="fa-solid fa-user-plus bx"></i>
                  <span class="text"> إضافة عميل</span>
              </Link>
          </li>
            ):null}
            {userData?.data?.user?.rolle === "marketer"?(
              <li className=''>
              <Link  to="/displayClientsMarkter">
              <i class="fa-solid fa-users bx"></i>
                  <span class="text"> العملاء </span>
              </Link>
          </li>
            ):null}

<li>
                <Link onClick={waitingAlert}>
                <i class="fa-solid fa-keyboard bx"></i>
                      <span class="text">مستلزمات الشحن(قريباً)</span>
                </Link>
            </li>
            {userData?.data?.user?.rolle === "marketer"?(
              <li className=''>
              <Link  to="/MArketerAddClient">
              <i class="fa-solid fa-user-plus bx"></i>
                  <span class="text">إضافة عميل(دفترة) </span>
              </Link>
          </li>
            ):null}
             {userData?.data?.user?.rolle === "marketer"?(
              <li className=''>
              <Link  to="/MarketerClients">
              <i class="fa-solid fa-users bx"></i>
                  <span class="text"> العملاء (دفترة)</span>
              </Link>
          </li>
            ):null}
            <li>
                <Link to="/invocesMarkter">
                <i class="fa-solid fa-receipt bx"></i>
                <span class="text">الفواتير</span>
                </Link>
            </li>
            {/* <li>
                <Link onClick={waitingAlert}>
                <i class="fa-solid fa-users-line bx"></i>
                    <span class="text">طلب مندوب</span>
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
        
    </>
  )
}
