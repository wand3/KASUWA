import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUser from '../hooks/UseUser';


export const PrivateRoute = ({children}: React.PropsWithChildren<{}>) => {
  const user = useUser();
  const location = useLocation();

  if (user === undefined) {
    return null;
  }
  else if (user) {
    return <>{children}</>;
  }
  else {
    const url = location.pathname + location.search + location.hash;
    return <Navigate to="/login" state={{next: url}} />
  }
}

export default PrivateRoute;
