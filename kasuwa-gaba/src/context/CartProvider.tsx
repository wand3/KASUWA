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
  // decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => Promise<void>;
  // getCartItems: () => Promise<[]>;
}

export const CartContext = createContext({} as CartContextType);

// type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ( {children}: React.PropsWithChildren<{}>) => {
  const [ cartItems, setCartItems] = useState<CartSchema | null>({
    items: [],
    total: 0,
  });
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
          // Type assertion: assert that data is an array of ProductType
          // if (Array.isArray(data)) {
          //     setCartItems(data) as unknown as CartSchema; // Type assertion

          //     // return data
          // } else {
          //     throw new Error("Invalid data format");
          // }
      } catch (error) {
          setCartItems(null); // Handle error state
      }
  };

  useEffect(() => {
      fetchCartItems(); // Fetch products on component mount
      cartItemsCount();
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
    

  

  

  // function decreaseCartQuantity(id: number): void {
  //   setCartItems(currItems => {
  //     if (!currItems) return null;

  //     const item = currItems.find(item => item.id === id);
  //     if (!item || item.quantity === 1) {
  //       return currItems.filter(item => item.id !== id);
  //     } else {
  //       return currItems.map(item =>
  //         item.id === id ? { ...item, quantity: item.quantity! - 1 } : item
  //       );
  //     }
  //   });
  // }

  async function removeFromCart(id: number) : Promise<void> {
    try {
      const response = await api.delete(`/cart/${id}`)
      console.log(response.body)
    } catch(error) {
      return console.log(error)
    }
  
  
  
  }




  // function removeFromCart(id: number): void {
  //   setCartItems(currItems => currItems?.filter(item => item.id !== id) || null);
  // }
  
//   function getItemQuantity(id: number){
//     return cartItems.find(item => item.id === id)?.quantity || 0
//   }
//   function increaseCartQuantity(id: number) {
//     setCartItems(currItems => {
//       if (currItems.find(item => item.id === id) == null) {
//         return [...currItems, { id, quantity: 1 }]
//       } else {
//         return currItems.map(item => {
//           if (item.id === id) {
//             return { ...item, quantity: item.quantity + 1 }
//           } else {
//             return item
//           }
//         })
//       }
//     })
//   }
//   function decreaseCartQuantity(id: number) {
//     setCartItems(currItems => {
//       if (currItems.find(item => item.id === id)?.quantity === 1) {
//         return currItems.filter(item => item.id !== id)
//       } else {
//         return currItems.map(item => {
//           if (item.id === id) {
//             return { ...item, quantity: item.quantity - 1 }
//           } else {
//             return item
//           }
//         })
//       }
//     })
//   }
//   function removeFromCart(id: number) {
//     setCartItems(currItems => {
//       return currItems.filter(item => item.id !== id)
//     })
//   }

  
  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        // getCartItems, 
        // getItemQuantity, 
        increaseCartQuantity,
        removeFromCart,
        // decreaseCartQuantity,
    }}>
    
      {children}
    </CartContext.Provider>
  )
}


export default CartProvider;
