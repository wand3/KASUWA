import { Navigate } from "react-router-dom";
import useUser from "../hooks/UseUser";
import React from "react";



export const PublicRoute = ({children}: React.PropsWithChildren<{}>) => {
  const user = useUser()
  
  if (user === undefined) {
    return null;
  }
  else if (user) {
    return <Navigate to="/" />
  }
  else {
    return <>{children}</>;
  }
}

export default PublicRoute;