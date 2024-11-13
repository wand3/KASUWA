import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { CartContextType } from "../context/CartProvider";


export const useCart = (): CartContextType => {
  return useContext(CartContext)

}