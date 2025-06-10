"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ContentTable from "../../_components/content-table";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { AllContentResponse, Content } from "../../_components/ContentDataType";
import ContentModalForm from "../../_components/ContentModalForm";

export default function SubcategoryContentPage() {
  const params = useParams();
  const categoryId = params?.catId;
  const subcategoryId = params?.subCatId;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);

  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token;

  // get all content

  const { data, isLoading, error, isError } = useQuery<AllContentResponse>({
    queryKey: ["all-contents"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${categoryId}/${subcategoryId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        }
      ).then((res) => res.json()),
  });

  console.log("all contents", data);
  if (isError) {
    console.log(error);
  }

  const handleDeleteContent = async (contentId: number) => {
    if (!confirm("Are you sure you want to delete this content?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${contentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const handleEditContent = (content: Content) => {
    setEditingContent(content);
    setIsModalOpen(true);
  };

  const handleAddContent = () => {
    setEditingContent(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {data?.data[0]?.category_name} Lists
            </h1>
            <div className="text-sm text-gray-600">
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <span className="mx-2">{">"}</span>
              <span>{data?.data[0]?.category_name}</span>
              <span className="mx-2">{">"}</span>
              <span>{data?.data[0]?.sub_category_name}</span>
            </div>
          </div>

          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleAddContent}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Blog
          </Button>
        </div>

        {/* Content Table */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-0">
            <ContentTable
              contents={data?.data || []}
              loading={isLoading}
              onDelete={handleDeleteContent}
              onEdit={handleEditContent}
            />
          </CardContent>
        </Card>
      </div>

      {/* content modal form  */}
      <ContentModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categoryId={categoryId}
        subcategoryId={subcategoryId}
        initialContent={editingContent}
        isEditing={!!editingContent}
        editingContent={editingContent}
      />
    </div>
  );
}
