// const Cart = () => {
//     return (
//         <div>Cart</div>
//     )
// }

// export default Cart;
//

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  product_name: string;
  price?: number; // Mark price as optional
}

interface CartItem {
  id: number;
  product: Product | null; // Product can be null
  quantity: number;
  shipping: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0); // State for total price
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/cart", {
          method: "GET",
          headers: {
            Authorization: `Bearer 39311bce5ca76204100b120f70941db2`, // Adjust as needed
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items);
          setTotalPrice(data.total); // Set total price directly from API response
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to load cart");
        }
      } catch (err) {
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-md mx-auto p-4 mt-12 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4">
                <p className="text-lg font-bold">
                  Product:{" "}
                  {item.product?.product_name || "Product not available"}
                </p>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
                <p className="text-gray-500">
                  Price:{" "}
                  {item.product?.price !== undefined
                    ? `${(item.product.price * item.quantity).toFixed(2)}`
                    : "N/A"}
                </p>
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-bold mb-4">
            Total Price: ${totalPrice.toFixed(2)}
          </h3>
          <Link to="/check">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Proceed to Checkoutx
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
