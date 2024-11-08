import useFlash from "../../hooks/UseFlash";
import UseApi from "../../hooks/UseApi";
import InputField from "../Auth/FormInput";
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import { ImageUpload } from "../Auth/ImageUploads";


type FormErrorType = {
  product_name?: string;
  description?: string;
  price?: string;
  category?: number | string | undefined;
  quantity?: number | string;
  product_images?: string[];
};

// product_name=data['product_name'],
//         description=data['description'],
//         price=data['price'],
//         category_id=data['category_id'],
//         quantity=data['quantity']
//     )

//     # Get the uploaded images
//     product_images 

export const AddProduct = () => {
  const [formErrors, setFormErrors] = useState<FormErrorType>({});
  let [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }
  const flash = useFlash();


  const productNameField = useRef<HTMLInputElement>(null);
  const descriptionField = useRef<HTMLInputElement>(null);
  const priceField = useRef<HTMLInputElement>(null);
  const categoryIdField = useRef<HTMLInputElement>(null);
  const quantityField = useRef<HTMLInputElement>(null);

  const productImageField = useRef<HTMLInputElement>(null);




  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const product_name = productNameField.current ? productNameField.current.value : "";
    const description = descriptionField.current ? descriptionField.current.value : "";
    const price = priceField.current ? priceField.current.value : "";
    const category = categoryIdField.current ? categoryIdField.current.value : "";
    const quantity = quantityField.current ? quantityField.current.value : "";
    // const product_image = productImageField.current ? productImageField.current.value : "";



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
    if (Object.keys(errors).length > 0){
      return;
    }
    
    console.log('form subit test')



  }

  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Open dialog
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white justify-center">
                Add new product
              </DialogTitle>

              <form onSubmit={handleSubmit}>
                
                {/* <Field> */}
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
                    name="category"
                    label="Product category"
                    type="number"
                    placeholder="category number"
                    error={formErrors.category?.toString()}
                    Fieldref={categoryIdField} />

                  <ImageUpload />
                  
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    type="submit"
                  >
                    Submit
                  </Button>
              
              </form>

            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default AddProduct;