import React, { useState } from 'react'
import './navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = ({setSidebar , setSearchValue}) => {

  let navigate = useNavigate();

  const handleKeyDown = (e)=>{
    if(e.key === 'Enter'){
      e.preventDefault();
      const value = e.target.value;
      // console.log(value);
      setSearchValue(value);
      navigate('/');
      e.target.value = '';
    }
  }
  

  return (
    <nav className='flex-div'>
        <div className='nav-left flex-div'>
            <img className='menu-icon' src={menu_icon} onClick={()=>setSidebar(prev=> prev === false ? true : false)} />  {/* this function will act as as a toggle as we have passed the setSidebar here */}
            <Link to='/'><img className='logo' src={logo} alt="" /></Link>
        </div>

        <div className='nav-middle flex-div'>
            <div className='search-box flex-div'>
              <input onKeyDown={handleKeyDown} type="text" placeholder='Search'/>
              <button type='submit'>
                <img src={search_icon} alt="" />
              </button>
            </div> 
        </div>
        
        <div className='nav-right flex-div'> 
            <img src={upload_icon} alt="" />
            <img src={more_icon} alt="" />
            <img src={notification_icon} alt="" />
            <img className='user-icon' src={profile_icon} alt="" />
        </div>
    </nav>
  )
}

export default Navbar