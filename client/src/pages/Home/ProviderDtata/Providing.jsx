import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { baseUrl } from '../../../constant/url';
import toast from 'react-hot-toast';
import io from 'socket.io-client';
import confetti from 'canvas-confetti'
import { useNavigate } from 'react-router-dom';

// Create Context
const DataContext = createContext();
const socket = io(baseUrl);

export const useTheme = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error("useTheme must be used within a DataContext.Provider");
    return context;
};

export const Provider = ({ children }) => {
    const navi = useNavigate();

    // States
    const [videos, setVideos] = useState([]);
    const [changePost, setChangePost] = useState();
    const [clikVidoe, setClickVideo] = useState(null);
    const [relateVidoe, setRelateVidoe] = useState([]);
    const [action, setAction] = useState(null);
    const [comment, setComment] = useState('');
    const [isLoadingVideo, setIsLoadingVideo] = useState(false);
    const[user,setuser]=useState()
    
    
    // Fetch Videos
    const fetchVideos = useMutation({
        
        mutationFn: async () => {
            console.log("vidoes fetch")
            const response = await fetch(`${baseUrl}/vidoe`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Failed to fetch videos');
            const data = await response.json();
            setVideos(data);
        },
        onSuccess: () => toast.success('Videos fetched successfully'),
        onError: (error) => toast.error(error.message),
    });

    useEffect(() => {
        fetchVideos.mutate(); // Call manually
    }, []);

    // Fetch Clicked Video
    const fetchClickedVideo = useMutation({
        mutationFn: async (videoId) => {
            setIsLoadingVideo(true); // Start loading
            const response = await fetch(`${baseUrl}/clickvidoe/${videoId}`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Failed to fetch video');
            const data = await response.json();
            setClickVideo(data.clickvidoe);
            setRelateVidoe(data.getVidoeAll);
            setuser(data.postuser)
            return data;
        },
        onSuccess: () => {
            setIsLoadingVideo(false); // Stop loading
            // toast.success('Video fetched successfully');
        },
        onError: (error) => {
            setIsLoadingVideo(false); // Stop loading on error
            toast.error(error.message);
        },
    });

    // Like Function
    const likeFun = useMutation({
        mutationFn: async ({ action, vidoeID }) => {
            const res = await fetch(`${baseUrl}/like/${vidoeID}`, {
                method: "POST",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action }),
            });
            if (!res.ok) throw new Error('Failed to like');
            return res.json();
        },
        onSuccess: () => toast.success('Action performed successfully'),
        onError: (error) => toast.error(error.message),
    });

    const likeAction = (newAction, id) => {
        setAction((prev) => {
            let updatedAction;
    
            if (prev === newAction) {
                updatedAction = 'both'; 
            } else {
                updatedAction = newAction;
            }
    
            console.log(updatedAction);
            likeFun.mutate({ action: updatedAction, vidoeID: id });
    
            return updatedAction;
        });
    };
    

    // Comment Function
    const commentfun = useMutation({
        mutationFn: async ({ text }) => {
            const res = await fetch(`${baseUrl}/comment/${changePost}`, {
                method: "POST",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            if (!res.ok) throw new Error('Failed to add comment');
        },
        onSuccess: () => {
            toast.success('Comment added');
            socket.emit('post', { postId: changePost, comment });
        },
        onError: (error) => toast.error(error.message),
    });

    // Comment Like Function
    const { mutate: commentlike } = useMutation({
        mutationFn: async ({ action, id }) => {
            const res = await fetch(`${baseUrl}/post/${changePost}/comment/${id}`, {
                method: "POST",
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action }),
            });
            if (!res.ok) throw new Error('Failed to like comment');
            return res.json();
        },
        onSuccess: () => toast.success('Comment liked successfully'),
        onError: (error) => toast.error(error.message),
    });

    // Logout Function
    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            const res = await fetch(`${baseUrl}/out`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            if (!res.ok) throw new Error('Logout failed');
            return res.json();
        },
        onSuccess: () => {
            toast.success('Logout successful');
            navi('/login');
        },
        onError: (error) => toast.error(error.message),
    });

    // Profile Fetching
    const { data: userD, isLoading: isProfileLoading, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await fetch(`${baseUrl}/get`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!res.ok) throw new Error('Failed to fetch profile');
            return res.json();
        },
        onError: (error) => toast.error(error.message),
    });

    /// ADD POINTS


      // Add points
     
    const trigarconfitti=()=>{
        confetti({
            particleCount:100,
            spread:100
        })
    }


    // Handle Comment Submission
    const handleCommentSubmit = (comment) => {
        commentfun.mutate({ text: comment });
    };

    // Socket Listener
    useEffect(() => {
        socket.on('post', (updatedPost) => setClickVideo(updatedPost));
        return () => {
            socket.off('post');
            socket.disconnect(); // Cleanup socket connection
        };
    }, []);

    // Memoized Context Value
    const contextValue = useMemo(() => ({
        videos,
        clikVidoe,
        relateVidoe,
        likeAction,
        fetchClickedVideo,
        isLoadingVideo,
        setChangePost,
        handleCommentSubmit,
        commentlike,
        logout,
        userD,
        isProfileLoading,
        refetch,
        trigarconfitti,
        changePost,
        user
    }), [videos, clikVidoe, changePost, relateVidoe, changePost, fetchClickedVideo, isLoadingVideo, userD, isProfileLoading]);

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};