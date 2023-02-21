import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';

import { BsBag } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import logo from '../img/logo.svg';

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  const userName = sessionStorage.getItem('username');
  console.log(userName);

  // event listener
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  return (
    <header
      className={`${
        isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'
      } fixed w-full z-10 transition-all`}
    >
      <div className="container flex mx-auto items-center justify-between h-full">
        {/* logo */}
        <Link to={'/'}>
          <div>
            <img className="w-[40px]" src={logo} alt="" />
          </div>
        </Link>

        {/* {userName !== null ? (
          <div className="bg-gray-500 text-white py-2 px-4 rounded-lg ml-auto mr-4">
            <Link to={'/login'}>Login</Link>
          </div>
        ) : (
          <div className="bg-gray-500 text-white py-2 px-4 rounded-lg ml-auto mr-4">
            {userName}
          </div>
        )} */}

        {/* login */}
        <div className="bg-gray-500 text-white py-2 px-4 rounded-lg ml-auto mr-4">
          <Link to={'/login'}>Login</Link>
        </div>

        {/* cart */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex relative"
        >
          <BsBag className="text-2xl" />
          <div className="absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] bg-red-500 text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
