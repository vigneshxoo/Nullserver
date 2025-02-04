import React from 'react'
import { FiMenu } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { Home_vidoes } from './Home_vidoes';
import { Link } from 'react-router-dom';
import { useTheme } from '../ProviderDtata/Providing';
export const Vidoe_Home = () => {
  const {userD}=useTheme()
  return (
    <div>
         <div className="flex   items-center justify-between  p-5 sticky top-0  bg-white z-10">
              <div className="flex items-center gap-3">
                <span>
                  <FiMenu size={20} />
                </span>
                <img
                  className="h-12 w-20 hidden md:block "
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHT40r-P1hpTH9xkjvXy0V0TIzzX-Kwm_xSA&s"
                  alt="YouTube Logo"
                />
              </div>
              {/* Search Bar Section */}
              <div className="flex items-center w-full max-w-lg mx-2  mt-2 ">
      
                <input type="text" className='w-full sm:h-8 sm:w-1/1 h-6 text-gray-600 border border-gray-500 rounded-l-full focus:outline-non ' />
        
        
                <button className="flex items-center justify-center w-8 sm:h-8 h-6 text-sm  border border-gray-500 bg-gray-200 hover:bg-gray-300 rounded-r-full">
                  <CiSearch size={20} />
                </button>
              </div>
        
              {/* Create and Profile Section */}
              <div className="flex items-center gap-3">
                <Link to={'/create/post'} className="hidden sm:flex items-center px-3 py-1  text-sm bg-gray-200 rounded-full hover:bg-gray-300">
                  <FiPlus size={20} className="mr-2" />
                  Create
                </Link>
                <Link to={'/getprofile'} className="w-8 h-8 overflow-hidden rounded-full">
                  <img 
                    className="object-cover w-full h-full"
                    // src={userD.profileImg ? userD.profileImg : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                   src={userD?.profileImg || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                    alt="Profile"
                  />
                </Link>
                <div>
        
                </div>
              </div>
              {/* <Sidebar/> */}
            </div>
            <Home_vidoes/>

        
    </div>
  )
}
