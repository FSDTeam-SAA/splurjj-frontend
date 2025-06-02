"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import ContentTable from "../../_components/content-table"
import ContentFormModal from "../../_components/content-form-modal"

interface Content {
  id: number
  category_id: number
  subcategory_id: number
  heading: string
  author: string
  date: string
  sub_heading: string
  body1: string
  image1: string
  advertising_image: string
  tags: string[] | null
  created_at: string
  updated_at: string
}

interface ApiResponse {
  status: boolean
  data: Content[]
}

export default function SubcategoryContentPage() {
  const params = useParams()
  const categoryId = params?.catId
  const subcategoryId = params?.subCatId

  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<Content | null>(null)

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NwbHVyamouc2NhbGV1cGRldmFnZW5jeS5jb20vYXBpL2xvZ2luIiwiaWF0IjoxNzQ4ODY1NjYzLCJleHAiOjE3NTE0NTc2NjMsIm5iZiI6MTc0ODg2NTY2MywianRpIjoiZk1iM1VueUVZaVM0UWM5MyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.AKGGXMOcJh5V8FuOwCXTYPPJm2MpTsrW5kFhKQ_umts"

  useEffect(() => {
    if (categoryId && subcategoryId) {
      fetchContents()
    }
  }, [categoryId, subcategoryId])

  const fetchContents = async () => {
    try {
      setLoading(true)

      const response = await fetch(`https://splurjj.scaleupdevagency.com/api/contents/${categoryId}/${subcategoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      console.log("API Response:", data)

      if (data.status) {
        setContents(data.data || [])
      } else {
        console.error("API returned status false")
        setContents([])
      }
    } catch (error) {
      console.error("Error fetching contents:", error)
      setContents([])
    } finally {
      setLoading(false)
    }
  }


  console.log("Contents:", contents)
  const handleDeleteContent = async (contentId: number) => {
    if (!confirm("Are you sure you want to delete this content?")) return

    try {
      const response = await fetch(`https://splurjj.scaleupdevagency.com/api/contents/${contentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        await fetchContents()
      }
    } catch (error) {
      console.error("Error deleting content:", error)
    }
  }

  const handleEditContent = (content: Content) => {
    setEditingContent(content)
    setIsModalOpen(true)
  }

  const handleAddContent = () => {
    setEditingContent(null)
    setIsModalOpen(true)
  }

  const handleSubmitContent = async (formData: FormData) => {
    try {
      const isEditing = !!editingContent
      const url = isEditing
        ? `https://splurjj.scaleupdevagency.com/api/contents/${editingContent?.id}`
        : "https://splurjj.scaleupdevagency.com/api/contents"

      const method = isEditing ? "POST" : "POST" // Many APIs use POST for both create and update with FormData

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type when sending FormData
        },
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API error: ${response.status} - ${errorText}`)
      }

      // Refresh content list
      await fetchContents()
    } catch (error) {
      console.error("Error submitting content:", error)
      alert("Failed to save content. Please try again.")
    }
  }

  // Pagination logic
  const totalPages = Math.ceil(contents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentContents = contents.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="p-6">
      <div>

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Blog Lists</h1>
            <div className="text-sm text-gray-600">
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <span className="mx-2">{">"}</span>
              <span>Blog List</span>
            </div>
          </div>

          <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleAddContent}>
            <Plus className="h-4 w-4 mr-2" />
            Add Blog
          </Button>
        </div>

        {/* Content Table */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-0">
            <ContentTable
              contents={currentContents}
              loading={loading}
              onDelete={handleDeleteContent}
              onEdit={handleEditContent}
            />

            {/* Pagination */}
            {!loading && contents.length > 0 && (
              <div className="flex justify-between items-center p-6 border-t bg-blue-50/50">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, contents.length)} of {contents.length} results
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 p-0"
                  >
                    {"<"}
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 p-0"
                  >
                    {">"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Content Form Modal */}
      <ContentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitContent}
        initialContent={editingContent}
        categoryId={categoryId}
        subcategoryId={subcategoryId}
        isEditing={!!editingContent}
      />
    </div>
  )
}
