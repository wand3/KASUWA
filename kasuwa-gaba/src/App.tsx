import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Kasuwa from './pages/Kasuwa';
import ApiProvider from './context/ApiProvider';
import { FilterProvider } from '../src/context/FilterContext';
import About from './pages/About';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import FavouritesPage from './pages/FavouritesPage';
import OrdersPage from './pages/OrdersPage';
import CartPage from './pages/CartPage';
import { ProductPage } from './pages/ProductPage';
import MainContent from "./components/MainContent";


import ChangePasswordPage from './pages/ChangePassword';
import { FlashProvider } from './context/FlashProvider';
import { UserProvider } from './context/UserProvider';
import CartProvider from './context/CartProvider';

import AdminRoute from './components/AdminRoute';
import PublicRoute from './components/PrivateRoute';
import PrivateRoute from './components/PrivateRoute';
import AdminPage from './pages/Admin/AdminPage';
import AdminEditProductPage from './pages/Admin/AdminEditProductPage';
import AdminEditShippingPage from './pages/Admin/AdminEditShippingPage';
import AdminEditCategoryPage from './pages/Admin/AdminEditCategoryPage';

import UserShippingPage from './pages/User/ShippingPage';
import AddShippingAddressPage from './pages/User/AddShippingAddress';

function App() {
  return (
    <>
        <FlashProvider>
          <ApiProvider>
            <FilterProvider>
            <UserProvider>
              <CartProvider>
              
              
                <Routes>
                  <Route path="/" element={
                    <PublicRoute><Kasuwa /></PublicRoute>
                  } />
                  <Route path='/product/:id' element={
                    <PublicRoute><ProductPage /></PublicRoute>
                  } />
                  <Route path='/About' element={ 
                    <PublicRoute><About /> </PublicRoute>
                  } />
                  <Route path="/login" element={
                    <PublicRoute><LoginPage /></PublicRoute>
                  } />
                  <Route path="/logout" element={
                    <PublicRoute><Kasuwa /></PublicRoute>
                  } />
                  <Route path="/register" element={
                    <PublicRoute><RegisterPage /></PublicRoute>
                  } />
                  <Route path="/category/:id" />
                  <Route path="/categories" element={
                    <PublicRoute><Kasuwa /></PublicRoute>
                  } />


                  <Route path="/admin/*" element={
                    <AdminRoute>
                      <Routes>
                        <Route path='/' element={<AdminPage />} />
                        <Route path='/shipping' /> 
                        <Route path='/shipping/:id' element={<AdminEditShippingPage />} />
                        <Route path='/category/:id' element={<AdminEditCategoryPage />} />       
                        <Route path='/edit/:id' element={<AdminEditProductPage />} />
                        {/* <Route path='/edit/:id' element={<EditProductPage />} /> */}


                      </Routes>
                    </AdminRoute> 
                  }/>
          
                  <Route path="*" element={
                    <PrivateRoute>
                      <Routes>
                        <Route path="/" element={<Kasuwa />} />
                        <Route path="/shipping" element={<UserShippingPage />} />
                        <Route path="/addAddress" element={<AddShippingAddressPage />} />

                        <Route path="/orders" element={<OrdersPage />} />

                        <Route path="/cart" element={<CartPage cart={{
                        items: [],
                        total: 0
                      }} />} />


                        {/* <Route path='/shipping' /> */}
                        

                        <Route path="/favs" element={<FavouritesPage />} />
                        <Route path="/change_password" element={<ChangePasswordPage />} />
                        <Route path="/user" element={<UserPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </PrivateRoute>
                  } />                  
                </Routes>
              
              </CartProvider>
            </UserProvider>
            </FilterProvider>

          </ApiProvider>
        </FlashProvider>  
       
    </>
  )
}

export default App;
