import { Typography } from "@mui/material";
import CategoryApi from "apis/CategoryApi";
import { useMemo } from "react";
import UserCard from "./UserCard";

/**
 *
 * @param {FreelancerUserCardProps} props
 * @returns
 */
function FreelancerUserCard(props) {
  const { data, ...rest } = props;

  const categoryId = data?.categories?.[0]?.[0];

  const categoryQueryResult = CategoryApi.useGetCategoryQuery(
    useMemo(
      () => ({ path: { id: categoryId }, params: { fields: "name" } }),
      [categoryId]
    ),
    { skip: !categoryId }
  );

  const category = categoryQueryResult?.data?.data;

  return (
    <UserCard
      key={data?.id}
      placeholder={data?.firstname}
      image={data?.avatar}
      {...rest}
    >
      <Typography variant="h6" className="font-bold">
        {`${data?.firstname} ${data?.lastname}`}
      </Typography>
      <Typography className="font-bold">{category?.name || "-"}</Typography>
    </UserCard>
  );
}

export default FreelancerUserCard;

/**
 * @typedef {{data: any} & import("./UserCard").UserCardProps} FreelancerUserCardProps
 */
