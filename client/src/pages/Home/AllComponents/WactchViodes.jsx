import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { baseUrl } from "../../../constant/url";

export const WatchVideos = () => {
  const [watch, setWatch] = useState([]);

  const fetchVideos = useMutation({
    mutationFn: async () => {
      console.log("Fetching videos...");
      const response = await fetch(`${baseUrl}/watch`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch videos");
      const data = await response.json();
      setWatch(data);
    },
    onSuccess: () => toast.success("Videos fetched successfully"),
    onError: (error) => toast.error(error.message),
  });

  useEffect(() => {
    fetchVideos.mutate();
  }, []);

  if (watch.length === 0) {
    return <p className="text-center text-white text-xl">No videos available</p>;
  }

  return (
    <div className="min-h-screen font-pop  p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Watch Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watch.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-400 mb-3">{item.description}</p>
            <motion.video
              src={item.video}
              controls
              className="w-full rounded-lg"
              whileHover={{ scale: 1.02 }}
            ></motion.video>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
