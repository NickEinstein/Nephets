import { SoftwrkApi } from "configs/StoreQueryConfig";
import { StoreQueryTagEnum } from "constants/StoreConstants";
import { invalidatesTags, providesTags } from "utils/QueryUtils";

const BASE_URL = "/api/v1/users";

export const UserApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/signup`,
        method: "POST",
        ...config,
      }),
    }),
    login: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/signin`,
        method: "POST",
        ...config,
      }),
    }),
    checkUserAvailability: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/availability`,
        ...config,
      }),
    }),
    verifyUser: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/signup/verify`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: (_, error) =>
        error ? invalidatesTags(StoreQueryTagEnum.USER) : [],
    }),
    resendUserVerification: builder.mutation({
      query: (config) => ({
        url: `${BASE_URL}/signup/resend-verification`,
        method: "POST",
        ...config,
      }),
    }),
    getUsers: builder.query({
      query: (config) => ({
        url: `${BASE_URL}`,
        ...config,
      }),
      providesTags: (data) =>
        data?.data ? providesTags([data?.data], StoreQueryTagEnum.USER) : [],
    }),
    getUser: builder.query({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/${path.id}`,
        ...config,
      }),
      providesTags: (data) =>
        data?.data ? providesTags([data?.data], StoreQueryTagEnum.USER) : [],
    }),
    getAuthUserProfile: builder.query({
      queryFn: (config, { getState }, ___, baseQuery) => {
        return baseQuery({
          url: `${BASE_URL}/${getState().global?.authUser?.id}`,
          ...config,
        });
      },
      providesTags: (data) =>
        data?.data ? providesTags([data?.data], StoreQueryTagEnum.USER) : [],
    }),
    updateUser: builder.mutation({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/${path.id}`,
        method: "PUT",
        ...config,
      }),
      invalidatesTags: (_, error, { path }) =>
        !error
          ? invalidatesTags(StoreQueryTagEnum.USER, { ids: [path.id] })
          : [],
    }),
    addUserPhoneNumber: builder.mutation({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/${path.id}/phone-numbers`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: (_, error, { path }) =>
        !error
          ? invalidatesTags(StoreQueryTagEnum.USER, { ids: [path.id] })
          : [],
    }),
    resendUserPhoneNumberVerification: builder.mutation({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/${path.id}/phone-numbers/resend-verification`,
        method: "PUT",
        ...config,
      }),
    }),
    verifyUserPhoneNumber: builder.mutation({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/${path.id}/phone-numbers/verify`,
        method: "PUT",
        ...config,
      }),
      invalidatesTags: (_, error, { path }) =>
        !error
          ? invalidatesTags(StoreQueryTagEnum.USER, { ids: [path.id] })
          : [],
    }),
    removeUserPhoneNumber: builder.mutation({
      query: ({ path, ...config }) => ({
        url: `${BASE_URL}/${path.id}/phone-numbers`,
        method: "DELETE",
        ...config,
      }),
      invalidatesTags: (_, error, { path }) =>
        !error
          ? invalidatesTags(StoreQueryTagEnum.USER, { ids: [path.id] })
          : [],
    }),
  }),
});

export default UserApi;
