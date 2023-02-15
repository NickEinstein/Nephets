import { Typography } from "@mui/material";
import CategoryApi from "apis/CategoryApi";
import UserApi from "apis/UserApi";
import { useMemo } from "react";
import UserAvatar from "./UserAvatar";
import UserCard from "./UserCard";

/**
 *
 * @param {ProjectCardProps} props
 * @returns
 */
function ProjectCard(props) {
  const { data, ...rest } = props;

  const categoryId = data?.category?.[0];

  const categoryQueryResult = CategoryApi.useGetCategoryQuery(
    useMemo(
      () => ({ path: { id: categoryId }, params: { fields: "name" } }),
      [categoryId]
    ),
    { skip: !categoryId }
  );

  const category = categoryQueryResult?.data?.data;

  const userQueryResult = UserApi.useGetUserQuery(
    useMemo(
      () => ({
        path: { id: data?.user },
        params: { fields: "firstname,lastname,avatar" },
      }),
      [data?.user]
    ),
    { skip: !data?.user }
  );

  const user = userQueryResult.data?.data;

  return (
    <UserCard
      key={data?.id}
      placeholder={data?.firstname}
      image={data?.cover || data?.images?.[0]?.url}
      {...rest}
    >
      <div className="flex gap-4">
        <UserAvatar src={user?.avatar}>
          {user?.lastname?.[0]?.toUpperCase()}
        </UserAvatar>
        <div>
          <Typography className="font-bold" gutterBottom>
            {`${user?.lastname} ${user?.firstname}`}
          </Typography>
          <Typography variant="body2">{category?.name}</Typography>
        </div>
      </div>
    </UserCard>
  );
}

export default ProjectCard;

/**
 * @typedef {{data: any} & import("./UserCard").UserCardProps} ProjectCardProps
 */
