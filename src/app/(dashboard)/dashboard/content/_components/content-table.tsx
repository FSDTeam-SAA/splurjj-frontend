"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import moment from "moment";
import { ContentItem } from "./ContentDataType";

interface ContentTableProps {
  contents?: ContentItem[];
  loading: boolean;
  onDelete: (contentId: number) => void;
  onEdit: (content: ContentItem) => void;
}

export default function ContentTable({
  contents,
  loading,
  onDelete,
  onEdit,
}: ContentTableProps) {
  console.log(contents);

  if (loading) {
    return (
      <div className="p-8">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-4 p-4 border rounded animate-pulse"
            >
              <div className="w-20 h-16 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (contents?.length === 0) {
    return (
      <div className="p-8 text-center text-black dark:text-white">
        No content found for this subcategory.
      </div>
    );
  }

  return (
    <Table className="bg-transparent">
      <TableHeader className="">
        <TableRow className="border border-[#616161] !h-[39px] w-full py-[10px]">
          <TableHead className="text-base font-bold text-[#131313] dark:text-white tracking-[0%] leading-[120%]  border-r border-[#616161] pl-10">
            Post Name
          </TableHead>
          <TableHead className="border-r border-[#616161] text-center text-base font-bold text-[#131313] dark:text-white tracking-[0%] leading-[120%] ">
            Date
          </TableHead>
          <TableHead className="border-r border-[#616161] text-center text-base font-bold text-[#131313] dark:text-white tracking-[0%] leading-[120%] ">
            Status
          </TableHead>
          <TableHead className="text-center text-base font-bold text-[#131313] dark:text-white tracking-[0%] leading-[120%] ">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border border-[#616161]">
        {contents?.map((content) => {
          // Parse image2 JSON string to an array, if it exists
          let image2Array: string[] = [];
          try {
            image2Array = content.image2 ? JSON.parse(content.image2) : [];
          } catch (error) {
            console.error("Error parsing image2:", error);
          }

          // Select the first available image: image1, imageLink, or first from image2
          const imageSrc = content.image1 || content.imageLink || (image2Array.length > 0 ? image2Array[0] : "/default-image.jpg");

          return (
            <TableRow
              key={content.id}
              className="hover:bg-blue-50/30 border border-[#616161] "
            >
              <TableCell className="border-r border-[#616161]">
                <div className="flex items-center gap-[10px] pl-8">
                  <div className="rounded-[8px] overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={imageSrc}
                      alt={content.heading}
                      width={130}
                      height={68}
                      className="w-[130px] h-[68px] object-cover rounded-[8px]"
                    />
                  </div>
                  <div className="flex-1 min-w-0 dark:white-text">
                    <p
                      dangerouslySetInnerHTML={{ __html: content.heading }}
                      className="text-base font-semibold text-[#131313] dark:text-white tracking-[0%] leading-[120%] "
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="border-r border-[#616161]">
                <div className="text-base font-medium leading-[120%] tracking-[0%] text-[#424242] dark:text-white text-center">
                  {moment(content.date).format("MM/DD/YYYY")}
                </div>
              </TableCell>
              <TableCell className="border-r border-[#616161]">
                <div className="text-base font-medium leading-[120%] tracking-[0%] text-[#424242] text-center flex justify-center items-center">
                  {content.status}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-center items-center gap-4">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => onEdit(content)}
                  >
                    <SquarePen className="h-8 w-8 text-[#424242] dark:text-white" />
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => onDelete(content.id)}
                  >
                    <Trash2 className="h-8 w-8 text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}