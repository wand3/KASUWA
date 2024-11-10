import { ProductType } from "../context/ProductsProvider"
import { ReactElement, memo } from "react"
import Config from "../config"
import { UseCart } from "../hooks/UseCart"

type PropsType = {
    product: ProductType,
}


const Product = ({ product }: PropsType): ReactElement => {

    const cart = UseCart();
    const img: string = new URL(`${Config.baseURL}/static/images/product_images/${product.product_image}`, import.meta.url).href
    // console.log(img)
    const content =

        <div className="w-full bg-slate-400 mx-2">
            <a href="#" className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img src={img} alt={product.name} className="" />
                </div>
                <h3 className="mt-4 text-lg text-gray-700">{product.product_name}</h3>
                <p>{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(product.price)}</p>
                <button className="border-solid bg-red-300" onClick={cart.increaseCartQuantity}>Add to Cart</button>
            </a>
        </div>

    return content
}

export default Product;