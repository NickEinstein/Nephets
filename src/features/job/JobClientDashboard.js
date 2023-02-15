import { Paper, Typography } from "@mui/material";
import LinkButton from "common/LinkButton";
import { DateFormatEnum } from "constants/DateContants";
import { RouteEnum } from "constants/RouteConstants";
import { useMemo } from "react";
import { generatePath, useSearchParams } from "react-router-dom";
import { urlSearchParamsExtractor } from "utils/URLUtils";
import * as dfns from "date-fns";
import JobDashboardListAction from "./JobClientDashboardListAction";
import useTablePaginationParams from "hooks/useTablePaginationParams";
import useTable from "hooks/useTable";
import { removeEmptyProperties } from "utils/ObjectUtils";
import Table from "common/Table";
import ImagePreviewer from "common/ImagePreviewer";
import MuiRouterLink from "common/MuiRouterLink";
import useAuthUser from "hooks/useAuthUser";

function JobClientDashboard(props) {
  const authUser = useAuthUser();
  const [searchParams, setSearchParams] = useSearchParams();

  const extractedSearchParams = useMemo(
    () => urlSearchParamsExtractor(searchParams, {}),
    [searchParams]
  );

  const { activeTab } = extractedSearchParams;

  const [pagination, setPagination, { offset, limit }] =
    useTablePaginationParams();

  const tableInstance = useTable({
    columns,
    state: { pagination },
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
          <Typography variant="h4">Jobs</Typography>
          <LinkButton to={RouteEnum.JOBS_CREATE}>Create a Job</LinkButton>
        </div>

        <Table instance={tableInstance} />
      </Paper>
    </>
  );
}

export default JobClientDashboard;

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
          to={generatePath(RouteEnum.JOBS_EDIT, { id: row?.original?.id })}
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
    cell: ({ row }) => <JobDashboardListAction data={row.original} />,
  },
];
