import React from "react";
import { useState, useEffect } from "react";
import UseApi from "../hooks/UseApi";
import { useParams } from "react-router-dom";
import useProducts from "../hooks/UseProducts";
import { ProductType } from "../context/ProductProvider";
import ProductPart from "../components/Product/Product";
import RecommendedPart from "../components/Product/Recommended";
import ReviewPart from "../components/Product/Reviews";
import { formatCurrency } from "../utilities/formatCurrency";
import Config from "../config";
import Jiki from "../components/Jiki";

export const ProductPage = () => {
  const {id} = useParams();
  const api = UseApi();
  const { fetchproduct } = useProducts();
  const [product, setProduct] = useState<ProductType>();

  const [status, setStatus] = useState<'initial'| 'uploading'| 'success' | 'fail'>('initial')


  const loadProduct = async () => {
      try {
      const response = await api.get<ProductType>(`/product/${id}`);
      // console.log("api.get");

      // const data = response.body;
      // const response = fetchproduct(id);
      console.log("api.get");

      const data = response.body;
      console.log(data)
      setProduct(data); 

    } catch (error) {
      setProduct(null); // Handle error state
    }
    }
  useEffect( () => {
    loadProduct()
    
  
  }, [])
  
  return (
    <>
      <Jiki nav>
        <div className="font-sans">
              <div className="px-0 py-5 lg:max-w-6xl max-w-2xl max-lg:mx-auto">
                
                  <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-5 max-lg:gap-10">
                      <div className="w-full p-2 lg:sticky top-0 text-center pt-10">
                          <div className="lg:h-[560px]">
                              <img
                                src={`${Config.baseURL}/static/images/product_images/${product?.product_image}`} // Assuming images are stored relative to API base URL
                                alt={`Product Image ${product?.product_image}`} 
                                className="lg:w-11/12 w-fit h-full rounded-md object-cover object-top" />
                          </div>

                          
                      </div>

                      <div className="pt-7 background-light rounded-t-[50px] rounded-b-[10px] pb-4">
                          <div className="flex flex-wrap items-start gap-4 px-2">
                              <div>
                                  <h2 className="text-lg font-bold text-gray-800">{product?.product_name}</h2>
                                  <p className="text-sm font-light text-gray-500 mt-2">{product?.description.slice(0, 300)}</p>
                              </div>

                              <div className="flex flex-wrap gap-4 justify-center mx-auto mt-4">
                                {product?.product_images.map((image, index) => (

                                  <img
                                    key={index}
                                    src={`${Config.baseURL}/static/images/product_images/${image}`} // Assuming images are stored relative to API base URL
                                    alt={`Product Image ${index + 1}`}
                                    className="w-16 cursor-pointer rounded-md"
                                  />

                                ))}

                              </div>

                              <div className="ml-auto flex flex-wrap gap-4">
                                  <button type="button" className="px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded-md flex items-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="12px" fill="currentColor" className="mr-1" viewBox="0 0 64 64">
                                          <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                                      </svg>
                                      100
                                  </button>
                              </div>
                          </div>

                          <hr className="my-4" />

                          <div className="flex flex-wrap gap-4 items-start px-3">
                              <div>
                                  <p className="text-gray-800 text-xl font-bold">{formatCurrency(product?.price)}</p>
                                  <p className="text-gray-500 text-sm mt-2"><span className="text-sm ml-1">In Stock</span></p>
                              </div>

                              <div className="flex flex-wrap gap-4 ml-auto">
                                  <button type="button" className="px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded-md flex items-center">
                                      <svg className="w-3 mr-1" fill="currentColor" viewBox="0 0 14 13"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                              d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                      </svg>
                                      4.8
                                  </button>
                                  <button type="button" className="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-md flex items-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 mr-1" fill="currentColor" viewBox="0 0 32 32">
                                          <path d="M14.236 21.954h-3.6c-.91 0-1.65-.74-1.65-1.65v-7.201c0-.91.74-1.65 1.65-1.65h3.6a.75.75 0 0 1 .75.75v9.001a.75.75 0 0 1-.75.75zm-3.6-9.001a.15.15 0 0 0-.15.15v7.2a.15.15 0 0 0 .15.151h2.85v-7.501z" data-original="#000000" />
                                          <path d="M20.52 21.954h-6.284a.75.75 0 0 1-.75-.75v-9.001c0-.257.132-.495.348-.633.017-.011 1.717-1.118 2.037-3.25.18-1.184 1.118-2.089 2.28-2.201a2.557 2.557 0 0 1 2.17.868c.489.56.71 1.305.609 2.042a9.468 9.468 0 0 1-.678 2.424h.943a2.56 2.56 0 0 1 1.918.862c.483.547.708 1.279.617 2.006l-.675 5.401a2.565 2.565 0 0 1-2.535 2.232zm-5.534-1.5h5.533a1.06 1.06 0 0 0 1.048-.922l.675-5.397a1.046 1.046 0 0 0-1.047-1.182h-2.16a.751.751 0 0 1-.648-1.13 8.147 8.147 0 0 0 1.057-3 1.059 1.059 0 0 0-.254-.852 1.057 1.057 0 0 0-.795-.365c-.577.052-.964.435-1.04.938-.326 2.163-1.71 3.507-2.369 4.036v7.874z" data-original="#000000" />
                                          <path d="M4 31.75a.75.75 0 0 1-.612-1.184c1.014-1.428 1.643-2.999 1.869-4.667.032-.241.055-.485.07-.719A14.701 14.701 0 0 1 1.25 15C1.25 6.867 7.867.25 16 .25S30.75 6.867 30.75 15 24.133 29.75 16 29.75a14.57 14.57 0 0 1-5.594-1.101c-2.179 2.045-4.61 2.81-6.281 3.09A.774.774 0 0 1 4 31.75zm12-30C8.694 1.75 2.75 7.694 2.75 15c0 3.52 1.375 6.845 3.872 9.362a.75.75 0 0 1 .217.55c-.01.373-.042.78-.095 1.186A11.715 11.715 0 0 1 5.58 29.83a10.387 10.387 0 0 0 3.898-2.37l.231-.23a.75.75 0 0 1 .84-.153A13.072 13.072 0 0 0 16 28.25c7.306 0 13.25-5.944 13.25-13.25S23.306 1.75 16 1.75z" data-original="#000000" />
                                      </svg>
                                      87 Reviews
                                  </button>
                              </div>
                          </div>

                          <hr className="my-4" />

                          <div className="px-3">
                              <h3 className="text-xl font-bold text-gray-800">Choose a Color</h3>
                              <div className="flex flex-wrap gap-4 mt-4">
                                  <button type="button" className="w-10 h-10 bg-black border border-white hover:border-gray-800 rounded-md shrink-0"></button>
                                  <button type="button" className="w-10 h-10 bg-gray-400 border border-white hover:border-gray-800 rounded-md shrink-0"></button>
                                  <button type="button" className="w-10 h-10 bg-orange-400 border border-white hover:border-gray-800 rounded-md shrink-0"></button>
                                  <button type="button" className="w-10 h-10 bg-red-400 border border-white hover:border-gray-800 rounded-md shrink-0"></button>
                              </div>
                          </div>

                          <hr className="my-4" />

                          <div className="flex flex-wrap gap-4 justify-center m-5">
                              <button type="button" className="min-w-[160px] px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded-md">Buy now</button>
                              <button type="button" className="min-w-[160px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-md">Add to cart</button>
                          </div>
                      </div>
                  </div>

                  <div className="mt-20 max-w-4xl">
                      <ul className="flex border-b">
                          <li
                              className="text-gray-800 font-semibold text-sm bg-gray-100 py-3 px-8 border-b-2 border-gray-800 cursor-pointer transition-all">
                              Description</li>
                          <li className="text-gray-500 font-semibold text-sm hover:bg-gray-100 py-3 px-8 cursor-pointer transition-all">Reviews</li>
                      </ul>

                      <div className="mt-8">
                          <h3 className="text-xl font-bold text-gray-800">Product Description</h3>
                          <p className="text-sm text-gray-500 mt-4">Elevate your casual style with our premium men's t-shirt. Crafted for comfort and designed with a modern fit, this versatile shirt is an essential addition to your wardrobe. The soft and breathable fabric ensures all-day comfort, making it perfect for everyday wear. Its classNameic crew neck and short sleeves offer a timeless look.</p>
                      </div>

                      <ul className="space-y-3 list-disc mt-6 pl-4 text-sm text-gray-500">
                          <li>A gray t-shirt is a wardrobe essential because it is so versatile.</li>
                          <li>Available in a wide range of sizes, from extra small to extra large, and even in tall and petite sizes.</li>
                          <li>This is easy to care for. They can usually be machine-washed and dried on low heat.</li>
                          <li>You can add your own designs, paintings, or embroidery to make it your own.</li>
                      </ul>
                  </div>
              </div>
          </div>
        <h1>Product Page</h1>
        <ProductPart />
        <ReviewPart />
        <RecommendedPart />
      </Jiki>
    </>
  
  )


}

export default ProductPage;