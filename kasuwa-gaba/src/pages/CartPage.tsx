import CartItem from "../components/CartItem";
// import Cartitem from "../components/CartItem";
import { useCart } from "../hooks/UseCart";
import { PropsType } from "../components/CartItem";
import Config from "../config";
import Jiki from "../components/Jiki";
import NavButtom from "../components/NavButtom";


export const CartPage = (cart: PropsType ) => {

  const { cartItems } = useCart();


  return (
    <>
      <div className="h-screen bg-gray-100">
        <Jiki nav>
            <h1 className="py-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                      <div>
                          <CartItem />
                        
                        </div>
                    </div>
                </div>
            {/* <!-- Sub total --> */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">${cartItems?.total}</p>
                </div>
                <div className="flex justify-between">
                <p className="text-gray-700">Shipping</p>
                <p className="text-gray-700">$4.99</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                    <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                    <p className="text-sm text-gray-700">including VAT</p>
                </div>
                </div>
                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
            </div>
            </div>
        </Jiki>
      </div>
    </>
  )
}


export default CartPage;