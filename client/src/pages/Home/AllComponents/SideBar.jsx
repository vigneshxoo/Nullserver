import React from 'react'
import { IoMdHome } from "react-icons/io";
import { MdOutlineVideoSettings } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { Link } from 'react-router-dom';
export const SideBar = () => {
    return (
        <div className='font-pop  '>
            <div className='border-1 hidden md:block w-52 text-[15px] font-medium p-4  ' >
                <span className='flex gap-1 items-center mb-2 w-52 h-12 cursor-pointer '>
                    Home <IoMdHome className=' 'size={20} />
                </span>
               
                <Link to={'/create/post'} className="  gap-1 flex items-center  w-52 h-12 text-[15px]   mb-2 ">
                    Create
                    <FiPlus size={20} className="" />

                </Link>
                <hr />
                <Link to={'/watch'} className='flex gap-1 items-center mb-2 w-52 h-12  cursor-pointer  '>
                    watch Vidoes <MdOutlineVideoSettings size={20} />
                </Link>
                <Link to={'/getprofile'} className='flex gap-1 items-center mb-2 w-52 h-12  cursor-pointer  '>
                   Pointss <MdOutlineVideoSettings size={20} />
                </Link>
                <Link to={'/getprofile'} className='flex gap-1 items-center mb-2 w-52 h-12  cursor-pointer  '>
                   Profile <MdOutlineVideoSettings size={20} />
                </Link>

            </div>
            
        </div>
    )
}
