import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import UseApi from "../hooks/UseApi";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, ArrowDownRightIcon } from "@heroicons/react/24/solid";
import useFlash from "../hooks/UseFlash";
import { useCart } from "../hooks/UseCart";
import { AddShippingSchema } from "./Admin/AddShipping";

// interface ShippingOption {
//   id: number;
//   shipping_method_name: string;
//   shipping_price: number;
// }

export const SelectShipping = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { shippings } = useCart();  
  const [selectedShipping, setSelectedShipping] = useState<AddShippingSchema | null>(shippings[0] || null);

  // Open and close dialog functions
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

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
                <DialogTitle as="h3">Shipping Methods</DialogTitle>
              </div>
              
              {shippings?.length === 0 ? (
                <p className="inside-dialog-text-div-paragraph mt-2 text-sm text-white/50">No shipping methods available.</p>
              ) : (
                <div className="w-full px-4 py-4">
                  <div className="mx-auto w-full max-w-md">
                    <RadioGroup
                      value={selectedShipping}
                      onChange={setSelectedShipping}
                      aria-label="Select Shipping Method"
                      className="space-y-2"
                    >
                      {shippings?.map((shipping: {
                        delivery_time: ReactNode; id: Key | null | undefined; shipping_method_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; shipping_price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; 
}) => (
                        <Radio
                          key={shipping.id}
                          value={shipping}
                          className="group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
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
                  </div>
                </div>
              )}
              
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600"
                  onClick={closeDialog}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SelectShipping;
