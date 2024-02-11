import { Button, DialogActions, Drawer } from "@mui/material";
import clsx from "clsx";
import { APP_SIDE_MENU_WIDTH } from "constants/Global";
import DialogTitleXCloseButton from "./DialogTitleXCloseButton";

/**
 *
 * @param {FilterDrawerProps} props
 * @returns
 */
function FilterDrawer(props) {
  const { title, children, PaperProps, onClose, onApply, ...rest } = props;

  return (
    <Drawer
      anchor="right"
      PaperProps={{
        ...PaperProps,
        className: clsx("flex flex-col"),
        style: { width: APP_SIDE_MENU_WIDTH, ...PaperProps?.style },
      }}
      {...rest}
    >
      <DialogTitleXCloseButton onClose={onClose} className="mb-4">
        {title}
      </DialogTitleXCloseButton>
      <div className="flex-1 min-h-0 overflow-auto px-4">{children}</div>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onApply}>Apply</Button>
      </DialogActions>
    </Drawer>
  );
}

export default FilterDrawer;

/**
 * @typedef {{onApply: Function} & import("@mui/material").DrawerProps} FilterDrawerProps
 */
