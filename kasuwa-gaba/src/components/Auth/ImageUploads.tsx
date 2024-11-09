import { Description, Field, Input, Label, Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import React, {useState, ChangeEvent} from 'react'
import UseApi from '../../hooks/UseApi';


type ImageFieldProps = {
    multiple?: boolean;
    onChange?: () => React.ChangeEvent<ImageFieldProps> | undefined;
    Fieldref?: React.RefObject<HTMLInputElement>;
}


export const ImageUpload = ({Fieldref, multiple = false, onChange}: ImageFieldProps ) => {

  return (
    <>

        <input
        type="file"
        accept="image/*"
        ref={Fieldref}
        multiple={multiple}
        onChange={onChange}
        className="mt-4"
        />


    
        
    
    </>
  )
}
