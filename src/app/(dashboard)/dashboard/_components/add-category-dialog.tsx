"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"

interface AddCategoryDialogProps {
  onAdd: (categoryName: string) => Promise<void>
}

export default function AddCategoryDialog({ onAdd }: AddCategoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAdd = async () => {
    if (!categoryName.trim()) return

    setIsLoading(true)
    try {
      await onAdd(categoryName.trim())
      setCategoryName("")
      setIsOpen(false)
    } catch (error) {
      console.error("Error adding category:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white shadow-lg">
        <DialogHeader>
          <DialogTitle className="dark:text-[#131313]">Add New Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="dark:text-[#131313]" htmlFor="categoryName">Category Name</Label>
            <Input
            className="dark:text-[#131313]"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdd()
                }
              }}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button className="dark:text-[#131313]" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={isLoading} className="text-white">
              {isLoading ? "Adding..." : "Add Category"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
