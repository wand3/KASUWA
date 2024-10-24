import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Kasuwa from './pages/Kasuwa';
import ApiProvider from './context/ApiProvider';
import About from './pages/About';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { FlashProvider } from './context/FlashProvider';

function App() {
  return (
    <>
        
      <FlashProvider>
        <ApiProvider>
          <Routes>
            <Route path='/' element={<Kasuwa />} />
            <Route path='/About' element={ <About /> } />
            <Route path='/LoginPage' element={ <LoginPage /> } />
            <Route path='/RegisterPage' element={ <RegisterPage /> } />
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </ApiProvider>
      </FlashProvider>  
       
    </>
  )
}

export default App
