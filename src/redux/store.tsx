//! amra redux persist package use korbo localStorage e data set korte & reload dile jate redux state theeke data na cole jai 
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './features/auth/authSlice'
import { baseApi } from "./api/baseApi";
import storage from 'redux-persist/lib/storage'
import {
    persistReducer, persistStore, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
const persistConfig = {
    key: 'auth',
    storage
}

const persistedAuthReducer = persistReducer(persistConfig, AuthReducer); //!auth reducer k persit korbo


export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer, //!called persisted reducer
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: getDefaultMiddlewares => getDefaultMiddlewares({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }).concat(baseApi.middleware)
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);
//!wrap it in main.tsx