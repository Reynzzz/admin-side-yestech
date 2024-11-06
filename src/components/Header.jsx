import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {UserCircleIcon } from '@heroicons/react/20/solid'; // for Heroicons v2



const Header = () => {
  const location = useLocation();
  const {id} = useParams()
  // Function to get the title based on the pathname
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/Banner':
        return 'Banner';
      case '/settings':
        return 'Settings';
        case '/add-product':
          return 'Add Product'
          case '/products':
          return 'Products'
          case '/news':
          return 'News'
          case '/case-list':
            return 'Case-List'
            case '/addnews':
              return 'Add-News'
              case '/edit-news':
                return 'Edit-News'
                case '/yestech-owner':
                  return 'Yestech owner'
                   case `/edit-product/${id}`:
                  return 'Edit-Product'
                  case '/add-caselist' :
                  return 'Add-CaseList'
                  case '/warehouse' : 
                  return 'Warehouse'
      default:
        return 'Dashboard'; // Default title
    }
  };

  return (
    <div className="h-[83px] w-full bg-white  text-black border lg:flex hidden">
      <div className="flex justify-between items-center w-full px-4">
        <div>
          <h1 className='font-bold border-b-2 border-black text-2xl font-sans'>{getTitle()}</h1>

        </div>
        <div className="flex flex-col justify-center items-center">
          <UserCircleIcon className="w-10 h-10" color="black" />
          <span className="text-lg text-black">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
