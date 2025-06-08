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
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";

interface Content {
  id: number;
  category_id: number;
  subcategory_id: number;
  heading: string;
  author: string;
  date: string;
  sub_heading: string;
  body1: string;
  image1: string;
  advertising_image: string;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  image1_url: string;
}

interface ContentTableProps {
  contents: Content[];
  loading: boolean;
  onDelete: (contentId: number) => void;
  onEdit: (content: Content) => void;
}

export default function ContentTable({
  contents,
  loading,
  onDelete,
  onEdit,
}: ContentTableProps) {


  console.log(contents)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
  };

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

  if (contents.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        No content found for this subcategory.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="w-80">Blog Name</TableHead>
          <TableHead className="w-40">Date</TableHead>
          <TableHead className="w-24 text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contents.map((content) => (
          
          <TableRow key={content.id} className="hover:bg-blue-50/30">
            
            <TableCell>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={content.image1_url || "/placeholder.svg"}
                    alt={content.heading}
                    className="w-full h-full object-cover"
                    width={80}
                    height={60}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate text-sm">
                    {content.heading}
                  </h3>
                  <p dangerouslySetInnerHTML={{ __html: content.sub_heading }} className="text-xs text-gray-500 mt-1 line-clamp-2"/>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm text-gray-600">
                {formatDate(content.created_at)}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => onEdit(content)}
                >
                  <Edit2 className="h-4 w-4 text-blue-600" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={() => onDelete(content.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
