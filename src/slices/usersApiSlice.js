import { apiSlice } from './apiSlice';
const USERS_URL = '/api/user';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    CreateBulk: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/createBulk`,
        method: 'POST',
        body: data,
      }),
    }),
    ViewBulk :builder.mutation({
        query: (data) => ({
        url: `${USERS_URL}/getBulk/${data.centerId}`,
        method: 'GET',
      }),
    }),
    ChangePassword :builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/changePassword`,
        method: 'POST',
        body: data,
      }),
    })
    
  }),
});

export const {
  useCreateBulkMutation,
  useViewBulkMutation,
  useChangePasswordMutation

} = usersApiSlice;
