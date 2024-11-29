import { Description, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'


type InputFieldProps = {
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
    error?: string;
    Fieldref?: React.RefObject<HTMLInputElement>;
}

export const RegInputField = ({ name, label, type, placeholder, error, Fieldref }: InputFieldProps
    ) => {


    return(
    
        <>
            <div className="col-span-6 sm:col-span-3 py-2">
                { label && (
                <Field>
                    <Label className="block text-sm font-medium text-gray-700" htmlFor={name}>{label}</Label>
                    <Input 
                    placeholder={placeholder}
                    type={type}
                    ref={Fieldref}
                    className={ clsx("mt-1 w-full my-3 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    ) }
                    />
                </Field>
                )}
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

            </div>
        </>
    
    )

}

export default RegInputField;