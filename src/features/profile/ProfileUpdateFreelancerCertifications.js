import { Button, Icon, IconButton, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import ProfileUpdateSectionTitle from "./ProfileUpdateSectionTitle";

function ProfileUpdateFreelancerCertifications({
  formik,
  DEFAULT_CERTIFICATION,
}) {
  return (
    <div>
      <ProfileUpdateSectionTitle gutterBottom>
        Certifications
      </ProfileUpdateSectionTitle>
      <div className="flex flex-col mb-4 gap-4">
        {formik.values.certifications?.map((certification, index) => (
          <CertificationField
            {...{ key: index, formik, certification, index }}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            const newCertifications = [
              ...formik.values.certifications,
              { ...DEFAULT_CERTIFICATION },
            ];
            formik.setFieldValue("certifications", newCertifications);
          }}
          startIcon={<Icon>add</Icon>}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default ProfileUpdateFreelancerCertifications;

function CertificationField({ formik, certification, index }) {
  const key = `certifications.${index}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
      <TextField
        margin="dense"
        fullWidth
        placeholder="Certificate Name"
        label="Name"
        {...getTextFieldFormikProps(formik, `${key}.name`)}
      />
      <TextField
        margin="dense"
        fullWidth
        placeholder="Google"
        label="Company"
        {...getTextFieldFormikProps(formik, `${key}.company`)}
      />
      <DatePicker
        label="Date"
        disableFuture
        value={certification.date}
        onChange={(newValue) => {
          formik.setFieldValue(`${key}.date`, newValue);
        }}
        renderInput={(params) => (
          <TextField
            margin="dense"
            {...getTextFieldFormikProps(formik, `${key}.date`)}
            {...params}
          />
        )}
      />
      <div className="absolute -right-4 -top-4">
        <IconButton
          color="error"
          onClick={() => {
            const newCertifications = [...formik.values.certifications];
            newCertifications.splice(index, 1);
            formik.setFieldValue("certifications", newCertifications);
          }}
        >
          <Icon>cancel</Icon>
        </IconButton>
      </div>
    </div>
  );
}
