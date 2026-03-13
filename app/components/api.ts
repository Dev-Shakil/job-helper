import { createApi } from '@reduxjs/toolkit/query/react';
import { userApi } from './userApi';
import { baseQueryWithReAuth } from '../../slice/baseQuery';
import toast from 'react-hot-toast';
import { ILoginResponse, IUser } from '@/redux/feature/types/loginTypes';
import { setUser } from '@/redux/feature/userSlice';
import { TagTypes } from '../tags';

export const api = createApi({
  reducerPath: 'JOB_Api',
  baseQuery: baseQueryWithReAuth,
  tagTypes: Object.values(TagTypes),
  endpoints: (builder) => ({
    seekerLogin: builder.mutation
      ILoginResponse<IUser>,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: '/auth/job-seeker/login',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setUser({
              user: data.data,
              token: data.token!,
              role: data.data.type,
            }));
          }
          // ✅ Fetch seeker profile after login
          await dispatch(userApi.endpoints.getMe.initiate('JOB_SEEKER'));
          toast.success('Successfully logged in!', {
            style: { border: '1px solid green', color: 'green' },
          });
        } catch (error: any) {
          toast.error(error?.data?.message || 'Login failed');
        }
      },
    }),

    recruiterLogin: builder.mutation
      ILoginResponse<IUser>,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: '/auth/recruiter/login',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setUser({
              user: data.data,
              token: data.token!,
              role: data.data.type,
            }));
          }
          // ✅ Fetch recruiter profile after login
          await dispatch(userApi.endpoints.getMe.initiate('RECRUITER_ADMIN'));
          toast.success('Successfully logged in!', {
            style: { border: '1px solid green', color: 'green' },
          });
        } catch (error: any) {
          toast.error(error?.data?.message || 'Login failed');
        }
      },
    }),

    registration: builder.mutation<ILoginResponse<any>, FormData>({
      query: (body) => ({
        url: '/auth/registration',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data) {
            dispatch(setUser({
              user: data.data,
              token: data.token!,
              role: data.data.type,
            }));
          }
          toast.success('Successfully registered!', {
            style: { border: '1px solid green', color: 'green' },
          });
        } catch (error: any) {
          toast.error(error?.data?.message || 'Registration failed');
        }
      },
    }),
  }),
});

export const {
  useRecruiterLoginMutation,
  useSeekerLoginMutation,
  useRegistrationMutation,
} = api;