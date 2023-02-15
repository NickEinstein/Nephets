import {
  Button,
  Checkbox,
  FormControlLabel,
  Icon,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { CustomFieldTypeEnum } from "constants/CustomFieldConstants";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import ProjectCreateEditStepScaffold from "./ProjectCreateEditStepScaffold";

function ProjectCreateEditRequirements(props) {
  const { formik, DEFAULT_REQUIREMENT } = props;

  return (
    <ProjectCreateEditStepScaffold
      title="Requirements for the client"
      description="Tell the client what you need to get started"
    >
      <div className="max-w-lg">
        {formik.values.requirements?.map((requirement, index) => {
          const key = `requirements.${index}`;
          return (
            <div className="relative mb-4 p-4 bg-gray-50">
              <TextField
                label="Requirement"
                margin="normal"
                fullWidth
                {...getTextFieldFormikProps(formik, key + ".label")}
              />
              {/* <TextField
                label="Description"
                margin="normal"
                fullWidth
                multiline
                minRows={2}
                maxRows={4}
                {...getTextFieldFormikProps(formik, key + ".description")}
              /> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Type"
                  margin="normal"
                  select
                  {...getTextFieldFormikProps(formik, key + ".type")}
                >
                  {Object.values(CustomFieldTypeEnum).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
                <FormControlLabel
                  label="Mandatory requirement"
                  control={
                    <Checkbox
                      checked={requirement.required}
                      onChange={(e) =>
                        formik.setFieldValue(
                          key + ".required",
                          e.target.checked
                        )
                      }
                    />
                  }
                />
              </div>
              <div className="absolute -right-4 -top-4">
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
          );
        })}
        <div className="flex justify-end">
          <Button
            onClick={() => {
              const newRequirements = [
                ...formik.values.requirements,
                { ...DEFAULT_REQUIREMENT },
              ];
              formik.setFieldValue("requirements", newRequirements);
            }}
            startIcon={<Icon>add</Icon>}
          >
            Add
          </Button>
        </div>
      </div>
    </ProjectCreateEditStepScaffold>
  );
}

export default ProjectCreateEditRequirements;
