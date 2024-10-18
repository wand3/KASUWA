import './App.css'
import Kasuwa from './pages/Kasuwa';
import { ProductsProvider } from './context/ProductProvider'


// import baseURL from './config';


function App() {
  return (
    <>
      <ProductsProvider>
        <Kasuwa />
      </ProductsProvider>
      {/* <Counter>{(num: number) => <>{num}</>}</Counter> */}

    </>
  )
}

export default App
