import { AppBar, Toolbar, Typography } from "@mui/material";
import Logo from "common/Logo";
import { RouteEnum } from "constants/RouteConstants";
import { Link } from "react-router-dom";

function LoginXSignupHeader(props) {
  return null
  // return (
  //   <>
  //     <AppBar className="bg-white text-black">
  //       <Toolbar>
  //         <Link to={RouteEnum.DASHBOARD}>
  //           <Logo />
  //         </Link>
  //         <div className="flex-1" />
  //         <Typography>Everything you are looking for is here</Typography>
  //       </Toolbar>
  //     </AppBar>
  //     <Toolbar />
  //   </>
  // );
}

export default LoginXSignupHeader;
