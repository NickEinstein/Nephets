import React from 'react';


import { LinearProgress} from '@mui/material';
import { useNavigate } from 'react-router-dom';

//  created_at: user?.created_at,
//       email_address: user?.email_address,
//       firstname: user?.firstname,
//       lastname: user?.lastname,
//       location: user?.location,
//       status: user?.status,
//       type: user?.type,
//       updated_at: user?.updated_at,
//       username: user?.username,
//       login_at: user?.login_at,
//       pitch_video: user?.pitch_video || "",
//       avatar: user?.avatar || "",
//       biography: user?.biography || "",
//       categories: user?.categories || [],
//       certifications: user?.certifications || [],
//       educations: user?.educations || [],
//       hourly_rate: user?.hourly_rate || 0,
//       languages: user?.languages || [],
//       skills: user?.skills || [],
//       social_accounts: user?.social_accounts || [],
//       titles: user?.titles ? user?.titles : "",
//       work_histories: user?.work_histories || [],
const LinearProgressMUI = (props) => {

  const  history = useNavigate();
  const redirect = ()=>{
      history('/account-security')
  }
    return (

       <div className='w-2/5'>
        <div className=' flex justify-end w-full'>
                <div className=' w-3/5'>
                  <p className='medium-size no-margin m-b-10px bold'>Completion rate</p>
                  < LinearProgress className='h-4 rounded-lg' variant="determinate"
                  value={props.count} status="active" style={{ marginTop: '5px' }} />
                </div>
              </div>
       </div>
    )
}
export default LinearProgressMUI;
