import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaTrophy, FaSpinner } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../../../constant/url";
import toast from "react-hot-toast";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useTheme } from "../ProviderDtata/Providing";
const TProfilePage = () => {
	const {logout}=useTheme()
	const [coverImg, setCoverImg] = useState(null);
	const [profileImg, setProfileImg] = useState(null);
	const [feedType, setFeedType] = useState("posts");
	const [isEditing, setIsEditing] = useState(false); // Toggle edit mode

	const coverImgRef = useRef(null);
	const profileImgRef = useRef(null);

	const{userD,refetch,isLoading}=useTheme()

	const isMyProfile = true;

	const { data: authuser } = useQuery({ queryKey: ["authuser"] });
	const { data: profile } = useQuery({ queryKey: ["profile"] });
	const queryClient = useQueryClient();


	useEffect(() => {
		refetch();
	}, [refetch]);

	const handleImgChange = (e, state) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				state === "coverImg" && setCoverImg(reader.result);
				state === "profileImg" && setProfileImg(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const { mutate: update, isPending } = useMutation({
		mutationFn: async () => {
			try {
				const res = await fetch(`${baseUrl}/get/update`, {
					method: "POST",
					credentials: "include",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({ coverImg, profileImg }),
				});
				const data = await res.json();
				if (!res.ok) throw new Error(data.error || "Something went wrong");
				return data;
			} catch (error) {
				console.error(error);
				toast.error(error.message);
			}
		},
		onSuccess: () => {
			toast.success("Profile updated successfully!");
			queryClient.invalidateQueries(["authuser"]);
			queryClient.invalidateQueries(["profile"]);
			setIsEditing(false); // Exit edit mode after successful update
		},
	});

	const handleCancelEdit = () => {
		setCoverImg(null); // Reset cover image
		setProfileImg(null); // Reset profile image
		setIsEditing(false); // Exit edit mode
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<FaSpinner className="animate-spin text-4xl text-blue-500" />
			</div>
		);
	}
	console.log(userD)
	return (
		<div className="flex-[4_4_0] border-r border-gray-700 min-h-screen font-pop">
			{/* Header */}
			<div className="flex justify-between items-center p-2">
				<div className="flex gap-4 items-center p-4 border-b  border-gray-700">
					<Link to="/" className="hover:bg-gray-800 p-2 rounded-full transition duration-200">
						<FaArrowLeft className="w-5 h-5" />
					</Link>
					<div className="flex flex-col">
						<h1 className="text-xl font-bold">{userD?.fullName}</h1>
						<p className="text-sm text-gray-500">@{userD?.username}</p>
					</div>
				</div>

				<span onClick={()=>logout()}  className="text-sm cursor-pointer h-7 w-20 p-2 font-semibold border-none bg-red-300  flex items-center gap-2 rounded-full  "> <RiLogoutCircleRLine />logout</span>

			</div>

			{/* Cover Image */}
			<div className="relative group/cover h-64 bg-gradient-to-r border-2">
				<img
					src={coverImg || userD?.coverImg || "/https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUB-jXghBR_lrkYMTki88GuuDuPIDkaRXJDg&s.png"}
					alt="Cover"
					className="w-full h-full object-cover"
				/>
				{isMyProfile && isEditing && (
					<div
						className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full cursor-pointer"
						onClick={() => coverImgRef.current.click()}
					>
						<MdEdit className="w-5 h-5 text-white" />
					</div>
				)}
				<input
					type="file"
					hidden
					ref={coverImgRef}
					onChange={(e) => handleImgChange(e, "coverImg")}
				/>
			</div>

			{/* Profile Image */}
			<div className="flex justify-between items-end px-4 -mt-16">
				<div className="relative group/avatar w-32 h-32">
					<img
						src={profileImg || userD?.profileImg || "https://images.https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNKfj6RsyRZqO4nnWkPFrYMmgrzDmyG31pFQ&s.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=600"}
						alt="Profile"
						className="w-full h-full rounded-full border-4 border-gray-900 object-cover"
					/>
					{isMyProfile && isEditing && (
						<div
							className="absolute bottom-2 right-2 p-2 bg-black bg-opacity-50 rounded-full cursor-pointer"
							onClick={() => profileImgRef.current.click()}
						>
							<MdEdit className="w-5 h-5 text-white" />
						</div>
					)}
					<input
						type="file"
						hidden
						ref={profileImgRef}
						onChange={(e) => handleImgChange(e, "profileImg")}
					/>
				</div>

				{/* Edit, Update, and Cancel Buttons */}
				{isMyProfile && (
					<div className="flex gap-2">
						{!isEditing ? (
							<button
								className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-200"
								onClick={() => setIsEditing(true)}
							>
								Edit Profile
							</button>
						) : (
							<>
								<button
									className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-200"
									onClick={handleCancelEdit}
								>
									Cancel
								</button>
								{(coverImg || profileImg) && (
									<button
										className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-200"
										onClick={update}
										disabled={isPending}
									>
										{isPending ? "Updating..." : "Update"}
									</button>
								)}
							</>
						)}
					</div>
				)}
			</div>

			{/* User Info */}
			<div className="p-4">
				<h1 className="text-2xl font-bold">{userD?.fullName}</h1>
				<p className="text-gray-500">@{userD?.username}</p>
				<p className="mt-2">{userD?.bio}</p>
				<div className="flex items-center space-x-4 mt-4 text-gray-500">
					<IoCalendarOutline className="w-5 h-5" />
					<span>Joined {new Date(userD?.createdAt).toLocaleDateString()}</span>
				</div>

				{/* Points Section */}
				<div className="mt-6">
					<h2 className="text-xl font-bold flex items-center gap-2">
						<FaTrophy className="text-yellow-500" /> Your Points
					</h2>
					<div className="mt-2">
						<div className="bg-gray-800 rounded-lg p-4">
							<div className="flex items-center justify-between">
								<span className="text-lg font-bold">{userD?.points || 0} Points</span>
								<span className="text-sm text-gray-400">Earned by watching videos</span>
							</div>
							<div className="w-full bg-gray-700 rounded-full h-2 mt-2">
								<div
									className="bg-yellow-500 h-2 rounded-full"
									style={{ width: `${(userD?.points || 0) % 100}%` }}
								></div>
							</div>
							<p className="text-sm font-pop font-semibold text-gray-400 mt-2">
								{userD?.points} <span>points to next level</span>
								{/* {100 - ((userD?.points || 0) % 100)} points to next level */}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Feed Tabs */}
			<div className="flex border-b border-gray-700">
				<button
					className={`flex-1 p-4 text-center hover:bg-gray-800 transition duration-200 ${feedType === "posts" ? "border-b-2 border-blue-500" : ""
						}`}
					onClick={() => setFeedType("posts")}
				>
					Posts
				</button>
				<button
					className={`flex-1 p-4 text-center hover:bg-gray-800 transition duration-200 ${feedType === "likes" ? "border-b-2 border-blue-500" : ""
						}`}
					onClick={() => setFeedType("likes")}
				>
					Likes
				</button>
			</div>

			{/* Feed Content */}
			<div className="p-4">
				{feedType === "posts" && <p>Posts will appear here.</p>}
				{feedType === "likes" && <p>Liked posts will appear here.</p>}
			</div>
		</div>
	);
};

export default TProfilePage;