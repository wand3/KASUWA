import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState, useEffect } from "react";
import UseApi from "../hooks/UseApi";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, ArrowDownRightIcon } from "@heroicons/react/24/solid";
import useFlash from "../hooks/UseFlash";
import { useCart } from "../hooks/UseCart";
import { AddShippingSchema } from "./Admin/AddShipping";
import Product from "./KasuwaItem";


type productId = { 
  id:number;
  shippingId:number;
}

export const SelectShipping = ( {id, shippingId}:productId ) => {
  const [isOpen, setIsOpen] = useState(false);
  const { shippings, updateShippingMethod } = useCart();  
  const [prodId , setProductId ] = useState<number>(0)
  const [shipId , setShippingId ] = useState<number>(0)
  const [selectedShipping, setSelectedShipping] = useState<AddShippingSchema | null>(shippings[0] || null);


  // Open and close dialog functions
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  useEffect(() => {
    // onLoad;
    setShippingId(shippingId)
    console.log(`shipping onload ${id}`)
    // console.log(`shipping id ${shippingId}`)

    setProductId(id);
    console.log(`shipping id ---------after set`)
    // console.log(`shipping id ${id}`)
    // console.log(`shipping id ${shippingId}`)

  
  })

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

  
  }

  const onLoad = async (shipping: AddShippingSchema) => {
    // shipping.id = shipId
    setSelectedShipping(shipping)
    // selectedShipping(shippingId)
  
  }

  const handleShippingChange = async (shipping: AddShippingSchema) => {
    setSelectedShipping(shipping);
    console.log(prodId)
    try {
      await updateShippingMethod(prodId, shipping?.id);
      closeDialog();
    } catch (error) {
      console.error("Failed to update shipping method", error);
    }
  };

  return (
    <>
      <button onClick={openDialog}>
        <ArrowDownRightIcon className="h-4 w-4 pl-1 text-gray-700 inline-block hover:text-amber-500" />
      </button>
      
      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeDialog}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center backdrop-blur-sm p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-slate-400/50 p-6 backdrop-blur-2xl drop-shadow-lg duration-300 ease-out"
            >
              <div className="inside-dialog-text-div-heading">
                <DialogTitle as="h2">Shipping Methods <span className="flex absolute top-0 right-0 p-4 justify-end "><Button
                  className=" items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600"
                  onClick={closeDialog}
                >
                  X
                </Button></span></DialogTitle>
              </div>
              
              {shippings?.length === 0 ? (
                <p className="inside-dialog-text-div-paragraph mt-2 text-sm text-white/50">No shipping methods available.</p>
              ) : (
                <div className="w-full px-4 py-4">
                  <div className="mx-auto w-full max-w-md">
                    <form onSubmit={onSubmit}>
                      <RadioGroup
                        value={selectedShipping}
                        onChange={(shipping) => handleShippingChange(shipping)}
                        aria-label="Select Shipping Method"
                        className="space-y-2"
                      >
                        {shippings?.map((shipping: {
                          delivery_time: ReactNode; id: Key | null | undefined; shipping_method_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; shipping_price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; 
  }) => (
                          <Radio
                            key={shipping.id}
                            value={shipping}
                            className="select-radio-background group relative flex cursor-pointer rounded-lg py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                          >
                            <div className="flex text-slate-900 w-full items-center justify-between">
                              <div className="text-sm">
                                <p className="font-bold text-md">{shipping.shipping_method_name}</p>
                                <div className="gap-2">
                                  <p className="block">Price: {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(shipping?.shipping_price)}</p>
                                  <p className="block">Item arrives in {shipping?.delivery_time} days</p>
                                </div>
                              </div>
                              <CheckCircleIcon className="size-6 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
                            </div>
                          </Radio>
                        ))}
                      </RadioGroup>
                    </form>
                  </div>
                </div>
              )}
              
                
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SelectShipping;
