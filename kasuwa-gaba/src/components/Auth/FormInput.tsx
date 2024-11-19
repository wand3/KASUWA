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
                    <Label className="text-sm font-medium text-slate-500" htmlFor={name}>{label}</Label>
                    <Input 
                    placeholder={placeholder}
                    type={type}
                    ref={Fieldref}
                    className={clsx(
                        'mt-3 block w-full rounded-lg border-none bg-[#efefec] py-2 mb-3 px-3 text-sm/6 text-slate-950',
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