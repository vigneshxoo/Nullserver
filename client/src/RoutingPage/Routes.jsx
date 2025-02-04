import React from 'react';
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { baseUrl } from '../constant/url';

export const PrivateRouter = () => {
    const { data: authUser, isLoading, error } = useQuery({ //
        queryKey: ["authUser"],
        queryFn: async () => {
            const res = await fetch(`${baseUrl}/get`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Something went wrong");
            }

            return res.json(); // Return authenticated user data
        },
    });

    // Loading state
    if (isLoading) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <p>Loading...</p>
            </div>
        );
    }
    if (!authUser) {
        return <Navigate to="/login" />;
    }
    // Error state
    if (error) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <p>Failed to fetch authentication status: {error.message}</p>
            </div>
        );
    }

    // Redirect if not authenticated
    

    // Render nested routes if authenticated
    return <Outlet />;
};
