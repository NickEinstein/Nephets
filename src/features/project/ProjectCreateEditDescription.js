import { Button, Icon, IconButton, TextField, Typography } from "@mui/material";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import ProjectCreateEditSectionDescription from "./ProjectCreateEditSectionDescription";
import ProjectCreateEditSectionTitle from "./ProjectCreateEditSectionTitle";
import ProjectCreateEditStepScaffold from "./ProjectCreateEditStepScaffold";

function ProjectCreateEditDescription(props) {
  const { formik, DEFAULT_FAQ } = props;
  return (
    <ProjectCreateEditStepScaffold title="Project Description">
      <div className="mb-4 max-w-lg">
        <ProjectCreateEditSectionTitle>Summary</ProjectCreateEditSectionTitle>
        <ProjectCreateEditSectionDescription gutterBottom>
          Describe your project, tell the client what set your project apart.
          Sell your project.
        </ProjectCreateEditSectionDescription>
        <TextField
          fullWidth
          margin="normal"
          minRows={2}
          maxRows={4}
          {...getTextFieldFormikProps(formik, "description")}
        />
      </div>
      <div className="mb-4">
        <ProjectCreateEditSectionTitle>
          Frequently asked questions (optional)
        </ProjectCreateEditSectionTitle>
        <Typography variant="body2">
          Answers to common questions your clients ask.
        </Typography>
        <div className="max-w-lg">
          {formik.values.faqs?.map((faq, index) => {
            const key = `faqs.${index}`;
            return (
              <div className="relative mb-4 p-4 bg-gray-50">
                <TextField
                  label="Question"
                  margin="normal"
                  fullWidth
                  {...getTextFieldFormikProps(formik, key + ".question")}
                />
                <TextField
                  label="Answer"
                  margin="normal"
                  fullWidth
                  multiline
                  minRows={2}
                  maxRows={4}
                  {...getTextFieldFormikProps(formik, key + ".answer")}
                />
                <div className="absolute -right-4 -top-4">
                  <IconButton
                    color="error"
                    onClick={() => {
                      const newFaqs = [...formik.values.faqs];
                      newFaqs.splice(index, 1);
                      formik.setFieldValue("faqs", newFaqs);
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
                const newFaqs = [...formik.values.faqs, { ...DEFAULT_FAQ }];
                formik.setFieldValue("faqs", newFaqs);
              }}
              startIcon={<Icon>add</Icon>}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </ProjectCreateEditStepScaffold>
  );
}

export default ProjectCreateEditDescription;
