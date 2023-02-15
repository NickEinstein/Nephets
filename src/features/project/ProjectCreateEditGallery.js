import { Icon, IconButton, Typography } from "@mui/material";
import AssetPreviewer from "common/AssetPreviewer";
import DropzoneField from "common/DropzoneField";
import Dropzone from "react-dropzone";
import ProjectCreateEditSectionDescription from "./ProjectCreateEditSectionDescription";
import ProjectCreateEditSectionTitle from "./ProjectCreateEditSectionTitle";
import ProjectCreateEditStepScaffold from "./ProjectCreateEditStepScaffold";

function ProjectCreateEditGallery(props) {
  const { formik } = props;

  return (
    <ProjectCreateEditStepScaffold
      title="Gallery"
      description="Convince your buyer with an amazing gallery, upload quality images and videos"
    >
      <div className="grid grid-cols-1 gap-4">
        {[
          {
            title: "Add Images (Max of 20)",
            description:
              "Upload up to 20 images (.jpg or .png) of size 10MB each and less than 4000pixel width and height",
            key: "images",
            accepts: { "image/*": [".png", ".jpg", ".jpeg"] },
            placeholder: "Drop images here or click to browse",
          },
          {
            title: "Add Videos (Max of 20)",
            description:
              "Upload videos that highlight your services. Your video should not be more than 75 seconds and smaller than 50MB",
            key: "videos",
            accepts: { "video/*": [] },
            placeholder: "Drop videos here or click to browse",
          },
          {
            title: "Add Documents (Max of 20)",
            description:
              "Show some of your best work your have created in a document (PDF only)",
            key: "documents",
            accepts: { "application/pdf": [] },
            placeholder: "Drop PDFs here or click to browse",
          },
        ].map((galleryConfig) => {
          return (
            <div key={galleryConfig.title} className="mb-8">
              <ProjectCreateEditSectionTitle>
                {galleryConfig.title}
              </ProjectCreateEditSectionTitle>
              <ProjectCreateEditSectionDescription className="mb-4">
                {galleryConfig.description}
              </ProjectCreateEditSectionDescription>
              <div className="flex flex-wrap gap-4">
                {formik.values?.[galleryConfig.key]?.map((item, index) => (
                  <div
                    key={item.name}
                    className="relative w-48 h-48 overflow-hidden rounded-3xl"
                  >
                    <AssetPreviewer
                      {...{
                        src: item?.url,
                        className: "h-full, h-full",
                        VideoPreviewerProps: { controls: true },
                      }}
                    />
                    <div
                      className="absolute top-0 left-0 right-0 p-1 flex items-center gap-1 bg-black bg-opacity-20 text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div className="flex-1" />
                      <IconButton
                        size="small"
                        className=""
                        onClick={() => {
                          const newGallary = [
                            ...formik.values?.[galleryConfig.key],
                          ];
                          newGallary.splice(index, 1);
                          formik.setFieldValue(galleryConfig.key, newGallary);
                        }}
                      >
                        <Icon color="inherit">delete</Icon>
                      </IconButton>
                    </div>
                  </div>
                ))}
                <Dropzone
                  multiple
                  accept={galleryConfig.accepts}
                  onDropAccepted={(files) =>
                    formik.setFieldValue(galleryConfig.key, [
                      ...formik.values[galleryConfig.key],
                      ...files.map((url) => ({ name: url.name, url })),
                    ])
                  }
                >
                  {(dropzone) => (
                    <DropzoneField
                      {...{
                        dropzone,
                        InputContainerProps: {
                          className: "w-48 h-48 flex items-center p-4",
                        },
                      }}
                    >
                      {() => (
                        <Typography
                          variant="body2"
                          className="text-center text-text-secondary"
                        >
                          {galleryConfig.placeholder}
                        </Typography>
                      )}
                    </DropzoneField>
                  )}
                </Dropzone>
              </div>
            </div>
          );
        })}
      </div>
    </ProjectCreateEditStepScaffold>
  );
}

export default ProjectCreateEditGallery;
