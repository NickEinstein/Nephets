import { Button } from "@mui/material";
import { Link } from "react-router-dom";

/**
 *
 * @param {LinkButtonProps} props
 * @returns
 */
function LinkButton(props) {
  return <Button {...props} />;
}

LinkButton.defaultProps = {
  component: Link,
};

export default LinkButton;

/**
 * @typedef {{} & import("react-router-dom").LinkProps & import("@mui/material").ButtonProps} LinkButtonProps
 */
