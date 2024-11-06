import React, { useState } from 'react';
import {
  HomeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CubeIcon,
  NewspaperIcon,
  Cog8ToothIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  FolderIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArchiveBoxIcon, // Warehouse icon
  ClockIcon, // History icon
} from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();

  const toggleDropDown = () => {
    setDropDown(!dropDown);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = (path) => {
    navigate(path);
    toggleSidebar();
  };
  const handleLogout = () => {
    // Clear the access token from local storage
    localStorage.clear()
    navigate("/");
    // toast.success("Logout Success");
};
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Overlay for sidebar in mobile mode */}
      <div
        className={`fixed bg-gray-800 bg-opacity-50 z-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 top-0 left-0 bg-white w-64 shadow-lg z-50 transform transition-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow text-black">
          <img
            className="w-[160px] h-[40px] lg:w-auto"
            src="https://www.yes-led.com/dist/images/logo2.png"
            alt="Yestech Logo"
          />
          <button onClick={toggleSidebar} className="lg:hidden">
            <XMarkIcon className="w-6 h-6" color="black" />
          </button>
        </div>

        {/* Menu List */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <a
            onClick={() => handleNavigate('/dashboard')}
            className="py-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded flex items-center"
          >
            <HomeIcon className="w-6 h-6" />
            <span className="ml-2">Dashboard</span>
          </a>
          <a
            onClick={() => handleNavigate('/Banner')}
            className="py-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded flex items-center"
          >
            <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
            <span className="ml-2">Banner</span>
          </a>
          <div className="py-3 cursor-pointer text-gray-700  rounded flex flex-col">
            <div
              onClick={toggleDropDown}
              className="flex items-center justify-between"
            >
              <div className="flex items-center bg-white hover:bg-gray-200">
                <CubeIcon className="w-6 h-6" />
                <span className="ml-2">Products</span>
              </div>
              {dropDown ? (
                <ChevronUpIcon className="w-6 h-6" />
              ) : (
                <ChevronDownIcon className="w-6 h-6" />
              )}
            </div>
            {dropDown && (
              <div className="pl-8 mt-2">
                <a
                  onClick={() => handleNavigate('/products/types')}
                  className="py-2 cursor-pointer text-gray-700 hover:bg-gray-200 rounded flex items-center"
                >
                  Type Products
                </a>
                <a
                  onClick={() => handleNavigate('/products/categories')}
                  className="py-2 cursor-pointer text-gray-700 hover:bg-gray-200 rounded flex items-center"
                >
                  Category Products
                </a>
                <a
                  onClick={() => handleNavigate('/products')}
                  className="py-2 cursor-pointer text-gray-700 hover:bg-gray-200 rounded flex items-center"
                >
                  All Products
                </a>
              </div>
            )}
          </div>
          <a
            onClick={() => handleNavigate('/news')}
            className="py-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded flex items-center"
          >
            <NewspaperIcon className="w-6 h-6" />
            <span className="ml-2">News</span>
          </a>
          <a
            onClick={() => handleNavigate('/case-list')}
            className="py-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded flex items-center"
          >
            <FolderIcon className="w-6 h-6" />
            <span className="ml-2">Case List</span>
          </a>
          <a
            onClick={() => handleNavigate('/warehouse')}
            className="py-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded flex items-center"
          >
            <ArchiveBoxIcon className="w-6 h-6" />
            <span className="ml-2">Warehouse</span> {/* New Warehouse item */}
          </a>
          <a
            onClick={() => handleNavigate('/history')}
            className="py-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded flex items-center"
          >
            <ClockIcon className="w-6 h-6" />
            <span className="ml-2">History</span> {/* New History item */}
          </a>
          <a
            onClick={() => handleNavigate('/yestech-owner')}
            className="py-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded flex items-center"
          >
            <Cog8ToothIcon className="w-6 h-6" />
            <span className="ml-2">Yestech Owner</span>
          </a>
          {/* <a
            href="#"
            className="py-3 cursor-pointer text-gray-700 hover:bg-gray-200 rounded flex items-center"
          >
            <UserCircleIcon className="w-6 h-6" />
            <span className="ml-2">Profile</span>
          </a> */}
        </nav>

        {/* Logout at the bottom */}
        <div className="p-4 mt-auto">
          <a
            onClick={handleLogout}
            className="py-2 text-gray-700 hover:bg-gray-200 rounded flex items-center"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            <span className="ml-2">Logout</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto lg:ml-64">
        {/* Header for mobile mode */}
        <header className="flex fixed items-center justify-between p-4 bg-blue-800 text-white lg:hidden w-full z-10">
          <button onClick={toggleSidebar}>
            <Bars3Icon className="w-6 h-6" />
          </button>
          <img
            className="w-[140px] h-10"
            src="https://www.yes-led.com/dist/images/logo1.png"
            alt="Yestech Logo"
          />
        </header>
      </div>
    </div>
  );
}
