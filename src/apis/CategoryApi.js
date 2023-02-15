import { SoftwrkApi } from "configs/StoreQueryConfig";

const BASE_URL = "/api/v1/categories";

export const CategoryApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategoriesByLevel: builder.query({
      query: (arg) => {
        const { level } = arg;
        return {
          url: `${BASE_URL}`,
          method: "GET",
          params: { level },
        };
      },
    }),
    
    getCategories: builder.query({
      query: (config) => {
        return {
          url: `${BASE_URL}`,
          ...config,
        };
      },
    }),
    getCategory: builder.query({
      query: ({ path, ...config }) => {
        return {
          url: `${BASE_URL}/${path.id}`,
          ...config,
        };
      },
    }),
    getCategoryParents: builder.query({
      query: ({ path, ...config }) => {
        return {
          url: `${BASE_URL}/${path.id}/hierarchy/parents`,
          ...config,
        };
      },
    }),
  }),
});

export default CategoryApi;
