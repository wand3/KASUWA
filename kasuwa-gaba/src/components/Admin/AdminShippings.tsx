import AddProduct from "./AddProduct";
import useProducts from "../../hooks/UseProducts";
import Config from "../../config";
import { formatCurrency } from "../../utilities/formatCurrency";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { TrashIcon } from "@heroicons/react/24/solid";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useFlash from "../../hooks/UseFlash";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import AddShipping, { AddShippingSchema } from "./AddShipping";
import UseApi from "../../hooks/UseApi";
import { useRef } from "react";
import InputField from "../Auth/FormInput";



export const AllShippings = () => {
  let [shippings, setShippings] = useState<AddShippingSchema | null>();
  let [isOpen, setIsOpen] = useState(false) 
  const [shippingMethodName, setShippingMethodName] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [formErrors, setFormErrors] = useState<FormShippingErrorType>({});


  const [shippingPrice, setShippingPrice] = useState("");

  const api = UseApi();
  const flash = useFlash();
  const navigate = useNavigate();


  useEffect(() => {
    getShipping();
  }, [])

  async function getShipping() {
    try {
      const response = await api.get<AddShippingSchema>(`/shipping`)
      console.log(response.body)
      const data = response.body
      if (Array.isArray(data)) {
        // setProducts(data as ProductType[]);
        setShippings(data)

      }
      // flash('Item removed!', 'success')
      // fetchCartItems()
      console.log(`shippings ${shippings}`)
    } catch(error) {
      return console.log(error)
    }
  
  }
  // delete product
  const deleteShipping = async (id: number) => {
    try {
      const response = await api.delete(`/admin/shipping/${id}`)
      console.log(response.status)
      flash('Product deleted!', 'success')
      getShipping()
    } catch(error) {
      flash('Delete failed', 'error')

      return console.log(error)
    }
  }
  
  const shippingNameField= useRef<HTMLInputElement>(null);
  const priceField = useRef<HTMLInputElement>(null);
  const deliveryTimeField = useRef<HTMLInputElement>(null);


  return (
    <>

       <div className="h-auto w-full pt-12 px-4">
        <div className="mx-auto w-full max-w divide-y divide-white/5 rounded-xl bg-white/5">
        
          <Disclosure as="div" className="p-6" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-lg/6 font-medium text-white group-data-[hover]:text-white/80">
                <h3 className="text-md font-semibold ">Kasuwa Shipping Options</h3>
              </span>
              <AddShipping />
              <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
              <div className="max-w-[90vw] mx-auto">
                <div className="p-0 overflow-scroll">
                    <table className="w-full mt-4 text-left table-auto min-w-max">
                      <thead>
                        <tr>
                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                Shipping method
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                </svg>
                                </p>
                            </th>
                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                Shipping Price
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                </svg>
                                </p>
                            </th>
                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                Delivery date
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                    stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                </svg>
                                </p>
                            </th>
                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                </p>
                            </th>
                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                </p>
                            </th>

                        </tr>
                      </thead>

                      <tbody>
                        { shippings?.map((shipping: {
                            delivery_time: ReactNode;
                            shipping_price: ReactNode; id: Key | null | undefined; shipping_method_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; 
    }) => (
                            <tr key={shipping.id}>
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex items-center gap-3">
                                    <div className="flex flex-col">
                                        <p className="text-sm font-semibold text-slate-700">
                                        {shipping.shipping_method_name}
                                        </p>
                        
                                    </div>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex flex-col">
                                    <p className="text-sm font-semibold text-slate-700">
                                        {formatCurrency(shipping.shipping_price)}

                                    </p>
                            
                                    </div>
                                </td>
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex flex-col">
                                    <p className="text-sm font-semibold text-slate-700">
                                        {shipping.delivery_time}

                                    </p>
                            
                                    </div>
                                </td>
                                
                                <td className="p-4 border-b border-slate-200">
                                      <button
                                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                      type="button" >
                                        <Link to={`/admin/shipping/${shipping.id}`}>
                                          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                              className="w-4 h-4">
                                              <path
                                                  d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                              </path>
                                              </svg>
                                          </span>
                                        </Link>
                                      </button>
                                    <button onClick={() => {deleteShipping(shipping.id)}}
                                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button" >
                                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                        <TrashIcon className="h-4 w-4 cursor-pointer hover:text-red-500" />

                                    </span>
                                    </button>
                                    
                                </td>
                            </tr>
                            ))
                        }
                      </tbody>
                    
                    </table>

                </div>

              </div>
            </DisclosurePanel>
          
          </Disclosure>

        </div>  
      </div>
      
      

    </>
  )

}

export default AllShippings;