import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import Kasuwa from './pages/Kasuwa';
import About from './pages/About';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ProductsProvider } from './context/ProductProvider'


// import baseURL from './config';


function App() {
  return (
    <>
      <ProductsProvider>
        {/* <Kasuwa /> */}
        <Routes>
          <Route path='/' element={<Kasuwa />} />
          <Route path='/About' element={ <About /> } />
          <Route path='/Login' element={ <LoginPage /> } />
          <Route path='/Register' element={ <RegisterPage /> } />
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </ProductsProvider>
      {/* <Counter>{(num: number) => <>{num}</>}</Counter> */}

    </>
  )
}

export default App
