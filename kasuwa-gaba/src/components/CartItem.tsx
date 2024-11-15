import { CartItemSchema, CartSchema } from "../context/CartProvider"
import Config from "../config"
import { useCart } from "../hooks/UseCart"
import {  TrashIcon } from "@heroicons/react/24/solid"
import {  TruckIcon } from "@heroicons/react/24/outline"
import SelectShipping from "./SelectShipping"

export type PropsType = {
    cart: CartSchema,
}



const Cartitem = () => {
const { cartItems, removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useCart();
// const cart = useCart();

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }
  // console.log(cart.product.description)
  if (!cartItems) {
    return <p>Cart is empty.</p>;
  }

  return (
    <>
      <div>
        {cartItems?.items.map((item) => (
            <div key={item.id} className="justify-between mb-6 rounded-md bg-white p-6 shadow-lg sm:flex sm:justify-start">
            <img src={`${Config.baseURL}/static/images/product_images/${item.product.product_image}`} alt={item.product.product_name} className="rounded-lg sm:max-w-[17%] sm:max-h-[30%]" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5  sm:mt-2 mr-auto">
                  <h2 className="text-lg text-wrap font-bold text-gray-900">{item.product?.product_name}</h2>
                   {/* shipping  */}
                  <span className="">
                    <TruckIcon className="h-5 w-5 text-gray-700"/>
                    <span className="inline-block font-thin">Update shipping<SelectShipping id={item.product.id}  shippingId={item.shipping.id} /></span>
                    <p className="mt-1 pt-4 text-xs text-gray-700">{item.shipping?.shipping_method_name} </p>
                  </span>
                  <p className="mt-1 text-xs text-gray-700">Shipping cost {item.shipping?.shipping_price} days</p>



                </div>
                <div className="mt-5 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 pr-[10%]">
                  <div className="flex items-center border-gray-100">
                      <button onClick={() => {decreaseCartQuantity(item.product.id)}} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-gray-800 hover:text-blue-50"> - </button>
                      <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={item.quantity} min="1" />
                      <button onClick={() => {increaseCartQuantity(item.product.id)}} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-gray-800 hover:text-blue-50"> + </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.product?.price)}</p>

                 
                  
                </div>
                <div className="flex p-2 items-center space-x-4 md:mb-[30%] sm:mb-[0] sm:flex-row-reverse">
                  <button className="" onClick={() => {removeFromCart(item.product.id)}}>
                    <TrashIcon className="h-6 w-6 cursor-pointer hover:text-red-500" />
                  </button>
                </div>
            </div>
        </div>
        ))}
      </div>
    </>
  );
};
    // const {
    //     getItemQuantity,
    //     increaseCartQuantity,
    //     decreaseCartQuantity,
    //     removeFromCart,
    //     cartItems,
    // } = UseCart()
    // const cart = UseCart();

    // // const img: string = new URL(`${Config.baseURL}/static/images/product_images/${cart.cartItems}`, import.meta.url).href

    // const content =

    //     <div className="justify-between mb-6 rounded-md bg-white p-6 shadow-md sm:flex sm:justify-start">
    //         {cart.}
    //         <img src={img} alt='{cart.product?.product_name}' className="w-full rounded-lg sm:w-40" />
    //         <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
    //             <div className="mt-5 sm:mt-0">
    //             <h2 className="text-lg font-bold text-gray-900">'cart.product?.product_name'</h2>
    //             <p className="mt-1 text-xs text-gray-700">cart.product?.description</p>
    //             </div>
    //             <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
    //             <div className="flex items-center border-gray-100">
    //                 <button onClick={() => {increaseCartQuantity}} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
    //                 <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
    //                 <button onClick={() => {decreaseCartQuantity}} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
    //             </div>
    //             <div className="flex items-center space-x-4">
    //                 <p className="text-sm">cart.product?.price</p>
    //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
    //                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    //                 </svg>
    //             </div>
    //             </div>
    //         </div>
    //     </div>
    // return content
// }

export default Cartitem;