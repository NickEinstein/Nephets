import axios from "axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import { SoftworkHttp, CloudinaryHttp } from "./HttpConfig";
import { StoreQueryTagEnum } from "constants/StoreConstants";
import { objectToFormData } from "utils/ObjectUtils";

export const SoftwrkApi = createApi({
  reducerPath: "softwrk",
  baseQuery: axiosBaseQuery({}, SoftworkHttp),
  endpoints: (builder) => ({}),
});

export const CloudinaryApi = createApi({
  reducerPath: "cloudinary",
  baseQuery: axiosBaseQuery({}, CloudinaryHttp),
  endpoints: (builder) => ({
    upload: builder.mutation({
      query: ({ data, ...config }) => {
        const { cloud_name, resource_type, ..._data } = data;
        return {
          url: `${cloud_name}/${resource_type || "auto"}/upload`,
          method: "POST",
          data: objectToFormData(_data),
          ...config,
        };
      },
    }),
  }),
});

[SoftwrkApi, CloudinaryApi].forEach((api) => {
  api.enhanceEndpoints({ addTagTypes: Object.values(StoreQueryTagEnum) });
});

/**
 *
 * @param {import("axios").AxiosRequestConfig} baseConfig
 */
export function axiosBaseQuery(baseConfig = {}, http = axios) {
  return request;

  /**
   *
   * @param {import("axios").AxiosRequestConfig} config
   */
  async function request(config = {}) {
    const url = config.url
      ? (baseConfig.url || "") + config.url
      : baseConfig.url;
    try {
      const response = await http.request({ ...baseConfig, ...config, url });

      return {
        ...response,
        data: response.data,
        message: response.data?.message || null,
        status: response.status || 200,
        meta: { request: response.request, response },
      };
    } catch (error) {
      return {
        error: error.response
          ? {
              defaultUserMessage: "",
              status: error.response.status,
              data: error.response.data,
            }
          : {
              defaultUserMessage: "Something went wrong",
              data: { defaultUserMessage: "Something went wrong" },
            },
      };
    }
  }
}
