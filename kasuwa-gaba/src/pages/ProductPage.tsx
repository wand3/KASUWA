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
import ProductInfos from "../components/Product/ProductSpecification";

export const ProductPage = () => {
  const {id} = useParams();
  const api = UseApi();
  const { fetchproduct } = useProducts();
  const [product, setProduct] = useState<ProductType | null>(null);

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
                  <div className="grid items-start grid-cols-1 lg:grid-cols-2 ">
                      <div className="w-full p-2 top-0 text-center pt-10 mb-4">
                          <div className="lg:h-[560px]">
                              <img
                                src={`${Config.baseURL}/static/images/product_images/${product?.product_image}`} // Assuming images are stored relative to API base URL
                                alt={`Product Image ${product?.product_image}`} 
                                className="lg:w-11/12 w-fit h-full rounded-md object-cover object-top" />
                          </div>

                          
                      </div>

                      <div className="pt-7 background-light rounded-t-[50px] rounded-b-[10px] pb-4 px-3">
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
                                      {product?.reviews.length}
                                  </button>
                                  
                              </div>
                          </div>

                          <hr className="my-4" />

                          <div className="px-3">
                              <h3 className="text-xl font-bold text-gray-800">Choose a Color</h3>
                            <div className="flex flex-wrap gap-4 mt-4">
                              {product?.colors.map((color, index) =>(

                                
                                    <button type="button" className="w-10 h-10 gap-3 bg-black border border-white hover:border-gray-800 rounded-md shrink-0">
                                        <span className="block relative pt-10 text-slate-800">{color}</span>

                                        <img src={`${Config.baseURL}/static/images/product_images/${product?.product_images?.slice(0, -4)  }+ index`}/>
                                    </button>
                                    
                              ))}
                             </div>    
                         

                          <hr className="mt-10" />

                          <div className="flex flex-wrap gap-4 justify-center m-5">
                              <button type="button" className="min-w-[130px] px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded-md">Buy now</button>
                              <button type="button" className="min-w-[130px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-md">Add to cart</button>
                          </div>
                      </div>
                  </div>

                  <div className="mt-0 max-w-4xl p-2 block">
                      {product && (
                        <ProductInfos product={product} />
                        )}
                  </div>
              </div>
          </div>
        </div>
        <h1>Product Page</h1>
        <ReviewPart />
        <RecommendedPart />
      </Jiki>
    </>
  
  )


}

export default ProductPage;