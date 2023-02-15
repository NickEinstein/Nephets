import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import SkillApi from "apis/SkillsApi";
import useDebouncedState from "hooks/useDebouncedState";
import { useState } from "react";
import ProjectCreateEditSectionTitle from "./ProjectCreateEditSectionTitle";

const filter = createFilterOptions();

function ProjectCreateEditTags({ formik }) {
  const [tagQ, setTagQ] = useState("");

  const [debouncedTagQ] = useDebouncedState(tagQ, {
    wait: 200,
    enableReInitialize: true,
  });

  const tagsQueryResult = SkillApi.useGetSkillsQuery({
    params: {
      q: debouncedTagQ || undefined,
    },
  });

  return (
    <div className="max-w-lg">
      <ProjectCreateEditSectionTitle gutterBottom>
        Tags
      </ProjectCreateEditSectionTitle>
      <Autocomplete
        multiple
        loading={tagsQueryResult.isFetching}
        freeSolo
        options={tagsQueryResult?.data?.data?.map(({ name }) => name) || []}
        getOptionLabel={(option) => {
          return option;
        }}
        isOptionEqualToValue={(option, value) => {
          return option === value;
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;
          if (inputValue !== "" && !filtered?.length) {
            filtered.push(inputValue);
          }
          return filtered;
        }}
        inputValue={tagQ}
        onInputChange={(_, value) => setTagQ(value)}
        value={formik.values.tags}
        onChange={(_, value) => {
          formik.setFieldValue("tags", value);
        }}
        renderInput={(params) => (
          <TextField label="Tags" fullWidth margin="dense" {...params} />
        )}
      />
    </div>
  );
}

export default ProjectCreateEditTags;
