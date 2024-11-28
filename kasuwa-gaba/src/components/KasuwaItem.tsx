import { ProductType } from "../context/ProductProvider"
import { ReactElement, memo } from "react"
import Config from "../config"
import { useCart } from "../hooks/UseCart"
import { Link } from "react-router-dom"
import { ShoppingCartIcon } from "@heroicons/react/24/solid"

type PropsType = {
    product: ProductType,
}



const Product = ({ product }: PropsType): ReactElement => {
    const {
        addToCart,
        increaseCartQuantity,
        // decreaseCartQuantity,
        removeFromCart,
    } = useCart()
    const img: string = new URL(`${Config.baseURL}/static/images/product_images/${product.product_image}`, import.meta.url).href
    // console.log(img)
    const content =

        <div className="bg-white max-h-[fit] rounded-2xl px-3 py-4 cursor-pointer hover:-translate-y-2 transition-all relative">
            <div
              className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-[0.5rem] right-[3%]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-gray-800 inline-block" viewBox="0 0 64 64">
                <path
                  d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                  data-original="#000000"></path>
              </svg>
            </div>
            <Link to={`/product/${product.id}`}>
                    <div className="overflow-hidden flex justify-center ml-auto mr-auto md:mb-2 mb-4 w-[60%] h-[40%]">
                        <img src={img} alt={product.product_name} className="mb-3 h-fit" />
                    </div>
                <div className="h-[43%]">
                    <h3 className="text-md font-bold text-wrap text-gray-800">{product.product_name}</h3>
                    <div className="flex space-x-2 mt-2">
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#facc15]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                            d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                        </svg>
                        <span><p className="text-gray-600 text-[12px]">(3.5) </p></span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{product.sold}+ sold</p>
                    <h4 className="text-md text-gray-800 font-bold mt-1">{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(product.price)}</h4>
                </div>
                <div className="justify-center absolue bottom-[5px] mt-1 ml-auto mr-auto">

                    

                    <button type='button' onClick={() => addToCart(product.id)} className="group w-full my-1 p-2 inline-flex h-auto items-center justify-center overflow-hidden rounded-md bg-slate-800 px-3 font-medium text-neutral-200">
                        <span className="text-[13px]">Add to cart</span>
                        <div className="ml-1 transition duration-300 group-hover:rotate-[360deg]">
                            <ShoppingCartIcon aria-hidden="false" className="h-5 w-5 fill:black" />
                        </div>
                    </button>
                </div>
            </Link>
                {/* <button className="border-solid bg-red-300" type='button' onClick={() => removeFromCart(product.id)}>Remove from Cart</button> */}

        </div>
    return content
}

export default Product;