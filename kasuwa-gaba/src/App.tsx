import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Kasuwa from './pages/Kasuwa';
import ApiProvider from './context/ApiProvider';
import About from './pages/About';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';
import FavouritesPage from './pages/FavouritesPage';
import OrdersPage from './pages/OrdersPage';
import CartPage from './pages/CartPage';

import ChangePasswordPage from './pages/ChangePassword';
import { FlashProvider } from './context/FlashProvider';
import { UserProvider } from './context/UserProvider';
import CartProvider from './context/CartProvider';

import AdminRoute from './components/AdminRoute';
import PublicRoute from './components/PrivateRoute';
import PrivateRoute from './components/PrivateRoute';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <>
        <FlashProvider>
          <ApiProvider>
            <UserProvider>
              <CartProvider>
              
              
                <Routes>

                  {/* <Route path='/' element={
                    <PublicRoute><Kasuwa /></PublicRoute>
                  } /> */}
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

                  <Route path="/admin" element={
                    <AdminRoute>
                      <Routes>
                        <Route path='/' element={<AdminPage />} />
                        <Route path='/shipping' />

                      
                      </Routes>
                      
                    </AdminRoute> 
                  }/>
                  
                  <Route path="*" element={
                    <PrivateRoute>
                      <Routes>
                        <Route path="/" element={<Kasuwa />} />
                        {/* <Route path="/explore" element={<ExplorePage />} /> */}
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/cart" element={<CartPage />} />

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
          </ApiProvider>
        </FlashProvider>  
       
    </>
  )
}

export default App
