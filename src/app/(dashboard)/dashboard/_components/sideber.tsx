"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import LogoutModal from "@/components/shared/modals/LogoutModal";
import { toast } from "sonner";

interface Subcategory {
  id: number;
  name: string;
  category_id?: number;
}

interface Category {
  category_id: number;
  category_name: string;
  subcategories: Subcategory[];
}

interface ApiResponse {
  success: boolean;
  data: Category[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export default function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set()
  );
  const [addingSubcategory, setAddingSubcategory] = useState<number | null>(
    null
  );
  const [editingSubcategory, setEditingSubcategory] = useState<number | null>(
    null
  );
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [editSubcategoryName, setEditSubcategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const handLogout = () => {
    try {
      toast.success("Logout successful!");
      setTimeout(async () => {
        await signOut({
          callbackUrl: "/login",
        });
      }, 1000);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token;

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`
      );
      const data: ApiResponse = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("categories", categories);

  const toggleCategory = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleAddSubcategory = async (categoryId: number) => {
    if (!newSubcategoryName.trim()) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category_id: categoryId,
            name: newSubcategoryName.trim(),
          }),
        }
      );

      if (response.ok) {
        await fetchCategories(); // Refresh the data
        setNewSubcategoryName("");
        setAddingSubcategory(null);
      }
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  const handleEditSubcategory = async (
    subcategoryId: number,
    categoryId: number
  ) => {
    if (!editSubcategoryName.trim()) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories/${subcategoryId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "mapplication/json",
          },
          body: JSON.stringify({
            name: editSubcategoryName,
            category_id: categoryId, // include if required by the backend
          }),
        }
      );

      if (response.ok) {
        await fetchCategories(); // Refresh the data
        setEditSubcategoryName("");
        setEditingSubcategory(null);
      }
    } catch (error) {
      console.error("Error editing subcategory:", error);
    }
  };

  const handleDeleteSubcategory = async (subcategoryId: number) => {
    if (!confirm("Are you sure you want to delete this subcategory?")) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories/${subcategoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchCategories(); // Refresh the data
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const startEditing = (subcategory: Subcategory) => {
    setEditingSubcategory(subcategory.id);
    setEditSubcategoryName(subcategory.name);
  };

  const cancelEditing = () => {
    setEditingSubcategory(null);
    setEditSubcategoryName("");
  };

  const cancelAdding = () => {
    setAddingSubcategory(null);
    setNewSubcategoryName("");
  };

  if (loading) {
    return (
      <div className="w-64 h-screen p-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="w-64 h-screen "
    >
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          <div>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="w-full justify-start items-center gap-3 text-left text-lg bg-blue-500 hover:bg-primary text-white"
              >
               <Plus className="h-5 w-5 !text-white" /> Add Category
              </Button>
            </Link>
          </div>
          {categories.map((category) => (
            <div
              key={category.category_id}
              className={`${category?.category_id ? " bg-white  rounded-lg" : "!bg-transparent"}`}
            >
              {/* Category Header */}
              <Button
                variant="ghost"
                className="w-full justify-start text-left p-2 h-auto hover:bg-blue-200/50"
                onClick={() => toggleCategory(category.category_id)}
              >
                <div className="w-full flex items-center justify-between ">
                  <span className="text-base font-normal leading-[120%] text-black font-poppins tracking-[0%]">
                     {category.category_name}
                  </span>
                  {expandedCategories.has(category.category_id) ? (
                    <ChevronDown className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 flex-shrink-0" />
                  )}
                </div>
              </Button>

              {/* Subcategories */}
              {expandedCategories.has(category.category_id) && (
                <div className="ml-6 space-y-1  ">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="group">
                      {editingSubcategory === subcategory.id ? (
                        <div className="flex items-center gap-1 p-1">
                          <Input
                            value={editSubcategoryName}
                            onChange={(e) =>
                              setEditSubcategoryName(e.target.value)
                            }
                            className="h-7 text-xs"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleEditSubcategory(
                                  subcategory.id,
                                  category.category_id
                                );
                              } else if (e.key === "Escape") {
                                cancelEditing();
                              }
                            }}
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() =>
                              handleEditSubcategory(
                                subcategory.id,
                                category.category_id
                              )
                            }
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={cancelEditing}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-1 rounded hover:bg-blue-200/30">
                          <Link
                            href={`/dashboard/content/${category.category_id}/${subcategory.id}`}
                            className="text-sm font-poppins leading-[120%] tracking-[0%] text-[#737373] font-medium"
                          >
                            {subcategory.name}
                          </Link>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => startEditing(subcategory)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                              onClick={() =>
                                handleDeleteSubcategory(subcategory.id)
                              }
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add Subcategory */}
                  {addingSubcategory === category.category_id ? (
                    <div className="flex items-center gap-1 p-1">
                      <Input
                        value={newSubcategoryName}
                        onChange={(e) => setNewSubcategoryName(e.target.value)}
                        placeholder="Enter subcategory name"
                        className="h-7 text-xs"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAddSubcategory(category.category_id);
                          } else if (e.key === "Escape") {
                            cancelAdding();
                          }
                        }}
                        autoFocus
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={() =>
                          handleAddSubcategory(category.category_id)
                        }
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={cancelAdding}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-left p-1 h-7 text-xs text-gray-500 hover:bg-blue-200/30"
                      onClick={() => setAddingSubcategory(category.category_id)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Sub Category
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* role  */}
      <div className="p-2 border-t border-blue-200">
        <Link href="/dashboard/role">
          <Button
            variant="ghost"
            className="w-full justify-start text-[#424242] hover:bg-red-50 text-lg font-medium leading-[120%] tracking-[0%] font-poppins"
          >
            Role Management
          </Button>
        </Link>
      </div>
      {/* settings  */}
      <div className="p-2 border-t border-blue-200">
        <Link href="/dashboard/settings">
          <Button
            variant="ghost"
            className="w-full justify-start items-center gap-3 text-[#424242] hover:bg-red-50 text-lg font-medium leading-[120%] tracking-[0%] font-poppins"
          >
           <Settings /> Setting
          </Button>
        </Link>
      </div>

      <div className="p-4 border-t border-blue-200">
        <Button
          onClick={() => setLogoutModalOpen(true)}
          variant="ghost"
          className="w-full flex justify-start items-center gap-3 text-base font-poppins leading-[120%] tracking-[0%] text-[#CE3837] hover:text-red-700 hover:bg-red-50"
        >
          <LogOut /> Log Out
        </Button>
      </div>

      {/* logout modal  */}
      {logoutModalOpen && (
        <LogoutModal
          isOpen={logoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={handLogout}
        />
      )}
    </div>
  );
}
