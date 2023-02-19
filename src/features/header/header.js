import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import {Link} from 'react-router-dom'
import backgroundImage from "../../assets/nehpets/HomePage_backgroundImage.svg";
const Header = ({ underlined }) => {
  console.log(underlined)
  return (
    <div className="">
      <ul className="flex px-[7%] justify-between bg-[#AB00354D]">
        <img src={logo} className="h-20" />

        <div className="flex justify-between w-3/5 items-center ">
          <Link className={underlined=='home' && "border-b-4 py-1 border-b-primary-main"} to="/">
            Home
          </Link>
          <Link className={underlined == 'coaching' && "border-b-4 py-1 border-b-primary-main"} to="/coaching">Coaching</Link>
          <Link className={underlined == 'visa' && "border-b-4 py-1 border-b-primary-main"} to="/visa">Visa</Link>
          <Link className={underlined == 'about' && "border-b-4 py-1 border-b-primary-main"} to="/about-us">About us</Link>
          {/* <Link>Coaching</Link>
            <Link>Visa</Link>
            <Link>About us</Link> */}
        </div>
      </ul>
    </div>
  );
}; 
export default Header