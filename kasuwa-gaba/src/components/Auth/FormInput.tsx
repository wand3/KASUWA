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

export const InputField = ({ name, label, type, placeholder, error, Fieldref }: InputFieldProps
    ) => {


    return(
    
        <>
            <div className="w-full max-w-md px-4">
                { label && (
                <Field>
                    <Label className="text-sm/6 font-medium text-black" htmlFor={name}>{label}</Label>
                    <Input 
                    placeholder={placeholder}
                    type={type}
                    ref={Fieldref}
                    className={clsx(
                        'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    />
                </Field>
                )}
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

            </div>
        </>
    
    )

}

export default InputField;