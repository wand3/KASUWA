import { ProductType } from "../context/ProductProvider"
import { ReactElement, memo } from "react"
import Config from "../config"
import { UseCart } from "../hooks/UseCart"

type PropsType = {
    product: ProductType,
}



const Product = ({ product }: PropsType): ReactElement => {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = UseCart()
    const img: string = new URL(`${Config.baseURL}/static/images/product_images/${product.product_image}`, import.meta.url).href
    // console.log(img)
    const content =

        <div className="w-full bg-slate-400 mx-2">
            {/* <div  className="group"> //href="#" */}
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img src={img} alt={product.product_name} className="" />
                </div>
                <h3 className="mt-4 text-lg text-gray-700">{product.product_name}</h3>
                <p>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(product.price)}</p>
                <button className="border-solid bg-red-300" type='button' onClick={() => increaseCartQuantity(product.id)}>Add to Cart</button>
            {/* </div> */}
        </div>

    return content
}

export default Product;