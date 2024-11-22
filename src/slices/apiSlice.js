import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
const production = 'https://admissionportals.in/';
const development = 'http://localhost:3000/'
const baseQuery = fetchBaseQuery({ baseUrl: production
 });

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});