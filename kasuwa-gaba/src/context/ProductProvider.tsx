import { createContext, ReactElement, useEffect, useState } from "react";
import UseApi from "../hooks/UseApi";
import useFlash from "../hooks/UseFlash";

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
  deleteProduct: (id: number) => void,
  editProduct: (id: number) => void

};

// Initialize the context with default values
const initContextState: UseProductsContextType = {
  products: null,
  fetchproducts: () => {},
  deleteProduct: () => Promise<void>,
  editProduct: () => Promise<void>,
};

const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  // Correctly type the state as an array of products or null
  const [products, setProducts] = useState<ProductType[] | null>(null);


  const api = UseApi();
  const flash = useFlash();

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

  // delete product
  const deleteProduct = async (id: number): Promise<void> => {
    try {
      const response = await api.delete(`/product/${id}`)
      console.log(response.body)
      flash('Product deleted!', 'success')
      fetchproducts()
    } catch(error) {
      flash('Delete failed', 'error')

      return console.log(error)
    }
  }

  // edit product 
  async function editProduct(id: number): Promise<void> {
    console.log('edit product start')
    try {
      const response = await api.put(`/product/${id}`, {
      });
      console.log(`Success respinse ${response.body}`)
      if (!response.ok) {
        flash('Update failed', 'error')
      
      }
      
      flash('Product Updated!', 'success')
      fetchproducts()
    } catch(error) {
      return console.log(error)
    }
  
  }



  return (
    <ProductsContext.Provider value={{ 
    products, 
    fetchproducts, 
    deleteProduct,
    editProduct
     }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
