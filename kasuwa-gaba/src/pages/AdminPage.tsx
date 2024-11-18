import Jiki from "../components/Jiki";
import React from "react";
import AddShipping from "../components/Admin/AddShipping";
import useProducts from "../hooks/UseProducts";
import AllProducts from "../components/Admin/AdminProducts";
// import AllShipping from "../components/Admin/Shippings";
import { ProductsProvider } from "../context/ProductProvider";
import AllShippings from "../components/Admin/AdminShippings";


export const AdminPage = () => {
  const products = useProducts();
  
  return (
    <>
      <ProductsProvider>
        <Jiki nav>
          <AddShipping />

          <AllProducts />
          {/* <AddShipping /> */}
          <AllShippings />


        </Jiki>
      </ProductsProvider>
    </>
  )
}

export default AdminPage;






  // const api = UseApi();

  


  
  // const handleImageUpload = async () => {
  //   if (images) {
  //     setStatus('uploading');

  //     const formData = new FormData();
  //     [...images].forEach((image) => {
  //       formData.append('images', image);
  //     });


  //     const selectedImages = Array.from(images);

  //     setImages(selectedImages);

  //     const imagePreviews = selectedImages.map((image) =>
  //       URL.createObjectURL(image)
  //     );
  //     setPreviewURLs(imagePreviews);

  //     }
  
    
  
  // }
    

    

  