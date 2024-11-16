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
import { ProductType } from "../context/ProductProvider";


export const AdminEditProductPage = () => {
  const {id} = useParams();
  const [formErrors, setFormErrors] = useState<FormErrorType>({});
  const [ product, setProduct ] = useState<ProductType | null >();

  let [isOpen, setIsOpen] = useState(false)

  const [status, setStatus] = useState<'initial'| 'uploading'| 'success' | 'fail'>('initial')

  const flash = useFlash();
  const api = UseApi();
  

  // dialog popup and close 
  function open() {
    setIsOpen(true)
  }
  function close() {
    setIsOpen(false)
  }

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

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (product) {
      if (productNameField.current) productNameField.current.value = product.product_name || "";
      if (descriptionField.current) descriptionField.current.value = product.description || "";
      if (priceField.current) priceField.current.value = product.price;
      if (categoryIdField.current) categoryIdField.current.value = product.category_id || 0;
      if (quantityField.current) quantityField.current.value = product.quantity || "";
    }
  }, [product]);



  const handleSubmit = async (ev: React.FormEvent) => {

    ev.preventDefault();
    const product_name = productNameField.current ? productNameField.current.value : "";
    const description = descriptionField.current ? descriptionField.current.value : "";
    const price = priceField.current ? priceField.current.value : "";
    const category = categoryIdField.current ? categoryIdField.current.value : "";
    const quantity = quantityField.current ? quantityField.current.value : "";

    
  

    const errors: FormErrorType = {};
    if (!product_name){
      errors.product_name = "product name must be provided";
    }
    if (!description){
      errors.description = "product description must be provided";
    }
    if (!price){
      errors.price = "product price must be provided";
    }
    if (!category){
      errors.category = "product category must be provided";
    }
    if (!quantity){
      errors.quantity = "product quantity must be provided";
    }


    setFormErrors(errors);
    // if (Object.keys(errors).length > 0) {
    //   return;
    // }
    formData.append('product_name', product_name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category_id', category);
    formData.append('quantity', quantity);
    console.log('try start')


    console.log('form subit test begin')
  }


  return (
    <>
      <Jiki nav>
       <h1> edit pro</h1>
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