import { createContext, ReactElement, useEffect, useState } from "react";
import UseApi from "../hooks/UseApi";

// Define ProductType
export type ProductType = {
    map(arg0: (item: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    id: number;
    price: number;
    description: string;
    product_image: string;
    product_images: string[];
    product_name: string;
    sold: number;
    quantity: number;
};

// Define the context type that includes products and the fetch function
export type UseProductsContextType = {
  products: ProductType[] | null;
  fetchproducts: () => void;
  getProduct: (id: number) => void,

};

// Initialize the context with default values
const initContextState: UseProductsContextType = {
  products: null,
  fetchproducts: () => {},
  getProduct: (id: number) => Promise<void>,
};

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  // Correctly type the state as an array of products or null
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [product, setProduct] = useState<ProductType | null>(null);

  const api = UseApi();

  // Fetch products function
  const fetchproducts = async () => {
    try {
      const response = await api.get("/products");
      console.log("api.get");

      const data = await response.body;
      // setProducts(data); // Assume data is an array of products
      // Type assertion: assert that data is an array of ProductType
      if (Array.isArray(data)) {
        setProducts(data as ProductType[]); // Type assertion
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      setProducts(null); // Handle error state
    }
  };

  useEffect(() => {
    fetchproducts(); // Fetch products on component mount
  }, []);

  // get product
  const getProduct = async (id: number) => {
    try {
      const response = await api.get<ProductType>(`/product/${id}`);
      console.log("api.get");

      const data = response.body;
      if (response.ok){
        setProduct(data); // Assume data is an array of products
        console.log(product)
      }
      // Type assertion: assert that data is an array of ProductType
      // if (Array.isArray(data)) {
      //   setProduct(data as ProductType); // Type assertion
      // } else {
      //   throw new Error("Invalid data format");
      // }
    } catch (error) {
      setProduct(null); // Handle error state
    }
  

  }

  return (
    <ProductsContext.Provider value={{ products, fetchproducts, getProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
