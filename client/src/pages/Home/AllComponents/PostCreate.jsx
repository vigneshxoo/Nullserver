import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { baseUrl } from "../../../constant/url";
import toast from "react-hot-toast";
import { useTheme } from "../ProviderDtata/Providing";

const CreatePost = () => {
  const { userD } = useTheme();
  const [text, setText] = useState("");  
  const [video, setVideo] = useState(null);  
  const videoRef = useRef(null);  
  const queryClient = useQueryClient();

  const { mutate: createPost, isLoading, isError,isPending } = useMutation({
    mutationFn: async ({ text, video }) => {
      try {
        const formData = new FormData();
        formData.append("text", text); // Add text to FormData
        if (video) {
          formData.append("video", video); // Add video to FormData
        }
     

        const res = await fetch(`${baseUrl}/post`, {
          method: "POST",
          credentials: "include",
          body: formData,  // Send FormData instead of JSON
        });
        console.log(formData)

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error.message || "Error creating post");
      }
    },
    onSuccess: () => {
      alert("Post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setText("");  // Reset text field
      setVideo(null);  // Reset video file
    },
    onError: (error) => {
      alert(error.message || "Something went wrong");
    }
  });

  const handleVideoChange = (e) => {

    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {  
      setVideo(file); // Set video file directly
    } else {
      alert("Please upload a valid video file.");
    }
  };

  const handleSubmit = (e) => {
   
    e.preventDefault();
  if (text.trim().length <= 6) {
      return toast.error("Please enter a video title with more than 6 characters");
    }
    if (!video) {
      return toast.error("Please upload a video file.");
    }
  };
  console.log(text,video)

  return (
    <div className="flex p-4 items-center gap-4 border-b bg-red-300 md:m-10 border-gray-700">
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img src={userD?.profileImg}alt="user-avatar" />
        </div>
      </div>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <textarea
          className="textarea w-full p-2 h-12 text-lg resize-none border-none focus:outline-none border-gray-800"
          placeholder="vidoe title!"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        {video && (
          
          <div className="relative w-72 mx-auto">
          
            <video className="w-full mx-auto h-72 object-contain  rounded" controls>
              <source src={URL.createObjectURL(video)} type="video/mp4" />
             
            </video>
            <IoCloseSharp
              className="absolute top-  left-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer "
              onClick={() => { console.log("jhabdvjbdavn")
                setVideo(null);  // Clear video when closed
                videoRef.current.value = "";  // Reset file input
              }}
            />
          </div>
          
        )}

        <div className="flex justify-between border-t py-2 border-t-gray-700">
          <div className="flex gap-1 items-center">
            <CiImageOn
              className="fill-primary w-6 h-6 cursor-pointer"
              onClick={() => videoRef.current?.click()}
            />
            <BsEmojiSmileFill className="fill-primary w-5 h-5 cursor-pointer" />
          </div>
          <input type="file" hidden ref={videoRef} onChange={handleVideoChange} />
          <button disabled={isPending} className="btn btn-primary rounded-full btn-sm text-white px-4">
            {isPending ? "Posting..." : "post"}
          </button>
        </div>

        {isError && <div className="text-red-500">Something went wrong</div>}
      </form>
    </div>
  );
};

export default CreatePost;