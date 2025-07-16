import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Render 4 skeleton cards to simulate multiple posts */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="space-y-2 overflow-hidden animate-pulse"
            aria-label="Loading post"
          >
            {/* Image Placeholder */}
            <div className="w-full h-[300px] bg-gray-200 rounded" />
            <div className="p-4">
              {/* Category and Subcategory Placeholders */}
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-200 h-6 w-20 rounded" />
                  <div className="bg-gray-200 h-6 w-24 rounded" />
                </div>
                {/* Share and Comment Icons Placeholder */}
                <div className="flex items-center gap-3">
                  <div className="bg-gray-200 h-6 w-6 rounded-full" />
                  <div className="bg-gray-200 h-6 w-6 rounded-full" />
                  <div className="bg-gray-200 h-6 w-6 rounded-full" />
                </div>
              </div>
              {/* Heading Placeholder */}
              <div className="bg-gray-200 h-8 w-3/4 rounded" />
              {/* Author and Date Placeholder */}
              <div className="bg-gray-200 h-4 w-1/2 rounded mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;