import React from "react";
import { useState, useEffect } from "react";
import UseApi from "../../hooks/UseApi";
import { UserSchema } from "../../context/UserProvider"
import { useParams } from "react-router-dom";
import useUser from "../../hooks/UseUser";
import NavMobileTop from "../../components/NavMobileTop";
import Jiki from "../../components/Jiki";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

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
            <div className="max-w-screen-xl px-4 my-[20%] mx-4">
                <div
                    className="relative block overflow-hidden rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 sm:w-[80%] md:w-[60%]  mx-auto"
                    >
                    <span
                        className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                    ></span>

                    <div className="sm:flex sm:justify-between sm:gap-4">
                        <div>
                        

                        <p className="mt-1 text-xs font-medium text-gray-600">{user?.fullname || "Chazo Butler"}</p>
                        </div>

                        
                    </div>

                    <div className="mt-4">
                        <p className="text-pretty text-sm text-gray-500">Town</p>
                        <p className="text-pretty text-sm text-gray-500">State</p>

                        <p className="text-pretty text-sm text-gray-500">Country</p>
                    </div>
                    <div className="px-4 text-right absolute md:mt-[-10%] mt-[-15%]  ml-[57%] sm:ml-[60%]">
                        <a href="/shipping" className="px-6 py-3 rounded-md text-white bg-slate-800 hover:text-indigo-500 text-sm  font-medium">
                            Edit
                        </a>
                                            <a className="flex justify-end underline text-sm text-blue-600" href="">Add another address</a>

                    </div>
                </div>
                
            </div>
              
          </div>
        </div>
        <Footer />
    </>
  
  )


}

export default UserShippingPage;