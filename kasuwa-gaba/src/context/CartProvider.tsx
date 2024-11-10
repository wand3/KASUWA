import { createContext, ReactElement, useState, useEffect } from "react";
import UseApi from "../hooks/UseApi";

type CartSchema = {
  id?: number;
  product?: string;
  quantity?: number;
  shipping?: number;
}

export type CartContextType = {
  cartItems: CartSchema[] | null;
  cartQuantity: number
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  fetchCartItems: () => {}
}

export const CartContext = createContext({} as CartContextType);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const CartProvider = ( {children}: ChildrenType) => {
  const [ cartItems, setCartItems] = useState<CartSchema[] | null>([]);

  const api = UseApi();

  // Fetch products function
    const fetchCartItems = async () => {
        try {

            const response = await api.get('/cart');
            console.log(response.body)

            const data = await response.body;
            // setProducts(data); // Assume data is an array of products
            // Type assertion: assert that data is an array of ProductType
            if (Array.isArray(data)) {
                setCartItems(data as CartSchema[]); // Type assertion
            } else {
                throw new Error("Invalid data format");
            }
        } catch (error) {
            setCartItems(null); // Handle error state
        }
    };

    useEffect(() => {
        fetchCartItems(); // Fetch products on component mount
    }, []);


//   const cartQuantity = cartItems.reduce(
//     (quantity, item) => item.quantity + quantity,
//     0
//   )

  const cartQuantity = cartItems ? cartItems.reduce((quantity, item) => item.quantity! + quantity, 0) : 0;
  function getItemQuantity(id: number): number {
    return cartItems?.find(item => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number): void {
    setCartItems(currItems => {
      if (!currItems) return [{ id, quantity: 1 }];

      const item = currItems.find(item => item.id === id);
      if (!item) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map(item =>
          item.id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
        );
      }
    });
  }

  function decreaseCartQuantity(id: number): void {
    setCartItems(currItems => {
      if (!currItems) return null;

      const item = currItems.find(item => item.id === id);
      if (!item || item.quantity === 1) {
        return currItems.filter(item => item.id !== id);
      } else {
        return currItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity! - 1 } : item
        );
      }
    });
  }

  function removeFromCart(id: number): void {
    setCartItems(currItems => currItems?.filter(item => item.id !== id) || null);
  }
  
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
        getItemQuantity, 
        increaseCartQuantity,
        removeFromCart,
        decreaseCartQuantity,
        fetchCartItems
    }}>
    
      {children}
    </CartContext.Provider>
  )
}


export default CartProvider;