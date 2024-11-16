import useFlash from "../hooks/UseFlash";
import UseApi from "../hooks/UseApi";
import InputField from "../components/Auth/FormInput";
import React, { useRef, useState, useEffect } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ImageUpload } from "../components/Auth/ImageUploads";
import Config from "../config";
import Jiki from "../components/Jiki";
import { useParams } from "react-router-dom";
import useProducts from "../hooks/UseProducts";

// product_name=data['product_name'],
//         description=data['description'],
//         price=data['price'],
//         category_id=data['category_id'],
//         quantity=data['quantity']
//     )

//     # Get the uploaded images
//     product_images 

export const AdminEditProductPage = () => {
//   const id = useParams();
//   const [formErrors, setFormErrors] = useState<FormErrorType>({});
//   let [isOpen, setIsOpen] = useState(false)

//   // image upload 
//   const [images, setImages] = useState<File[] | []>([]);
//   const [status, setStatus] = useState<'initial'| 'uploading'| 'success' | 'fail'>('initial')
//   const [previewURLs, setPreviewURLs] = useState<string[]>([]);

//   const flash = useFlash();
  // const { editProduct } = useProducts();
  // useEffect(() => {
    
  // })

  // dialog popup and close 
//   function open() {
//     setIsOpen(true)
//   }
//   function close() {
//     setIsOpen(false)
//   }

//   const formData = new FormData();

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     setImages((prevFiles) => [...prevFiles, ...files]);
//     setPreviewURLs((prevPreviews) => [
//       ...prevPreviews,
//       ...files.map((file) => URL.createObjectURL(file)),
//     ]);
//   };

//   // remove image from preview 
//   const handleRemoveImage = (index: number) => {
//     if (images) {
//       setImages(images.filter((_, i) => i !== index));
//       setPreviewURLs(previewURLs.filter((_, i) => i !== index));
//     }
//   };

//   const productNameField = useRef<HTMLInputElement>(null);
//   const descriptionField = useRef<HTMLInputElement>(null);
//   const priceField = useRef<HTMLInputElement>(null);
//   const categoryIdField = useRef<HTMLInputElement>(null);
//   const quantityField = useRef<HTMLInputElement>(null);

//   const productImageField = useRef<HTMLInputElement>(null);

//   const handleSubmit = async (ev: React.FormEvent) => {

//     ev.preventDefault();
//     const product_name = productNameField.current ? productNameField.current.value : "";
//     const description = descriptionField.current ? descriptionField.current.value : "";
//     const price = priceField.current ? priceField.current.value : "";
//     const category = categoryIdField.current ? categoryIdField.current.value : "";
//     const quantity = quantityField.current ? quantityField.current.value : "";
//     const product_image = productImageField.current ? productImageField.current.value : "";

    
  

//     const errors: FormErrorType = {};
//     if (!product_name){
//       errors.product_name = "product name must be provided";
//     }
//     if (!description){
//       errors.description = "product description must be provided";
//     }
//     if (!price){
//       errors.price = "product price must be provided";
//     }
//     if (!category){
//       errors.category = "product category must be provided";
//     }
//     if (!quantity){
//       errors.quantity = "product quantity must be provided";
//     }


//     setFormErrors(errors);
//     // if (Object.keys(errors).length > 0) {
//     //   return;
//     // }
//     formData.append('product_name', product_name);
//     formData.append('description', description);
//     formData.append('price', price);
//     formData.append('category_id', category);
//     formData.append('quantity', quantity);
//     console.log('try start')


//     // Append all selected files to the FormData
//     images?.forEach((image) => {
//       formData.append("photos", image);
//     });

//     console.log(formData.get('category_id'))
  

//     console.log('form subit test begin')

//     try {
//       console.log('try start')
//       // const requestOptions = {
//       //   method: "POST",
//       //   body: formData,
//       //   credentials: "include",
//       //   'Access-Control-Allow-Origin': 'http://127.0.0.1:5000',

//       // };
      
//       // const response = await fetch(`${baseUrl}/api/product`, requestOptions);
//       // const response  = api.post('/product', formData)
//       const response = await fetch("http://127.0.0.1:5000/api/product", {
//         method: "POST",
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust as needed
//         },
//       });
//       console.log(response)
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Product added successfully:", data);
//       flash('Success', 'success')
//       resetForm()

//     } catch (error) {
//       return console.log(error)
//     }
//   }

//   const resetForm = () => {
//     setImages([]);
//     setPreviewURLs([]);
//   };

  return (
    <>
      <Jiki nav>
       <h1> edit pro</h1>

      </Jiki>
    </>
  )
}

export default AdminEditProductPage;