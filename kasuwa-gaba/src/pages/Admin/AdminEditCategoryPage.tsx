import useFlash from "../../hooks/UseFlash";
import UseApi from "../../hooks/UseApi";
import InputField from "../../components/Auth/FormInput";
import React, { useRef, useState, useEffect } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Jiki from "../../components/Jiki";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddCategory, {AddCategorySchema, FormCategoryErrorType, CategorySchema} from "./AddCategory";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";


export const AdminEditCategoryPage = () => {
  const {id} = useParams();
  const [formErrors, setFormErrors] = useState<FormCategoryErrorType>({});
  const [ category, setCategory ] = useState<AddCategorySchema>([]);

  const [status, setStatus] = useState<'initial'| 'uploading'| 'success' | 'fail'>('initial')

  
  const flash = useFlash();
  const api = UseApi();
  const navigate = useNavigate();


  // back button 
  const goBack = () => {
    return navigate(-1);
  }


  // get product function
  const getCategory= async () => {
    try {
      const response = await api.get<AddCategorySchema>(`/admin/category/${id}`);
      console.log("api.get");

      const data = response.body;
      console.log(data)
      setCategory(data); 

    } catch (error) {
      setCategory([]); // Handle error state
    }
  };

  const formData = new FormData();

  const categoryNameField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCategory();
    console.log(category)
  }, []);


  useEffect(() => {
    if (category) {
      if (categoryNameField.current) categoryNameField.current.value = category.category_name || "";
    }
  }, [category]);


  
   
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const category_name = categoryNameField.current ? categoryNameField.current.value : "";
    
    // const formData = new FormData();
    formData.append("category_name", categoryNameField.current?.value || '');
    
    // const errors: FormShippingErrorType = {};
    const errors: FormCategoryErrorType = {};
    if (!category_name){
      errors.category_name = "product name must be provided";
    }
    
    
    setFormErrors(errors);

    try {

      const response = await api.put(`/admin/category/${id}`, {
        category_name: categoryNameField.current ? categoryNameField.current.value : "",
      });
      console.log(response)
      if (!response.ok) {
        const errorData = response.errors;
        throw new Error(errorData?.json || "Category Update Failed");
      }

      const data = await response.data;
      flash('Category Updated!', 'success')
      console.log(data);
    } catch (error) {
      console.error("Error updating shipping:", error);
      flash("Failed to update category. Please try again.", 'error');
    }
  };


  return (
    <>
      <Jiki nav={true}>
        

        <div className="p-6 backdrop-opacity-30 duration-300 ease-out h-screen flex justify-center py-7">
          <button onClick={() => {goBack()}}>
            <span className="absolute m-2 top-[5%] md:top-[10%] md:ml-[-40px] hover:text-red-600"><ArrowLeftIcon className="w-6 h-6 font-extrabold"/>
            </span>
          </button>
          <div className="w-full max-w-md rounded-xl bg-[#F7F7F7] h-fit mt-[20%] md:mt-[10%]">
              <div className="min-w-[50%] min-h-[50%] items-center justify-between p-4">
                
                <h3 className="flex text-base/10 pb-4 font-medium text-slate-800 justify-center">
                    Update Category
                </h3>
                  <div className="">
                    <form onSubmit={handleSubmit} className="text-slate-800">
                    
                    {/* <Field> */}
                        <InputField
                        name="shipping_method_name"
                        label="Shipping name"
                        type="name"
                        placeholder="Enter Product name"
                        error={formErrors.category_name}
                        Fieldref={categoryNameField} />


                        
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

export default AdminEditCategoryPage;