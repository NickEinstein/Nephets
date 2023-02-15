import { SoftwrkApi } from "configs/StoreQueryConfig";

const SKILLS_BASE_URL = "/api/v1/skills";

export const SkillApi = SoftwrkApi.injectEndpoints({
  endpoints: (builder) => ({
    skills: builder.query({
      query: (config) => ({
        url: `${SKILLS_BASE_URL}`,
        method: "GET",
        ...config,
      }),
    }),
    getSkills: builder.query({
      query: (config) => ({ url: `${SKILLS_BASE_URL}`, ...config }),
    }),
  }),
});

export default SkillApi;
