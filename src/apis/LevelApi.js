import { SoftwrkApi } from "configs/StoreQueryConfig";

const LEVEL_BASE_URL = "/api/v1/levels";

export const LevelApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    level: builder.query({
      query: (config) => ({
        url: `${LEVEL_BASE_URL}`,
        method: "GET",
        ...config,
      }),
    }),
    getLevels: builder.query({
      query: (config) => ({ url: `${LEVEL_BASE_URL}`, ...config }),
    }),
  }),
});

export default LevelApi;
