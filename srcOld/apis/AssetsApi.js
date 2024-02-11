import { SoftwrkApi, CloudinaryApi } from "configs/StoreQueryConfig";
// import { StoreQueryTagEnum } from "constants/StoreConstants";
// import { providesTags, invalidatesTags } from "utils/QueryUtils";

export const ASSETS_API_URL = "/api/v1/assets";

export const AssetApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    signAssetUploadPayload: builder.mutation({
      query: (config) => ({
        url: `${ASSETS_API_URL}/sign-upload-payload`,
        method: "POST",
        ...config,
      }),
    }),
    uploadAsset: builder.mutation({
      queryFn: async (config, { dispatch }) => {
        const { file, resource_type, ...data } = config.data;
        const signAssetUploadPayloadQuery = dispatch(
          AssetApi.endpoints.signAssetUploadPayload.initiate(
            { data },
            {
              track: false,
            }
          )
        );

        const signAssetUploadPayloadQueryResult =
          await signAssetUploadPayloadQuery;

        if (signAssetUploadPayloadQueryResult.error) {
          return signAssetUploadPayloadQueryResult;
        }

        return await dispatch(
          CloudinaryApi.endpoints.upload.initiate(
            {
              ...config,
              data: {
                file,
                resource_type,
                ...data,
                ...signAssetUploadPayloadQueryResult.data.data,
              },
            },
            { track: false }
          )
        );
      },
    }),
  }),
});

export default AssetApi;
