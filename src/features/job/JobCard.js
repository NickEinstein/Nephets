import { Chip, Paper, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LinkButton from 'common/LinkButton';
import { generatePath } from 'react-router-dom';
import { RouteEnum } from 'constants/RouteConstants';

/**
 *
 * @param {JobCardProps} props
 * @returns
 */
function JobCard(props) {
  const { job, ViewMoreLinkButtonProps } = props;

  return (
    <Paper className='p-4'>
      <Typography variant='h5' className='mb-2'>
        {job?.title}
      </Typography>

      <Typography variant='body2' className='mb-4 text-text-secondary'>
        Hourly - Posted <span>1 day ago</span>
      </Typography>

      <Typography variant='body1' className='mb-4'>
        {job?.description}
      </Typography>

      <div className='flex justify-between mb-4'>
        <div>
          <Typography variant='body1'>Hours of work</Typography>
          <Typography
            variant='body2'
            className='text-text-secondary flex items-center'
          >
            <span>25 Hours/week</span>
            <span className='ml-2'>
              <AccessTimeIcon />
            </span>
          </Typography>
        </div>
        <div>
          <Typography variant='body1'>Duration of project</Typography>
          <Typography
            variant='body2'
            className='text-text-secondary flex items-center'
          >
            <span>6 months</span>
            <span className='ml-2'>
              <CalendarMonthIcon />
            </span>
          </Typography>
        </div>
      </div>

      <Typography variant='h6'>Top skills</Typography>
      <div className='flex flex-wrap gap-2 py-2 mb-4'>
        {job?.skills?.map((skill) => (
          <Chip label={skill.name} />
        ))}
      </div>

      <LinkButton
        variant='contained'
        to={generatePath(RouteEnum.JOBS_DASHBOARD, { id: job?.id })}
        {...ViewMoreLinkButtonProps}
      >
        View more
      </LinkButton>
    </Paper>
  );
}
export default JobCard;

/**
 * @typedef {{
 * ViewMoreLinkButtonProps: import("react").ComponentProps<import("common/LinkButton").LinkButtonProps>;
 * job: any;
 * }} JobCardProps
 */
