import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '../../slice/baseQuery';
import { setUser } from '../../feature/userSlice';
import { ILoginResponse, IUser } from '@/redux/feature/types/loginTypes';

// ✅ Role-aware profile endpoint map
const profileEndpointMap = {
  JOB_SEEKER: '/auth/job-seeker/profile',
  RECRUITER_ADMIN: '/auth/recruiter/profile',
} as const;

type UserRole = keyof typeof profileEndpointMap;

export const userApi = createApi({
  baseQuery: baseQueryWithReAuth,
  reducerPath: 'userApi',
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<ILoginResponse<IUser>, UserRole>({
      query: (role) => ({
        // ✅ Uses correct endpoint based on role
        url: profileEndpointMap[role],
        credentials: 'include',
      }),
      providesTags: ['User'],
      async onQueryStarted(_role, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // ✅ Actually updates the store with fresh profile data
          if (data?.data) {
            dispatch(setUser({
              user: data.data,
              token: data.token!,
              role: data.data.type,
            }));
          }
        } catch (error) {
          // Profile fetch failing shouldn't block the user — token is already set
          console.error('Failed to fetch profile:', error);
        }
      },
    }),
  }),
});

export const { useGetMeQuery } = userApi;