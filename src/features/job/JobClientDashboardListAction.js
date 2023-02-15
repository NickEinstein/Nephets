import { Icon, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import ProjectApi from "apis/ProjectApi";
import ConfirmationDialog from "common/ConfirmationDialog";
import { RouteEnum } from "constants/RouteConstants";
import useAsyncUI from "hooks/useAsyncUI";
import usePopover from "hooks/usePopover";
import { useSnackbar } from "notistack";
import { generatePath, Link } from "react-router-dom";

function JobClientDashboardListAction({ data }) {
  const { enqueueSnackbar } = useSnackbar();
  const popover = usePopover();

  const deleteAsyncUI = useAsyncUI();

  const [deleteProjectMutation, deleteProjectMutationResult] =
    ProjectApi.useDeleteProjectMutation();

  async function deleteUser() {
    try {
      if (!(await deleteAsyncUI.open())) {
        return;
      }
      const _data = await deleteProjectMutation({
        path: { id: data?.id },
      }).unwrap();
      enqueueSnackbar(_data?.message || "Project Deleted Successfully", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error?.data?.message || "Project to Delete User", {
        variant: "error",
      });
    }
  }

  const isSubmitting = deleteProjectMutationResult.isLoading;

  return (
    <>
      <IconButton onClick={popover.togglePopover}>
        <Icon>more_vert</Icon>
      </IconButton>
      <Menu
        open={popover.isOpen}
        anchorEl={popover.anchorEl}
        onClick={popover.togglePopover}
      >
        {[
          {
            name: "Edit",
            icon: "edit",
            props: {
              component: Link,
              to: generatePath(RouteEnum.PROJECTS_EDIT, { id: data.id }),
            },
          },
          {
            name: "Delete",
            icon: "delete",
            onClick: () => {
              popover.togglePopover();
              deleteUser();
            },
          },
        ].map((item) => (
          <MenuItem
            key={item.name}
            onClick={item.onClick}
            disabled={isSubmitting}
            {...item.props}
          >
            <Icon>{item.icon}</Icon>
            <Typography className="ml-2">{item.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
      {deleteAsyncUI.render((ui) => (
        <ConfirmationDialog
          open
          title="Are you sure you want to delete this project"
          onConfirm={() => ui.resolve(true)}
          onCancel={() => ui.resolve(false)}
        />
      ))}
    </>
  );
}

export default JobClientDashboardListAction;
