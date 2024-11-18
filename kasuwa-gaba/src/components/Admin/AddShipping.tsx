import { useState, useRef } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Config from "../../config";
import useFlash from "../../hooks/UseFlash";
import UseApi from "../../hooks/UseApi";
import InputField from "../Auth/FormInput";
import { ImageUpload } from "../Auth/ImageUploads";


const baseUrl = Config.baseURL;

export type FormShippingErrorType = {
  shipping_method_name?: string;
  shipping_price?: number | string;
  delivery_time?: string;
}

export type AddShippingSchema = {
  [x: string]: any;
  id?: number;
  shipping_method_name?: string;
  shipping_price?: number | string;
  delivery_time?: string;
}


export const AddShipping = ({}: AddShippingSchema) => {
  const [formErrors, setFormErrors] = useState<FormShippingErrorType>({});
  let [isOpen, setIsOpen] = useState(false) 
  const [shippingMethodName, setShippingMethodName] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const [shippingPrice, setShippingPrice] = useState("");
  const flash = useFlash();
  const api = UseApi()

  // dialog popup and close 
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }
  const formData = new FormData();

  const shippingNameField= useRef<HTMLInputElement>(null);
  const priceField = useRef<HTMLInputElement>(null);
  const deliveryTimeField = useRef<HTMLInputElement>(null);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    // const shipping_method_name = shippingNameField.current ? shippingNameField.current.value : "";
    // const shipping_price = priceField.current ? priceField.current.value : "";
    // const delivery_time = deliveryTimeField.current ? deliveryTimeField.current.value : "";
    const shipping_method_name = shippingNameField.current ? shippingNameField.current.value : "";
    const shipping_price = priceField.current ? priceField.current.value : "";
    const delivery_time = deliveryTimeField.current ? deliveryTimeField.current.value : "";

    setShippingMethodName(shipping_method_name);
    setDeliveryTime(delivery_time);
    setShippingPrice(shippingPrice);

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

    formData.append('shipping_method_name', shipping_method_name);
    formData.append('shipping_price', shipping_price);
    formData.append('delivery_time', delivery_time);
    
    console.log('server request and response')

    try {
      const response = await api.post('/admin/shipping', {
        shipping_method_name: shipping_method_name,
        shipping_price: shipping_price,
        delivery_time: delivery_time,
      });

      console.log(response.body)
      if (!response.ok) {
        flash('Enter Valid data!', 'danger')
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Product added successfully:", response.body);
      flash('New Shipping Added!', 'success')
      clearForm()
      close()

    } catch (error) {
      console.log(error)
    }
  
  }

  const clearForm = () => {
      setShippingMethodName("");
      setDeliveryTime("");
      setShippingPrice("");
    };
    

  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Create Shipping
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                <DialogTitle as="h2" className="text-base/10 font-medium text-white justify-center">
                    Add Shipping Methods
                </DialogTitle>
                
                <form onSubmit={handleSubmit}>
                
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
                    Fieldref={priceField} />

                    
                    <InputField
                    name="delivery_time"
                    label="Delivery Time"
                    type="number"
                    placeholder="number of day(s) before arrival"
                    error={formErrors.delivery_time}
                    Fieldref={deliveryTimeField} />


                    
                    <Button
                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
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


export default AddShipping;