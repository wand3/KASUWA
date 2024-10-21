import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Kasuwa from './pages/Kasuwa';
// import { ProductsProvider } from './context/ProductsProvider';
import ApiProvider from './context/ApiProvider';
import About from './pages/About';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ProductsProvider } from './context/ProductsProvider';


// import baseURL from './config';


function App() {
  return (
    <>
        <ApiProvider>
        <ProductsProvider>
          <Kasuwa />
          <Routes>
            <Route path='/' element={<Kasuwa />} />
            <Route path='/About' element={ <About /> } />
            <Route path='/LoginPage' element={ <LoginPage /> } />
            <Route path='/RegisterPage' element={ <RegisterPage /> } />
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>

        </ProductsProvider>
        </ApiProvider>
      {/* <Counter>{(num: number) => <>{num}</>}</Counter> */}

    </>
  )
}

export default App
