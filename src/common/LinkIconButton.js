import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

/**
 *
 * @param {LinkIconButtonProps} props
 * @returns
 */
function LinkIconButton(props) {
  return <IconButton {...props} />;
}

LinkIconButton.defaultProps = {
  component: Link,
};

export default LinkIconButton;

/**
 * @typedef {{} & import("react-router-dom").LinkProps & import("@mui/material").IconProps} LinkIconButtonProps
 */
