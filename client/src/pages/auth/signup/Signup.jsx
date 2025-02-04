// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { baseUrl } from "../../../constant/url";
// import { MdOutlineMail, MdPassword, MdDriveFileRenameOutline } from "react-icons/md";
// import { FaUser } from "react-icons/fa";
// import { IoPlayOutline } from "react-icons/io5";
// import toast from "react-hot-toast";

// const SignUpPage = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         email: "",
//         username: "",
//         fullname: "",
//         password: "",
//     });

//     const { mutate: signup, isLoading, isError, error } = useMutation({
//         mutationFn: async ({ email, username, fullname, password }) => {
//             const res = await fetch(`${baseUrl}/signup`, {
//                 method: "POST",
//                 credentials: "include",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json",
//                 },
//                 body: JSON.stringify({ email, username, fullname, password }),
//             });

//             const data = await res.json();
//             if (!res.ok) {
//                 throw new Error(data.error || "Something went wrong");
//             }
//             return data;
//         },
//         onSuccess: () => {
//             localStorage.setItem("isAuthenticated", "true");
//             toast.success("Signup successful");
//             navigate('/')
//             // navigate("/homepage", { replace: true });
//         },
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Password Validation
//         if (formData.password.length < 8) {
//             toast.error("Password must be at least 8 characters long");
//             return;
//         }

//         signup(formData);
//     };

//     const handleInputChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     return (
//         <div className="max-w-screen-xl mx-auto flex h-screen px-10">
//             <div className="flex-1 hidden lg:flex items-center justify-center">
//                 <IoPlayOutline className="text-white text-6xl" />
//             </div>
//             <div className="flex-1 flex flex-col justify-center items-center">
//                 <form
//                     className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col"
//                     onSubmit={handleSubmit}
//                 >
//                     <h1 className="text-4xl font-extrabold text-white">Join today.</h1>
//                     <label className="input input-bordered rounded flex items-center gap-2">
//                         <MdOutlineMail />
//                         <input
//                             type="email"
//                             className="grow"
//                             placeholder="Email"
//                             name="email"
//                             onChange={handleInputChange}
//                             value={formData.email}
//                         />
//                     </label>
//                     <div className="flex gap-4 flex-wrap">
//                         <label className="input input-bordered rounded flex items-center gap-2 flex-1">
//                             <FaUser />
//                             <input
//                                 type="text"
//                                 className="grow"
//                                 placeholder="Username"
//                                 name="username"
//                                 onChange={handleInputChange}
//                                 value={formData.username}
//                             />
//                         </label>
//                         <label className="input input-bordered rounded flex items-center gap-2 flex-1">
//                             <MdDriveFileRenameOutline />
//                             <input
//                                 type="text"
//                                 className="grow"
//                                 placeholder="Full Name"
//                                 name="fullname"
//                                 onChange={handleInputChange}
//                                 value={formData.fullname}
//                             />
//                         </label>
//                     </div>
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
//                         {isLoading ? "Loading..." : "Sign up"}
//                     </button>
//                     {isError && (
//                         <p className="text-red-500">
//                             {error?.message || "Something went wrong"}
//                         </p>
//                     )}
//                 </form>
//                 <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
//                     <p className="text-white text-lg">Already have an account?</p>
//                     <Link to="/login">
//                         <button className="btn rounded-full btn-primary text-white btn-outline w-full">
//                             Sign in
//                         </button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUpPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPlayOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { MdOutlineMail, MdPassword, MdDriveFileRenameOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { baseUrl } from "../../../constant/url";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; // For animations

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        fullname: "",
        password: "",
    });

    const { mutate: signup, isLoading, isError, error } = useMutation({
        mutationFn: async ({ email, username, fullname, password }) => {
            const res = await fetch(`${baseUrl}/signup`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ email, username, fullname, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }
            return data;
        },
        onSuccess: () => {
            localStorage.setItem("isAuthenticated", "true");
            toast.success("Signup successful");
            navigate("/");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }
        signup(formData);
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
                    <h1 className="text-4xl font-bold text-white">Join Us Today!</h1>
                    <p className="text-gray-300 mt-2">Create an account to get started.</p>
                </div>
            </motion.div>

            {/* Right Section (Signup Form) */}
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
                        Create Account
                    </h1>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <label className="input input-bordered rounded-lg flex items-center gap-2 bg-gray-800 border-gray-700">
                            <MdOutlineMail className="text-gray-400" />
                            <input
                                type="email"
                                className="grow bg-transparent text-white placeholder-gray-400"
                                placeholder="Email"
                                name="email"
                                onChange={handleInputChange}
                                value={formData.email}
                            />
                        </label>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <label className="input input-bordered rounded-lg flex items-center gap-2 bg-gray-800 border-gray-700">
                            <FaUser className="text-gray-400" />
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
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <label className="input input-bordered rounded-lg flex items-center gap-2 bg-gray-800 border-gray-700">
                            <MdDriveFileRenameOutline className="text-gray-400" />
                            <input
                                type="text"
                                className="grow bg-transparent text-white placeholder-gray-400"
                                placeholder="Full Name"
                                name="fullname"
                                onChange={handleInputChange}
                                value={formData.fullname}
                            />
                        </label>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <label className="input input-bordered rounded-lg flex items-center gap-2 bg-gray-800 border-gray-700">
                            <MdPassword className="text-gray-400" />
                            <input
                                type="password"
                                className="grow bg-transparent text-white placeholder-gray-400"
                                placeholder="Password"
                                name="password"
                                onChange={handleInputChange}
                                value={formData.password}
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
                        {isLoading ? "Signing up..." : "Sign up"}
                    </motion.button>
                    {isError && (
                        <p className="text-red-500 text-center">
                            {error?.message || "An unexpected error occurred"}
                        </p>
                    )}
                </form>
                <div className="w-full max-w-md mx-auto mt-6">
                    <p className="text-gray-400 text-center">
                        Already have an account? {" "}
                        <Link to="/login" className="text-purple-400 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SignUpPage;

