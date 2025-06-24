import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MoveLeft, MoveRight } from "lucide-react";

// Define the comment data structure based on the API response
interface Comment {
  id: number;
  name: string;
  comment: string;
  upvotes: number;
  downvotes: number;
  created_at: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Comment[];
}

// Define the props type
interface ContentCommentsProps {
  blogId: number;
}

function ContentComments({ blogId }: ContentCommentsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define the query for fetching comments
  const { data, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: ["comments", blogId],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/comment/content/${blogId}`
      );
      return response.data;
    },
  });

  const handlePrev = () => {
    if (!data?.data?.length) return;
    setCurrentIndex(
      (prev) => (prev - 1 + data.data.length) % data.data.length
    );
  };

  const handleNext = () => {
    if (!data?.data?.length) return;
    setCurrentIndex((prev) => (prev + 1) % data.data.length);
  };

  // Handle loading state
  if (isLoading) {
    return <div className="text-center">Loading comments...</div>;
  }

  // Handle error state
  if (isError) {
    return (
      <div className="text-center text-red-500">
        Failed to load comments: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  // Handle empty or no comments
  if (!data?.success || !data?.data?.length) {
    return <div className="text-center">No comments available.</div>;
  }

  const comment = data.data[currentIndex];

  return (
    <div className="container w-full flex flex-col items-center justify-center">
      <div className="w-full md:w-2/3">
        <h4 className="text-lg md:text-xl font-semibold font-manrope leading-[120%] tracking-[0%] text-black uppercase text-left pb-3 md:pb-4">
          Comments
        </h4>
        <div className="border-b border-gray-200 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-black">
                {comment.name}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(comment.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-4">
              <button className="text-sm text-gray-600">
                👍 {comment.upvotes}
              </button>
              <button className="text-sm text-gray-600">
                👎 {comment.downvotes}
              </button>
            </div>
          </div>
          <p className="mt-2 text-base text-gray-700">{comment.comment}</p>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className=" flex items-center justify-center group text-white py-3 px-6 font-manrope leading-[120%] tracking-[0%] bg-primary rounded-md"
            onClick={handlePrev}
          >
            <MoveLeft className="h-4 w-4 text-white" />
            <span className="sr-only">Previous</span>
          </button>
          <button
            className="flex items-center justify-center group text-white py-3 px-6 font-manrope leading-[120%] tracking-[0%] bg-primary rounded-md"
            onClick={handleNext}
          >
            <MoveRight className="h-4 w-4 text-white" />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentComments;