import useProducts from "../hooks/UseProducts";
import { ProductType } from "../context/ProductsProvider";
import { ReactElement } from "react";
import Product from "./KasuwaItem";


export const KasuwaItems = () => {
  const {products} = useProducts();

  let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>

  if (products?.length) {
      pageContent = products.map(product => {

          return (
              <Product
                  key={product.id}
                  product={product}
              />
          )
      })
    }

    const content = (
        <main className="main main--products">
            {pageContent}
        </main>
    )

    return content


}

export default KasuwaItems