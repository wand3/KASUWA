import Jiki from "../components/Jiki";
import React from "react";
import AddProduct from "../components/Admin/AddProduct";
import AddShipping from "../components/Admin/AddShipping";
import useProducts from "../hooks/UseProducts";


export const AdminPage = () => {
  const products = useProducts();
  
  return (
    <>
      <Jiki nav>
        <AddProduct />
        <AddShipping />


        <h3>AdminPage page</h3>
      </Jiki>
      
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
    

    

  