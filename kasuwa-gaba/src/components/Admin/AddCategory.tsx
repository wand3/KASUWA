import { useState, useRef } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useFlash from "../../hooks/UseFlash";
import UseApi from "../../hooks/UseApi";
import InputField from "../Auth/FormInput";


export type FormCategoryErrorType = {
  category_name?: string;
}

export type CategorySchema = {
  id?: number;
  category_name?: string;
}

export type AddCategorySchema = {
  categories?: CategorySchema[];
}


export const AddCategory = () => {
  const [formErrors, setFormErrors] = useState<FormCategoryErrorType>({});
  let [isOpen, setIsOpen] = useState(false) 
  const [categoryName, setCategoryName] = useState("");

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

  const categoryNameField= useRef<HTMLInputElement>(null);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const category_name = categoryNameField.current ? categoryNameField.current.value : "";
    
    setCategoryName(category_name);
    
    // const errors: FormShippingErrorType = {};
    const errors: FormCategoryErrorType = {};
    if (!category_name){
      errors.category_name = "Category name must be provided";
    }
    
    
    setFormErrors(errors);

    formData.append('category_name', category_name);
   

    try {
      const response = await api.post('/admin/category', {
        category_name: category_name,
      });

      console.log(response.body)
      if (!response.ok) {
        flash('Enter Valid data!', 'danger')
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Category added successfully:", response.body);
      flash('New Category Added!', 'success')
      clearForm()
      close()

    } catch (error) {
      console.log(error)
    }
  
  }

  const clearForm = () => {
      setCategoryName("");
    };
    

  return (
    <>
      {/* <Jiki nav={true}> */}
        <Button
          onClick={open}
          className="rounded-md ml-auto mr-3 bg-black/20 py-2 px-4 text-sm font-medium text-slate-800 focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Create Category
        </Button>

        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 backdrop-blur-xl">
              <DialogPanel
                  transition
                  className="w-full max-w-md rounded-xl bg-[#F7F7F7] p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                  <DialogTitle as="h2" className="text-base/10 pb-4 font-medium text-slate-800 justify-center">
                      Add Category
                  </DialogTitle>
                  
                  <form onSubmit={handleSubmit} className="text-slate-800">
                  
                  {/* <Field> */}
                      <InputField
                      name="category_name"
                      label="Category name"
                      type="name"
                      placeholder="Enter Category name"
                      error={formErrors.category_name}
                      Fieldref={categoryNameField} />

                      
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
      {/* </Jiki> */}
    </>
  )
}


export default AddCategory;