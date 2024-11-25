import { apiSlice } from './apiSlice';
const USERS_URL = '/api/admin';


export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all universities
    GetAllUniversity: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/university/all`,
        method: 'GET',
      }),
    }),

    // Fetch center details by user
    fetchCenterDetailsFromUser: builder.mutation({
      query: (id) => ({
        url: `/api/user/fetchCenter/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    // Fetch courses by university
    fetchCourseByUniversity: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/university/courses/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    FetchDocument:builder.mutation({
        query: () => ({
          url: `${USERS_URL}/doc/all`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
    }),
    FetchuniversityDoc:builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/university/${data}/file/all`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
    }),
    CreateLeadOnline:builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/student/student/createLead`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }),
    }),
    FetchLeadOnline:builder.mutation({
        query: () => ({
          url: `${USERS_URL}/student/student/lead`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
    }),

      fetchSessionsByUniversity: builder.mutation({
        query: (id) => ({
          url: `${USERS_URL}/session/university/all/${id}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      }),
      FetchLeads:builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/student/student/leadFetch/${data}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
    }),
    FetchOnlineApplication:builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/student/student/onlineCenter/${data}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    CreateOnlineApplication:builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/student/student/onlineApply`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
    }),
    createStudent: builder.mutation({
      query: (studentData) => ({
        url: `${USERS_URL}/student/student/create`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      }),
    }),
    fetchStudentByCenter: builder.mutation({
      query: (centerId) => ({
        url: `${USERS_URL}/student/fetch/${centerId}`,
        method: 'GET'
      }),
    }),
    fetchPopUp :builder.mutation({
      query: () => ({
        url: `${USERS_URL}/extrapop`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      
      }),
    }),
    //carousel/all
    fetchCrousel:builder.mutation({
      query: () => ({
        url: `${USERS_URL}/carousel/all`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      
      }),
    })
  }),
});

// Export hooks for each mutation
export const {
  useGetAllUniversityMutation,
  useFetchCenterDetailsFromUserMutation,
  useFetchCourseByUniversityMutation, // Export the new mutation hook
  useFetchDocumentMutation,
  useFetchuniversityDocMutation,
  useCreateLeadOnlineMutation,
  useFetchLeadOnlineMutation,
  useFetchSessionsByUniversityMutation,
  useFetchLeadsMutation,
  useFetchOnlineApplicationMutation,
  useCreateOnlineApplicationMutation,
  useCreateStudentMutation,
  useFetchStudentByCenterMutation,
  useFetchPopUpMutation,
  useFetchCrouselMutation,
} = userApiSlice;
