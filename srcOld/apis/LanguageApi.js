import { SoftwrkApi } from "configs/StoreQueryConfig";

const BASE_URL = "/api/v1/languages";

export const LanguageApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    language: builder.query({
      query: (arg, limit = 1000, sort = "name:asc") => {
        const { q } = arg;
        console.log("arg: ", arg);
        console.log("arg: ", q);
        return {
          url: `${BASE_URL}`,
          method: "GET",
          params: { q, limit, sort },
        };
      },
    }),
    getLanguages: builder.query({
      query: (config) => ({
        url: `${BASE_URL}`,
        ...config,
      }),
    }),
  }),
});

export default LanguageApi;
