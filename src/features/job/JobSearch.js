import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DialogTitleXCloseButton from "common/DialogTitleXCloseButton";
import SearchTextField from "common/SearchTextField";
import { MediaQueryBreakpointEnum } from "constants/Global";
import useToggle from "hooks/useToggle";
import JobCard from "./JobCard";

function JobSearch(props) {
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);

  const [isFilter, toggleFilter] = useToggle();

  const filter = <div></div>;

  return (
    <>
      <Paper variant="outlined" className="p-4 md:p-6">
        <div className="flex items-center mb-4">
          <Typography variant="h4">Jobs</Typography>
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
            <SearchTextField size="medium" fullWidth className="mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </Paper>

      <></>
      {!ismd && (
        <Dialog open={isFilter} fullScreen>
          <DialogTitleXCloseButton onClose={toggleFilter}>
            Filter Jobs
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

export default JobSearch;

const jobs = [
  {
    id: "job1",
    title: "Build a responsive website, SEO optimised.",
    description:
      "We are seeking for a front-end web developer to build new pages and improve our company website. The right person for this role will be proficient in HTML, CSS, Javascript and PHP.",
    skills: [
      {
        id: 1,
        name: "Logo Design",
      },
      {
        id: 2,
        name: "Branding",
      },
      {
        id: 3,
        name: "Logo Usage Guidelines",
      },
      {
        id: 4,
        name: "Brand Identity",
      },
      {
        id: 5,
        name: "Logo",
      },
      {
        id: 6,
        name: "Graphic Design",
      },
    ],
  },
  {
    id: "job2",
    title: "Build a responsive website, SEO optimised.",
    description:
      "We are seeking for a front-end web developer to build new pages and improve our company website. The right person for this role will be proficient in HTML, CSS, Javascript and PHP.",
    skills: [
      {
        id: 1,
        name: "Logo Design",
      },
      {
        id: 2,
        name: "Branding",
      },
      {
        id: 3,
        name: "Logo Usage Guidelines",
      },
      {
        id: 4,
        name: "Brand Identity",
      },
      {
        id: 5,
        name: "Logo",
      },
      {
        id: 6,
        name: "Graphic Design",
      },
    ],
  },
  {
    id: "job3",
    title: "Build a responsive website, SEO optimised.",
    description:
      "We are seeking for a front-end web developer to build new pages and improve our company website. The right person for this role will be proficient in HTML, CSS, Javascript and PHP.",
    skills: [
      {
        id: 1,
        name: "Logo Design",
      },
      {
        id: 2,
        name: "Branding",
      },
      {
        id: 3,
        name: "Logo Usage Guidelines",
      },
      {
        id: 4,
        name: "Brand Identity",
      },
      {
        id: 5,
        name: "Logo",
      },
      {
        id: 6,
        name: "Graphic Design",
      },
    ],
  },
  {
    id: "job4",
    title: "Build a responsive website, SEO optimised.",
    description:
      "We are seeking for a front-end web developer to build new pages and improve our company website. The right person for this role will be proficient in HTML, CSS, Javascript and PHP.",
    skills: [
      {
        id: 1,
        name: "Logo Design",
      },
      {
        id: 2,
        name: "Branding",
      },
      {
        id: 3,
        name: "Logo Usage Guidelines",
      },
      {
        id: 4,
        name: "Brand Identity",
      },
      {
        id: 5,
        name: "Logo",
      },
      {
        id: 6,
        name: "Graphic Design",
      },
    ],
  },
];
