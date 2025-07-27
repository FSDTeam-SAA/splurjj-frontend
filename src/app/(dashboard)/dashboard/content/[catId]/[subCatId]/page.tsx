"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ContentTable from "../../_components/content-table";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import SplurjjPagination from "@/components/ui/SplurjjPagination";
import ContentAddEditForm from "../../_components/ContentModalForm";
import { ConfirmationModal } from "@/components/shared/modals/ConfirmationModal";
import { ContentDashboardResponse, ContentItem } from "../../_components/ContentDataType";

export default function SubcategoryContentPage() {
  const params = useParams();
  const categoryId = params?.catId;
  const subcategoryId = params?.subCatId;
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Add this state
  const [contentToDelete, setContentToDelete] = useState<number | null>(null);

  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token;
  const queryClient = useQueryClient();

  // get all content
  const { data, isLoading, error, isError } = useQuery<ContentDashboardResponse>({
    queryKey: ["all-contents", currentPage],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/content-dashbaord/${categoryId}/${subcategoryId}?paginate_count=7&page=${currentPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        }
      ).then((res) => res.json()),
  });

  console.log("get all contents", data?.data?.data)

  console.log(editingContent)

  // console.log("all contents", data?.data);
  if (isError) {
    console.log(error);
  }

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
      setShowDeleteModal(false); // Close modal after successful deletion
    },
  });

  const handleDeleteClick = (contentId: number) => {
    setContentToDelete(contentId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (contentToDelete) {
      deleteContent(contentToDelete);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setContentToDelete(null);
  };

  const handleAddContent = () => {
    setEditingContent(null);
    setShowForm(true);
  };

  const handleEditContent = (content: ContentItem) => {
    setEditingContent(content);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingContent(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingContent(null);
    queryClient.invalidateQueries({ queryKey: ["all-contents"] });
  };

  return (
    <div className="p-6">
      <div>
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-3xl font-bold text-gray-800 dark:white-text mb-2">
              {data?.data?.data[0]?.category_name} Lists
            </p>
            <div className="text-base text-[#929292]  font-medium leading-[120%] tracking-[0%] flex items-center gap-2">
              <Link
                href="/dashboard"
                className="hover:underline text-base text-[#929292] dark:text-white  font-medium leading-[120%] tracking-[0%]"
              >
                Dashboard
              </Link>
              <span className="text-[#929292]">
                <ChevronRight className="w-5 h-5" />
              </span>
              <span className="text-base text-[#929292]  font-medium leading-[120%] tracking-[0%]">
                {data?.data?.data[0]?.category_name}
              </span>
              <span className=" text-[#929292]">
                <ChevronRight className="w-5 h-5" />
              </span>
              <span className="text-base text-[#929292]  font-medium leading-[120%] tracking-[0%]">
                {data?.data?.data[0]?.sub_category_name}
              </span>
            </div>
          </div>

          <Button
            className="bg-[#0253F7] hover:bg-primary text-white w-[156px] h-[48px] rounded-[8px] flex items-center gap-2"
            onClick={handleAddContent}
          >
            <Plus className="h-8 w-8 text-white" />
            Add Post
          </Button>
        </div>

        {/* Conditional rendering: Show either the table or the form */}
        {showForm ? (
          <div className="space-y-4">
            <ContentAddEditForm
              // initialContent={editingContent}
              categoryId={categoryId!}
              subcategoryId={subcategoryId!}
              onSuccess={handleFormSuccess}
              onCancel={handleCloseForm}
              // setEditingContent={setEditingContent}
              setShowForm={setShowForm}
            />
          </div>
        ) : (
          <>
            {/* Content Table */}
            <ContentTable
              contents={data?.data?.data || []}
              loading={isLoading}
              onDelete={handleDeleteClick}
              onEdit={handleEditContent}
            />

            {/* pagination  */}
            <div className="pb-[108px]">
              {data && data?.total_pages > 1 && (
                <div className="mt-[30px] w-full flex justify-between">
                  {/* <p className="font-normal text-base leading-[120%] text-secondary-100">
                    Showing {data?.data?.current_page} from {data?.total_pages}
                  </p> */}
                  <p className="font-normal text-[16px] leading-[19.2px] text-[#444444]">
                    Showing {(currentPage - 1) * data?.per_page + 1} to{" "}
                    {Math.min(
                      currentPage * data?.per_page,
                      data?.total
                    )}{" "}
                    of {data?.total} results
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
          </>
        )}
      </div>

      {/* delete modal content  */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Post"
        description="Are you sure you want to delete this content? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

