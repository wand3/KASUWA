import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartSchema } from '../context/CartProvider';
import Config from '../config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import UseApi from '../hooks/UseApi';
import axios, { AxiosError } from 'axios';


// const api = UseApi();
// get all projects rtk query 
export const cartApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Config.baseURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token') !== null; // Type the getState result
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers; // Important: Return the headers
    },
  }),
  endpoints: (builder) => ({
    getProjectsDetails: builder.query<CartSchema, void>({ // Type the query result and argument
      query: () => ({
        url: `${Config.baseURL}/cart`,
        method: 'GET',
      }),
    }),

  }),
});

// initialize userToken from local storage
const storedToken = localStorage.getItem('token');
const initialToken = storedToken || null;


export interface CartState {
  loading: boolean;
  items: CartSchema | null;
  error: string | null;
  token: string | null;
  success: boolean;
}

const initialState : CartState = {
  loading: false,
  items: null,
  error: null,
  success: false,
  token: initialToken,
}


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers : {
    
  },

  extraReducers: (builder) => {
    builder
  },

})

export const {  } = cartSlice.actions
export default cartSlice.reducer
