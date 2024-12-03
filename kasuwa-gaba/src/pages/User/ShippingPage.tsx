import { useState, useEffect } from "react";
import UseApi from "../../hooks/UseApi";
import { UserSchema } from "../../context/UserProvider"
import useUser from "../../hooks/UseUser";
import NavMobileTop from "../../components/NavMobileTop";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import { Edit } from "lucide-react";

export const UserShippingPage = () => {
  const [ user, setUser] = useState< UserSchema | null | undefined>();
  // const { user } = useUser();
  // const user = useUser();
  const api = UseApi();
  
  useEffect(() => {
    (async () => {
        console.log('useefeect start')

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

                  <div className="flex flex-col space-y-3 py-2 text-left sm:flex-row sm:space-x-5 sm:space-y-0 rounded-md bg-white p-4 my-5 shadow-lg sm:flex sm:justify-start">

                    <div className="mt-4 w-[80%]">
                      <p className="mt-1 text-md font-medium text-gray-600">{user?.email || "Chazo Butler"}</p>

                      <p className="text-pretty text-sm text-gray-500">Town</p>
                      <p className="text-pretty text-sm text-gray-500">State</p>
                      <p className="text-pretty text-sm text-gray-500">zipcode</p>

                      <p className="text-pretty text-sm text-gray-500">Country</p>
                    </div>
                  <div className="relative flex flex-1 justify-between">
                    
                    <div className="absolute top-0 right-0 flex sm:bottom-0 ">
                        <button className="" onClick={() => {}}>
                            <Edit className="h-6 w-6 cursor-pointer hover:text-red-500" />
                        </button>
                    </div>
                  </div>
                </div> 
              <a className="flex justify-end underline text-sm text-blue-600" href="/addAddress">Add another address</a>

              </div>
                
            </div>
              
          </div>
        </div>
        <Footer />
    </>
  
  )


}

export default UserShippingPage;