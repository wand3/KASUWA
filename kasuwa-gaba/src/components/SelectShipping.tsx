import { useState } from "react";
import UseApi from "../hooks/UseApi";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ArrowDownRightIcon } from "@heroicons/react/24/solid";


export const SelectShipping = () => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}><ArrowDownRightIcon  className="h-4 w-4 pl-1 text-gray-700 inline-block hover:text-amber-500"/></button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 ">
        <div className="fixed inset-0 backdrop:backdrop-brightness-50 flex w-screen items-center justify-center p-4 ">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 ">
            <DialogTitle className="font-bold">Select prefered Shipping</DialogTitle>
            <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Deactivate</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default SelectShipping;