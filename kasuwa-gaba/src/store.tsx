import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
// import authReducer from './slices/AuthSlice'
// import userReducer from './slices/UserSlice'
// import { authApi } from './services/user'
// import { projectApi } from './services/project'
import cartReducer from './slices/CartSlice'
import { cartApi } from './slices/CartSlice'

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    items: cartReducer,
    // Add the generated reducer as a specific top-level slice
    [cartApi.reducerPath]: cartApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;