import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

import { Outlet } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Outlet></Outlet>
      <Sidebar />
      <Footer />
    </div>
  );
};

export default LandingPage;
