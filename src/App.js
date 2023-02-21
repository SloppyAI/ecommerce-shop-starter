import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import ProductDetails from './pages/ProductDetails';

import AdminLogin from './components/admin/AdminLogin';
import Dashboard from './components/admin/Dashboard';
import DBProduct from './components/admin/DBProduct';
import DBEditProduct from './components/admin/DBEditProduct';
import DBDetailProduct from './components/admin/DBDetailProduct';
import DBCreateProduct from './components/admin/DBCreateProduct';

import DBCategory from './components/admin/DBCategory';

const App = () => {
  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            <Route path="" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/product" element={<DBProduct />} />
            <Route
              path="/dashboard/product/detail/:id"
              element={<DBDetailProduct />}
            />
            <Route
              path="/dashboard/product/create"
              element={<DBCreateProduct />}
            />
            <Route
              path="/dashboard/product/edit/:id"
              element={<DBEditProduct />}
            />

            <Route path="/dashboard/category" element={<DBCategory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
