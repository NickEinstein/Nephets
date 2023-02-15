import { Paper, Tab, Tabs, Typography } from "@mui/material";
import ProjectApi from "apis/ProjectApi";
import LinkButton from "common/LinkButton";
import { DateFormatEnum } from "constants/DateContants";
import { RouteEnum } from "constants/RouteConstants";
import { useMemo } from "react";
import { generatePath, useSearchParams } from "react-router-dom";
import { urlSearchParamsExtractor } from "utils/URLUtils";
import { ProjectDashboardTabEnum } from "./ProjectConstants";
import * as dfns from "date-fns";
import ProjectFreelancerDashboardAction from "./ProjectFreelancerDashboardAction";
import useTablePaginationParams from "hooks/useTablePaginationParams";
import useTable from "hooks/useTable";
import { removeEmptyProperties } from "utils/ObjectUtils";
import Table from "common/Table";
import ImagePreviewer from "common/ImagePreviewer";
import MuiRouterLink from "common/MuiRouterLink";
import useAuthUser from "hooks/useAuthUser";

function ProjectFreelancerDashboard(props) {
  const authUser = useAuthUser();
  const [searchParams, setSearchParams] = useSearchParams();

  const extractedSearchParams = useMemo(
    () =>
      urlSearchParamsExtractor(searchParams, {
        activeTab: ProjectDashboardTabEnum.PENDING,
      }),
    [searchParams]
  );

  const { activeTab } = extractedSearchParams;

  const [pagination, setPagination, { offset, limit }] =
    useTablePaginationParams();

  const projectsApprovedCountQueryResult = ProjectApi.useGetProjectsQuery(
    useMemo(
      () => ({
        params: {
          user: authUser?.id,
          status: ProjectDashboardTabEnum.ACCEPTED,
        },
      }),
      [authUser?.id]
    )
  );

  const projectsUnderReviewCountQueryResult = ProjectApi.useGetProjectsQuery(
    useMemo(
      () => ({
        params: {
          user: authUser?.id,
          status: ProjectDashboardTabEnum.IN_REVIEW,
        },
      }),
      [authUser?.id]
    )
  );

  const projectsDraftsCountQueryResult = ProjectApi.useGetProjectsQuery(
    useMemo(
      () => ({
        params: {
          user: authUser?.id,
          status: ProjectDashboardTabEnum.PENDING,
        },
      }),
      [authUser?.id]
    )
  );

  const tabs = [
    {
      label: `Approved (${
        projectsApprovedCountQueryResult.data?.filtered || 0
      })`,
      content: null,
      value: ProjectDashboardTabEnum.ACCEPTED,
    },
    {
      label: `Under Review (${
        projectsUnderReviewCountQueryResult.data?.filtered || 0
      })`,
      content: null,
      value: ProjectDashboardTabEnum.IN_REVIEW,
    },
    {
      label: `Drafts (${projectsDraftsCountQueryResult.data?.filtered || 0})`,
      content: null,
      value: ProjectDashboardTabEnum.PENDING,
    },
  ];

  const tab = tabs.find((tab) => tab.value === activeTab);

  const projectsQueryResult = ProjectApi.useGetProjectsQuery(
    useMemo(
      () => ({
        params: { user: authUser?.id, offset, limit, status: tab?.value },
      }),
      [authUser?.id, limit, offset, tab?.value]
    ),
    { skip: !tab.value }
  );

  const tableInstance = useTable({
    columns,
    data: projectsQueryResult?.data?.data,
    state: { pagination },
    pageCount: projectsQueryResult?.data?.pages,
    manualPagination: true,
    onPaginationChange: setPagination,
  });

  function handleSetSearchParams(params) {
    setSearchParams(
      removeEmptyProperties({ ...extractedSearchParams, ...params }),
      { replace: true }
    );
  }

  return (
    <>
      <Paper variant="outlined" className="p-4 lg:p-8">
        <div className="flex items-center flex-wrap gap-2 justify-between mb-4">
          <Typography variant="h4">Projects</Typography>
          <LinkButton to={RouteEnum.PROJECTS_CREATE}>
            Create a Project
          </LinkButton>
        </div>
        <Tabs
          className="mb-4"
          value={activeTab}
          onChange={(_, activeTab) => {
            setSearchParams({ activeTab });
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        {tab && (
          <Table
            instance={tableInstance}
            loading={projectsQueryResult.isFetching}
            error={projectsQueryResult.isError}
            onReload={projectsQueryResult.refetch}
          />
        )}
      </Paper>
    </>
  );
}

export default ProjectFreelancerDashboard;

const columns = [
  {
    header: "Name",
    accessorKey: "title",
    cell: ({ row, getValue }) => (
      <div className="flex items-center gap-2 font-bold">
        <ImagePreviewer
          className="w-16 h-12"
          src={row?.original?.cover || row?.original?.images?.[0]?.url}
        />
        <MuiRouterLink
          to={generatePath(RouteEnum.PROJECTS_EDIT, { id: row?.original?.id })}
        >
          {getValue()}
        </MuiRouterLink>
      </div>
    ),
  },
  {
    header: "Created on",
    accessorFn: (row) =>
      dfns.format(new Date(row?.created_at), DateFormatEnum.FORMAT),
  },
  {
    id: "actions",
    maxSize: 40,
    cell: ({ row }) => <ProjectFreelancerDashboardAction data={row.original} />,
  },
];
