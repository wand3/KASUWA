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
import UseApi from "../../hooks/UseApi";
import { useRef } from "react";
import AddCategory, {AddCategorySchema, FormCategoryErrorType, CategorySchema} from "./AddCategory";



export const AllCategories = () => {
  let [categories, setCategories] = useState<CategorySchema[]>([]);
  let [isOpen, setIsOpen] = useState(false) 
  const [shippingMethodName, setShippingMethodName] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [formErrors, setFormErrors] = useState<FormCategoryErrorType>({});


  const [shippingPrice, setShippingPrice] = useState("");

  const api = UseApi();
  const flash = useFlash();
  const navigate = useNavigate();


  useEffect(() => {
    getCategory();
  }, [])

  async function getCategory() {
    try {
      const response = await api.get<AddCategorySchema>(`/categories`)
      console.log(response.body)
      const data = response.body
      setCategories(data.categories)

      console.log(`categories ${categories}`)
    } catch(error) {
      return console.log(error)
    }
  
  }
  // delete product
  const deleteCategory = async (id: number) => {
    try {
      const response = await api.delete(`/admin/category/${id}`)
      console.log(response.status)
      flash('Category deleted!', 'success')
      getCategory()
    } catch(error) {
      flash('Delete failed', 'error')

      return console.log(error)
    }
  }
  
//   const categoryNameField= useRef<HTMLInputElement>(null);


  return (
    <>

       <div className="h-auto w-full pt-12 px-4">
        <div className="mx-auto w-full max-w divide-y divide-white/5 rounded-xl bg-white/5">
        
          <Disclosure as="div" className="background-light p-6" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className=" font-medium group-data-[hover]:text-slate-900">
                <h3 className="font-semibold text-wrap">Kasuwa Category Options</h3>
              </span>
              <AddCategory />
              <ChevronDownIcon className="size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5 background-light">
              <div className="max-w-[90vw] mx-auto">
                <div className="p-0 overflow-scroll">
                    <table className="w-full mt-4 text-left table-auto min-w-max">
                      <thead>
                        <tr>
                            <th
                                className="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                <p
                                className="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                Category Name
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
                        { categories.map((category) => (
                            <tr key={category.id}>
                                <td className="p-4 border-b border-slate-200">
                                    <div className="flex items-center gap-3">
                                    <div className="flex flex-col">
                                        <p className="text-sm font-semibold text-slate-700">
                                        {category.category_name}
                                        </p>
                        
                                    </div>
                                    </div>
                                </td>
                                
                                
                                
                                <td className="p-4 border-b border-slate-200 justify-end">
                                      <button
                                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                      type="button" >
                                        <Link to={`/admin/category/${category.id}`}>
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
                                    <button onClick={() => {deleteCategory(category.id)}}
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

export default AllCategories;