import AddProduct from "./AddProduct";
import useProducts from "../../hooks/UseProducts";
import Config from "../../config";
import { formatCurrency } from "../../utilities/formatCurrency";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/UseCart";
import { Key, useEffect } from "react";
import AddShipping from "./AddShipping";
import { Button } from "@headlessui/react";


export const AllShippings = () => {
  const { shippings } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    shippings
  })

  const edit = (id: number) => {
    return navigate(`/admin/edit/${id}`);
  };

  return (
    <>
      <div className="max-w-[90vw] mx-auto">
            <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
                <div className="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                    <div className="flex items-center justify-between ">
                        <div>
                            <h3 className="text-md font-semibold text-slate-800">Kasuwa Product List</h3>
                            <p className="text-slate-500 text-sm">Review and edit each Product</p>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                            <AddShipping />
                            <Button
                                onClick={open}
                                className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
                            >
                                View Shipping
                            </Button>
                        </div>
                    </div>
                
                </div>
            </div>

            <div className="p-0 overflow-scroll">
                <table className="w-full mt-4 text-left table-auto min-w-max">
                  <thead>
                    <tr>
                        <th
                            className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                            <p
                            className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                            SHipping method
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
                    { shippings?.map((shipping: { id: Key | null | undefined; }) => (
                        <tr key={shippings.id}>
                            <td className="p-4 border-b border-slate-200">
                                <div className="flex items-center gap-3">
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold text-slate-700">
                                    {shippings.shipping_method_name}
                                    </p>
                    
                                </div>
                                </div>
                            </td>
                            <td className="p-4 border-b border-slate-200">
                                <div className="flex flex-col">
                                <p className="text-sm font-semibold text-slate-700">
                                    {shippings.shipping_price}

                                </p>
                        
                                </div>
                            </td>
                            
                            <td className="p-4 border-b border-slate-200">
                                <button
                                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button" >
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                    className="w-4 h-4">
                                    <path
                                        d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z">
                                    </path>
                                    </svg>
                                </span>
                                </button>
                                <button
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

    </>
  )

}

export default AllShippings;