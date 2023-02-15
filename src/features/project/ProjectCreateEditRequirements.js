import { Chip, Icon, IconButton, Typography } from "@mui/material";
import CustomFieldForm from "common/CustomFieldForm";
import { useState } from "react";
import ProjectCreateEditStepScaffold from "./ProjectCreateEditStepScaffold";

function ProjectCreateEditRequirements(props) {
  const { formik } = props;

  const [editId, setEditId] = useState(-1);

  return (
    <ProjectCreateEditStepScaffold
      title="Requirements for the client"
      description="Tell the client what you need to get started"
    >
      <div className="max-w-lg">
        {formik.values.requirements?.map((requirement, index) => {
          const key = `requirements.${index}`;
          return (
            <>
              <div className="relative mb-4 p-2 bg-gray-100">
                <Typography className="font-bold">
                  {requirement.label}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {requirement.description}
                </Typography>
                <Chip size="small" label={requirement.type} />
                <div className="absolute -top-4 left-0 right-0 flex items-center justify-end">
                  <IconButton
                    onClick={() => {
                      setEditId(index);
                    }}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      const newRequirements = [...formik.values.requirements];
                      newRequirements.splice(index, 1);
                      formik.setFieldValue("requirements", newRequirements);
                    }}
                  >
                    <Icon>cancel</Icon>
                  </IconButton>
                </div>
              </div>
              {editId === index && (
                <CustomFieldForm
                  initialValues={requirement}
                  className="bg-gray-100 p-2 mb-4"
                  onCancel={() => setEditId(-1)}
                  onSave={(value) => {
                    const newRequirements = [...formik.values.requirements];
                    newRequirements.splice(index, 1, value);
                    formik.setFieldValue("requirements", newRequirements);
                  }}
                />
              )}
            </>
          );
        })}
        {editId < 0 && (
          <CustomFieldForm
            className="bg-gray-100 p-2"
            onSave={(value) => {
              const newRequirements = [...formik.values.requirements, value];
              formik.setFieldValue("requirements", newRequirements);
            }}
          />
        )}
      </div>
    </ProjectCreateEditStepScaffold>
  );
}

export default ProjectCreateEditRequirements;
