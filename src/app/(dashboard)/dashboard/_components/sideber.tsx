// "use client";
// import { useState, useEffect } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   Plus,
//   Edit2,
//   Trash2,
//   Check,
//   X,
//   LogOut,
//   Settings,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import Link from "next/link";
// import { signOut, useSession } from "next-auth/react";
// import LogoutModal from "@/components/shared/modals/LogoutModal";
// import { toast } from "sonner";
// import { motion, AnimatePresence, easeInOut } from "framer-motion";

// interface Subcategory {
//   id: number;
//   name: string;
//   category_id?: number;
// }

// interface Category {
//   category_id: number;
//   category_name: string;
//   subcategories: Subcategory[];
// }

// interface ApiResponse {
//   success: boolean;
//   data: Category[];
//   pagination: {
//     current_page: number;
//     last_page: number;
//     per_page: number;
//     total: number;
//   };
// }

// export default function Sidebar() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
//     new Set()
//   );
//   const [addingSubcategory, setAddingSubcategory] = useState<number | null>(
//     null
//   );
//   const [editingSubcategory, setEditingSubcategory] = useState<number | null>(
//     null
//   );
//   const [newSubcategoryName, setNewSubcategoryName] = useState("");
//   const [editSubcategoryName, setEditSubcategoryName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [logoutModalOpen, setLogoutModalOpen] = useState(false);

//   console.log(loading);

//   const { data: session, status } = useSession();
//   const userRole = session?.user?.role;
//   const token = session?.user?.token;

//   // Animation variants for subcategories
//   const subcategoryVariants = {
//     hidden: { opacity: 0, height: 0 },
//     visible: {
//       opacity: 1,
//       height: "auto",
//       transition: {
//         duration: 0.3,
//         ease: easeInOut,
//       },
//     },
//     exit: {
//       opacity: 0,
//       height: 0,
//       transition: {
//         duration: 0.2,
//         ease: easeInOut,
//       },
//     },
//   };

//   // Role-based permissions
//   const isAdmin = userRole === "admin";
//   const isEditor = userRole === "editor";
//   const isAuthor = userRole === "author";

//   // Fetch categories on component mount
//   useEffect(() => {
//     if (status === "authenticated" && token) {
//       fetchCategories();
//     }
//   }, [status, token]);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data: ApiResponse = await response.json();
//       if (data.success) {
//         setCategories(data.data);
//       } else {
//         toast.error("Failed to fetch categories");
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       toast.error("Error fetching categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleCategory = (categoryId: number) => {
//     setExpandedCategories((prev) => {
//       const newExpanded = new Set<number>();

//       // If the clicked category is not currently expanded, expand only this one
//       if (!prev.has(categoryId)) {
//         newExpanded.add(categoryId);
//       }
//       // If the clicked category is already expanded, close all (empty set)

//       return newExpanded;
//     });
//   };

//   const handleAddSubcategory = async (categoryId: number) => {
//     if (!newSubcategoryName.trim()) {
//       toast.error("Subcategory name is required");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             category_id: categoryId,
//             name: newSubcategoryName.trim(),
//           }),
//         }
//       );

//       if (response.ok) {
//         toast.success("Subcategory added successfully");
//         await fetchCategories();
//         setNewSubcategoryName("");
//         setAddingSubcategory(null);
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.message || "Failed to add subcategory");
//       }
//     } catch (error) {
//       console.error("Error adding subcategory:", error);
//       toast.error("Error adding subcategory");
//     }
//   };

//   const handleEditSubcategory = async (
//     subcategoryId: number,
//     categoryId: number
//   ) => {
//     if (!editSubcategoryName.trim()) {
//       toast.error("Subcategory name is required");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories/${subcategoryId}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json", // Fixed typo: "mapplication/json" → "application/json"
//           },
//           body: JSON.stringify({
//             name: editSubcategoryName,
//             category_id: categoryId,
//           }),
//         }
//       );

//       if (response.ok) {
//         toast.success("Subcategory updated successfully");
//         await fetchCategories();
//         setEditSubcategoryName("");
//         setEditingSubcategory(null);
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.message || "Failed to update subcategory");
//       }
//     } catch (error) {
//       console.error("Error editing subcategory:", error);
//       toast.error("Error editing subcategory");
//     }
//   };

//   const handleDeleteSubcategory = async (subcategoryId: number) => {
//     if (!confirm("Are you sure you want to delete this subcategory?")) return;

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories/${subcategoryId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.ok) {
//         toast.success("Subcategory deleted successfully");
//         await fetchCategories();
//       } else {
//         const errorData = await response.json();
//         toast.error(errorData.message || "Failed to delete subcategory");
//       }
//     } catch (error) {
//       console.error("Error deleting subcategory:", error);
//       toast.error("Error deleting subcategory");
//     }
//   };

//   const handLogout = async () => {
//     try {
//       toast.success("Logout successful!");
//       await signOut({ callbackUrl: "/login" });
//     } catch (error) {
//       console.error("Logout failed:", error);
//       toast.error("Logout failed. Please try again.");
//     }
//   };

//   const startEditing = (subcategory: Subcategory) => {
//     setEditingSubcategory(subcategory.id);
//     setEditSubcategoryName(subcategory.name);
//   };

//   const cancelEditing = () => {
//     setEditingSubcategory(null);
//     setEditSubcategoryName("");
//   };

//   const cancelAdding = () => {
//     setAddingSubcategory(null);
//     setNewSubcategoryName("");
//   };

//   if (status === "loading") {
//     return (
//       <div className="w-64 h-screen p-4">
//         <div className="text-center">Loading...</div>
//       </div>
//     );
//   }

//   if (status === "unauthenticated") {
//     return (
//       <div className="w-64 h-screen p-4">
//         <div className="text-center">Please log in</div>
//       </div>
//     );
//   }

//   return (
//     <div className="border-r border-[#B6B6B6] bg-white dark:bg-black">
//       <ScrollArea className="flex-1 p-4 h-screen w-full">
//         <div className="">
//           <div className="space-y-2">
//             {(isAdmin || isEditor || isAuthor) && (
//               <div>
//                 <Link href="/dashboard">
//                   <Button
//                     variant="ghost"
//                     className="w-full justify-start items-center gap-3 text-left text-lg bg-blue-500 hover:bg-primary text-white"
//                   >
//                     <Plus className="h-5 w-5 !text-white" /> Add Category
//                   </Button>
//                 </Link>
//               </div>
//             )}
//             {categories.map((category) => (
//               <div
//                 key={category.category_id}
//                 className={
//                   `${category?.category_id
//                     ? "bg-white rounded-lg"
//                     : "!bg-transparent"}`
//                 }
//               >
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start text-left p-2 h-auto hover:bg-blue-200/50"
//                   onClick={() => toggleCategory(category.category_id)}
//                 >
//                   <div
//                     className={`w-full flex items-center justify-between ${
//                       category?.category_id ? "bg-blue-500" : "bg-red-500"
//                     }`}
//                   >
//                     <span
//                       className={`text-base font-normal leading-[120%] text-black  tracking-[0%] `}
//                     >
//                       {category.category_name}
//                     </span>
//                     {expandedCategories.has(category.category_id) ? (
//                       <ChevronDown className="h-4 w-4 flex-shrink-0" />
//                     ) : (
//                       <ChevronRight className="h-4 w-4 flex-shrink-0" />
//                     )}
//                   </div>
//                 </Button>
//                 <AnimatePresence>
//                   {expandedCategories.has(category.category_id) && (
//                     <motion.div
//                       initial="hidden"
//                       animate="visible"
//                       exit="exit"
//                       variants={subcategoryVariants}
//                       className=" space-y-1 overflow-hidden  bg-red-200"
//                     >
//                       {category.subcategories.map((subcategory) => (
//                         <div key={subcategory.id} className="group ml-6">
//                           {editingSubcategory === subcategory.id ? (
//                             <div className="flex items-center gap-1 p-1">
//                               <Input
//                                 value={editSubcategoryName}
//                                 onChange={(e) =>
//                                   setEditSubcategoryName(e.target.value)
//                                 }
//                                 className="h-7 text-xs"
//                                 onKeyDown={(e) => {
//                                   if (e.key === "Enter") {
//                                     handleEditSubcategory(
//                                       subcategory.id,
//                                       category.category_id
//                                     );
//                                   } else if (e.key === "Escape") {
//                                     cancelEditing();
//                                   }
//                                 }}
//                                 autoFocus
//                               />
//                               <Button
//                                 size="sm"
//                                 variant="ghost"
//                                 className="h-7 w-7 p-0"
//                                 onClick={() =>
//                                   handleEditSubcategory(
//                                     subcategory.id,
//                                     category.category_id
//                                   )
//                                 }
//                               >
//                                 <Check className="h-3 w-3" />
//                               </Button>
//                               <Button
//                                 size="sm"
//                                 variant="ghost"
//                                 className="h-7 w-7 p-0"
//                                 onClick={cancelEditing}
//                               >
//                                 <X className="h-3 w-3" />
//                               </Button>
//                             </div>
//                           ) : (
//                             <div className="flex items-center justify-between p-1 rounded hover:bg-blue-200/30">
//                               <Link
//                                 href={`/dashboard/content/${category.category_id}/${subcategory.id}`}
//                                 className="text-sm  leading-[120%] tracking-[0%] text-[#737373] font-medium"
//                               >
//                                 {subcategory.name}
//                               </Link>
//                               {(isAdmin || isEditor) && (
//                                 <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                                   <Button
//                                     size="sm"
//                                     variant="ghost"
//                                     className="h-6 w-6 p-0"
//                                     onClick={() => startEditing(subcategory)}
//                                   >
//                                     <Edit2 className="h-3 w-3" />
//                                   </Button>
//                                   <Button
//                                     size="sm"
//                                     variant="ghost"
//                                     className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
//                                     onClick={() =>
//                                       handleDeleteSubcategory(subcategory.id)
//                                     }
//                                   >
//                                     <Trash2 className="h-3 w-3" />
//                                   </Button>
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                       {(isAdmin || isEditor) && (
//                         <>
//                           {addingSubcategory === category.category_id ? (
//                             <div className="flex items-center gap-1 p-1">
//                               <Input
//                                 value={newSubcategoryName}
//                                 onChange={(e) =>
//                                   setNewSubcategoryName(e.target.value)
//                                 }
//                                 placeholder="Enter subcategory name"
//                                 className="h-7 text-xs"
//                                 onKeyDown={(e) => {
//                                   if (e.key === "Enter") {
//                                     handleAddSubcategory(category.category_id);
//                                   } else if (e.key === "Escape") {
//                                     cancelAdding();
//                                   }
//                                 }}
//                                 autoFocus
//                               />
//                               <Button
//                                 size="sm"
//                                 variant="ghost"
//                                 className="h-7 w-7 p-0"
//                                 onClick={() =>
//                                   handleAddSubcategory(category.category_id)
//                                 }
//                               >
//                                 <Check className="h-3 w-3" />
//                               </Button>
//                               <Button
//                                 size="sm"
//                                 variant="ghost"
//                                 className="h-7 w-7 p-0"
//                                 onClick={cancelAdding}
//                               >
//                                 <X className="h-3 w-3" />
//                               </Button>
//                             </div>
//                           ) : (
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               className="w-full justify-start text-left p-1 h-7 text-xs text-gray-500 hover:bg-blue-200/30"
//                               onClick={() =>
//                                 setAddingSubcategory(category.category_id)
//                               }
//                             >
//                               <Plus className="h-3 w-3 mr-1" />
//                               Sub Category
//                             </Button>
//                           )}
//                         </>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}
//           </div>

//           {/* Advertising  */}

//           {!isAuthor && (
//             <div className="p-2">
//               <Link href="/dashboard/advertising">
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start text-[#424242] hover:bg-red-50 text-lg font-medium leading-[120%] tracking-[0%] "
//                 >
//                   Advertising
//                 </Button>
//               </Link>
//             </div>
//           )}

//           {!isAuthor && (
//             <div className="p-2">
//               <Link href="/dashboard/header">
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start text-[#424242] hover:bg-red-50 text-lg font-medium leading-[120%] tracking-[0%] "
//                 >
//                   Header
//                 </Button>
//               </Link>
//             </div>
//           )}

//           {!isAuthor && (
//             <div className="p-2 border-t border-blue-200">
//               <Link href="/dashboard/footer">
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start text-[#424242] hover:bg-red-50 text-lg font-medium leading-[120%] tracking-[0%] "
//                 >
//                   Footer
//                 </Button>
//               </Link>
//             </div>
//           )}

//           <div className="p-2 border-t border-blue-200">
//             <Link href="/dashboard/subscriber">
//               <Button
//                 variant="ghost"
//                 className="w-full justify-start text-[#424242] hover:bg-red-50 text-lg font-medium leading-[120%] tracking-[0%] "
//               >
//                 Subscriber
//               </Button>
//             </Link>
//           </div>
//           {isAdmin && (
//             <div className="p-2 border-t border-blue-200">
//               <Link href="/dashboard/role">
//                 <Button
//                   variant="ghost"
//                   className="w-full justify-start text-[#424242] hover:bg-red-50 text-lg font-medium leading-[120%] tracking-[0%] "
//                 >
//                   Role Management
//                 </Button>
//               </Link>
//             </div>
//           )}

//           <div className="p-2 border-t border-blue-200">
//             <Link href="/dashboard/settings">
//               <Button
//                 variant="ghost"
//                 className="w-full justify-start items-center gap-3 text-[#424242] hover:bg-red-50 text-lg font-medium leading-[120%] tracking-[0%] "
//               >
//                 <Settings /> Setting
//               </Button>
//             </Link>
//           </div>

//           <div className="p-4 border-t border-blue-200 mb-[120px]">
//             <Button
//               onClick={() => setLogoutModalOpen(true)}
//               variant="ghost"
//               className="w-full flex justify-start items-center gap-3 text-base  leading-[120%] tracking-[0%] text-[#CE3837] hover:text-red-700 hover:bg-red-50"
//             >
//               <LogOut /> Log Out
//             </Button>
//           </div>

//           {logoutModalOpen && (
//             <LogoutModal
//               isOpen={logoutModalOpen}
//               onClose={() => setLogoutModalOpen(false)}
//               onConfirm={handLogout}
//             />
//           )}
//         </div>
//       </ScrollArea>
//     </div>
//   );
// }

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
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import LogoutModal from "@/components/shared/modals/LogoutModal";
import { toast } from "sonner";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
// import { TfiMenuAlt } from "react-icons/tfi";

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

  const pathname = usePathname();

  // Helper function to check if a category is active
  const isCategoryActive = (categoryId: number) => {
    return pathname.includes(`/dashboard/content/${categoryId}`);
  };

  // Helper function to check if a subcategory is active
  const isSubcategoryActive = (categoryId: number, subcategoryId: number) => {
    return pathname === `/dashboard/content/${categoryId}/${subcategoryId}`;
  };

  // Helper function to check if a route is active
  const isRouteActive = (route: string) => {
    return pathname === route;
  };

  console.log(loading);

  const { data: session, status } = useSession();
  const userRole = session?.user?.role;
  const token = session?.user?.token;

  // Animation variants for subcategories
  const subcategoryVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: easeInOut,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: easeInOut,
      },
    },
  };

  // Role-based permissions
  const isAdmin = userRole === "admin";
  const isEditor = userRole === "editor";
  const isAuthor = userRole === "author";

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data: ApiResponse = await response.json();
        if (data.success) {
          setCategories(data.data);
        } else {
          toast.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && token) {
      fetchCategories();
    }
  }, [status, token]);

  // Auto-expand active category
  useEffect(() => {
    const pathParts = pathname.split("/");
    if (pathParts.length >= 4 && pathParts[2] === "content") {
      const categoryId = Number.parseInt(pathParts[3]);
      if (categoryId) {
        setExpandedCategories(
          (prev) => new Set(Array.from(prev).concat(categoryId))
        );
      }
    }
  }, [pathname]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: ApiResponse = await response.json();
      if (data.success) {
        setCategories(data.data);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) => {
      const newExpanded = new Set<number>();

      // If the clicked category is not currently expanded, expand only this one
      if (!prev.has(categoryId)) {
        newExpanded.add(categoryId);
      }
      // If the clicked category is already expanded, close all (empty set)

      return newExpanded;
    });
  };

  const handleAddSubcategory = async (categoryId: number) => {
    if (!newSubcategoryName.trim()) {
      toast.error("Subcategory name is required");
      return;
    }

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
        toast.success("Subcategory added successfully");
        await fetchCategories();
        setNewSubcategoryName("");
        setAddingSubcategory(null);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add subcategory");
      }
    } catch (error) {
      console.error("Error adding subcategory:", error);
      toast.error("Error adding subcategory");
    }
  };

  const handleEditSubcategory = async (
    subcategoryId: number,
    categoryId: number
  ) => {
    if (!editSubcategoryName.trim()) {
      toast.error("Subcategory name is required");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories/${subcategoryId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editSubcategoryName,
            category_id: categoryId,
          }),
        }
      );

      if (response.ok) {
        toast.success("Subcategory updated successfully");
        await fetchCategories();
        setEditSubcategoryName("");
        setEditingSubcategory(null);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update subcategory");
      }
    } catch (error) {
      console.error("Error editing subcategory:", error);
      toast.error("Error editing subcategory");
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
        toast.success("Subcategory deleted successfully");
        await fetchCategories();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to delete subcategory");
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      toast.error("Error deleting subcategory");
    }
  };

  const handLogout = async () => {
    try {
      toast.success("Logout successful!");
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
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

  if (status === "loading") {
    return (
      <div className="w-64 h-screen p-4">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="w-64 h-screen p-4">
        <div className="text-center">Please log in</div>
      </div>
    );
  }

  return (
    <div className="border-r border-[#B6B6B6]/50 bg-white dark:bg-black">
      <ScrollArea className="flex-1 p-4 h-screen w-full">
        <div className="">
          <div className="p-2 ">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className={`w-full justify-start transition-colors text-lg font-semibold leading-[120%] tracking-[0%]  ${
                  isRouteActive("/dashboard")
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold"
                    : "text-[#424242] dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 font-semibold"
                }`}
              >
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </Button>
            </Link>
          </div>
          <div className="space-y-[0.5px]">
            <p className="text-lg font-semibold text-[#131313] dark:white-text leading-[120%] uppercase tracking-[0%] pb-3">
              Content Management
            </p>
            {(isAdmin || isEditor || isAuthor) && (
              <div>
                <Link href="/dashboard/add-category">
                  <Button
                    variant="ghost"
                    className={`w-full flex justify-start items-center gap-3 text-left text-lg transition-colors ${
                      isRouteActive("/dashboard/add-category")
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-transparent  text-black/70 dark:text-white"
                    }`}
                  >
                    {/* <TfiMenuAlt
                      className={
                        isRouteActive("/dashboard/add-category")
                          ? "text-white w-4 h-4 text-base font-normal leading-[120%] tracking-[0%] transition-colors"
                          : "text-black/70 dark:text-white w-4 h-4 text-base font-normal leading-[120%] tracking-[0%] transition-colors"
                      }
                    /> */}
                    {/* <Plus
                      className={
                        isRouteActive("/dashboard/add-category")
                          ? "text-white"
                          : "text-black"
                      }
                    />{" "} */}
                    Category
                  </Button>
                </Link>
              </div>
            )}
            {categories.map((category) => {
              const categoryActive = isCategoryActive(category.category_id);
              return (
                <div
                  key={category.category_id}
                  className={`rounded-lg transition-colors ml-3 ${
                    categoryActive
                      ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                      : "bg-white dark:bg-transparent"
                  }`}
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left p-2 h-auto transition-colors ${
                      categoryActive ? " bg-blue-500" : "hover:bg-blue-200/50"
                    }`}
                    onClick={() => toggleCategory(category.category_id)}
                  >
                    <div className="w-full flex items-center justify-between">
                      <span
                        className={`text-base font-semibold leading-[120%] tracking-[0%] transition-colors ${
                          categoryActive
                            ? "text-white font-bold "
                            : "text-black/70 dark:text-white font-semibold"
                        }`}
                      >
                        {category.category_name}
                      </span>
                      {expandedCategories.has(category.category_id) ? (
                        <ChevronDown
                          className={`h-4 w-4 flex-shrink-0 transition-colors ${
                            categoryActive ? "text-white " : ""
                          }`}
                        />
                      ) : (
                        <ChevronRight
                          className={`h-4 w-4 flex-shrink-0 transition-colors ${
                            categoryActive
                              ? "text-blue-700 dark:text-blue-300"
                              : ""
                          }`}
                        />
                      )}
                    </div>
                  </Button>
                  <AnimatePresence>
                    {expandedCategories.has(category.category_id) && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={subcategoryVariants}
                        className="space-y-1 overflow-hidden bg-[#E6EEFE] dark:bg-white rounded-b-lg border-t border-gray-200 dark:border-gray-700"
                      >
                        {category.subcategories.map((subcategory) => {
                          const subcategoryActive = isSubcategoryActive(
                            category.category_id,
                            subcategory.id
                          );
                          return (
                            <div key={subcategory.id} className="group ml-6">
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
                                <Link
                                  href={`/dashboard/content/${category.category_id}/${subcategory.id}`}
                                  className={`text-sm  leading-[120%] tracking-[0%] transition-colors ${
                                    subcategoryActive
                                      ? "text-white dark:text-blue-700 font-medium"
                                      : "text-black dark:text-black font-medium"
                                  }`}
                                >
                                  <div
                                    className={`flex items-center justify-between p-2 mx-2 rounded transition-colors ${
                                      subcategoryActive
                                        ? "bg-blue-400 dark:bg-blue-200 border-l-4 border-blue-500"
                                        : "hover:bg-blue-100/50 dark:hover:bg-blue-900/30"
                                    }`}
                                  >
                                    {/* <Link
                                    href={`/dashboard/content/${category.category_id}/${subcategory.id}`}
                                    className={`text-sm  leading-[120%] tracking-[0%] transition-colors ${
                                      subcategoryActive
                                        ? "text-blue-700 dark:text-blue-700 font-medium"
                                        : "text-black dark:text-black font-medium"
                                    }`}
                                  > */}
                                    {subcategory.name}
                                    {/* </Link> */}
                                    {(isAdmin || isEditor) && (
                                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-6 w-6 p-0"
                                          onClick={() =>
                                            startEditing(subcategory)
                                          }
                                        >
                                          <Edit2 className="h-3 w-3" />
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                          onClick={() =>
                                            handleDeleteSubcategory(
                                              subcategory.id
                                            )
                                          }
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </Link>
                              )}
                            </div>
                          );
                        })}
                        {(isAdmin || isEditor) && (
                          <>
                            {addingSubcategory === category.category_id ? (
                              <div className="flex items-center gap-1 p-1 mx-6">
                                <Input
                                  value={newSubcategoryName}
                                  onChange={(e) =>
                                    setNewSubcategoryName(e.target.value)
                                  }
                                  placeholder="Enter subcategory name"
                                  className="h-7 text-xs"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleAddSubcategory(
                                        category.category_id
                                      );
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
                                className="w-full justify-start text-left p-1 h-7 text-xs text-gray-500 dark:text-black hover:bg-blue-100/50 dark:hover:bg-blue-900/30 mx-6"
                                onClick={() =>
                                  setAddingSubcategory(category.category_id)
                                }
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Sub Category
                              </Button>
                            )}
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Navigation Links */}

          {!isAuthor && (
            <>
              <p className="text-lg font-semibold text-[#131313] dark:white-text leading-[120%] uppercase tracking-[0%] font-marnrope pt-2 pb-3">
                Advertising
              </p>
              <div>
                <div className="px-2">
                  <Link href="/dashboard/horizontal-advertising">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start transition-colors text-lg font-semibold leading-[120%] tracking-[0%]  ${
                        isRouteActive("/dashboard/horizontal-advertising")
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold"
                          : "text-black/70 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                      }`}
                    >
                      Horizontal
                    </Button>
                  </Link>
                </div>
                <div className="px-2">
                  <Link href="/dashboard/vertical-advertising">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start transition-colors text-lg font-semibold leading-[120%] tracking-[0%]  ${
                        isRouteActive("/dashboard/vertical-advertising")
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold"
                          : "text-black/70 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                      }`}
                    >
                      Vertical
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}

          <p className="text-lg font-semibold text-[#131313] dark:white-text leading-[120%] uppercase tracking-[0%] font-marnrope pt-2 pb-3">
            Settings
          </p>
          {isAdmin && (
            <div className="px-2">
              <Link href="/dashboard/role">
                <Button
                  variant="ghost"
                  className={`w-full justify-start transition-colors text-lg font-semibold leading-[120%] tracking-[0%]  ${
                    isRouteActive("/dashboard/role")
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold"
                      : "text-black/70 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                  }`}
                >
                  Role Management
                </Button>
              </Link>
            </div>
          )}
          {!isAuthor && (
            <div className="px-2 ">
              <Link href="/dashboard/subscriber">
                <Button
                  variant="ghost"
                  className={`w-full justify-start transition-colors text-lg font-semibold leading-[120%] tracking-[0%]  ${
                    isRouteActive("/dashboard/subscriber")
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold"
                      : "text-black/70 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                  }`}
                >
                  Subscriber
                </Button>
              </Link>
            </div>
          )}

          {!isAuthor && (
            <div className="px-2 ">
              <Link href="/dashboard/all-pages">
                <Button
                  variant="ghost"
                  className={`w-full justify-start transition-colors text-lg font-semibold leading-[120%] tracking-[0%]  ${
                    isRouteActive("/dashboard/all-pages")
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold"
                      : "text-black/70 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                  }`}
                >
                  All Pages
                </Button>
              </Link>
            </div>
          )}

          {!isAuthor && (
            <div className="px-2">
              <Link href="/dashboard/header">
                <Button
                  variant="ghost"
                  className={`w-full justify-start transition-colors text-lg font-semibold leading-[120%] tracking-[0%]  ${
                    isRouteActive("/dashboard/header")
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold"
                      : "text-black/70 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                  }`}
                >
                  Header
                </Button>
              </Link>
            </div>
          )}

          {!isAuthor && (
            <div className="px-2 ">
              <Link href="/dashboard/footer">
                <Button
                  variant="ghost"
                  className={`w-full justify-start transition-colors text-lg font-semibold leading-[120%] tracking-[0%]  ${
                    isRouteActive("/dashboard/footer")
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold"
                      : "text-black/70 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                  }`}
                >
                  Footer
                </Button>
              </Link>
            </div>
          )}

          <div className="px-2 ">
            <Link href="/dashboard/settings">
              <Button
                variant="ghost"
                className={`w-full justify-start items-center gap-3 transition-colors text-lg font-semibold leading-[120%] tracking-[0%]  ${
                  isRouteActive("/dashboard/settings")
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold"
                    : "text-black/70 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                }`}
              >
                Account
              </Button>
            </Link>
          </div>

          <div className="p-4  mb-[120px]">
            <Button
              onClick={() => setLogoutModalOpen(true)}
              variant="ghost"
              className="w-full flex justify-start items-center gap-3 text-base  leading-[120%] tracking-[0%] text-[#CE3837] hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut /> Log Out
            </Button>
          </div>

          {logoutModalOpen && (
            <LogoutModal
              isOpen={logoutModalOpen}
              onClose={() => setLogoutModalOpen(false)}
              onConfirm={handLogout}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
