import { ProductType } from "../context/ProductsProvider"
import { ReactElement, memo } from "react"

type PropsType = {
    product: ProductType,
   
}

const Product = ({ product }: PropsType): ReactElement => {
    console.log(product)
    // const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url).href
    // console.log(img)
    const content =
        <article className="product">
            {/* <h2>{product = product["Product name"]}</h2> */}
            <h3>{product.description}</h3>
            <h3>{product.id}</h3>
            <h3>{product.quantity}</h3>
            

            {/* <img src={img} alt={product.name} className="product__img" /> */}
            {/* <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}{itemInCart}</p> */}
            <button>Add to Cart</button>
        </article>

    return content
}

export default Product;