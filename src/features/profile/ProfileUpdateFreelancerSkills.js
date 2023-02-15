import { Autocomplete, TextField } from "@mui/material";
import SkillApi from "apis/SkillsApi";
import useDebouncedState from "hooks/useDebouncedState";
import { useState } from "react";
import { getTextFieldFormikHelperTextAndErrorProps } from "utils/FormikUtils";
import { normalizeArray } from "utils/ObjectUtils";
import ProfileUpdateSectionTitle from "./ProfileUpdateSectionTitle";

function ProfileUpdateFreelancerSkills({ formik }) {
  const [skillQ, setSkillQ] = useState("");

  const [debouncedSkillQ] = useDebouncedState(skillQ, {
    wait: 200,
    enableReInitialize: true,
  });

  const skillsQueryResult = SkillApi.useGetSkillsQuery(
    {
      params: {
        q: debouncedSkillQ || undefined,
        id: `in(${formik.values.skills?.join(",")})`,
        operator: "or",
      },
    },
    {
      skip: !(debouncedSkillQ || formik.values.skills?.length),
      selectFromResult: (state) => ({
        ...state,
        normalizedData: normalizeArray(state.data?.data),
      }),
    }
  );

  const skills = formik.values.skills?.map((id) => ({
    id,
    name: getSkillName(id),
  }));

  function getSkillName(id) {
    return skillsQueryResult.normalizedData?.[id]?.name || "";
  }

  return (
    <div>
      <ProfileUpdateSectionTitle gutterBottom>Skills</ProfileUpdateSectionTitle>
      <Autocomplete
        multiple
        loading={skillsQueryResult.isFetching}
        freeSolo
        options={skillsQueryResult?.data?.data || []}
        getOptionLabel={(option) => {
          return option?.name ? option.name : getSkillName(option);
        }}
        isOptionEqualToValue={(option, value) => {
          return option?.id === value?.id;
        }}
        inputValue={skillQ}
        onInputChange={(_, value) => setSkillQ(value)}
        value={skills}
        onChange={(_, value) => {
          console.log(value);
          formik.setFieldValue(
            "skills",
            value.map((item) => item?.id)
          );
        }}
        renderInput={(params) => (
          <TextField
            label="Skills"
            placeholder="Type a skill and select from dropdowns; enter as many skills as you have"
            fullWidth
            margin="dense"
            {...getTextFieldFormikHelperTextAndErrorProps(
              formik,
              "skills",
              "Type a skill and select from dropdowns; enter as many skills as you have"
            )}
            {...params}
          />
        )}
      />
    </div>
  );
}

export default ProfileUpdateFreelancerSkills;
