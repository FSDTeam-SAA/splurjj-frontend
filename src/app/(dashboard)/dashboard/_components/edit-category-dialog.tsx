"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Category {
  category_id: number
  category_name: string
  subcategories: Array<{
    id: number
    name: string
  }>
}

interface EditCategoryDialogProps {
  category: Category | null
  isOpen: boolean
  onClose: () => void
  onEdit: (categoryId: number, categoryName: string) => Promise<void>
}

export default function EditCategoryDialog({ category, isOpen, onClose, onEdit }: EditCategoryDialogProps) {
  const [categoryName, setCategoryName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (category) {
      setCategoryName(category.category_name)
    }
  }, [category])

  const handleEdit = async () => {
    if (!categoryName.trim() || !category) return

    setIsLoading(true)
    try {
      await onEdit(category.category_id, categoryName.trim())
      onClose()
    } catch (error) {
      console.error("Error editing category:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="dark:text-[#131313]">Edit Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="dark:text-[#131313]" htmlFor="editCategoryName">Category Name</Label>
            <Input
            className="dark:text-[#131313]"
              id="editCategoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEdit()
                }
              }}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button className="dark:text-[#131313]" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={isLoading} className="text-white">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
