import { useState, useEffect } from "react";
import UseApi from "../../hooks/UseApi";
import { UserSchema } from "../../context/UserProvider"
import useUser from "../../hooks/UseUser";
import NavMobileTop from "../../components/NavMobileTop";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { Edit, TrashIcon } from "lucide-react";
import { AddAddressSchema } from "./AddShippingAddress";
import useFlash from "../../hooks/UseFlash";


export type Addresses = {
  addresses: AddAddressSchema[];
}

export const UserShippingPage = () => {
  const [ user, setUser] = useState< UserSchema | null | undefined>();
  const [ addresses, setAddress] = useState< AddAddressSchema[] | null | undefined>([]);

  // const { user } = useUser();
  // const user = useUser();
  const api = UseApi();
  const flash = useFlash();
  
  useEffect(() => {
    (async () => {
        console.log('useefect start')

        const response = await api.get<UserSchema>('/user')
        console.log(response)
        if (response.ok && response.body) {
          setUser(response.body);
        }
        else {
          setUser(undefined);
          
        }
    })();
  }, [api]);


   const getAddress = async () => {
        console.log('fetch addresses of user')

        const response = await api.get<AddAddressSchema[]>('/address')
        console.log(response)
        if (response.ok && response.body) {
          setAddress(response.body);

        }
        else {
          setAddress(undefined);
          
        }
    };
  useEffect(() => {
    getAddress()
  }, [api]);

  // delete product
  const deleteAddress = async (id: number) => {
    try {
      const response = await api.delete(`/address/${id}`)
      console.log(response.status)
      flash('Address deleted!', 'success')
      // getCategory()
      getAddress();
    } catch(error) {
      flash('Delete failed', 'error')

      return console.log(error)
    }
  }
  

  return (
    <>
      <div className="h-fit">
        <Nav />
          <NavMobileTop ></NavMobileTop>
          <div className="w-full h-screen">
            <div className="max-w-screen-xl px-4 my-[20%] mx-auto">
                <div 
                    className="relative block overflow-hidden rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 sm:w-[80%] md:w-[60%]  mx-auto"
                    >
                  <span
                      className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                  ></span>
                { addresses?.map((address) => (
                  <div key={address.id} className="flex flex-col space-y-3 py-2 text-left sm:flex-row sm:space-x-5 sm:space-y-0 rounded-md bg-white p-4 my-5 shadow-lg sm:flex sm:justify-start">

                    <div className="mt-4 w-[80%]">
                      <p className="mt-1 text-md font-medium text-gray-600">{user?.email || "Chazo Butler"}</p>
                      <p className="text-pretty text-sm text-gray-500">{address.country}</p>
                      <p className="text-pretty text-sm text-gray-500">{address.state}</p>
                      <p className="text-pretty text-sm text-gray-500">{address.city}</p>
                      <p className="text-pretty text-sm text-gray-500">{address.street} {address.zipcode}</p>
                      <p className="text-pretty text-sm text-gray-500">Is Default Address? {address.is_default}</p>

                    </div>

                    <div className="relative flex flex-1 justify-between">
                      
                      <div className="relative top-0 right-0 flex sm:bottom-0 ">
                          <button className="" onClick={() => {}}>
                              <Edit className="h-6 w-6 cursor-pointer hover:text-red-500" />
                          </button>
                          <button onClick={() => {deleteAddress(address.id)}}
                          className="absolute h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center font-sans text-xs font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button" >
                            {/* <span className="transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"> */}
                                <TrashIcon className="h-6 w-6 cursor-pointer hover:text-red-500" />

                            {/* </span> */}
                          </button>
                      </div>
                    </div>
                  </div>
                  ))
                }


              </div> 
              <div>
                <a className="flex justify-center my-2 underline text-sm text-blue-600" href="/addAddress">Add another address</a>

              </div>


            </div> 
          </div>
      </div>
      <Footer />
    </>
  
  )


}

export default UserShippingPage;