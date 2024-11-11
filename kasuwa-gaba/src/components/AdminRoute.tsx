import React from "react";
import { Navigate } from "react-router-dom";
import useUser from "../hooks/UseUser";


export const AdminRoute = ({children}: React.PropsWithChildren<{}>) => {
  const user = useUser();

  const role = user.user?.role.valueOf();
  // console.log(typeof(role))
  
  if (user === undefined){
    return null
  }
  else if (!user) {
    return null
  }
  else if (role !== 0){
    console.log('admin route')
    console.log(role)
    return <>{children}</>
  }
  else {
    console.log(role)
    return <Navigate to='/' />
  }

}

export default AdminRoute;