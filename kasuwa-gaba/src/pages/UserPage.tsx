import React from "react";
import { useState, useEffect } from "react";
import UseApi from "../hooks/UseApi";
import { UserSchema } from "../context/UserProvider"
import { useParams } from "react-router-dom";
import useUser from "../hooks/UseUser";
import NavMobileTop from "../components/NavMobileTop";
import Jiki from "../components/Jiki";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

export const UserPage = () => {
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
          <div className="w-full h-fit">
            <div className="max-w-screen-xl mx-auto px-4 pt-[5vh]">
                <div className="max-w-md">
                    <h1 className="text-slate-800 text-xl font-extrabold sm:text-1xl">Personal Information!</h1>
                </div>
                <ul className="mt-16 mb-2 pb-2 grid gap-[0.5rem] col-12">
                    {/* fullname edit section  */}
                    <li className="border rounded-lg border-b-2 border-slate-800 md:px-12 sd:px-6 w-[90vw]">
                        <div className="flex items-start justify-between p-4 h-fit">
                            <div className="space-y-2">
                                Fullname
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-gray-800 font-semibold">{user?.fullname || 'Chazo Butler'}</h4>
                            </div>

                        </div>
                        <div className="py-5 px-4 border-t text-right border-slate-300">
                            <a href="javascript:void(0)" className="px-6 py-3 rounded-md text-white bg-slate-800 hover:text-indigo-500 text-sm  font-medium">
                                Edit
                            </a>
                        </div>
                    </li>
                    {/* contact information section  */}
                    <h3 className="py-1">Contact information</h3>
                    <li className="border rounded-t-lg border-slate-800 md:px-12 sd:px-6 w-[90vw] border-b-0">
                        <div className="flex items-start justify-between p-4 h-fit">
                            <div className="space-y-2">
                                Email
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-gray-800 font-semibold">{user?.email || 'Chazo Butler'}</h4>
                            </div>

                        </div>
                        <div className="py-5 px-4 border-t text-right border-slate-300">
                            <a href="javascript:void(0)" className="px-6 py-3 rounded-md text-white bg-slate-800 hover:text-indigo-500 text-sm  font-medium">
                                Edit
                            </a>
                        </div>
                        
                    </li>
                    <li className="border rounded-b-lg border-b-2 border-slate-800 md:px-12 sd:px-6 w-[90vw] border-t-0">
                        <div className="flex items-start justify-between p-4 h-fit">
                            <div className="space-y-2 text-sm">
                                Phone number
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-gray-800 font-semibold">{user?.fullname || '+123 457 6544 65'}</h4>
                            </div>

                        </div>
                        <div className="py-5 px-4 border-t text-right border-slate-300">
                            <a href="javascript:void(0)" className="px-6 py-3 rounded-md text-white bg-slate-800 hover:text-indigo-500 text-sm  font-medium">
                                Edit
                            </a>
                        </div>
                    </li>
                    {/* shipping information section  */}
                    <h3 className="py-1">Shipping information</h3>
                    <li className="border rounded-lg border-b-2 border-slate-800 md:px-12 sd:px-6 w-[90vw]">
                        <div className="flex items-start justify-between p-4 h-fit">
                            <div
                            className="relative block overflow-hidden rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 w-full"
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
                          </div>

                        </div>
                        <div className="py-5 px-4 text-right">
                            <a href="/shipping" className="px-6 py-3 rounded-md text-white bg-slate-800 hover:text-indigo-500 text-sm  font-medium">
                                Edit
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
              
          </div>
        </div>
        <Footer />
    </>
  
  )


}

export default UserPage;