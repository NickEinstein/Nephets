import { Chip } from "@mui/material";
import { StatusColorMap } from "constants/Global";

function UserStatusChip(props) {
  const { status, ...rest } = props;
  return <Chip label={status} color={StatusColorMap[status]} {...rest} />;
}

UserStatusChip.defaultProps = {
  // size: "small",
  variant: "outlined",
};

export default UserStatusChip;
