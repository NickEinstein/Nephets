import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import ProjectCreateEditSectionDescription from "./ProjectCreateEditSectionDescription";
import ProjectCreateEditSectionTitle from "./ProjectCreateEditSectionTitle";
import ProjectCreateEditStepScaffold from "./ProjectCreateEditStepScaffold";

function ProjectCreateEditReview(props) {
  const { formik } = props;
  return (
    <ProjectCreateEditStepScaffold
      title="Review"
      description="Please review and thick the boxes"
    >
      <div className="mb-8">
        <ProjectCreateEditSectionTitle>
          Maximum number of simultaneous projects
        </ProjectCreateEditSectionTitle>
        <ProjectCreateEditSectionDescription gutterBottom>
          How many projects can you handle at one time and still deliver great
          results?
        </ProjectCreateEditSectionDescription>
        <TextField
          margin="normal"
          {...getTextFieldFormikProps(formik, "request_queue_size")}
        />
      </div>
      <div className="mb-8">
        <ProjectCreateEditSectionTitle>
          Copyright Notice
        </ProjectCreateEditSectionTitle>
        <ProjectCreateEditSectionDescription gutterBottom>
          By submitting your project, you declare that you either own or have
          rights to the material posted and that posting these materials does
          not infringe on any third party's rights. You also acknowledge that
          you understand your project will be reviewed and evaluated by Softwrk
          to ensure it meets Softwrk's requirements.
        </ProjectCreateEditSectionDescription>
      </div>
      <div className="mb-8">
        <ProjectCreateEditSectionTitle>
          Terms of Service
        </ProjectCreateEditSectionTitle>
        <FormControlLabel
          label="I understand and agree to the Softwrk Terms of Service, including the User Agreement and Privacy Policy."
          control={<Checkbox />}
        />
      </div>
      <div className="mb-8">
        <ProjectCreateEditSectionTitle>
          Privacy Notice
        </ProjectCreateEditSectionTitle>
        <FormControlLabel
          label="By submitting this project and activating it, I understand that it will appear in Softwrk search results visible to the general public and will show up in search engine results, even if my profile visibility is set to Private or Softwrk Users Only."
          control={<Checkbox />}
        />
      </div>
    </ProjectCreateEditStepScaffold>
  );
}

export default ProjectCreateEditReview;
