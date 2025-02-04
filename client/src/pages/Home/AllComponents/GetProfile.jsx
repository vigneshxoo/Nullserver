import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { baseUrl } from "../../../constant/url";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const [getprofile, setgetFrofile] = useState();
    const [coverImg, setCoverImg] = useState(null);
    const [profileImg, setProfileImg] = useState(null);
    const [feedType, setFeedType] = useState("posts");

    const coverImgRef = useRef(null);
    const profileImgRef = useRef(null);

    const isMyProfile = true;

    const { mutate: Proflie, isLoading } = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${baseUrl}/get`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Something went wrong');
            return data;
        },
        onSuccess: (data) => {
            setgetFrofile(data); // Ensure state is updated correctly
            toast.success('Profile fetched successfully');
        },
        onError: (error) => toast.error(error.message || 'Failed to fetch profile'),
    });

    useEffect(() => {
        Proflie();
    }, []);

    const handleImgChange = async (e, type) => {
        const file = e.target.files?.[0]; // Get the first file from the input
        if (!file) {
            toast.error('No file selected!');
            return;
        }

        const formData = new FormData();
        formData.append('image', file); // Attach the selected image to FormData

        try {
            const response = await fetch(`${baseUrl}/get/img`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData, // Send the image data to the backend
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Image upload failed');

            // Update the correct image state based on the type
            if (type === "coverImg") {
                setCoverImg(data.profileImage); // Set the cover image URL from backend response
            } else if (type === "profileImg") {
                setProfileImg(data.profileImage); // Set the profile image URL from backend response
            }

            toast.success(`${type} updated successfully`);
        } catch (error) {
            toast.error(error.message || 'Failed to update image');
        }
    };

    return (
        <div className='flex-[4_4_0] border-r border-gray-700 min-h-screen'>
            {/* HEADER */}
            <div className='flex flex-col'>
                <div className='flex gap-10 px-4 py-2 items-center'>
                    <Link to='/'>
                        <FaArrowLeft className='w-4 h-4' />
                    </Link>
                    <div className='flex flex-col'>
                        <p className='font-bold text-lg'>{getprofile?.fullname}</p>
                    </div>
                </div>

                {/* COVER IMAGE */}
                <div className='relative group/cover'>
                    <img
                        src={coverImg || getprofile?.coverImg || "/cover.png"}
                        className='h-52 w-full object-cover'
                        alt='cover image'
                    />
                    {isMyProfile && (
                        <div
                            className='absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
                            onClick={() => coverImgRef.current.click()}
                        >
                            <MdEdit className='w-5 h-5 text-white' />
                        </div>
                    )}

                    <input
                        type='file'
                        hidden
                        ref={coverImgRef}
                        onChange={(e) => handleImgChange(e, "coverImg")}
                    />
                    <input
                        type='file'
                        hidden
                        ref={profileImgRef}
                        onChange={(e) => handleImgChange(e, "profileImg")}
                    />

                    {/* USER AVATAR */}
                    <div className='avatar absolute -bottom-16 left-4'>
                        <div className='w-32 rounded-full relative group/avatar'>
                            <img
                                src={profileImg || getprofile?.profileImg || "/avatar-placeholder.png"}
                                alt="user avatar"
                            />
                            <div className='absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>
                                {isMyProfile && (
                                    <MdEdit
                                        className='w-4 h-4 text-white'
                                        onClick={() => profileImgRef.current.click()}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-end px-4 mt-5'>
                    {!isMyProfile && (
                        <button
                            className='btn btn-outline rounded-full btn-sm'
                            onClick={() => alert("Followed successfully")}
                        >
                            Follow
                        </button>
                    )}
                    {(coverImg || profileImg) && (
                        <button
                            className='btn btn-primary rounded-full btn-sm text-white px-4 ml-2'
                            onClick={() => alert("Profile updated successfully")}
                        >
                            Update
                        </button>
                    )}
                </div>

                <div className='flex flex-col gap-4 mt-14 px-4'>
                    <div className='flex flex-col'>
                        <span className='font-bold text-lg'>{getprofile?.fullname}</span>
                        <span className='text-sm text-slate-500'>@{getprofile?.username}</span>
                        <span className='text-sm my-1'>{getprofile?.bio}</span>
                    </div>

                    <div className='flex gap-2 flex-wrap'>
                        <div className='flex gap-1 items-center'>
                            <FaLink className='w-3 h-3 text-slate-500' />
                            <a
                                href='https://youtube.com/@asaprogrammer_'
                                target='_blank'
                                rel='noreferrer'
                                className='text-sm text-blue-500 hover:underline'
                            >
                                youtube.com/@asaprogrammer_
                            </a>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <IoCalendarOutline className='w-4 h-4 text-slate-500' />
                            <span className='text-sm text-slate-500'>Joined July 2021</span>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className='flex gap-1 items-center'>
                            <span className='font-bold text-xs'>{getprofile?.following?.length || 0}</span>
                            <span className='text-slate-500 text-xs'>Following</span>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <span className='font-bold text-xs'>{getprofile?.followers?.length || 0}</span>
                            <span className='text-slate-500 text-xs'>Followers</span>
                        </div>
                    </div>
                    <button onClick={handleImgChange}>Click to Update Images</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
