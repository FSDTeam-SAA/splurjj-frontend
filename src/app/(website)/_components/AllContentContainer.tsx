
"use client";
import { ContentAllDataTypeResponse } from "@/components/types/ContentDataType";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import HeroSection from "./Hero/HeroSection";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import FirstContent from "./FirstContent/FirstContent";
import Advertising from "../videos/_components/Advertising";
import SecondContent from "./SecondContent/SecondContent";
import ThirdContent from "./ThirdContent/ThirdContent";
import SplurjjPagination from "@/components/ui/SplurjjPagination";

const AllContentContainer = ({
  categoryId,
  subcategoryId,
}: {
  categoryId: string;
  subcategoryId: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error, isError } = useQuery<ContentAllDataTypeResponse>({
    queryKey: ["all-content", currentPage],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${categoryId}/${subcategoryId}?paginate_count=9&page=${currentPage}`
      ).then((res) => res.json()),
  });

  let contentData: React.ReactNode = null;

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
        <ErrorContainer message={error?.message || "Something went wrong"} />
      </div>
    );
  } else if (data?.data?.data?.length === 0) {
    contentData = (
      <div>
        <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
      </div>
    );
  } else if ((data?.data?.data?.length ?? 0) > 0) {
    const length = data?.data?.data?.length ?? 0;
    contentData = (
      <div>
        {length >= 1 && (
          <>
            <HeroSection
              content={data?.data?.data?.slice(0, 1)}
              categoryId={categoryId}
              subcategoryId={subcategoryId}
            />
            <section>
              <Advertising />
            </section>
          </>
        )}

        {length >= 5 && (
          <>
            <FirstContent
              content={data?.data?.data?.slice(1, 5)}
              categoryId={categoryId}
              subcategoryId={subcategoryId}
            />
            <section>
              <Advertising />
            </section>
          </>
        )}

        {length >= 7 && (
          <>
            <SecondContent
              content={data?.data?.data?.slice(5, 7)}
              categoryId={categoryId}
              subcategoryId={subcategoryId}
            />
            <section>
              <Advertising />
            </section>
          </>
        )}

        {length >= 9 && (
          <>
            <ThirdContent
              content={data?.data?.data?.slice(7, 9)}
              categoryId={categoryId}
              subcategoryId={subcategoryId}
            />
            <section>
              <Advertising />
            </section>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      {/* Render main content */}
      <section>
        <div>{contentData}</div>
      </section>

      {/* Pagination */}
      <div className="pb-[108px]">
        {data && data.total_pages > 1 && (
          <div className="mt-[30px] w-full flex justify-between">
            <p className="font-normal text-base leading-[120%] text-secondary-100">
              Showing {data.data.current_page} from {data.total_pages}
            </p>
            <div>
              <SplurjjPagination
                currentPage={currentPage}
                totalPages={data.total_pages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllContentContainer;