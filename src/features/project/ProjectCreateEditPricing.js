import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AssetPreviewer from "common/AssetPreviewer";
import CurrencyTextField from "common/CurrencyTextField";
import DropzoneField from "common/DropzoneField";
import HelpTooltipLabel from "common/HelpTooltipLabel";
import MultiPreviewer from "common/MultiPreviewer";
import { CustomFieldTypeEnum } from "constants/CustomFieldConstants";
import { MediaQueryBreakpointEnum } from "constants/Global";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import { normalizeArray, objectAccessor } from "utils/ObjectUtils";
import { ProjectTierEnum } from "./ProjectConstants";
import ProjectCreateEditSectionDescription from "./ProjectCreateEditSectionDescription";
import ProjectCreateEditSectionTitle from "./ProjectCreateEditSectionTitle";
import ProjectCreateEditStepScaffold from "./ProjectCreateEditStepScaffold";

function ProjectCreateEditPricing(props) {
  const { project, formik, category, DEFAULT_TIER } = props;

  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const [isTitles, setTitles] = useState(true);
  const [isMultiTier, setMultiTier] = useState(project?.tiers?.length > 1);

  const tiers = isMultiTier
    ? [ProjectTierEnum.BASIC, ProjectTierEnum.STANDARD, ProjectTierEnum.MEGA]
    : [ProjectTierEnum.BASIC];

  const project_services = category?.project_services;

  return (
    <ProjectCreateEditStepScaffold title="Pricing & Scope">
      <div className="">
        <div className="flex items-center justify-between mb-4">
          <div>
            <ProjectCreateEditSectionTitle>
              Create Pricing tier
            </ProjectCreateEditSectionTitle>
            <ProjectCreateEditSectionDescription gutterBottom>
              Customize your project with 1 or 3 pricing tiers{" "}
            </ProjectCreateEditSectionDescription>
          </div>
          <Switch
            checked={isMultiTier}
            onChange={(e) => {
              setMultiTier(e.target.checked);
              const tiers = formik.values.tiers;
              formik.setFieldValue("tiers", {
                [ProjectTierEnum.BASIC]: {
                  ...DEFAULT_TIER,
                  ...tiers?.[ProjectTierEnum.BASIC],
                },
                ...(e.target.checked
                  ? {
                      [ProjectTierEnum.STANDARD]: {
                        ...DEFAULT_TIER,
                        ...tiers?.[ProjectTierEnum.STANDARD],
                      },
                      [ProjectTierEnum.MEGA]: {
                        ...DEFAULT_TIER,
                        ...tiers?.[ProjectTierEnum.MEGA],
                      },
                    }
                  : {}),
              });
            }}
          />
        </div>
        <FormControlLabel
          className="mb-8"
          label="Show Titles"
          control={
            <Checkbox
              checked={isTitles}
              onChange={(e) => setTitles(e.target.checked)}
            />
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((type) => (
            <Tier
              {...{ key: type, type, formik, project_services, isTitles }}
            />
          ))}
        </div>
      </div>
    </ProjectCreateEditStepScaffold>
  );
}

export default ProjectCreateEditPricing;

function Tier({ type, formik, project_services, isTitles }) {
  const key = `tiers.${type}`;

  return (
    <div className="flex flex-col gap-8">
      <Typography
        variant="h6"
        color="primary"
        className="font-bold text-center"
      >
        {type}
      </Typography>
      {isTitles && (
        <>
          <TextField
            label="Title"
            {...getTextFieldFormikProps(formik, key + ".title")}
          />
          <TextField
            label="Description"
            multiline
            minRows={0}
            maxRows={4}
            {...getTextFieldFormikProps(formik, key + ".description")}
          />
        </>
      )}
      {project_services?.map((config) => {
        const serviceKey = `${key}.services.${config.id}`;
        return (
          <div key={config.id} className="">
            {(() => {
              switch (config.type) {
                case CustomFieldTypeEnum.TEXT:
                  return (
                    <TextField
                      {...{
                        fullWidth: true,
                        label: config.label,
                        multiline: config.multiple,
                        ...getTextFieldFormikProps(formik, serviceKey),
                        // value: objectAccessor(formik.values, serviceKey),
                        // onChange: (e) => {
                        //   formik.setFieldValue(serviceKey, e.target.value);
                        // },
                      }}
                    />
                  );
                case CustomFieldTypeEnum.NUMBER:
                  return (
                    <TextField
                      {...{
                        fullWidth: true,
                        type: "number",
                        label: config.label,
                        ...getTextFieldFormikProps(formik, serviceKey),
                        // value: objectAccessor(formik.values, serviceKey),
                        // onChange: (e) => {
                        //   formik.setFieldValue(serviceKey, e.target.value);
                        // },
                      }}
                    />
                  );
                case CustomFieldTypeEnum.CHOICE: {
                  const normalizedSeletedChoices = config.multiple
                    ? normalizeArray(
                        objectAccessor(formik.values, serviceKey),
                        {
                          getId: (id) => id,
                        }
                      )
                    : {};

                  if (config.dropdown) {
                    return (
                      <TextField
                        {...{
                          fullWidth: true,
                          label: config.label,
                          select: true,
                          SelectProps: {
                            multiple: config.multiple,
                            // renderValue: (selected) => (
                            //   <div className="flex flex-wrap gap-1">
                            //     {selected.map((value) => (
                            //       <Chip key={value} label={normalizedChoices?.[value]?.label} />
                            //     ))}
                            //   </div>
                            // ),
                          },
                          ...getTextFieldFormikProps(formik, serviceKey),
                        }}
                      >
                        {config?.choices.map((choice) => (
                          <MenuItem key={choice.id} value={choice.id}>
                            {choice.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    );
                  }

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
                                      !!normalizedSeletedChoices?.[choice.id],
                                    onChange(e) {
                                      const newNormalizedSelectedChoices = {
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
                                        serviceKey,
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

                  const className = "";
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
                        <FormGroup {...{ className }}>{groupItems}</FormGroup>
                      ) : (
                        <RadioGroup
                          {...{ className }}
                          {...getTextFieldFormikProps(formik, serviceKey)}

                          // value={objectAccessor(formik.values, serviceKey)}
                          // onChange={(e) =>
                          //   formik.setFieldValue(serviceKey, e.target.value)
                          // }
                        >
                          {groupItems}
                        </RadioGroup>
                      )}
                    </FormControl>
                  );
                }
                case CustomFieldTypeEnum.ATTACHMENT: {
                  const src = objectAccessor(formik.values, serviceKey);
                  return (
                    <Dropzone
                      {...{
                        multiple: config?.multiple,
                        maxFiles: config?.maximum,
                        onDropAccepted: (files) => {
                          formik.setFieldValue(
                            serviceKey,
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
                            className: "h-24",
                            FormLabelProps: {
                              className: "mb-1",
                            },
                          }}
                        >
                          {() =>
                            src ? (
                              <>
                                {config?.multiple ? (
                                  <MultiPreviewer srcs={src} />
                                ) : (
                                  <AssetPreviewer src={src} />
                                )}
                              </>
                            ) : null
                          }
                        </DropzoneField>
                      )}
                    </Dropzone>
                  );
                }
                default:
                  return null;
              }
            })()}
          </div>
        );
      })}
      <CurrencyTextField
        label="Price"
        {...getTextFieldFormikProps(formik, key + ".price")}
      />
    </div>
  );
}
