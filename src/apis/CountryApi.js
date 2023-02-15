import { SoftwrkApi } from "configs/StoreQueryConfig";

const COUNTRY_BASE_URL = "/api/v1/countries";

export const CountryApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    countries: builder.query({
      query: (arg, limit = 1000, sort = "name:asc") => {
        const { q } = arg;
        console.log("arg: ", arg);
        console.log("arg: ", q);
        return {
          url: `${COUNTRY_BASE_URL}`,
          method: "GET",
          params: { q, limit, sort },
        };
      },
    }),
    getCountries: builder.query({
      query: (config) => ({
        url: `${COUNTRY_BASE_URL}`,
        ...config,
      }),
    }),
  }),
});

export default CountryApi;
