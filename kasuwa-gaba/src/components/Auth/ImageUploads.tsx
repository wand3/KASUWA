import { Description, Field, Input, Label, Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import React, {useState, ChangeEvent} from 'react'


type ImageFieldProps = {
    multiple?: boolean;
    Fieldref?: React.RefObject<HTMLInputElement>;
}


export const ImageUpload = ({Fieldref, multiple}: ImageFieldProps ) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const selectedImages = Array.from(files);

    setImages(selectedImages);

    const imagePreviews = selectedImages.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewURLs(imagePreviews);

    setImages(prevFiles => [...prevFiles, ...files]);
    setPreviewURLs(prevPreviews => [
      ...prevPreviews,
      ...files.map((file) => {URL.createObjectURL(file))
    ]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviewURLs(previewURLs.filter((_, i) => i !== index));
  };

  return (
    <>

        <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={Fieldref}
        multiple={multiple}
        className="mt-4"
        />

        <div className="mt-4">
        {previewURLs.map((url, index) => (
            <div key={index} className="relative mb-2">
            <img src={url} alt="Preview" className="w-full h-auto rounded-md" />
            <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 text-white bg-red-600 p-1 rounded-full"
            >
                &times;
            </button>
            </div>
        ))}
        </div>

    
        
    
    </>
  )
}
