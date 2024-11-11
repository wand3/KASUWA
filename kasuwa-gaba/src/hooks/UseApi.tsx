import { useContext } from "react";
// import ApiProvider from "../context/ApiProvider";
import KasuwaApiClient from "../KasuwaApiClient";
import { ApiContext } from "../context/ApiProvider";

export const UseApi = () => {
    return useContext(ApiContext) as KasuwaApiClient;

}

export default UseApi;