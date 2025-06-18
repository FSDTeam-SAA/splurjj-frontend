"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

const SubscriberContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token;

  const { data, isLoading, isError, error } = useQuery<SubscriberApiResponse>({
    queryKey: ["role", currentPage],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscribe?paginate_count=10&page=${currentPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json()),
  });

  console.log({ data });

  let content;
  if (isLoading) {
    content = (
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
    content = (
      <div>
        <ErrorContainer message={error?.message || "Something went Wrong"} />
      </div>
    );
  } else if (data && data?.data && data?.data.length === 0) {
    content = (
      <div>
        <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
      </div>
    );
  } else if (data && data?.data && data?.data.length > 0) {
    content = (
      <div>
        <TableContainer data={data?.data} columns={SubscriberColumn} />
      </div>
    );
  }
  return (
    <section className="w-full">
      <div className="w-full shadow-[0px_0px_22px_8px_#C1C9E4] h-auto  rounded-[24px] bg-white mb-20 ">
        {content}
      </div>
      <div>
        {data && data?.meta && data?.meta.last_page > 1 && (
          <div className="mt-[30px]  w-full pb-[208px]  flex justify-between">
            <p className="font-normal text-[16px] leading-[19.2px] text-[#444444]">
              Showing {currentPage} to {data?.meta?.last_page} in first entries
            </p>
            <div>
              <SplurjjPagination
                currentPage={currentPage}
                totalPages={data?.meta.last_page}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SubscriberContainer;
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import SplurjjPagination from "@/components/ui/SplurjjPagination";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import { SubscriberColumn } from "./SubscriberColumn";
import { Subscriber, SubscriberApiResponse } from "@/components/types/SubscriberDataType";

const TableContainer = ({
  data,
  columns,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns: ColumnDef<Subscriber>[];
}) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <DataTable table={table} columns={columns} title="All Subscribers" />
    </>
  );
};

