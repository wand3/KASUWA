import { createContext } from "react";
import React, {useState, useEffect, useCallback} from "react";
import UseApi from "../hooks/UseApi";

interface UserSchema {
  fullname: string;
  email: string;
  role: number;
}

export type UserContextType = {
  user: UserSchema | null | undefined;
  isAuthenticated: boolean;
  setUser: (user: UserSchema | null | undefined) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({children}: React.PropsWithChildren<{}>) => {
  const [ user, setUser ] = useState<UserSchema | null | undefined >();
  const [ isAuthenticated, setIsAuthenticated] = useState(false);

  const api = UseApi()

//   useEffect(() => {
    
//     async () => {
//       if (api.isAuthenticated()) {
//         const response = await api.get<UserSchema>('/users');
//         console.log(response.body)
//         setUser(response.ok ? response.body : null);
//       }
//       else {
//         setUser(null);
//       }
//     }
//   }, [api])

//   const login = useCallback(async (email: string, password: string) => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/api/tokens", {
//         method: "POST",
//         headers: {
//           Authorization: "Basic " + btoa(`${email}:${password}`),
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.token) {
//           localStorage.setItem("token", data.token);
//           console.log("Login successful:", data.token);
          
            
//         } else {
//           console.log("Login failed. Please check your credentials.");

//         }
//       } else {

//         console.log("Login failed. Please try again.");

        

//       }
//      } catch (error) {
//       console.error("Login error:", error);

//     }
//    }, []);

    const fetchUser = async () => {
        try {
              console.log("user providerer")

            if (localStorage.getItem('token') !== null) {
                setIsAuthenticated(true);
                const response = await api.get<UserSchema>('/user');
                console.log(response)
                setUser(response.ok ? response.body : null);
                const data = response.body;
            // setProducts(data); // Assume data is an array of products
            // Type assertion: assert that data is an array of ProductType
                if (Array.isArray(data)) {
                    setUser(data); // Type assertion
                } else {
                    throw new Error("Invalid data format");
                }
            }
            // const response = await api.get('/user');
            // console.log('response')

            
        } catch (error) {
            setUser(null); // Handle error state
        }
    };

    useEffect(() => {
        fetchUser(); // Fetch products on component mount
    }, [api]);

  return (
    <>
      <UserContext.Provider value={{ user, setUser, isAuthenticated }}>
        {children}
      </UserContext.Provider>
    
    </>
  )

}

export default UserContext;