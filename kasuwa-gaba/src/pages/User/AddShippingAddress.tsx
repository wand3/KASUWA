import { useState, useEffect } from "react";
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


export const AddShippingAddressPage = () => {
//   const [ user, setUser] = useState< UserSchema | null | undefined>();
    const [deliveryForm, setDeliveryForm] = useState({
        country: "",
        state: "",
        city: "",
        street: "",
        zipcode: ""
    });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [enabled, setEnabled] = useState(false)

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // const { user } = useUser();
  // const user = useUser();
  const api = UseApi();
  
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

  // Fetch states when the country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (deliveryForm.country) {
        try {
          const response = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/states",
            { country: deliveryForm.country }
          );
          setStates(response.data.data.states || []);
          setCities([]); // Reset cities when country changes
        } catch (error) {
          console.error("Failed to fetch states:", error);
        }
      }
    };

    fetchStates();
  }, [deliveryForm.country]);

  // Fetch cities when the state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (deliveryForm.state) {
        try {
          const response = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/state/cities",
            {
              country: deliveryForm.country,
              state: deliveryForm.state
            }
          );
          setCities(response.data.data || []);
        } catch (error) {
          console.error("Failed to fetch cities:", error);
        }
      }
    };

    fetchCities();
  }, [deliveryForm.state]);

  return (
    <>
        <div className="h-fit pb-10">
        <Nav />
          <NavMobileTop ></NavMobileTop>
          <h3 className="mt-12 text-2xl ml-[5%] font-regular">Add/Edit Address</h3>
          <div className="w-[90%] mx-auto mt-[5%] h-fit border-b-[1px] border-slate-600 ">
            <div className="min-w-screen px-4  mx-auto">
                <form action="" className="text-slate-900">
                    {/* country select  */}
                    <Field className='lg:w-[40%]'>
                        <Label className="text-sm/6 font-medium ">Country</Label>
                        <div className="relative">
                        <Select
                            className={clsx(
                            'mt-3 block w-full appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-md ',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                            // Make the text of each option black on Windows
                            '*:text-black'
                            )}
                        >
                            <option value="active">Select country</option>
                            {countries.map(country => (
                                <option key={country?.code} value={country?.name}>
                                    {country?.name}
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
                    <Field className="my-4">
                        <Label className="text-sm/6 font-medium">Name</Label>
                        <Input
                        placeholder="Full name"
                        type="name"
                        className={clsx(
                            'mt-1 block w-[50%] border-b-[1px] border-slate-500 bg-transparent py-1.5 px-3 text-sm/6 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                        />
                    </Field>

                    {/* street field  */}
                    <Field className="my-4">
                        <Label className="text-sm/6 font-medium">Street</Label>
                        <Input
                        placeholder="Street, apt no"
                        type="text"
                        className={clsx(
                            'mt-1 block w-[50%] border-b-[1px] border-slate-500 bg-transparent py-1.5 px-3 text-sm/6 text-black',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                        />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-7">
                        <div className="">
                            <Field className=''>
                                <Label className="text-sm/6 font-medium ">State</Label>
                                <div className="relative">
                                <Select
                                    className={clsx(
                                    'mt-3 block w-full appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-md ',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                    // Make the text of each option black on Windows
                                    '*:text-black'
                                    )}
                                >
                                    <option value="active">Select State</option>
                                    {states.map(state => (
                                        <option key={state?.name} value={state?.name}>
                                            {state?.name}
                                        </option>
                                    ))}
                                
                                </Select>
                                <ChevronDownIcon
                                    className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                                    aria-hidden="true"
                                />
                                </div>
                            </Field>
                        </div>
                        <div className="">
                            <Field className=''>
                                <Label className="text-sm/6 font-medium ">City</Label>
                                <div className="relative">
                                <Select
                                    className={clsx(
                                    'mt-3 block w-full appearance-none rounded-lg border-none bg-black/5 py-1.5 px-3 text-md ',
                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                                    // Make the text of each option black on Windows
                                    '*:text-black'
                                    )}
                                >
                                    <option value="active">Select City</option>
                                    {cities.map(city => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                
                                </Select>
                                <ChevronDownIcon
                                    className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                                    aria-hidden="true"
                                />
                                </div>
                            </Field>
                        </div>
                        <div className="">
                            <Field className="my-1">
                                <Label className="text-sm/6 font-medium">Zipcode</Label>
                                <Input
                                type="integer"
                                placeholder="Enter Zipcode"
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
                            className="group size-6 rounded-md bg-white/10 p-1 ring-1 ring-black/15 ring-inset data-[checked]:bg-white"
                            >
                            <CheckIcon className="hidden size-4 fill-black group-data-[checked]:block" />
                        </Checkbox> <span className="text-sm px-1 pt-[2px]">set as default shipping</span> 
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