import CartItem from "../components/Cart/CartItem";
import { useCart } from "../hooks/UseCart";
import { PropsType } from "../components/Cart/CartItem";
import Jiki from "../components/Jiki";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { formatCurrency } from "../utilities/formatCurrency"
import { useEffect } from "react";


export const CartPage = ( ) => {

  const { cartItems } = useCart();

  useEffect(() => {
    cartItems;
  })


  return (
    <>
        <Jiki nav>
            <h1 className="md:hidden py-5 text-center text-1xl font-mono">My Cart</h1>
            <a href="/"><span className="md:hidden absolute m-6 top-0 hover:text-red-600"><ArrowLeftIcon className="w-5 h-5"/></span></a>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg">
                    <div className="justify-between mb-6 rounded-lg bg:transparent p-6 sm:flex sm:justify-center">
                      <div>
                          <CartItem />
                        
                        </div>
                    </div>
                </div>
            {/* <!-- Sub total --> */}

            <div className="hidden lg:block mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-6 md:w-2/4">
                <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>

                { cartItems ? cartItems && (
                    <p className="text-gray-700">{formatCurrency(cartItems.total)}</p>)

                    : (<p className="text-gray-700">{formatCurrency(0)}</p>
                )}
                {/* <p className="text-gray-700">${cartItems.total}</p> */}
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-700">Shipping</p>
                    { cartItems ? cartItems && (
                        <p className="text-gray-700">{formatCurrency(0)}</p>

                        ): (<p className="text-gray-700">{formatCurrency(0)}</p>
                    )}

                </div>
                
                <hr className="my-4" />
                <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                    { cartItems ? cartItems && (
                        <p className="mb-1 text-lg font-bold">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(cartItems?.total)}</p>

                        ): (<p className="mb-1 text-lg font-bold">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(0)}</p>

                    )} 
                    <p className="text-sm text-gray-700">including VAT</p>
                </div>
                </div>
                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
            </div>
            </div>
        </Jiki>
    </>
  )
}


export default CartPage;