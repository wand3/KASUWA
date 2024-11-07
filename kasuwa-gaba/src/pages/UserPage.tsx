import React from "react";
import { useState, useEffect } from "react";
import UseApi from "../hooks/UseApi";
import { UserSchema } from "../context/UserProvider"
import { useParams } from "react-router-dom";
import useUser from "../hooks/UseUser";


export const UserPage = () => {
  const [user, setUser] = useState< UserSchema | null | undefined>();
  const { email } = useParams();
  const { user: loggedInUser } = useUser();
  const api = UseApi();
  
  useEffect(() => {
    (async () => {
        
    })
  });

  return (
    <>
      <h1>User Page</h1>
    
    </>
  
  )


}

export default UserPage;