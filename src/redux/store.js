import { configureStore,  } from "@reduxjs/toolkit" 
import rootReducer from "./reducers" 
import thunk from "redux-thunk"
import {
    persistStore, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  
  export const store = configureStore({
    reducer: rootReducer(),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
          }).concat(thunk),
    devTools: true
})
export const persistor = persistStore(store)
