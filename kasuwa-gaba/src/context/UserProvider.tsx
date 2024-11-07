import { createContext } from "react";
import React, {useState, useEffect, useCallback} from "react";
import UseApi from "../hooks/UseApi";

export interface UserSchema {
  id: number;
  fullname: string;
  email: string;
  role: number;
}

export type UserContextType = {
  user: UserSchema | null | undefined;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<"ok" | "fail" | "error">
  logout: () => void;
  setUser: (user: UserSchema | null | undefined) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({children}: React.PropsWithChildren<{}>) => {
  const [ user, setUser ] = useState<UserSchema | null | undefined >();
  const [ isAuthenticated, setIsAuthenticated] = useState(false);

  const api = UseApi()

    
    useEffect(() => {
      (async () => {
        if (api.isAuthenticated()) {
          setIsAuthenticated(true);
          console.log('authentication state updated')
          const response = await api.get<UserSchema>('/user');
          console.log(response)
          setUser(response.ok ? response.body : null);
        }
        else {
          setUser(null);
        }
      })();
    }, [api]);
  
    const login = useCallback(async (email: string, password: string) => {
      const result = await api.login(email, password);
      console.log(result)
      if (result === 'ok') {
        const response = await api.get<UserSchema>('/user');
        console.log(response)
        setUser(response.ok ? response.body : null);
        console.log('login callback success')
      }
      return result;
    }, [api]);

    const logout = useCallback(async () => {
      await api.logout();
      setUser(null);
      console.log('logout success')
      const response = await api.get<UserSchema>('/user');
      setUser(response.ok ? response.body : null);
      console.log('logout success')
      console.log(response)

    }, [api]);
    // logout()

    // alternative method 

    // const fetchUser = async () => {
    //     try {
    //           console.log("user providerer")

    //         if (localStorage.getItem('token') !== null) {
    //             setIsAuthenticated(true);
    //             const response = await api.get<UserSchema>('/user');
    //             console.log(response)
    //             setUser(response.ok ? response.body : null);
    //             const data = response.body;
    //         // setProducts(data); // Assume data is an array of products
    //         // Type assertion: assert that data is an array of ProductType
    //             if (Array.isArray(data)) {
    //                 setUser(data); // Type assertion
    //             } else {
    //                 throw new Error("Invalid data format");
    //             }
    //         }
    //         // const response = await api.get('/user');
    //         // console.log('response')

            
    //     } catch (error) {
    //         setUser(null); // Handle error state
    //     }
    // };

    // useEffect(() => {
    //     fetchUser(); // Fetch products on component mount
    // }, [api]);
  return (
    <>
      <UserContext.Provider value={{ user, setUser, isAuthenticated, login, logout }}>
        {children}
      </UserContext.Provider>
    
    </>
  )

}

export default UserContext;