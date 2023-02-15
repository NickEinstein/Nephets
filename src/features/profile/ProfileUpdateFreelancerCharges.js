import ProfileUpdateScaffold from "./ProfileUpdateScaffold";
import LabelXHelpTooltip from "common/LabelXHelpTooltip";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import CurrencyTypography from "common/CurrencyTypography";
import CurrencyTextField from "common/CurrencyTextField";
import currencyjs from "currency.js";
import ProfileUpdateSectionTitle from "./ProfileUpdateSectionTitle";

function ProfileUpdateFreelancerCharges({ formik }) {
  const hourlyRate = formik.values.hourly_rate || 0;
  const serviceCharge = currencyjs(10).divide(100).multiply(hourlyRate).value;

  return (
    <ProfileUpdateScaffold
      title="Charges"
      description="This will be visible to clients, you can make adjustments at any time"
    >
      <div className="max-w-xl grid grid-cols-1 gap-4">
        <CurrencyTextField
          label={
            <LabelXHelpTooltip
              label="Hourly Rate (per hour)"
              tooltip="This is what client will see displayed on your profile"
            />
          }
          {...getTextFieldFormikProps(formik, "hourly_rate")}
        />
        <div>
          <ProfileUpdateSectionTitle>
            <LabelXHelpTooltip
              label="Service Charge (10%)"
              tooltip="This is the portion Softwork takes"
            />
          </ProfileUpdateSectionTitle>
          <CurrencyTypography>{serviceCharge}</CurrencyTypography>
        </div>
        <div>
          <ProfileUpdateSectionTitle>
            <LabelXHelpTooltip
              label="Your Payment"
              tooltip="This is what you will recieve"
            />
          </ProfileUpdateSectionTitle>
          <CurrencyTypography>
            {currencyjs(hourlyRate).subtract(serviceCharge).value}
          </CurrencyTypography>
        </div>
      </div>
    </ProfileUpdateScaffold>
  );
}

export default ProfileUpdateFreelancerCharges;
