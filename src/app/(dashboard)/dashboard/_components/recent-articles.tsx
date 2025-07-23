"use client";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import { DashboardOverviewDataTypeResponse } from "@/components/types/DashboardOverviewDataType";
// import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import SplurjjDropDownSelector from "@/components/ui/SplurjjDropDownSelector";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import ContentStatusDropDown from "../content/_components/ContentStatusDropDown";

const numberList = [
  { id: 1, name: "5", value: 5 },
  { id: 2, name: "6", value: 6 },
  { id: 3, name: "7", value: 7 },
  { id: 4, name: "8", value: 8 },
  { id: 5, name: "9", value: 9 },
  { id: 6, name: "10", value: 10 },
  { id: 7, name: "11", value: 11 },
  { id: 8, name: "12", value: 12 },
  { id: 9, name: "13", value: 13 },
  { id: 10, name: "14", value: 14 },
  { id: 11, name: "15", value: 15 },
  { id: 12, name: "16", value: 16 },
  { id: 13, name: "17", value: 17 },
  { id: 14, name: "18", value: 18 },
  { id: 15, name: "19", value: 19 },
  { id: 16, name: "20", value: 20 },
];

const RecentArticles = () => {
  const [selectedNumber, setSelectedNumber] = useState<
    string | number | undefined
  >(undefined);
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
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-black mb-6">
          Recent Articles
        </h2>
        <div>
          <SplurjjDropDownSelector
            list={numberList}
            selectedValue={selectedNumber}
            onValueChange={setSelectedNumber}
            placeholderText="Select a number"
          />
        </div>
      </div>
      <div>
        <ScrollArea className="h-[420px] w-full">
          <table className="w-full">
            <tbody className="">
              {data?.data?.recent_content?.map((content) => {
                return (
                  <tr
                    key={content?.id}
                    className="w-full flex items-center justify-between pb-4 "
                  >
                    <div className="flex items-center gap-4">
                      <td className="w-[60px] h-full">
                        <Image
                          src={
                            content?.image1
                              ? encodeURI(
                                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/${content.image1}`
                                )
                              : content?.imageLink
                              ? encodeURI(content.imageLink)
                              : "/assets/images/no-images.jpg"
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
                      {/* <Badge className="bg-[#E6EEFE] py-[2px] px-[8px] rounded-full text-base font-semibold text-[#131313]  leading-normal">
                      {content?.status}
                    </Badge> */}
                      <ContentStatusDropDown
                        contentId={content?.id}
                        initialStatus={
                          content?.status === "active" || content?.status === "pending"
                            ? content.status
                            : "pending"
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default RecentArticles;
