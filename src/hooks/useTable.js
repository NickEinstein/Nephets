// import { Typography } from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

/**
 *
 * @param {import("@tanstack/react-table").TableOptions<any>} options
 * @returns
 */
function useTable(options) {
  return useReactTable({
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    ...options,
    data: options.data || data,
    defaultColumn: {
      // cell: (info) => <Typography>{info.getValue()}</Typography>,
      ...options?.defaultColumn,
    },
  });
}

export default useTable;

const data = [];
