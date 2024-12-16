import { useState, useEffect, useRef } from "react";
import UseApi from "../../hooks/UseApi";
import { UserSchema } from "../../context/UserProvider"
import useUser from "../../hooks/UseUser";
import NavMobileTop from "../../components/NavMobileTop";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { Field, Input, Label, Select } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import axios from "axios";
import { Checkbox } from "@headlessui/react";
import Config from "../../config";
import { ArrowBigRightDashIcon, Delete, SquareArrowDownRight } from "lucide-react";
import useFlash from "../../hooks/UseFlash";
import { useNavigate } from "react-router-dom";


export type FormAddressErrorType = {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
}


export type AddAddressSchema = {
  id?: number;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  is_default: boolean;
}

export type Addresses = {
  addresses: AddAddressSchema[];
}

type Country = {
  name: string;
  code: string;
};

export const AddShippingAddressPage = () => {
    const [ addresses, setAddress] = useState< AddAddressSchema | null | undefined>();
    const [countries, setCountries] = useState<Country[]>([]);
    const countryRef= useRef<HTMLSelectElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLInputElement>(null);
    const streetRef = useRef<HTMLInputElement>(null);
    const zipcodeRef = useRef<HTMLInputElement>(null);
    const isDefaultRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState<AddAddressSchema>({
      country: "",
      state: "",
      city: "",
      street: "",
      zipcode: "",
      is_default: false,
    });
   
  const [enabled, setEnabled] = useState(false);


  const [errors, setErrors] = useState<FormAddressErrorType>({});
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  // const user = useUser();
  const api = UseApi();
  const flash = useFlash();
  const navigate = useNavigate();

  const formData = new FormData();

  // back button 
  const goBack = () => {
    return navigate(-1);
  }


  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryData: any = response.data.map((country: { name: { common: any; }; cca2: any; }) => ({
          name: country.name.common,
          code: country.cca2
        }));

        // Sort countries alphabetically
        const sortedCountries: any = countryData.sort((a: { name: string; }, b: { name: any; }) =>
          a.name.localeCompare(b.name)
        );

        setCountries(sortedCountries);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    (async () => {
        console.log('fetch addresses of user')

        const response = await api.get<AddAddressSchema>('/address')
        console.log(response)
        if (response.ok && response.body) {
          setAddress(response.body);

        }
        else {
          setAddress(undefined);
          
        }
    })();
  }, [api]);


  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  

  // Handle form submission
  const handleDelivery = async (ev: React.FormEvent) => {
    ev.preventDefault();

    const country = countryRef.current ? countryRef.current.value : "";
    const city = cityRef.current ? cityRef.current.value : "";
    const state = stateRef.current ? stateRef.current.value : "";
    const street = streetRef.current ? streetRef.current.value : "";
    const zipcode = zipcodeRef.current ? zipcodeRef.current.value : "";
    const isDeafult = isDefaultRef.current ? isDefaultRef.current.value : "";

    

    console.log('after def ')
    // Validate form fields
    let formErrors: FormAddressErrorType = {};

    console.log('after formerror def ')

    if (!street) formErrors.street = "Street address is required";
    if (!country) formErrors.country = "Country is required";
    if (!state) formErrors.state = "State is required";
    if (!city) formErrors.city = "City is required";
    if (!zipcode || !/^\d{3,6}$/.test(zipcode))
      formErrors.zipcode = "Valid zip code is required (3-6 digits)";

    console.log('after error checker')


    setErrors(formErrors);
    // return Object.keys(formErrors).length === 0;
    // if (Object.keys(formErrors).length > 0) {
    //   setErrors(formErrors);
    // //   setLoading(false);
    //   return;
    // }
    formData.append('country', country)
    formData.append('state', state)
    formData.append('street', street)
    formData.append('city', city)
    formData.append('zipcode', zipcode)
    formData.append('is_default', isDeafult)
    console.log(`${country}, ${state}, ${street}`)

    console.log("form data set")


    setLoading(true);
    console.log('loading')
    console.log(`mofo`, country, state, city, street, zipcode)
     try {
       const result = await api.post(`/address`, {
         country: form.country,
         state: state,
         city: city,
         street: street,
         zipcode: zipcode,
         is_default: isDeafult,
         user_id: user?.id }
       );
       if(result.ok) {
         // setAddress(result)
         setForm({
           country: "",
           state: "",
           city: "",
           street: "",
           zipcode: "",
           is_default: false,
         });
         console.log('address addedsuccessfuly')
         flash('New Address Added!', 'success')

       }
      
       // // Clear form after successful submission
       // setDeliveryForm({
       //   country: "",
       //   state: "",
       //   city: "",
       //   street: "",
       //   zipcode: ""
       // });
       // setErrors({});
     } catch (error) {
       console.error("Failed to add shipping details:", error);
     } finally {
       setLoading(false);
     }
  };

  // function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
  //   throw new Error("Function not implemented.");
  // }
  return (
    <>
        <div className="h-fit pb-10">
        <Nav />
          <NavMobileTop ></NavMobileTop>
          <h3 className="mt-12 text-2xl ml-[5%] font-regular">Add/Edit Address</h3>
          <div className="w-[90%] mx-auto mt-[5%] h-fit border-b-[1px] border-slate-600 ">
            <div className="min-w-screen px-4  mx-auto">
                <form onSubmit={handleDelivery} className="text-slate-900">
                    {/* country select  */}
                    <Field className='lg:w-[40%]' >
                        <Label className="text-sm/6 font-medium ">Country</Label>
                        <div className="relative">
                        <Select
                            // value={country}
                            // onChange={handleChange}
                            ref={countryRef}
                            className={clsx(
                            'mt-3 block w-full appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-md ',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                            // Make the text of each option black on Windows
                            '*:text-black'
                            )}
                        >
                            {/* <option value="">Select country</option> */}
                            {countries.map(country => (
                                <option key={country.code} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                          
                        </Select>
                        <ChevronDownIcon
                            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                            aria-hidden="true"
                        />
                        </div>
                    </Field>
                    
                    {/* name field  */}
                    {/* <Field className="my-4">
                        <Label className="text-sm/6 font-medium">Name</Label>
                        <Input
                        placeholder="Full name"
                        type="name"
                        className={clsx(
                            'mt-1 block w-[50%] border-b-[1px] border-slate-500 bg-transparent py-1.5 px-3 text-sm/6 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                        />
                    </Field> */}

                    {/* street field  */}
                    <Field className="my-4">
                        <Label className="text-sm/6 font-medium">Street</Label>
                        <Input
                        placeholder="Street, apt no"
                        type="text"
                        ref={streetRef}
                        className={clsx(
                            'mt-1 block w-[50%] border-b-[1px] border-slate-500 bg-transparent py-1.5 px-3 text-sm/6 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                        />
                    </Field>
                    {/* {errors.street && <p className="mt-2 text-sm text-red-600">{errors.street}</p>} */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-7">
                        <div className="">
                            <Field className="my-1">
                                <Label className="text-sm/6 font-medium">State</Label>
                                <Input
                                type="integer"
                                placeholder="State"
                                ref={stateRef}

                                className={clsx(
                                    'mt-1 block border-b-[1px] border-slate-500 bg-transparent py-1.5 px-3 text-sm/6 text-black',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                )}
                                />
                            </Field>
                        </div>
                        <div className="">
                            <Field className="my-1">
                                <Label className="text-sm/6 font-medium">City</Label>
                                <Input
                                type="integer"
                                placeholder="City"
                                ref={cityRef}

                                className={clsx(
                                    'mt-1 block border-b-[1px] border-slate-500 bg-transparent py-1.5 px-3 text-sm/6 text-black',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                )}
                                />
                            </Field>
                        </div>
                        <div className="">
                            <Field className="my-1">
                                <Label className="text-sm/6 font-medium">Zipcode</Label>
                                <Input
                                type="integer"
                                placeholder="Enter Zipcode"
                                ref={zipcodeRef}
                                className={clsx(
                                    'mt-1 block border-b-[1px] border-slate-500 bg-transparent py-1.5 px-3 text-sm/6 text-black',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                )}
                                />
                            </Field>
                        </div>
                    </div>
                    <div className="flex flex-row py-3">
                    
                        <Checkbox
                            checked={enabled}
                            onChange={setEnabled}
                            ref={isDefaultRef}

                            className="group size-6 rounded-md bg-white/10 p-1 ring-1 ring-black/15 ring-inset data-[checked]:bg-white"
                            >
                            <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
                        </Checkbox> <span className="text-sm px-1 pt-[2px]">set as default shipping</span> 
                    </div>

                    <div className="flex flex-row-reverse gap-4 py-2">

                      <button
                          className="flex items-center gap-2 px-3 py-1.5 text-sm text-white duration-150 bg-slate-600 rounded-lg hover:bg-slate-800 active:bg-indigo-700"
                          type="submit"
                      >
                         Submit <ArrowBigRightDashIcon ></ArrowBigRightDashIcon>
                          
                      </button>

                      <button
                          className="flex items-center gap-2 px-3 py-1.5 text-sm text-white duration-150 bg-slate-600 rounded-lg hover:bg-slate-800 active:bg-indigo-700"
                          onClick={() => {goBack()}}

                      >
                         <Delete />
                          Cancel
                      </button>

                      
                    </div>
                        
                
                </form>
                
            </div>
              
          </div>
        </div>
        <Footer />
    </>
  )
}


export default AddShippingAddressPage;