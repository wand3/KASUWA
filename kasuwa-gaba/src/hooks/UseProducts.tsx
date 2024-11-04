import { useContext } from "react"
import ProductsContext from "../context/ProductProvider"
import { UseProductsContextType } from "../context/ProductProvider"


export const useProducts = (): UseProductsContextType => {
    return useContext(ProductsContext)
}

export default useProducts