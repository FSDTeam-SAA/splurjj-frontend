"use client";
import { ContentAllDataTypeResponse } from "@/components/types/ContentDataType";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import HeroSection from "./Hero/HeroSection";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import FirstContent from "./FirstContent/FirstContent";
import Advertising from "../videos/_components/Advertising";

const AllContentContainer = ({
  categoryId,
  subcategoryId,
}: {
  categoryId: string;
  subcategoryId: string;
}) => {
  console.log(categoryId, subcategoryId);

  //   get all content
  const { data, isLoading, error, isError } =
    useQuery<ContentAllDataTypeResponse>({
      queryKey: ["all-content"],
      queryFn: () =>
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${categoryId}/${subcategoryId}`
        ).then((res) => res.json()),
    });

  console.log("all content data", data?.data);

  let contentData:
    | string
    | number
    | bigint
    | boolean
    | React.JSX.Element
    | Iterable<React.ReactNode>
    | Promise<React.AwaitedReactNode>
    | null
    | undefined;

  if (isLoading) {
    contentData = (
      <div className="w-full p-5">
        <TableSkeletonWrapper
          count={8}
          width="100%"
          height="70px"
          className="bg-[#E6EEF6]"
        />
      </div>
    );
  } else if (isError) {
    contentData = (
      <div>
        <ErrorContainer message={error?.message || "Something went Wrong"} />
      </div>
    );
  } else if (
    data &&
    data?.data &&
    data?.data?.data &&
    data?.data?.data.length === 0
  ) {
    contentData = (
      <div>
        <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
      </div>
    );
  } else if (
    data &&
    data?.data &&
    data?.data?.data &&
    data?.data?.data.length > 0
  ) {
    contentData = (
      <div>
        <HeroSection
          content={data?.data?.data?.slice(0, 1)}
          categoryId={categoryId}
          subcategoryId={subcategoryId}
        />
      </div>
    );
  }

  return (
    <div className="container">
      {/* hero section  */}
      <section>
        <div>{contentData}</div>
      </section>

      <section>
        <Advertising/>
      </section>

      {/* first content  */}
      <section>
        <FirstContent
          content={data?.data?.data?.slice(1, 5)}
          subcategoryId={subcategoryId}
          categoryId={categoryId}
        />
      </section>

      <section>
        <Advertising/>
      </section>
      
    </div>
  );
};

export default AllContentContainer;
