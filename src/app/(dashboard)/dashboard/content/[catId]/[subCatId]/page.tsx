"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ContentTable from "../../_components/content-table";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AllContentResponse, Content } from "../../_components/ContentDataType";
import ContentModalForm from "../../_components/ContentModalForm";
import { toast } from "react-toastify";
import SplurjjPagination from "@/components/ui/SplurjjPagination";

export default function SubcategoryContentPage() {
  const params = useParams();
  const categoryId = params?.catId;
  const subcategoryId = params?.subCatId;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token;
  const queryClient = useQueryClient();

  // get all content

  const { data, isLoading, error, isError } = useQuery<AllContentResponse>({
    queryKey: ["all-contents", currentPage],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${categoryId}/${subcategoryId}?paginate_count=7&page=${currentPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        }
      ).then((res) => res.json()),
  });

  console.log("all contents", data?.data);
  if (isError) {
    console.log(error);
  }

  // content delete api
  const { mutate: deleteContent } = useMutation({
    mutationKey: ["delete-content"],
    mutationFn: (contentId: number) =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contents/${contentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        }
      ).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data?.status) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Content deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["all-contents"] });
    },
  });

  const handleDeleteContent = (contentId: number) => {
    deleteContent(contentId);
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
              {data?.data?.data[0]?.category_name} Lists
            </h1>
            <div className="text-base text-[#929292] font-manrope font-medium leading-[120%] tracking-[0%] flex items-center gap-2">
              <Link
                href="/dashboard"
                className="hover:underline text-base text-[#929292] font-manrope font-medium leading-[120%] tracking-[0%]"
              >
                Dashboard
              </Link>
              <span className="text-[#929292]">
                <ChevronRight className="w-5 h-5" />
              </span>
              <span className="text-base text-[#929292] font-manrope font-medium leading-[120%] tracking-[0%]">
                {data?.data?.data[0]?.category_name}
              </span>
              <span className=" text-[#929292]">
                <ChevronRight className="w-5 h-5" />
              </span>
              <span className="text-base text-[#929292] font-manrope font-medium leading-[120%] tracking-[0%]">
                {data?.data?.data[0]?.sub_category_name}
              </span>
            </div>
          </div>

          <Button
            className="bg-[#34A1E8] hover:bg-primary text-white w-[156px] h-[48px] rounded-[8px] flex items-center gap-2"
            onClick={handleAddContent}
          >
            <Plus className="h-8 w-8 text-white" />
            Add Blog
          </Button>
        </div>

        {/* Content Table */}
        <ContentTable
          contents={data?.data?.data || []}
          loading={isLoading}
          onDelete={handleDeleteContent}
          onEdit={handleEditContent}
        />

        {/* pagination  */}
        <div className="pb-[108px]">
          {data && data?.total_pages > 1 && (
            <div className="mt-[30px] w-full flex justify-between">
              <p className="font-normal text-base leading-[120%] text-secondary-100">
                Showing {data?.data?.current_page} from {data?.total_pages}
              </p>
              <div>
                <SplurjjPagination
                  currentPage={currentPage}
                  totalPages={data?.total_pages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* content modal form  */}
      <ContentModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categoryId={categoryId}
        subcategoryId={subcategoryId}
        initialContent={editingContent}
        
      />
    </div>
  );
}
