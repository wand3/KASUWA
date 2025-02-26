import { useCart } from "../hooks/UseCart";
import { PropsType } from "../components/Cart/CartItem";
import Jiki from "../components/Jiki";
import { formatCurrency } from "../utilities/formatCurrency"
import { useEffect, useState } from "react";
import UseApi from "../hooks/UseApi";
import useUser from "../hooks/UseUser";
import { Link, useNavigate } from "react-router-dom";
import Config from "../config";


export const CheckoutPage = ( ) => {
    const [ address, setAddress ] = useState({});
    const { cartItems, getShipping } = useCart();
    const { user } = useUser();
    const { addresses } = useUser();
    const navigate = useNavigate();
    const api = UseApi();

    useEffect(() => {
        getShipping();
        if (addresses) {
          const defaultAddress = addresses.find(address => address.is_default) || addresses[0] || null;
          setAddress(prev => ({
            ...prev,
            selectedAddress: defaultAddress,
            }));
        }
        console.log(address)
    }, [addresses])

     // back button 
    const goBack = () => {
        return navigate(-1);
    }

    const checkout = async () => {
        const response = await api.post("/checkout", {
        address: address?.selectedAddress.id})
        console.log(response)
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
                                    <input type="text" placeholder="Name" value={user?.fullname || "Test user fullname"}
                                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                </div>
                                <div>
                                    <input type="email" placeholder="Email address" value={user?.email}
                                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                </div>
                                <div>
                                    <input type="text" placeholder="Street address" value={address.selectedAddress['street'] || 'Test street'}
                                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                </div>
                                <div>
                                    <input type="text" placeholder="City" value={address.selectedAddress['city']}
                                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                </div>
                                <div>
                                    <input type="text" placeholder="State" value={address.selectedAddress['state']}
                                    className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none" />
                                </div>
                                <div>
                                    <input type="number" placeholder="Postal code" value={address.selectedAddress['zipcode']}
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
                                    <img src="data:image/png;base64,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" className="w-20" alt="paystack" />
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
                                <button type="button" className="min-w-[150px] px-6 py-3.5 text-sm bg-[#18202a] text-white rounded-lg hover:bg-[#090c10]" onClick={checkout}>Confirm payment {formatCurrency(cartItems?.total)}</button>
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
