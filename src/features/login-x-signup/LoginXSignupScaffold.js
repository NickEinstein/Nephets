import { Fab, Icon } from "@mui/material";
import LoginXSignupHeader from "./LoginXSignupHeader";

function LoginXSignupScaffold(props) {
  return (
    <div className="h-full flex flex-col">
      <LoginXSignupHeader />
      <div className="flex-1">
        <div className="flex h-full">
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center">
            {props.onBackClick && (
              <div className="mb-4">
                <Fab onClick={props.onBackClick} size="small" color="primary">
                  <Icon>arrow_back</Icon>
                </Fab>
              </div>
            )}
            <div className="max-w-sm w-full">{props.children}</div>
          </div>
          <div className="w-1/2 hidden md:flex bg-gray-100 flex-col justify-center items-center">
            <div className="bg-primary-main flex flex-col h-44 w-44 rounded-full overflow-hidden">
              <div className="bg-transparent flex-1" />
              <div className="bg-gray-50 opacity-80 flex-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginXSignupScaffold;
