import { Chip, Paper, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PsychologyIcon from "@mui/icons-material/Psychology";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import JobCard from "./JobCard";

function JobDashboard(props) {
  return (
    <>
      <Paper>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1"></div>
          <div className="p-4 w-full md:w-2/3">
            <Typography variant="h5" className="mb-2">
              {job?.title}
            </Typography>

            <Typography variant="body2" className="mb-4 text-text-secondary">
              Hourly - Posted <span>1 day ago</span>
            </Typography>

            <Typography variant="body1" className="mb-4">
              {job?.description}
            </Typography>

            <div className="flex flex-wrap gap-4 mb-4">
              {[
                {
                  label: "Hours of work",
                  value: "25 Hours/week",
                  Icon: AccessTimeIcon,
                },
                {
                  label: "Duration of project",
                  value: "1-3 months",
                  Icon: CalendarMonthIcon,
                },
                {
                  label: "Experience Level",
                  value: "Expert",
                  Icon: PsychologyIcon,
                },
                {
                  label: "Hourly rate",
                  value: "$4.00 - $10.00",
                  Icon: WatchLaterIcon,
                },
                {
                  label: "Job Type",
                  value: "Remote Job",
                  Icon: LocationOnIcon,
                },
                {
                  label: "Project Type",
                  value: "Complex project",
                  Icon: CardTravelIcon,
                },
              ].map(({ label, value, Icon }, index) => (
                <div key={index}>
                  <Typography variant="body1">{label}</Typography>
                  <Typography
                    variant="body2"
                    className="text-text-secondary flex items-center"
                  >
                    <span>{value}</span>
                    <span className="ml-2">
                      <Icon />
                    </span>
                  </Typography>
                </div>
              ))}
            </div>

            <div>
              <Typography variant="h6">Skills and Expertise</Typography>
              <div className="flex flex-wrap gap-2 py-2 mb-4">
                {job?.skills?.map((skill) => (
                  <Chip label={skill.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Paper>
      <div className="">
        <Typography variant="h4" className="mb-4">
          Browse similar jobs
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </>
  );
}

export default JobDashboard;

const job = {
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
};
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
