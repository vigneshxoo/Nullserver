import React from 'react'
import { useTheme } from '../ProviderDtata/Providing'
import { Link } from 'react-router-dom'
import { SideBar } from './SideBar'
export const Home_vidoes = () => {
    const{videos,handleVideoEnd,userD}=useTheme()
    // console.log(videos)
    // console.log(videos._id)
    return (



        <div className="flex flex-col md:flex-row p-5">
        {/* Sidebar - Fixed only in md and above, Hidden in sm */}
        <div className="md:fixed md:w-72 w-full h-96  left-0  hidden md:block">
          <SideBar/>
        </div>
      
        {/* Videos - Adjust based on screen size */}
        <div className="grid relative md:ml-72 ml-0 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-5 font-pop">
          {videos.map((video) => (
            <Link
              className="h-[240px] flex w-full flex-col"
              key={video._id}
              to={`/vidoe/${video._id}`}
            >
              <video
            
                muted
                className="bg-gray-100 h-52"
                src={video.video}
                onEnded={() => handleVideoEnd(video._id)}
              />
              <div className="p-2 sm:p-0">
                <h4 className="text-[13px] md:text-[12px] md:m-1 text-gray-500 sm:text-[9px] leading-5 sm:leading-[15px]">
                  {video.text}
                </h4>
              </div>
            </Link>
           ) )
          }
         
        </div>
      </div>
      
    )


}