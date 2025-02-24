import { CartItemSchema, CartSchema } from "../../context/CartProvider"
import Config from "../../config"
import { useCart } from "../../hooks/UseCart"
import {  TrashIcon } from "@heroicons/react/24/solid"
import {  TruckIcon } from "@heroicons/react/24/outline"
import SelectShipping from "../SelectShipping"
import { formatCurrency } from "../../utilities/formatCurrency"
import { Link } from "react-router-dom"

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
    return <p className="py-5 text-center text-2xl font-mono">Cart is empty.</p>;
  }

  return (
    <>
      {cartItems?.items.map((item) => (
        <div key={item.id} className="flex flex-col space-y-3 py-2 text-left sm:flex-row sm:space-x-5 sm:space-y-0 rounded-md bg-white p-4 my-5 shadow-lg sm:flex sm:justify-start">
          <Link to={`/product/${item.product.id}`}>

            <div className="shrink-0">
              <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={`${Config.baseURL}/static/images/product_images/${item.product.product_image}`} alt={item.product.product_name}  />
            </div>
          </Link>

          <div className="relative flex flex-1 flex-col justify-between">
            <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
              <div className="pr-8 sm:pr-5">
                <p className="text-md font-semibold text-gray-900">{item.product?.product_name}</p>
                <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">Color {item.color}</p>
                <span className="">
                    <TruckIcon className="h-5 w-5 text-gray-700"/>
                    <p className="mt-1 text-xs text-gray-500">Shipping cost {formatCurrency(item.shipping?.shipping_price)}</p>
                    <p className="mt-1 pt-1 text-xs text-gray-400">{item.shipping?.shipping_method_name} shipping</p>
                    <span className="inline-block font-thin text-sm">Update shipping<SelectShipping id={item.product.id}  shippingId={item.shipping.id} /></span>
                </span>
        
              </div>

              <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                <p className="shrink-0 w-fit text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">{formatCurrency(item.product?.price)}</p>

                <div className="relative md:top-11 md:left-36 md:pr-[4]">
                  <div className="mx-auto flex h-8 items-stretch text-gray-600">
                    <button disabled={item.quantity <= 1} onClick={() => {decreaseCartQuantity(item.product.id)}} className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">-</button>
                    <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{item.quantity}</div>
                    <button onClick={() => {increaseCartQuantity(item.product.id)}} className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
              <button type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                <button className="" onClick={() => {removeFromCart(item.product.id)}}>
                    <TrashIcon className="h-6 w-6 cursor-pointer hover:text-red-500" />
                </button>
              </button>
            </div>
          </div>
        </div>      

      
      
      
      ))}
      
    </>
  );
};


export default Cartitem;