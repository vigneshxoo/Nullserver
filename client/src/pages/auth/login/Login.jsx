// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { IoPlayOutline } from "react-icons/io5";
// import { useMutation } from "@tanstack/react-query";
// import { MdOutlineMail, MdPassword } from "react-icons/md";
// import { baseUrl } from "../../../constant/url";
// import toast from "react-hot-toast";

// const LoginPage = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         username: "",
//         password: "",
//     });

//     // useEffect(() => {
//     //     if (localStorage.getItem("isAuthenticated") === "true") {
//     //         // navigate("/homepage", { replace: true });
//     //     }
//     // }, [navigate]);

//     const { mutate: login, isLoading, isError, error } = useMutation({
//         mutationFn: async ({ username, password }) => {
//             const response = await fetch(`${baseUrl}/login`, {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json",
//                 },
//                 body: JSON.stringify({ username, password }),
//             });

//             const data = await response.json();
//             if (!response.ok) {
//                 throw new Error(data.error || "Invalid credentials");
//             }
//             return data;
//         },
//         onSuccess: () => {
//             localStorage.setItem("isAuthenticated", "true");
//             toast.success("Login successful");
//             navigate("/");
//         },
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Validation
//         if (formData.username.trim() === "" || formData.password.trim() === "") {
//             toast.error("Both username and password are required");
//             return;
//         }

//         login(formData);
//     };

//     const handleInputChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="max-w-screen-xl mx-auto flex h-screen px-10">
//             <div className="flex-1 hidden lg:flex items-center justify-center bg-gray-100">
//                 <IoPlayOutline className="text-gray-500 text-6xl" />
//             </div>
//             <div className="flex-1 flex flex-col justify-center items-center bg-gray-900">
//                 <form
//                     className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col"
//                     onSubmit={handleSubmit}
//                 >
//                     <h1 className="text-4xl font-extrabold text-white">{"Let's"} go.</h1>
//                     <label className="input input-bordered rounded flex items-center gap-2">
//                         <MdOutlineMail />
//                         <input
//                             type="text"
//                             className="grow"
//                             placeholder="Username"
//                             name="username"
//                             onChange={handleInputChange}
//                             value={formData.username}
//                         />
//                     </label>
//                     <label className="input input-bordered rounded flex items-center gap-2">
//                         <MdPassword />
//                         <input
//                             type="password"
//                             className="grow"
//                             placeholder="Password"
//                             name="password"
//                             onChange={handleInputChange}
//                             value={formData.password}
//                         />
//                     </label>
//                     <button
//                         className="btn rounded-full btn-primary text-white"
//                         disabled={isLoading}
//                     >
//                         {isLoading ? "Loading..." : "Login"}
//                     </button>
//                     {isError && (
//                         <p className="text-red-500">
//                             {error?.message || "An unexpected error occurred"}
//                         </p>
//                     )}
//                 </form>
//                 <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
//                     <p className="text-white text-lg">
//                         {"Don't"} have an account?
//                     </p>
//                     <Link to="/signup">
//                         <button className="btn rounded-full btn-primary text-white btn-outline w-full">
//                             Sign up
//                         </button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPlayOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import {  baseUrl } from "../../../constant/url";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; // For animations

const LoginPage = () => {
     console.log(baseUrl)

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    

    const { mutate: login, isLoading, isError, error } = useMutation({
        mutationFn: async ({ username, password }) => {
            const response = await fetch(`${baseUrl}/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Invalid credentials");
            }
            return data;
        },
        onSuccess: () => {
            localStorage.setItem("isAuthenticated", "true");
            toast.success("Login successful");
            navigate("/");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (formData.username.trim() === "" || formData.password.trim() === "") {
            toast.error("Both username and password are required");
            return;
        }

        login(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900">
            {/* Left Section (Animation and Branding) */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 hidden lg:flex items-center justify-center bg-gradient-to-r from-purple-800 to-indigo-900"
            >
                <div className="text-center">
                    <IoPlayOutline className="text-white text-9xl mb-4" />
                    <h1 className="text-4xl font-bold text-white">Welcome Back!</h1>
                    <p className="text-gray-300 mt-2">Login to continue your journey.</p>
                </div>
            </motion.div>

            {/* Right Section (Login Form) */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex-1 flex flex-col justify-center items-center p-8"
            >
                <form
                    className="w-full max-w-md mx-auto flex flex-col gap-6"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-4xl font-extrabold text-white text-center">
                        {"Let's"} go.
                    </h1>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full"
                    >
                        <label className="input input-bordered rounded-lg flex items-center gap-2 bg-gray-800 border-gray-700">
                            <MdOutlineMail className="text-gray-400" />
                            <input
                                type="text"
                                className="grow bg-transparent text-white placeholder-gray-400"
                                placeholder="Username"
                                name="username"
                                onChange={handleInputChange}
                                value={formData.username}
                            />
                        </label>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full"
                    >
                        <label className="input input-bordered rounded-lg flex items-center gap-2 bg-gray-800 border-gray-700">
                            <MdPassword className="text-gray-400" />
                            <input
                                type="password"
                                className="grow bg-transparent text-white placeholder-gray-400"
                                placeholder="Password"
                                name="password"
                                onChange={handleInputChange}
                                value={formData.password}
                                autoComplete="current-password"
                            />
                        </label>
                    </motion.div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="btn btn-primary rounded-full text-white w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Loading..." : "Login"}
                    </motion.button>
                    {isError && (
                        <p className="text-red-500 text-center">
                            {error?.message || "An unexpected error occurred"}
                        </p>
                    )}
                </form>
                <div className="w-full max-w-md mx-auto mt-6">
                    <p className="text-gray-400 text-center">
                        {"Don't"} have an account?{" "}
                        <Link to="/signup" className="text-purple-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;