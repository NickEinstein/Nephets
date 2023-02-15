import { Autocomplete, TextField } from "@mui/material";
import CategoryApi from "apis/CategoryApi";
import useDataRef from "hooks/useDataRef";
import { useEffect, useState } from "react";
import { getTextFieldFormikHelperTextAndErrorProps } from "utils/FormikUtils";
import { normalizeArray } from "utils/ObjectUtils";
import ProjectCreateEditSectionDescription from "./ProjectCreateEditSectionDescription";
import ProjectCreateEditSectionTitle from "./ProjectCreateEditSectionTitle";

function ProjectCreateEditCategory({ formik, dataRef }) {
  return (
    <div className="mb-4">
      <ProjectCreateEditSectionTitle>Categories</ProjectCreateEditSectionTitle>
      <ProjectCreateEditSectionDescription gutterBottom>
        Select a category so it's easy for clients to find your project.{" "}
      </ProjectCreateEditSectionDescription>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {formik.values.category?.map((categoryId, index) => (
          <CategoryField
            {...{
              key: index,
              index,
              categoryId,
              formik,
              dataRef,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectCreateEditCategory;

function CategoryField({ formik, categoryId, index }) {
  const [categoryQ, setCategoryQ] = useState("");

  const key = `category.${index}`;
  const level = index + 1;

  const categoriesQueryResult = CategoryApi.useGetCategoriesQuery(
    {
      params: {
        limit: 1000,
        level,
        parent: formik.values.category?.[index - 1],
      },
    },
    {
      selectFromResult: (state) => ({
        ...state,
        normalizedData: normalizeArray(state.data?.data),
      }),
    }
  );

  function getCategoryName(id) {
    return categoriesQueryResult.normalizedData?.[id]?.name || "";
  }

  const dataRef = useDataRef({ formik, categoriesQueryResult });

  useEffect(() => {
    if (
      dataRef.current.categoriesQueryResult.normalizedData?.[categoryId]
        ?.group &&
      dataRef.current.formik.values?.category?.length <= level
    ) {
      dataRef.current.formik.setFieldValue(`category.${level}`, "");
    }
  }, [categoryId, dataRef, level]);

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
        formik.setFieldValue(`${key}`, value?.id || "");
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
