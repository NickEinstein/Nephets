import { Button, Icon } from "@mui/material";

/**
 *
 * @param {FilterButtonProps} props
 * @returns
 */
function FilterButton(props) {
  return (
    <Button startIcon={<Icon>filter_list</Icon>} {...props}>
      {props.children || "Filter"}
    </Button>
  );
}

export default FilterButton;

/**
 * @typedef {{} & import("@mui/material").ButtonProps} FilterButtonProps
 */
