import React from 'react';
import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import softLogo from 'images/logo-Softwork.png'
import trustedBy3 from '../images/Rectangle 78.png'
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import { useNavigate } from "react-router-dom";


const LoginHeader = (prop) => {
    const history = useNavigate();
    const redirect = ()=>{
  
      history('/');
  }
    return (
        <div className='general-padding login-top-border'>
           <div className='flex justify-between items-center py-3' >
                <img src={softLogo}    alt ='softwork logo' className='cursor-pointer' onClick={redirect}/>
                <h4 className=''>Everything you are looking for is here</h4>
           </div>
        </div>
    )
}
export default LoginHeader;
