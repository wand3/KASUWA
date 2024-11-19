import useFlash from "../../hooks/UseFlash";
import UseApi from "../../hooks/UseApi";
import InputField from "../../components/Auth/FormInput";
import React, { useRef, useState, useEffect } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ImageUpload } from "../../components/Auth/ImageUploads";
import Config from "../../config";
import Jiki from "../../components/Jiki";
import { useParams } from "react-router-dom";
// import useProducts from "../../hooks/UseProducts";
import { ProductType } from "../../context/ProductProvider";
import { FormErrorType } from "../../components/Admin/AddProduct";
// import ProductImageSelector from "../components/Admin/UpdateDefaultImage";


export const AdminEditProductPage = () => {
  const {id} = useParams();
  const [formErrors, setFormErrors] = useState<FormErrorType>({});
  const [ product, setProduct ] = useState<ProductType | null >();

  // image upload 
  const [images, setImages] = useState<File[] | []>([]);
  const [status, setStatus] = useState<'initial'| 'uploading'| 'success' | 'fail'>('initial')
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);

  
  const flash = useFlash();
  const api = UseApi();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages((prevFiles) => [...prevFiles, ...files]);
    setPreviewURLs((prevPreviews) => [
      ...prevPreviews,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  // remove image from preview 
  const handleRemoveImage = (index: number) => {
    if (images) {
      setImages(images.filter((_, i) => i !== index));
      setPreviewURLs(previewURLs.filter((_, i) => i !== index));
    }
  };


  // get product function
  const getProduct = async () => {
    try {
      const response = await api.get<ProductType>(`/product/${id}`);
      console.log("api.get");

      const data = response.body;
      console.log(data)
      setProduct(data); // Type assertion
    } catch (error) {
      setProduct(null); // Handle error state
    }
  };

  const formData = new FormData();

  const productNameField = useRef<HTMLInputElement>(null);
  const descriptionField = useRef<HTMLInputElement>(null);
  const priceField = useRef<HTMLInputElement>(null);
  const categoryIdField = useRef<HTMLInputElement>(null);
  const quantityField = useRef<HTMLInputElement>(null);
  const productImageField = useRef<HTMLInputElement>(null);


  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (product) {
      if (productNameField.current) productNameField.current.value = product.product_name || "";
      if (descriptionField.current) descriptionField.current.value = product.description || "";
      if (priceField.current) priceField.current.value = product.price || 0;
      if (categoryIdField.current) categoryIdField.current.value = product.category_id || 0;
      if (quantityField.current) quantityField.current.value = product.quantity || "";
    }
  }, [product]);





  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("product_name", productNameField.current?.value || "");
    formData.append("description", descriptionField.current?.value || "");
    formData.append("price", priceField.current?.value || "");
    formData.append("category_id", categoryIdField.current?.value || "");
    if (quantityField.current?.value) {
      formData.append("quantity", quantityField.current.value);
    }

    images.forEach((image) => {
      formData.append("photos", image);
    });

    try {
      const response = await fetch(`${Config.baseURL}/api/product/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData, // No need to set Content-Type
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      const data = await response.json();
      flash('uploaded', 'success')
      console.log(data);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };


  const resetForm = () => {
    setPreviewURLs([]);
  };

  return (
    <>
      <Jiki nav>
        <form onSubmit={handleSubmit}>
                  
            <InputField
              name="product_name"
              label="Product name"
              type="name"
              placeholder="Enter Product name"
              error={formErrors.product_name}
              Fieldref={productNameField} />

            <InputField
              name="description"
              label="Product description"
              type="name"
              placeholder="Enter product description"
              error={formErrors.description}
              Fieldref={descriptionField} />


            <InputField
              name="price"
              label="Product price"
              type="decimal"
              placeholder="12334"
              error={formErrors.price}
              Fieldref={priceField} />

            
            <InputField
              name="category_id"
              label="Product category"
              type="number"
              placeholder="category number"
              error={formErrors.category?.toString()}
              Fieldref={categoryIdField} />


            <p className="text-1xl mt-3 block pl-2 font-bold">Product Images </p>
            <div className="flex gap-4 justify-start px-5 my-3">
              {product?.product_images.map((image, index) => (

                <img
                  key={index}
                  src={`${Config.baseURL}/static/images/product_images/${image}`} // Assuming images are stored relative to API base URL
                  alt={`Product Image ${index + 1}`}
                  className="h-32 w-32 object-cover rounded-md"
                />

              ))}
            </div>

            <ImageUpload  multiple={true} Fieldref={productImageField} onChange={handleImageUpload} />

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {previewURLs.map((url, index) => (
                  <div key={index} className="relative group p-2">
                    <img src={url} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 px-2 my-3 mr-[7%] text-white bg-red-600 hover:bg-red-700 p-1 rounded-lg lg:opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            
          <Button
            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
            type="submit"
          >
            Submit
          </Button>
        
        </form>

      </Jiki>
    </>
  )
}

export default AdminEditProductPage;