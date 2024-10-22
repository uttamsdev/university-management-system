import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1', credentials: 'include' }), //!credential inculde kore dile cookie set kore dibe 
    endpoints: () => ({}) //endpoint in authApi
})