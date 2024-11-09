import Jiki from "../components/Jiki";
import React from "react";
import AddProduct from "../components/Admin/AddProduct";


export const AdminPage = () => {

  return (
    <>
      <Jiki nav>
        <AddProduct />
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
    

    

  