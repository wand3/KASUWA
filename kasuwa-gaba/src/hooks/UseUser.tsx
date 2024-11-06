import UserContext from "../context/UserProvider";
import { useContext } from "react";
import { UserContextType } from "../context/UserProvider";

export const useUser = () => {
    return useContext(UserContext) as UserContextType;
}

export default useUser;