import { SoftwrkApi } from "configs/StoreQueryConfig";
import { StoreQueryTagEnum } from "constants/StoreConstants";
import { invalidatesTags, providesTags } from "utils/QueryUtils";

const PROJECTS_BASE_URL = "/api/v1/projects";

export const ProjectApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (config) => ({ url: `${PROJECTS_BASE_URL}`, ...config }),
      providesTags: (data, error) =>
        !error ? providesTags(data?.data, StoreQueryTagEnum.PROJECT) : [],
    }),
    getProject: builder.query({
      query: ({ path, ...config }) => ({
        url: `${PROJECTS_BASE_URL}/${path.id}`,
        ...config,
      }),
      providesTags: (data, error) =>
        !error ? providesTags([data?.data], StoreQueryTagEnum.PROJECT) : [],
    }),
    createProject: builder.mutation({
      query: (config) => ({
        url: `${PROJECTS_BASE_URL}`,
        method: "POST",
        ...config,
      }),
      invalidatesTags: (_, error, { path }) =>
        !error ? invalidatesTags(StoreQueryTagEnum.PROJECT) : [],
    }),
    updateProject: builder.mutation({
      query: ({ path, ...config }) => ({
        url: `${PROJECTS_BASE_URL}/${path.id}`,
        method: "PUT",
        ...config,
      }),
      invalidatesTags: (_, error, { path }) =>
        !error
          ? invalidatesTags(StoreQueryTagEnum.PROJECT, { ids: [path.id] })
          : [],
    }),
    deleteProject: builder.mutation({
      query: ({ path, ...config }) => ({
        url: `${PROJECTS_BASE_URL}/${path.id}`,
        method: "DELETE",
        ...config,
      }),
      invalidatesTags: (_, error, { path }) =>
        !error
          ? invalidatesTags(StoreQueryTagEnum.PROJECT, { ids: [path.id] })
          : [],
    }),
  }),
});

export default ProjectApi;
