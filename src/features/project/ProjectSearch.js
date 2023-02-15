import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  MenuItem,
  Paper,
  Typography,
  useMediaQuery,
  TextField,
  Avatar,
  Rating,
} from "@mui/material";
import {
  getTextFieldFormikHelperTextAndErrorProps,
  getTextFieldFormikProps,
} from "utils/FormikUtils";
import ProjectSearchOutcomePNG from "assets/imgs/project-search-outcomes-image.png"
import DialogTitleXCloseButton from "common/DialogTitleXCloseButton";
import SearchTextField from "common/SearchTextField";
import { MediaQueryBreakpointEnum } from "constants/Global";
import useToggle from "hooks/useToggle";

function ProjectSearch(props) {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const [isFilter, toggleFilter] = useToggle();
const imgArray = [
  ProjectSearchOutcomePNG,
  ProjectSearchOutcomePNG,
  ProjectSearchOutcomePNG,
  ProjectSearchOutcomePNG,
  ProjectSearchOutcomePNG,
  ProjectSearchOutcomePNG,
];
  const filter = <div></div>;

  

  return (
    <>
      <Paper variant="outlined" className="p-4 md:p-6">
        <div className="flex items-center">
          <Typography variant="h4">Project Search</Typography>
          <div className="flex-1" />
          {!ismd && (
            <Button startIcon={<Icon>filter_list</Icon>} onClick={toggleFilter}>
              Filter
            </Button>
          )}
        </div>
        <div className="md:mt-6 md:pl-6 ">
          {/* {ismd && 
          <div className="w-full md:w-1/3 md:pr-6">{filter}</div>} */}
          <div className="w-full md:w-2/3 ">
            <SearchTextField size="medium" fullWidth />
          </div>
          {ismd && (
            <Typography className="my-2">
              Related: logo, logo design graphic design, logo design & branding,
              brand identity, web design, branding.
            </Typography>
          )}
          <Typography variant="h4" className="my-12">
            Results for "Search"
          </Typography>
          {ismd && (
            <div className="flex gap-4">
              <TextField
                margin="dense"
                fullWidth
                placeholder="Select Level"
                label="Category"
                // {...getTextFieldFormikProps(formik, `${key}.level`)}
                select
              >
                <MenuItem value={"Sam"}>Category</MenuItem>
              </TextField>
              <TextField
                margin="dense"
                fullWidth
                placeholder="Select Level"
                label="Project Attributes"
                // {...getTextFieldFormikProps(formik, `${key}.level`)}
                select
              >
                <MenuItem value={"Sam"}>Project Attributes</MenuItem>
              </TextField>

              <TextField
                margin="dense"
                fullWidth
                placeholder="Select Level"
                label="Price
              "
                // {...getTextFieldFormikProps(formik, `${key}.level`)}
                select
              >
                <MenuItem value={"Sam"}>Price</MenuItem>
              </TextField>
              <TextField
                margin="dense"
                fullWidth
                placeholder="Select Level"
                label="Delivery Time
              "
                // {...getTextFieldFormikProps(formik, `${key}.level`)}
                select
              >
                <MenuItem value={"Sam"}>Delivery Time</MenuItem>
              </TextField>
              <TextField
                margin="dense"
                fullWidth
                placeholder="Select Level"
                label="Talent Details
              "
                // {...getTextFieldFormikProps(formik, `${key}.level`)}
                select
              >
                <MenuItem value={"Sam"}>Talent Details</MenuItem>
              </TextField>
            </div>
          )}
        </div>
        <div className="my-6 md:pl-6">
          <Typography>229,340 services available</Typography>
        </div>

        {/* Project Dashboard card */}

        <div class="flex flex-wrap gap-4">
          {imgArray.map((img, index) => (
            <div key={index} className="w-full md:w-60 rounded-2xl bg-primary-main text-white ">
              <div className="flex gap-3 md:block">
                <div className="h-44 relative">
                  <img
                    className=" h-full w-full w-min-1/2"
                    src={img}
                  />
                </div>
                <Typography className="mt-2 md:px-3">
                  I design responsive Mobile Apps and Websites
                </Typography>
              </div>
              <div className="w-full md:w-60  text-[11px]">
                <div className="px-3 border-b-2">
                  <div className="flex items-center my-2 justify-between">
                    <Typography>From $25</Typography>
                    <Typography className="">2 day delivery</Typography>
                  </div>
                </div>
                <div class="flex p-3 justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <Avatar className="h-7 w-7" />
                    <Typography>Pamela Ohaeri </Typography>
                  </div>
                  <div class="flex gap-2">
                    <Rating className="text-green-500" value={1} max={1} />
                    <Typography>4.5 (564)</Typography>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Paper>
      {!ismd && (
        <Dialog open={isFilter} fullScreen>
          <DialogTitleXCloseButton onClose={toggleFilter}>
            Filter Projects
          </DialogTitleXCloseButton>
          <DialogContent>
            <div className="w-full md:w-2/3 ">
              <SearchTextField size="medium" fullWidth />
            </div>
          </DialogContent>
          <DialogActions>
            <Button>Close</Button>
            <Button>Apply</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default ProjectSearch;
