import React from "react";
import { useState, useEffect } from "react";
import UseApi from "../hooks/UseApi";
import { UserSchema } from "../context/UserProvider"
import { useParams } from "react-router-dom";
import useUser from "../hooks/UseUser";


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
      <h1>User Page</h1>
      <h3>User_id: {user?.id} Email: {user?.email}</h3>
    
    </>
  
  )


}

export default UserPage;