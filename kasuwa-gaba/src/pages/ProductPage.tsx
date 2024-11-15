import React from "react";
import { useState, useEffect } from "react";
import UseApi from "../hooks/UseApi";
import { useParams } from "react-router-dom";
import useProducts from "../hooks/UseProducts";
import { ProductType } from "../context/ProductProvider";
import ProductPart from "../components/Product/Product";
import RecommendedPart from "../components/Product/Recommended";
import ReviewPart from "../components/Product/Reviews";

export const ProductPage = () => {
  const { id } = useParams();
  
  return (
    <>
      <h1>Product Page</h1>
      <ProductPart />
      <ReviewPart />
      <RecommendedPart />
    </>
  
  )


}

export default ProductPage;