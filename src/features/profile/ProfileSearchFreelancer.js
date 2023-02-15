import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  Paper,
  useMediaQuery,
} from "@mui/material";
import DialogTitleXCloseButton from "common/DialogTitleXCloseButton";
import SearchTextField from "common/SearchTextField";
import { MediaQueryBreakpointEnum } from "constants/Global";
import useToggle from "hooks/useToggle";

function ProfileSearchFreelancer(props) {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const [isFilter, toggleFilter] = useToggle();

  const filter = <div></div>;

  return (
    <>
      <Paper variant="outlined" className="p-4 md:p-6">
        <div className="flex items-center">
          <div className="flex-1" />
          {!ismd && (
            <Button startIcon={<Icon>filter_list</Icon>} onClick={toggleFilter}>
              Filter
            </Button>
          )}
        </div>
        <div className="flex">
          {ismd && <div className="w-full md:w-1/3 md:pr-6">{filter}</div>}
          <div className="w-full md:w-2/3 md:pl-6 md:border-l">
            <SearchTextField size="medium" fullWidth />
          </div>
        </div>
      </Paper>
      {!ismd && (
        <Dialog open={isFilter} fullScreen>
          <DialogTitleXCloseButton onClose={toggleFilter}>
            Filter Freelancers
          </DialogTitleXCloseButton>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button>Close</Button>
            <Button>Apply</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default ProfileSearchFreelancer;
