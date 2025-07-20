"use client";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import { DashboardOverviewDataTypeResponse } from "@/components/types/DashboardOverviewDataType";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const RecentArticles = () => {
  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token;

  const { data, isLoading, isError, error } =
    useQuery<DashboardOverviewDataTypeResponse>({
      queryKey: ["dashboard-recent-articles"],
      queryFn: () =>
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard-overview`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json()),
    });

  // console.log(data?.data?.recent_content);
  if (isLoading) {
    return (
      <div>
        <TableSkeletonWrapper
          count={6}
          width="100%"
          height="70px"
          className="bg-white border rounded-[8px]"
        />
      </div>
    );
  }

  if (isError) {
    return <div>{error?.message || "Somethings went wrong"}</div>;
  }
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-black mb-6">
        Recent Articles
      </h2>
      <div>
        <table className="w-full">
          <tbody>
            {data?.data?.recent_content?.slice(0,6)?.map((content) => {
              return (
                <tr
                  key={content?.id}
                  className="w-full flex items-center justify-between pb-4"
                >
                  <div className="flex items-center gap-4">
                    <td className="w-[60px] h-full">
                      <Image
                        src={
                          !content?.image1
                            ?  "/assets/images/no-images.jpg"
                            : `${process.env.NEXT_PUBLIC_BACKEND_URL}/${content.image1}`
                        }
                        alt={content?.heading}
                        width={60}
                        height={60}
                        className="w-[60px] h-[60px] rounded-[8px] object-cover"
                      />
                    </td>
                    <td
                      className="text-black dark:text-black black__text"
                      dangerouslySetInnerHTML={{ __html: content?.heading }}
                    />
                  </div>

                  <td>
                    <Badge className="bg-[#E6EEFE] py-[2px] px-[8px] rounded-full text-base font-semibold text-[#131313]  leading-normal">
                      {content?.status}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentArticles;
