import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Kasuwa from "./pages/Kasuwa";
import ApiProvider from "./context/ApiProvider";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { FlashProvider } from "./context/FlashProvider";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <>
      <FlashProvider>
        <ApiProvider>
          <Routes>
            <Route path="/" element={<Kasuwa />} />
            <Route path="/About" element={<About />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/RegisterPage" element={<RegisterPage />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/check" element={<Checkout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ApiProvider>
      </FlashProvider>
    </>
  );
}

export default App;
