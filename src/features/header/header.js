import logo from "../../assets/nehpets/Nehpets logo 1.svg";
import {Link} from 'react-router-dom'
import backgroundImage from "../../assets/nehpets/HomePage_backgroundImage.svg";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useDataRef from "hooks/useDataRef";
import useStepper from "hooks/useStepper";

const Header = ({ underlined, step }) => {
  const location = useLocation();
const path = location.pathname;

  console.log(path)
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };
    const configs = [
      {
        bgColor: "HomeTopSectionBackgroundColor_WomanInRedImage",
        textColor: "text-secondary-main",
        // image: home1Image,
      },
      {
        bgColor: "HomeTopSectionBackgroundColor_ManInDreadsImage",
        textColor: "text-white",
        // image: home2Image,
      },
      {
        bgColor: "HomeTopSectionBackgroundColor_headerImage",
        textColor: "text-secondary-main",
        // image: home3Image,
      },
      {
        bgColor: "HomeTopSectionBackgroundColor_headerImage",
        textColor: "text-secondary-main",
        // image: backgroundImage,
      },
    ];

  const stepper = useStepper({ maxStep: configs.length - 1 });

  const config = configs[stepper.step];

  const dataRef = useDataRef({ stepper });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (dataRef.current.stepper.canNextStep()) {
        dataRef.current.stepper.nextStep();
      } else {
        dataRef.current.stepper.reset();
      }
    }, 1000 * 5);
    return () => {
      clearInterval(intervalId);
    };
  }, [dataRef]);
  
  return (
    <div className="fixed w-full inset-0 z-[10000] bg-red-400 h-10">
      {!isOpen && (
        <div className="bg-white">
          <ul className="flex px-[7%] justify-between bg-[#AB00354D] ">
            <img src={logo} className="md:h-20 h-14" />
            <div
              style={{ color: stepper.step < 2 && "white" }}
              className="md:flex justify-between w-3/5 items-center hidden"
            >
              <Link
                onClick={handleToggleSidebar}
                className={
                  path == "/" && "border-b-4 py-1 border-b-primary-main"
                }
                to="/"
              >
                Home
              </Link>
              <Link
                className={
                  path == "/coaching" && "border-b-4 py-1 border-b-primary-main"
                }
                to="/coaching"
              >
                Coaching
              </Link>
              <Link
                className={
                  path == "/visa" && "border-b-4 py-1 border-b-primary-main"
                }
                to="/visa"
              >
                Visa
              </Link>
              <Link
                className={
                  path == "/about-us" && "border-b-4 py-1 border-b-primary-main"
                }
                to="/about-us"
              >
                About us
              </Link>
              {/* <Link>Coaching</Link>
              <Link>Visa</Link>
              <Link>About us</Link> */}
            </div>
            <div className="flex z-20 md:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                aria-label="toggle sidebar"
                onClick={handleToggleSidebar}
              >
                <FiMenu size={24} />
              </button>
            </div>
          </ul>
        </div>
      )}
      {isOpen && (
        <div className="bg-white h-screen">
          <nav
            className={`md:hidden z-50 fixed top-0 left-0 w-full h-full bg-[#AB00354D] text-white transition-all duration-500 ease-in-out transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex flex-col justify-center items-center h-full">
              <Link
                onClick={handleToggleSidebar}
                className={
                  path == "/"
                    ? "border-b-4 py-1 border-b-primary-main text-xl font-bold mb-8"
                    : "text-xl font-bold mb-8"
                }
                to="/"
              >
                Home
              </Link>
              <Link
                onClick={handleToggleSidebar}
                className={
                  path == "/coaching"
                    ? "border-b-4 py-1 border-b-primary-main text-xl font-bold mb-8"
                    : "text-xl font-bold mb-8"
                }
                to="/coaching"
              >
                Coaching
              </Link>
              <Link
                onClick={handleToggleSidebar}
                className={
                  path == "/visa"
                    ? "border-b-4 py-1 border-b-primary-main text-xl font-bold mb-8"
                    : "text-xl font-bold mb-8"
                }
                to="/visa"
              >
                Visa
              </Link>
              <Link
                onClick={handleToggleSidebar}
                className={
                  path == "/about-us"
                    ? "border-b-4 py-1 border-b-primary-main text-xl font-bold mb-8"
                    : "text-xl font-bold mb-8"
                }
                to="/about-us"
              >
                About us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}; 
export default Header


// import { useState } from "react";
// // import { MenuIcon } from "@heroicons/react/outline";
// import { FiMenu } from "react-icons/fi";

// function Header() {
//   const [showMenu, setShowMenu] = useState(false);

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   return (
//     <header className="fixed w-full top-0 left-0 bg-gray-900 text-white">
//       <div className="flex justify-between items-center py-4 px-6">
//         <div className="flex items-center">
//           <img className="w-10 h-10 mr-2" src="/logo.svg" alt="Logo" />
//           <h1 className="text-lg font-bold">My Site</h1>
//         </div>
//         <div className="md:hidden">
//           <button onClick={toggleMenu}>
//             <FiMenu className="w-6 h-6" />
//           </button>
//         </div>
//       </div>
//       <nav
//         className={`md:hidden fixed top-0 left-0 w-full h-full bg-gray-900 text-white transition-all duration-500 ease-in-out transform ${
//           showMenu ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col justify-center items-center h-full">
//           <a href="/" className="text-xl font-bold mb-8">
//             Home
//           </a>
//           <a href="/" className="text-xl font-bold mb-8">
//             About
//           </a>
//           <a href="/" className="text-xl font-bold mb-8">
//             Contact
//           </a>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;
