// import useProducts from "../hooks/UseProducts";
// import { ReactElement } from "react";
// import Product from "./KasuwaItem";
import { useCart } from "../hooks/UseCart";
import CartItem from "./CartItem";
// import { CartSchema } from "../context/CartProvider";


export const CartItems = () => {
  const {cartItems} = useCart();


  return (
    <>
        {/* {cartItems?.items.map(item => ( */}
              
          {/* // <Cart key={item.id} {...item} />
          // ))} */}
    </>
  )


}

export default CartItems;
// export const CartItems = () => {
//   const {cartItems} = UseCart();
//   const {products} = useProducts();


//   let pageContent: ReactElement | ReactElement[] = <p>Loading...</p>
//   const items = cartItems?.values

//   if (items?.length) {
//       pageContent = items.map(item => {

//           return (
//               <CartItem
//                   key={item.id}
//                   cart={item.items}
//               />
//           )
//       })
//     }

//     const content = (
//         <main className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//             {pageContent}
//         </main>
//     )

//     return content


// }


// export default CartItems;