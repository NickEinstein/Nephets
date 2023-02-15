import ProfileUpdateScaffold from "./ProfileUpdateScaffold";
import ProfileUpdateFreelancerCertifications from "./ProfileUpdateFreelancerCertifications";
import ProfileUpdateFreelancerSkills from "./ProfileUpdateFreelancerSkills";
import ProfileUpdateFreelancerEducations from "./ProfileUpdateFreelancerEducations";
import ProfileUpdateFreelancerCategories from "./ProfileUpdateFreelancerCategories";

function ProfileUpdateFreelancerProfessionalInformation(props) {
  const {
    isCertificationsViewMode,
    isSkillsViewMode,
    isEducationsViewMode,
    isCategoriesViewMode,
  } = props;

  return (
    <ProfileUpdateScaffold
      title="Professional Information"
      description="Display your expertise her, let recruiters know your skills,  area of work, certification and strengths."
    >
      <div className="max-w-xl grid grid-cols-1 gap-4">
        {isCertificationsViewMode && (
          <ProfileUpdateFreelancerCertifications {...props} />
        )}
        {isSkillsViewMode && <ProfileUpdateFreelancerSkills {...props} />}
        {isEducationsViewMode && (
          <ProfileUpdateFreelancerEducations {...props} />
        )}
        {isCategoriesViewMode && (
          <ProfileUpdateFreelancerCategories {...props} />
        )}
      </div>
    </ProfileUpdateScaffold>
  );
}

export default ProfileUpdateFreelancerProfessionalInformation;
