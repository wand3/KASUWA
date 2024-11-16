import useFlash from "../../hooks/UseFlash";
import UseApi from "../../hooks/UseApi";
import InputField from "../Auth/FormInput";
import React, { useRef, useState, useEffect } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ImageUpload } from "../Auth/ImageUploads";
import Config from "../../config";


const baseUrl = Config.baseURL;
type FormErrorType = {
  product_name?: string;
  description?: string;
  price?: string;
  category?: number | string | undefined;
  quantity?: number | string;
};

type AddProductSchema = {
  product_name?: string;
  description?: string;
  price?: string;
  category_id?: number | string | undefined;
  quantity?: number | string;  
  product_images?: string[];
}
// product_name=data['product_name'],
//         description=data['description'],
//         price=data['price'],
//         category_id=data['category_id'],
//         quantity=data['quantity']
//     )

//     # Get the uploaded images
//     product_images 

export const AddProduct = ({} : AddProductSchema) => {
  const [formErrors, setFormErrors] = useState<FormErrorType>({});
  let [isOpen, setIsOpen] = useState(false)

  // image upload 
  const [images, setImages] = useState<File[] | []>([]);
  const [status, setStatus] = useState<'initial'| 'uploading'| 'success' | 'fail'>('initial')
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);

  const flash = useFlash();

  // dialog popup and close 
  function open() {
    setIsOpen(true)
  }
  function close() {
    setIsOpen(false)
  }

  const formData = new FormData();

  // handle image upload 
  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files){
  //     const files = event.target.files
  //     // setImages(files);

  //     setStatus('uploading');

  //     [...files].forEach((file) => {
  //       formData.append('files', file);
  //     });


  //     const selectedImages = Array.from(files);

  //     setImages(selectedImages);

  //     const imagePreviews = selectedImages.map((image) =>
  //       URL.createObjectURL(image)
  //     );
  //     setPreviewURLs(imagePreviews);
  //   }
  // };

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
    const product_image = productImageField.current ? productImageField.current.value : "";

    
  

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


    // Append all selected files to the FormData
    images?.forEach((image) => {
      formData.append("photos", image);
    });

    console.log(formData.get('category_id'))
  

    console.log('form subit test begin')

    try {
      console.log('try start')
      // const requestOptions = {
      //   method: "POST",
      //   body: formData,
      //   credentials: "include",
      //   'Access-Control-Allow-Origin': 'http://127.0.0.1:5000',

      // };
      
      // const response = await fetch(`${baseUrl}/api/product`, requestOptions);
      // const response  = api.post('/product', formData)
      const response = await fetch("http://127.0.0.1:5000/api/product", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust as needed
        },
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Product added successfully:", data);
      flash('Success', 'success')
      resetForm()

    } catch (error) {
      return console.log(error)
    }
  }

  const resetForm = () => {
    setImages([]);
    setPreviewURLs([]);
  };

  return (
    <>
      <Button
        onClick={open}
        className="flex select-none items-center gap-2 rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white shadow-md shadow-slate-900/10 transition-all hover:shadow-lg hover:shadow-slate-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      >
        Add product
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
                    name="category_id"
                    label="Product category"
                    type="number"
                    placeholder="category number"
                    error={formErrors.category?.toString()}
                    Fieldref={categoryIdField} />

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

            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default AddProduct;