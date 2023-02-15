import { TextField } from "@mui/material";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import ProjectCreateEditAttributes from "./ProjectCreateEditAttributes";
import ProjectCreateEditCategory from "./ProjectCreateEditCategory";
import ProjectCreateEditSectionDescription from "./ProjectCreateEditSectionDescription";
import ProjectCreateEditSectionTitle from "./ProjectCreateEditSectionTitle";
import ProjectCreateEditStepScaffold from "./ProjectCreateEditStepScaffold";
import ProjectCreateEditTags from "./ProjectCreateEditTags";

function ProjectCreateEditOverview(props) {
  const { formik } = props;
  return (
    <ProjectCreateEditStepScaffold title="Project Overview">
      <div className="mb-4 max-w-lg">
        <ProjectCreateEditSectionTitle>Title</ProjectCreateEditSectionTitle>
        <ProjectCreateEditSectionDescription gutterBottom>
          Tell the client what you will deliver and how it benefits them.
        </ProjectCreateEditSectionDescription>
        <TextField
          fullWidth
          margin="normal"
          placeholder="E.g: You will get an amazing logo designed for your business"
          {...getTextFieldFormikProps(formik, "title")}
        />
      </div>
      <ProjectCreateEditCategory {...props} />
      <ProjectCreateEditAttributes {...props} />
      <ProjectCreateEditTags {...props} />
    </ProjectCreateEditStepScaffold>
  );
}

export default ProjectCreateEditOverview;
