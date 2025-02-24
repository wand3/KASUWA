import { createContext, useState, useEffect, useRef } from "react";
import UseApi from "../hooks/UseApi";
import useFlash from "../hooks/UseFlash";
import { ProductType } from "./ProductProvider";
import { AddShippingSchema } from "../components/Admin/AddShipping";


export type CartItemSchema = {
  id: number;
  product: ProductType;
  quantity: number;
  shipping: AddShippingSchema;
  color: string;
}

export type CartSchema = {
  items: CartItemSchema[];
  total: number;
}

export type CartContextType = {
  cartItems: CartSchema| null;
  cartQuantity?: number
  addToCart: (id: number) => void;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => Promise<void>;
  shippings?: AddShippingSchema | null;
  updateShippingMethod: (id: number, shippingId: number) => Promise<void>;
  getShipping: () => {};
  getCartItemCount: number;
  setCartItems: (cart: CartSchema | null ) => void;

}

export const CartContext = createContext({} as CartContextType);

// type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ( {children}: React.PropsWithChildren<{}>) => {
  const [ cartItems, setCartItems] = useState<CartSchema | null>({
    items: [],
    total: 0,
  });
  let [shippings, setShippings] = useState<AddShippingSchema | null>();
  const [ cartQuantity, setcartQuantity] = useState<number>();
  const cartItemsCountRef = useRef<number>(0); // Using `useRef` to track cart count
  let [ getCartItemCount, setGetCartItemCount] = useState<number>(cartItems?.items.length);


  const api = UseApi();
  const flash = useFlash();

  // Fetch cart items
  const fetchCartItems = async () => {
      try {

          const response = await api.get<CartSchema>('/cart');
          console.log(response)
          const count = response.body?.items.length
          const data = response.body;

          console.log(data)
          setCartItems(data)
          setcartQuantity(count)
          cartItemsCountRef.current = response.body?.items?.length || cartQuantity || 0; // Update the `useRef` value directly

          setGetCartItemCount(cartItemsCountRef.current)
          console.log(count)
      } catch (error) {
          setCartItems(null); // Handle error state
      }
  };

  async function addToCart(id: number): Promise<void> {
      console.log('increase begins')
      const response = await api.post('/cart', {
        product_id: id,
      });
      console.log( response.body)
      setGetCartItemCount(cartItemsCountRef.current += 1)
      flash('Added', 'success')
      // fetchCartItems()
    }

  async function increaseCartQuantity(id: number): Promise<void> {
    console.log('increase begins')
    const response = await api.put(`/cart/${id}`, {
      product_id: id,
      quantity: 1
    });
    console.log( response.body)
    flash('Quantity Added', 'success')
    fetchCartItems()
  }

  async function decreaseCartQuantity(id: number): Promise<void> {
    
    try {
      const response = await api.put(`/cart/${id}`, {
        product_id: id,
        quantity: -1
      });
      console.log(response.body)
      if (!response.ok) {
        flash('Minimim must be 1', 'error')
        fetchCartItems()
      
      }
      flash('Item decreased!', 'success')
      fetchCartItems()
    } catch(error) {
      return console.log(error)
    }
  
  }

  async function removeFromCart(id: number) : Promise<void> {
    try {
      const response = await api.delete(`/cart/${id}`)
      console.log(response.body)
      flash('Item removed!', 'success')
      fetchCartItems()
    } catch(error) {
      return console.log(error)
    }
  }

  async function getShipping() {
    try {
      const response = await api.get<AddShippingSchema>(`/shipping`)
      // console.log(response.body)
      const data = response.body
      if (Array.isArray(data)) {
        // setProducts(data as ProductType[]);
        setShippings(data)
      }
      // flash('Item removed!', 'success')
      // fetchCartItems()
      console.log(shippings)
    } catch(error) {
      return console.log(error)
    }
  
  }

  // Function to update shipping method for a product
  async function updateShippingMethod(id: number, shippingId: number) {
    try {
      const response = await api.put(`/cart/shipping/${id}/${shippingId}`);
      const updatedShipping = response.data;
      console.log(updatedShipping)
      fetchCartItems()
    } catch (error) {
      console.error("Failed to update shipping method:", error);
      // Optionally, handle the error (e.g., show a notification)
    }
  };

  // async function getCartItemCount () {
  //   return cartItemsCountRef
  // }
  
  useEffect(() => {
    fetchCartItems(); // Fetch products on component mount
    setGetCartItemCount(cartItemsCountRef.current) 
    getShipping();
  }, []);

  // useEffect(() => {
  //     (async () => {
  //       await fetchCartItems(); // Fetch products on component mount
  //       setGetCartItemCount(cartItemsCountRef.current) 
  //       getShipping();
  //     })();
  //   }, []);
  

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        shippings,
        updateShippingMethod,
        getShipping,
        setCartItems,
        // updateProductColor,

        // getCartItems, 
        addToCart,
        increaseCartQuantity,
        removeFromCart,
        decreaseCartQuantity,
        getCartItemCount
    }}>
      {children}
    </CartContext.Provider>
  )
}


export default CartProvider;
