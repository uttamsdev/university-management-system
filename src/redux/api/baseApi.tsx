/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

//!set token to baseQuery
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include', //!credential inculde kore dile cookie set kore dibe 
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('authorization', `${token}`)
        }
        return headers
    }

})


//!custom base query
const baseQueryWithRefreshToken : BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions) : Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
        //* Send refresh token
        const res = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
            method: 'POST',
            credentials: 'include' //!cooke r access token 
        });

        const data = await res.json();

        if (data?.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user
            api.dispatch(
                setUser({ user: user, token: data.data.accessToken })
            )
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout())
        }
    }
    return result;

}
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    endpoints: () => ({}) //endpoint in authApi
})