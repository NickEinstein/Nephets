import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden h-screen bg-transparent z-30">
      {/* Hamburger menu */}
      
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-200 transition-opacity w-60 ease-linear duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } md:opacity-100 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col w-60">
          <div className="bg-white border-b border-gray-200 px-4 py-5">
            <h2 className="text-lg font-medium text-gray-900">Sidebar</h2>
          </div>
          <div className="flex-grow bg-gray-200 p-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 rounded hover:bg-gray-300 text-gray-900 hover:text-gray-900 font-medium"
                >
                  Item 1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 rounded hover:bg-gray-300 text-gray-900 hover:text-gray-900 font-medium"
                >
                  Item 2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 rounded hover:bg-gray-300 text-gray-900 hover:text-gray-900 font-medium"
                >
                  Item 3
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Sidebar;
