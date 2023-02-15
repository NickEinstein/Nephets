import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import AssetPreviewer from "common/AssetPreviewer";
import DropzoneField from "common/DropzoneField";
import HelpTooltipLabel from "common/HelpTooltipLabel";
import LoadingContent from "common/LoadingContent";
import MultiPreviewer from "common/MultiPreviewer";
import { CustomFieldTypeEnum } from "constants/CustomFieldConstants";
import Dropzone from "react-dropzone";
import { normalizeArray } from "utils/ObjectUtils";

import ProjectCreateEditSectionTitle from "./ProjectCreateEditSectionTitle";

function ProjectCreateEditAttributes({
  formik,
  categoryQueryResult,
  category,
}) {
  const project_attributes = category?.project_attributes;

  return (
    <LoadingContent
      loading={categoryQueryResult.isFetching}
      error={categoryQueryResult.error}
      onReload={categoryQueryResult.refetch}
    >
      {() =>
        !!project_attributes?.length ? (
          <div>
            <ProjectCreateEditSectionTitle>
              Project attributes
            </ProjectCreateEditSectionTitle>
            <div className="">
              {project_attributes?.map((config) => {
                const key = `attributes.${config.id}`;
                return (
                  <div key={config.id} className="py-4">
                    {(() => {
                      switch (config.type) {
                        case CustomFieldTypeEnum.TEXT:
                          return (
                            <TextField
                              {...{
                                label: config.label,
                                multiline: config.multiple,
                                value: formik.values.attributes?.[config.id],
                                onChange: (e) => {
                                  formik.setFieldValue(key, e.target.value);
                                },
                              }}
                            />
                          );
                        case CustomFieldTypeEnum.NUMBER:
                          return (
                            <TextField
                              {...{
                                label: config.label,
                                value: formik.values.attributes?.[config.id],
                                onChange: (e) => {
                                  formik.setFieldValue(key, e.target.value);
                                },
                              }}
                            />
                          );
                        case CustomFieldTypeEnum.CHOICE: {
                          const normalizedSeletedChoices = config.multiple
                            ? normalizeArray(
                                formik.values.attributes?.[config.id],
                                {
                                  getId: (id) => id,
                                }
                              )
                            : {};

                          const groupItems = config?.choices?.map((choice) => (
                            <FormControlLabel
                              {...{
                                key: choice.id,
                                label: choice.label,
                                ...(config?.multiple
                                  ? {
                                      control: (
                                        <Checkbox
                                          {...{
                                            checked:
                                              !!normalizedSeletedChoices?.[
                                                choice.id
                                              ],
                                            onChange(e) {
                                              const newNormalizedSelectedChoices =
                                                {
                                                  ...normalizedSeletedChoices,
                                                };

                                              if (e.target.checked) {
                                                newNormalizedSelectedChoices[
                                                  choice.id
                                                ] = choice.id;
                                              } else {
                                                delete newNormalizedSelectedChoices[
                                                  choice.id
                                                ];
                                              }
                                              formik.setFieldValue(
                                                key,
                                                Object.values(
                                                  newNormalizedSelectedChoices
                                                )
                                              );
                                            },
                                          }}
                                        />
                                      ),
                                    }
                                  : { value: choice.id, control: <Radio /> }),
                              }}
                            />
                          ));

                          const className = "grid md:grid-cols-3 gap-2";
                          return (
                            <FormControl fullWidth>
                              {!!config.label && (
                                <FormLabel className="font-bold ">
                                  {config.label}
                                </FormLabel>
                              )}
                              {config?.description && (
                                <Typography
                                  color="textSecondary"
                                  variant="body2"
                                  className="mb-2"
                                >
                                  {config?.description}
                                </Typography>
                              )}
                              {config.multiple ? (
                                <FormGroup {...{ className }}>
                                  {groupItems}
                                </FormGroup>
                              ) : (
                                <RadioGroup
                                  {...{ className }}
                                  value={formik.values.attributes?.[config.id]}
                                  onChange={(e) =>
                                    formik.setFieldValue(key, e.target.value)
                                  }
                                >
                                  {groupItems}
                                </RadioGroup>
                              )}
                            </FormControl>
                          );
                        }
                        case CustomFieldTypeEnum.ATTACHMENT:
                          return (
                            <Dropzone
                              {...{
                                multiple: config?.multiple,
                                maxFiles: config?.maximum,
                                onDropAccepted: (files) => {
                                  formik.setFieldValue(
                                    key,
                                    config.multiple ? files : files[0]
                                  );
                                },
                              }}
                            >
                              {(dropzone) => (
                                <DropzoneField
                                  {...{
                                    dropzone,
                                    label: config.description ? (
                                      <HelpTooltipLabel
                                        label={config?.label}
                                        title={config?.description}
                                      />
                                    ) : (
                                      config?.label
                                    ),
                                    fullWidth: true,
                                    className: "max-w-xs h-48",
                                    FormLabelProps: {
                                      className: " font-bold mb-1",
                                    },
                                  }}
                                >
                                  {() =>
                                    formik.values.attributes?.[config.id] ? (
                                      <>
                                        {config?.multiple ? (
                                          <MultiPreviewer
                                            srcs={
                                              formik.values.attributes?.[
                                                config.id
                                              ]
                                            }
                                          />
                                        ) : (
                                          <AssetPreviewer
                                            src={
                                              formik.values.attributes?.[
                                                config.id
                                              ]
                                            }
                                          />
                                        )}
                                      </>
                                    ) : null
                                  }
                                </DropzoneField>
                              )}
                            </Dropzone>
                          );
                        default:
                          return null;
                      }
                    })()}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null
      }
    </LoadingContent>
  );
}

export default ProjectCreateEditAttributes;
