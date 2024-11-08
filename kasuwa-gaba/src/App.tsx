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
import ChangePasswordPage from './pages/ChangePassword';
import { FlashProvider } from './context/FlashProvider';
import { UserProvider } from './context/UserProvider';
import PublicRoute from './components/PrivateRoute';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
        <FlashProvider>
          <ApiProvider>
            <UserProvider>
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
                <Route path="/register" element={
                  <PublicRoute><RegisterPage /></PublicRoute>
                } />
                <Route path="*" element={
                  <PrivateRoute>
                    <Routes>
                      <Route path="/" element={<Kasuwa />} />
                      {/* <Route path="/explore" element={<ExplorePage />} /> */}
                      <Route path="/orders" element={<OrdersPage />} />
                      <Route path="/favs" element={<FavouritesPage />} />
                      <Route path="/change_password" element={<ChangePasswordPage />} />
                      <Route path="/user" element={<UserPage />} />
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </PrivateRoute>
                } />
              </Routes>
            </UserProvider>
          </ApiProvider>
        </FlashProvider>  
       
    </>
  )
}

export default App
