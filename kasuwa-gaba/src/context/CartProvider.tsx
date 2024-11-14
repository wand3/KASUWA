import { createContext, ReactElement, useState, useEffect } from "react";
import UseApi from "../hooks/UseApi";
import useFlash from "../hooks/UseFlash";
import { ProductType } from "./ProductProvider";
import { AddShippingSchema } from "../components/Admin/AddShipping";
import Config from "../config";


export type CartItemSchema = {
  id: number;
  product: ProductType;
  quantity: number;
  shipping: AddShippingSchema;
}

export type CartSchema = {
  items: CartItemSchema[];
  total: number;
}



export type CartContextType = {
  cartItems: CartSchema| null;
  cartQuantity?: number
  // getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => Promise<void>;
  shippings?: AddShippingSchema | null;

  // getCartItems: () => Promise<[]>;
  // '/cart/shipping/<int:product_id>/<int:shipping_id
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

  const api = UseApi();
  const flash = useFlash();

  // Fetch products function
  const fetchCartItems = async () => {
      try {

          const response = await api.get<CartSchema>('/cart');
          console.log(response)
          const count = response.body?.items.length
          const data = response.body;
          console.log(data)
          setCartItems(data)
          setcartQuantity(count)
          console.log(count)
      } catch (error) {
          setCartItems(null); // Handle error state
      }
  };

  useEffect(() => {
      fetchCartItems(); // Fetch products on component mount
      cartItemsCount();
      getShipping();
  }, []);

  const cartItemsCount = () => {
      return cartItemsCount
  
  }


//   const cartQuantity = cartItems.reduce(
//     (quantity, item) => item.quantity + quantity,
//     0
//   )

  // const cartQuantity = cartItems ? cartItems.reduce((quantity, item) => item.quantity! + quantity, 0) : 0;
  // function getItemQuantity(id: number): number {
  //   return cartItems?.find(item => item?.id === id)?.quantity || 0;
  // }
   
  
  async function increaseCartQuantity(id: number): Promise<void> {
    console.log('increase begins')
    const response = await api.post('/cart', {
      product_id: id,
      quantity: 1

    });
    console.log( response.body)
    flash('Added', 'success')
    fetchCartItems()

  }
    

  

  async function decreaseCartQuantity(id: number): Promise<void> {
    try {
      const response = await api.put(`/cart/${id}`, {
      });
      console.log(response.body)
      if (!response.ok) {
        flash('minimim must be 1', 'error')
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
  
  // async function getItemQuantity(id: number){
  //   return cartItems.find(item => item.id === id)?.quantity || 0
  // }
  
  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        shippings,

        // getCartItems, 
        // getItemQuantity, 
        increaseCartQuantity,
        removeFromCart,
        decreaseCartQuantity,
    }}>
    
      {children}
    </CartContext.Provider>
  )
}


export default CartProvider;
