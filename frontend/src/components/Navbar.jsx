import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { BsList } from 'react-icons/bs';

const Navbar = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <div className="bg-menu text-white p-4">
      <div className="flex flex-row items-center menu">
        <div className="lg:hidden flex flex-row">
          <div onClick={toggleBurgerMenu}>
            <BsList className="object-cover w-6 h-6 cursor-pointer" />
          </div>
        </div>

        <div className='flex flex-row gap-4' >
          {/*    
          <Link to={'/profile'} className='flex flex-row items-center'>
            <img src="/assest/user.png" alt="" className='object-cover w-6 h-6 me-2 cursor-pointer' />
            <p className='text-white'>Username</p>
          </Link> 
          */}
          <Link to={'/'} className='flex flex-row items-center' onClick={handleLogout}>
            <img src="/assest/logout.png" alt="" className='object-cover w-6 h-6 me-2 cursor-pointer' />
            <p className='text-white'>Logout</p>
          </Link>
        </div>
      </div>


      {isBurgerMenuOpen && (
        <div className="lg:hidden bg-menu text-white p-4">
          <ul className='pl-5'>
            <li className='flex flex-row mb-5'>
              <Link to={'/'} className='text-lg flex'>
                <img src="/assest/add.png" alt="" className='object-cover lg:h-10 h-8 me-2 icon-white' />
                Create Sale
              </Link>
            </li>
            <li className='flex flex-row mb-5'>
              <Link to={'/search'} className='text-lg flex'>
                <img src="/assest/delivery.png" alt="" className='object-cover  lg:h-10 h-8 me-2 icon-white' />
                Search vehicles
              </Link>
            </li>
            <li className='flex flex-row'>
              <Link to={'/reports'} className='text-lg flex'>
                <img src="/assest/report.png" alt="" className='object-cover lg:h-10 h-8 me-2 icon-white' />
                Reports
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className="hidden lg:flex flex-col">
        <hr className="w-80 h-1 mx-auto my-4 bg-gray-100 border-0 rounded"></hr>
        <ul className='pl-5 text-white'>
          <li className='flex flex-row mb-5'>
            <Link to={'/'} className='text-lg flex'>
              <img src="/assest/add.png" alt="" className='object-cover w-10 h-10 me-2 icon-white' />
              Create Sale
            </Link>
          </li>
          <li className='flex flex-row mb-5'>
            <Link to={'/search'} className='text-lg flex'>
              <img src="/assest/delivery.png" alt="" className='object-cover w-10 h-10 me-2 icon-white' />
              Search vehicles
            </Link>
          </li>
          <li className='flex flex-row'>
            <Link to={'/reports'} className='text-lg flex'>
              <img src="/assest/report.png" alt="" className='object-cover w-10 h-10 me-2 icon-white' />
              Reports
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
