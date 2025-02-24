import CartItem from "../components/Cart/CartItem";
import { useCart } from "../hooks/UseCart";
import { PropsType } from "../components/Cart/CartItem";
import Jiki from "../components/Jiki";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { formatCurrency } from "../utilities/formatCurrency"
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Config from "../config";


export const CheckoutPage = ( ) => {

    const { cartItems, getShipping } = useCart();
    const navigate = useNavigate();


    useEffect(() => {
        getShipping();
    }, [])
     // back button 
    const goBack = () => {
        return navigate(-1);
    }


    return (
        <>
            <Jiki nav={false}>
                <div className="font-[sans-serif] bg-white">
                    <div className="max-lg:max-w-xl mx-auto w-full">
                        <div className="grid lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 max-lg:order-1 p-6 !pr-0 max-w-4xl mx-auto w-full">
                            <div className="text-center max-lg:hidden">
                            <h2 className="text-3xl font-bold text-gray-800 inline-block border-b-2 border-gray-800 pb-1">Checkout</h2>
                            </div>

                            <form className="lg:mt-16">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Shipping info</h2>

                                <div className="grid sm:grid-cols-2 gap-8 mt-8">
                                <div>
                                    <input type="text" placeholder="Name"
                                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                </div>
                                <div>
                                    <input type="email" placeholder="Email address"
                                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Street address"
                                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                </div>
                                <div>
                                    <input type="text" placeholder="City"
                                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                </div>
                                <div>
                                    <input type="text" placeholder="State"
                                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                </div>
                                <div>
                                    <input type="number" placeholder="Postal code"
                                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                </div>
                                </div>
                            </div>

                            <div className="mt-16">
                                <h2 className="text-xl font-bold text-gray-800">Payment method</h2>

                                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                                
                                <div className="flex items-center">
                                    <input type="radio" className="w-5 h-5 cursor-pointer" id="paystack" />
                                    <label for="paystack" className="ml-4 flex gap-2 cursor-pointer">
                                    <img src="https://readymadeui.com/images/paypal.webp" className="w-20" alt="paystack" />
                                    </label>
                                </div>
                                </div>

                                <div className="grid gap-8 mt-8">
                                


                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                    <label for="remember-me" className="ml-3 block text-sm">
                                    I accept the <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
                                    </label>
                                </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <button type="button" className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300" onClick={goBack}>Back</button>
                                <button type="button" className="min-w-[150px] px-6 py-3.5 text-sm bg-[#18202a] text-white rounded-lg hover:bg-[#090c10]">Confirm payment {formatCurrency(cartItems?.total)}</button>
                            </div>
                            </form>
                        </div>

                        <div className="bg-gray-100 lg:h-screen lg:sticky lg:top-0 lg:max-w-[430px] w-full lg:ml-auto">
                            <div className="relative h-full">
                            <div className="p-6 overflow-auto max-lg:max-h-[450px] lg:h-[calc(100vh-50px)]">
                                <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>

                                <div className="space-y-6 mt-8">
                                {cartItems?.items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                    <div className="w-[124px] h-[100px] flex items-center justify-center p-4 shrink-0 bg-gray-200 rounded-lg">

                                    <Link to={`/product/${item.product.id}`}>
                                        <img className="w-full object-contain" src={`${Config.baseURL}/static/images/product_images/${item.product.product_image}`} alt={item.product.product_name}  />
                                    </Link>
                                    </div>
                                    <div className="w-full">
                                        <h3 className="text-sm text-gray-800 font-bold">{item.product?.product_name}</h3>
                                        <ul className="text-xs text-gray-800 space-y-1 mt-2">
                                            <li className="flex flex-wrap gap-4">Color <span className="ml-auto">{item.color}</span></li>
                                            <li className="flex flex-wrap gap-4">Quantity <span className="ml-auto">{item.quantity}</span></li>
                                            <li className="flex flex-wrap gap-4">Total Shipping <span className="ml-auto">{formatCurrency(item.shipping?.shipping_price)}</span></li>

                                            <li className="flex flex-wrap gap-4">Total Price <span className="ml-auto">{formatCurrency(item.product?.price)}</span></li>
                                        </ul>
                                    </div>

                                    </div>
                                
                                
                                
                                ))}


                            <div className="lg:absolute lg:left-0 lg:bottom-0 bg-gray-200 w-full p-4">
                                <h4 className="flex flex-wrap gap-4 text-sm text-gray-800 font-bold">Total <span className="ml-auto">{formatCurrency(cartItems?.total)}</span></h4>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            </Jiki>
        </>
    );
}

export default CheckoutPage;
