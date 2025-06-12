"use client";
import { ContentAllDataTypeResponse, ContentDataTypeResponse } from "@/components/types/ContentDataType";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import HeroSection from "./Hero/HeroSection";

const AllContentContainer = ({
  categoryId,
  subcategoryId,
}: {
  categoryId: string;
  subcategoryId: string;
}) => {
  console.log(categoryId, subcategoryId);

  //   get all content
  const { data, isLoading, error, isError } = useQuery<ContentAllDataTypeResponse>({
    queryKey: ["all-content"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${categoryId}/${subcategoryId}`
      ).then((res) => res.json()),
  });

  console.log("all content data", data?.data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error instanceof Error ? error.message : String(error)}</div>;
  }

  return (
    <div>
      {data?.data?.slice(0, 1).map((content: ContentDataTypeResponse) => {
        return <HeroSection key={content.id} content={content} categoryId={categoryId} subcategoryId={subcategoryId} />;
      })}
    </div>
  );
};

export default AllContentContainer;
