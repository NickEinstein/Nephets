import {
  Autocomplete,
  Button,
  FormHelperText,
  Icon,
  IconButton,
  TextField,
} from "@mui/material";
import CategoryApi from "apis/CategoryApi";
import useDebouncedState from "hooks/useDebouncedState";
import { useState } from "react";
import { getTextFieldFormikHelperTextAndErrorProps } from "utils/FormikUtils";
import { normalizeArray } from "utils/ObjectUtils";
import ProfileUpdateSectionTitle from "./ProfileUpdateSectionTitle";

function ProfileUpdateFreelancerCategories({
  formik,
  dataRef,
  DEFAULT_CATEGORY,
}) {
  return (
    <div>
      <ProfileUpdateSectionTitle gutterBottom>
        Categories
      </ProfileUpdateSectionTitle>
      <FormHelperText className="mb-4">
        Select Category from dropdown and select the corresponding
        sub-categories. Select as many categories as applicable
      </FormHelperText>
      <div className="flex flex-col mb-4 gap-4">
        {formik.values.categories?.map((hierarchy, hierarchyIndex) => {
          return (
            <CategoryHierarchy
              {...{
                key: hierarchyIndex,
                hierarchy,
                hierarchyIndex,
                formik,
                dataRef,
              }}
            />
          );
        })}
      </div>
      <div className="flex justify-center">
        <Button
          onClick={() => {
            const newCategory = [...formik.values.categories, DEFAULT_CATEGORY];
            formik.setFieldValue("categories", newCategory);
          }}
          startIcon={<Icon>add</Icon>}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default ProfileUpdateFreelancerCategories;

function CategoryHierarchy({ hierarchy, hierarchyIndex, formik, dataRef }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
      {hierarchy.map((categoryId, index) => (
        <CategoryField
          {...{
            key: `${index}.${hierarchyIndex}`,
            index,
            hierarchyIndex,
            categoryId,
            formik,
            dataRef,
          }}
        />
      ))}
      <div className="absolute -right-4 -top-4">
        <IconButton
          color="error"
          onClick={() => {
            const newCategories = [...formik.values.categories];
            newCategories.splice(hierarchyIndex, 1);
            formik.setFieldValue("categories", newCategories);
          }}
        >
          <Icon>cancel</Icon>
        </IconButton>
      </div>
    </div>
  );
}

function CategoryField({ formik, categoryId, hierarchyIndex, index }) {
  const [categoryQ, setCategoryQ] = useState("");

  const key = `categories.${hierarchyIndex}`;

  const [debouncedCategoryQ] = useDebouncedState(categoryQ, {
    wait: 200,
    enableReInitialize: true,
  });

  //   const categoryQueryResult = CategoryApi.useGetCategoryQuery(
  //     {
  //       path: { id: categoryId },
  //     },
  //     {
  //       skip: !categoryId,
  //     }
  //   );

  //   const category = categoryQueryResult.data?.data;

  const categoriesQueryResult = CategoryApi.useGetCategoriesQuery(
    {
      params: {
        // q: debouncedCategoryQ || undefined,
        level: index + 1,
        parent: formik.values.categories?.[hierarchyIndex]?.[index - 1],
        // id: (!debouncedCategoryQ && categoryId) || undefined,
      },
    },
    {
      // skip: !(debouncedCategoryQ || categoryId),
      selectFromResult: (state) => ({
        ...state,
        normalizedData: normalizeArray(state.data?.data),
      }),
    }
  );

  function getCategoryName(id) {
    return categoriesQueryResult.normalizedData?.[id]?.name || "";
  }

  return (
    <Autocomplete
      loading={categoriesQueryResult.isFetching}
      freeSolo
      options={categoriesQueryResult?.data?.data || []}
      getOptionLabel={(option) => {
        return option?.name ? option.name : getCategoryName(option);
      }}
      isOptionEqualToValue={(option, value) => {
        return option?.id === value.id;
      }}
      inputValue={categoryQ}
      onInputChange={(_, value) => setCategoryQ(value)}
      value={
        categoryId
          ? { id: categoryId, name: getCategoryName(categoryId) }
          : null
      }
      onChange={(_, value) => {
        // const newHierarchy = [];
        // if (value?.parent) {
        //   newHierarchy[index] = value.parent;
        //   newHierarchy[index + 1] = value.id;
        // } else {
        //   newHierarchy[index] = value.id;
        //   newHierarchy[index + 1] = "";
        // }
        // if (value?.group) {
        //   newHierarchy.push("");
        // }
        formik.setFieldValue(`${key}.${index}`, value?.id || "");
      }}
      renderInput={(params) => (
        <TextField
          label={`Level ${index + 1}`}
          fullWidth
          margin="dense"
          {...getTextFieldFormikHelperTextAndErrorProps(formik, key)}
          {...params}
        />
      )}
    />
  );
}
