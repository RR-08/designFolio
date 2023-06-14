import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri';
import {IoIosArrowForward} from 'react-icons/io'

import logo from '../assets/light-name.png'
const isNotActiveStyle='flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

const categories = [
  { name: "UI Designs" },
  { name: "Photography" },
  { name: "Posters" },
  { name: "Landing Page" },
  { name: "Other" },
];

const Sidebar = ({user, closeToggle}) => {
  const handleCloseSidebar =()=>{
    if(closeToggle) closeToggle(false);
  }
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-20 hide-scroll">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({isActive})=> isActive?isActiveStyle:isNotActiveStyle}
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Sidebar
