import useFlash from "../../hooks/UseFlash";
import UseApi from "../../hooks/UseApi";
import InputField from "../../components/Auth/FormInput";
import React, { useRef, useState, useEffect } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Config from "../../config";
import Jiki from "../../components/Jiki";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AddShippingSchema, FormShippingErrorType } from "../../components/Admin/AddShipping";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import AdminPage from "./AdminPage";


export const AdminEditShippingPage = () => {
  const {id} = useParams();
  const [formErrors, setFormErrors] = useState<FormShippingErrorType>({});
  const [ shipping, setShipping ] = useState<AddShippingSchema | null >();

  const [status, setStatus] = useState<'initial'| 'uploading'| 'success' | 'fail'>('initial')

  
  const flash = useFlash();
  const api = UseApi();
  const navigate = useNavigate();


  // back button 
  const goBack = () => {
    return navigate(-1);
  }


  // get product function
  const getShipping = async () => {
    try {
      const response = await api.get<AddShippingSchema>(`/admin/shipping/${id}`);
      console.log("api.get");

      const data = response.body;
      console.log(data)
      setShipping(data); 

    } catch (error) {
      setShipping(null); // Handle error state
    }
  };

  const formData = new FormData();

  const shippingNameField = useRef<HTMLInputElement>(null);
  const shippingPriceField = useRef<HTMLInputElement>(null);
  const deliveryTimeField = useRef<HTMLInputElement>(null);
  

  useEffect(() => {
    getShipping();
    console.log(shipping)
  }, []);


  useEffect(() => {
    if (shipping) {
      if (shippingNameField.current) shippingNameField.current.value = shipping.shipping_method_name || "";
      if (shippingPriceField.current) shippingPriceField.current.value = shipping.shipping_price || '';
      if (deliveryTimeField.current) deliveryTimeField.current.value = shipping.delivery_time || '';
    }
  }, [shipping]);


  
   
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const shipping_method_name = shippingNameField.current ? shippingNameField.current.value : "";
    const shipping_price = shippingPriceField.current ? shippingPriceField.current.value : "";
    const delivery_time = deliveryTimeField.current ? deliveryTimeField.current.value : "";

    // const formData = new FormData();
    formData.append("shipping_method_name", shippingNameField.current?.value || '');
    formData.append("shipping_price", shippingPriceField.current?.value || '');
    formData.append("delivery_time", deliveryTimeField.current?.value || '');

    
    // setShippingMethodName(shipping_method_name);
    // setDeliveryTime(delivery_time);
    // setShippingPrice(shippingPrice);

    // const errors: FormShippingErrorType = {};
    const errors: FormShippingErrorType = {};
    if (!shipping_method_name){
      errors.shipping_method_name = "product name must be provided";
    }
    if (!shipping_price){
      errors.shipping_price = "product price must be provided";
    }
    if (!delivery_time){
      errors.delivery_time = "delivery period must be provided";
    }
    
    setFormErrors(errors);

    try {

      const response = await api.put(`/admin/shipping/${id}`, {
        shipping_method_name: shippingNameField.current ? shippingNameField.current.value : "",
        shipping_price: shippingPriceField.current ? shippingPriceField.current.value : "",
        delivery_time: deliveryTimeField.current ? deliveryTimeField.current.value : ""
      });
      console.log(response)
      if (!response.ok) {
        const errorData = response.errors;
        throw new Error(errorData?.json || "Shipping Update Failed");
      }

      const data = await response.data;
      flash('Shipping Updated!', 'success')
      console.log(data);
    } catch (error) {
      console.error("Error updating shipping:", error);
      alert("Failed to update shipping. Please try again.");
    }
  };


  return (
    <>
      <Jiki nav={true}>
        

        <div className="bg-[#eeeeeb] pb-20">
          <div className="p-6 backdrop-opacity-30 duration-300 ease-out flex justify-center">
            <button onClick={() => {goBack()}}>
              <span className="absolute m-2 top-[5%] md:top-[10%] md:ml-[-40px] hover:text-red-600"><ArrowLeftIcon className="w-6 h-6 font-extrabold"/>
              </span>
            </button>
            <div className="w-full max-w-md rounded-xl bg-[#F7F7F7] h-fit mt-[20%] md:mt-[10%]">
                <div className="min-w-[50%] min-h-[50%] items-center justify-between p-4">
                  
                  <h3 className="flex text-base/10 pb-4 font-medium text-slate-800 justify-center">
                      Update Shipping Method
                  </h3>
                    
                      <form onSubmit={handleSubmit} className="text-slate-800">
                      
                      {/* <Field> */}
                          <InputField
                          name="shipping_method_name"
                          label="Shipping name"
                          type="name"
                          placeholder="Enter Product name"
                          error={formErrors.shipping_method_name}
                          Fieldref={shippingNameField} />


                          <InputField
                          name="shipping_price"
                          label="Shipping price"
                          type="decimal"
                          placeholder="1 2 3 4 .."
                          error={formErrors.shipping_price?.toString()}
                          Fieldref={shippingPriceField} />

                          
                          <InputField
                          name="delivery_time"
                          label="Delivery Time"
                          type="number"
                          placeholder="number of day(s) before arrival"
                          error={formErrors.delivery_time}
                          Fieldref={deliveryTimeField} />


                          
                          <div className="flex justify-end pr-3 pt-3">
                            <Button
                                className="gap-2 rounded-md bg-gray-700 py-2 px-5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                type="submit"
                            >
                                Submit
                            </Button>
                          </div>
                    
                      </form>
                                  
                </div>
            </div>
          </div>             
        </div>


      </Jiki>
    </>
  )
}

export default AdminEditShippingPage;