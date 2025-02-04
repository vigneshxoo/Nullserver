import React, { useEffect, useState } from 'react';
import { BiDislike, BiLike, BiShareAlt, BiDownload } from 'react-icons/bi';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../ProviderDtata/Providing';
import { baseUrl } from '../../../constant/url';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti'

export const Click_viode_page = () => {

    const { fetchClickedVideo,user, clikVidoe, relateVidoe, changePost, likeAction, setChangePost, handleCommentSubmit, commentlike, isLoadingVideo, } = useTheme();
console.log(clikVidoe)

    const { id } = useParams();
    const[change,setChange]=useState(id)
  
    
    useEffect(() => {
        setChangePost(change);
        console.log(change)
        if (change) {
            fetchClickedVideo.mutate(change);
        }
    }, [change]);




    const trigarconfitti = () => {
        confetti({
            particleCount: 100,
            spread: 100
        })
    }
    const { mutate: addPoints } = useMutation({
        mutationFn: async (vidoeId) => {
            const response = await fetch(`${baseUrl}/add`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ vidoeId }),
            });
            let data = await response.json();
            if (data == "no points") {
                toast.error("you already this vidoe ")

            } else {
                trigarconfitti()
                toast.success("points added")

            }


            if (!response.ok) throw new Error(data.error || 'Something went wrong');
        },
        onSuccess: () => console.log("vidoe ended"),
        onError: (error) => toast.error(error.message || 'Failed to add points'),
    });

    const handleVideoEnd = (vidoeId) => {
        console.log(vidoeId)
        addPoints(vidoeId);
        console.log(addPoints)
    };

    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [commentActions, setCommentActions] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment || comment.length < 3) {
            return toast.error('Comment must be at least 3 characters long.');
        }
        handleCommentSubmit(comment);
        setComment('');
    };

    const handleCommentAction = (newAction, id) => {
        const actionToSend = commentActions[id] === newAction ? 'both' : newAction;
        setCommentActions((prev) => ({ ...prev, [id]: actionToSend }));
        console.log(actionToSend)
        commentlike({ action: actionToSend, id });
    };

    if (isLoadingVideo) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto font-sans">
            {/* Main Video Section */}
            <div className="flex-1">
                {clikVidoe ? (
                    <>
                        {/* Video Player */}
                        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
                            <video
                                className="w-full h-full object-cover"
                                src={clikVidoe.video}
                                controls
                                autoPlay
                                muted
                                onEnded={() => handleVideoEnd(clikVidoe._id)}
                            />
                        </div>

                        {/* Video Title and Metadata */}
                        <h1 className="text-xl font-bold mt-4">{clikVidoe.text}</h1>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src={user?.profileImg}
                                    alt={clikVidoe.username}
                                />
                                <p className="text-sm text-gray-700">{user?.username}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
                                    onClick={() => likeAction('like', clikVidoe._id)}
                                >
                                    <BiLike className="text-xl" />
                                    <span>{clikVidoe.like.length}</span>
                                </button>
                                <button
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"
                                    onClick={() => likeAction('unlike', clikVidoe._id)}
                                >
                                    <BiDislike className="text-xl" />
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
                                    <BiShareAlt className="text-xl" />
                                    <span>Share</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all">
                                    <BiDownload className="text-xl" />
                                    <span>Download</span>
                                </button>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold mb-4">Comments ({clikVidoe.comments.length})</h2>
                            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                                >
                                    Submit
                                </button>
                            </form>
                            <div className="space-y-4">
                                {clikVidoe.comments.map((val, index) => (
                                    <div key={index} className="flex gap-3">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src={val.userProfilePic}
                                            alt={val.username}
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold">{val.username}</p>
                                            <p className="text-sm text-gray-700">{val.text}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <button
                                                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500"
                                                    onClick={() => handleCommentAction('like', val._id)}
                                                >
                                                    <BiLike />
                                                    <span>{val.like.length}</span>
                                                </button>
                                                <button
                                                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500"
                                                    onClick={() => handleCommentAction('unlike', val._id)}
                                                >
                                                    <BiDislike />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-gray-700">Video not found.</div>
                )}
            </div>

            {/* Related Videos Section */}
            <div className="w-full md:w-96">
                <h2 className="text-lg font-semibold mb-4">Related Videos</h2>
                <div className="space-y-4">
                    {relateVidoe.map((val, index) => (
                        <div key={index} className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                            <div onClick={() => setChange(val._id)} className="w-40 h-24 bg-gray-200 rounded-lg overflow-hidden">
                                <video className="w-full h-full object-cover" src={val.video} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold line-clamp-2">{val.text}</p>
                                <p className="text-xs text-gray-600">{val.username}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};