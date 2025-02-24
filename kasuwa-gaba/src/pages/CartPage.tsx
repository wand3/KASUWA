import CartItem from "../components/Cart/CartItem";
import { useCart } from "../hooks/UseCart";
import { PropsType } from "../components/Cart/CartItem";
import Jiki from "../components/Jiki";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { formatCurrency } from "../utilities/formatCurrency"
import { useEffect } from "react";
import { Button } from "@headlessui/react";
import ShoppingCartIcon from "@heroicons/react/24/outline/ShoppingCartIcon";


export const CartPage = ( ) => {

  const { cartItems, getShipping } = useCart();

  useEffect(() => {
    getShipping();
  }, [])


  return (
    <>
        <Jiki nav={false}>
            <h1 className="ml-[3rem] md:ml-[15%] pt-[8vh] pb-5 text-left text-1xl">Cart Summary ({cartItems?.items.length})</h1>
            <a href="/"><span className="absolute m-6 top-0 hover:text-red-600"><ArrowLeftIcon className="w-5 h-5"/></span></a>
            <div className="flex sticky px-[3rem] py-2 text-1xl bg-white font-mono">
                <h3>Subtotal </h3>
                <span className="absolute right-0 pr-[3rem]">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(cartItems?.total)}</span>
            </div>
            <div className="mx-auto max-w-5xl min-h-[80vh] justify-center px-6 md:flex md:space-x-6 xl:px-0">
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
            {/* sticky footer for checkout  */}
            <div className="flex sticky bottom-0 h-[8vh] px-[1rem] text-slate-900 py-2 text-1xl bg-gray-300 font-mono">
                <h3>Subtotal </h3>
                <span className="px-3">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(cartItems?.total)}</span>
                <a type='button' onClick={() => {}} className="group w-fit my-1 p-2 inline-flex h-auto items-center justify-center overflow-hidden rounded-md bg-slate-800 px-3 font-medium text-white absolute right-0 mr-8">
                    <span className="text-[13px]">Checkout</span>
                    <div className="ml-1 transition duration-300 group-hover:rotate-[360deg]">
                        <ShoppingCartIcon aria-hidden="false" className="h-5 w-5 fill:black" />
                    </div>
                </a>
            </div>
        </Jiki>
    </>
  )
}


export default CartPage;