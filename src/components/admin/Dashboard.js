/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ImHome } from 'react-icons/im';

function Sidebar() {
  return (
    <div className="p-12 bg-gray-800 h-full text-white">
      <ul>
        <li className="py-4 pl-6 flex justify-center items-center">
          <Link to={'/'}>
            <ImHome className="text-2xl" />
          </Link>
        </li>

        <li className="py-4 pl-6">
          <a className="hover:text-gray-300">Dashboard</a>
        </li>
        <li className="py-4 pl-6">
          <Link to={'/dashboard/product'} className="hover:text-gray-300">
            Products
          </Link>
        </li>
        <li className="py-4 pl-6">
          <Link to={'/dashboard/category'} className="hover:text-gray-300">
            Category
          </Link>
        </li>
        <li className="py-4 pl-6">
          <Link to={'/dashboard/user'} className="hover:text-gray-300">
            User
          </Link>
        </li>
      </ul>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-8 w-full overflow-auto">
        <h1 className="text-3xl max-h-24 font-bold mb-8 bg-gray-200">
          Dashboard
        </h1>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
