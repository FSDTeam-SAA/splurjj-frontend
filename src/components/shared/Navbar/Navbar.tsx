"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Search, ShoppingCart, User, ChevronDown, Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/app/theme-toggle";
import Image from "next/image";

// Interfaces
interface Subcategory {
  id: number;
  name: string;
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

interface ThemeHeader {
  bg_color: string;
  border_color: string;
  logo: string;
  menu_item_active_color: string;
  menu_item_color: string;
}

// Fetch Functions
const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`
  );
  if (!response.ok) throw new Error("Failed to fetch categories");
  const result: ApiResponse = await response.json();
  return result.data;
};

const fetchHeader = async (): Promise<ThemeHeader> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/header`);
  if (!response.ok) throw new Error("Failed to fetch header");
  const result = await response.json();
  return result.data;
};

// Component
export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const pathName = usePathname();
  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token;
  const role = session?.data?.user?.role;

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const { data: header } = useQuery({
    queryKey: ["header"],
    queryFn: fetchHeader,
  });

  const staticMenuItems = [{ name: "LATEST", href: "/" }];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const getImageUrl = (path: string | null): string => {
    if (!path) return "/assets/videos/blog1.jpg";
    if (path.startsWith("http")) return path;
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path.replace(/^\/+/, "")}`;
  };

  const handLogout = () => {
    try {
      toast.success("Logout successful!");
      setTimeout(async () => {
        await signOut({ callbackUrl: "/" });
      }, 1000);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const isCategoryActive = (categoryId: number) => {
    return (
      pathName === `/${categoryId}` ||
      categories
        .find((cat) => cat.category_id === categoryId)
        ?.subcategories.some((sub) => pathName === `/${categoryId}/${sub.id}`)
    );
  };

  return (
    <>
      <div
        className="h-[16px] sticky top-0 z-50"
        style={{ backgroundColor: header?.border_color || "#ffffff" }}
      />
      <header
        className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-background/60"
        style={{ backgroundColor: header?.bg_color || "#ffffff" }}
      >
        <div className="container">
          <div className="flex h-[80px] items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={getImageUrl(header?.logo || "/logo.png")}
                alt="Logo"
                width={500}
                height={30}
                className="h-[55px] w-[90px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {staticMenuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                  style={{
                    color:
                      pathName === item.href
                        ? header?.menu_item_active_color || "#0253F7"
                        : header?.menu_item_color || "text-muted-foreground",
                  }}
                >
                  {item.name}
                </Link>
              ))}
              {categories.map((category) => {
                const isActive = isCategoryActive(category.category_id);
                if (category.subcategories.length === 0) {
                  return (
                    <Link
                      key={category.category_id}
                      href={`/${category.category_id}`}
                      className="text-sm font-medium transition-colors hover:text-primary"
                      style={{
                        color: isActive
                          ? header?.menu_item_active_color || "#0253F7"
                          : header?.menu_item_color || "text-muted-foreground",
                      }}
                    >
                      {category.category_name.toUpperCase()}
                    </Link>
                  );
                }
                return (
                  <DropdownMenu key={category.category_id}>
                    <DropdownMenuTrigger
                      className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary border-0 outline-none ring-0"
                      style={{
                        color: isActive
                          ? header?.menu_item_active_color || "#0253F7"
                          : header?.menu_item_color || "text-muted-foreground",
                      }}
                    >
                      <span>{category.category_name.toUpperCase()}</span>
                      <ChevronDown className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white text-[18px] font-semibold border-0 mt-[20px]">
                      {category.subcategories.map((subcategory) => (
                        <DropdownMenuItem key={subcategory.id} asChild>
                          <Link
                            href={`/${category.category_id}/${subcategory.id}`}
                            className="cursor-pointer"
                            style={{
                              color:
                                pathName ===
                                `/${category.category_id}/${subcategory.id}`
                                  ? header?.menu_item_active_color || "#0253F7"
                                  : header?.menu_item_color ||
                                    "text-muted-foreground",
                            }}
                          >
                            {subcategory.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <div className="relative">
                {isSearchOpen ? (
                  <form onSubmit={handleSearch} className="flex items-center">
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 h-8"
                      autoFocus
                    />
                    <Button type="button" variant="ghost" size="sm" onClick={() => setIsSearchOpen(false)} className="ml-1">
                      <X className="h-8 w-8 dark:text-black" />
                    </Button>
                  </form>
                ) : (
                  <Button variant="ghost" onClick={() => setIsSearchOpen(true)}>
                    <Search className="text-black !w-[30px] !h-[30px]" />
                  </Button>
                )}
              </div>

              {/* Cart (Hidden on sm) */}
              {token && role !== "admin" && (
                <ShoppingCart className="text-black hidden sm:block" size={30} />
              )}

              {/* User Menu (Hidden on sm) */}
              <div className="hidden sm:block">
                {token ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 rounded-full hover:bg-gray-100">
                      <User className="text-black w-[33px] h-[33px]" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white w-[130px]">
                      {["admin", "editor", "author"].includes(role ?? "") ? (
                        <Link href="/dashboard">
                          <DropdownMenuLabel style={{ color: pathName === "/dashboard" ? header?.menu_item_active_color : header?.menu_item_color }}>
                            Dashboard
                          </DropdownMenuLabel>
                        </Link>
                      ) : (role ?? "") === "user" ? (
                        <Link href="/accounts">
                          <DropdownMenuLabel style={{ color: pathName === "/accounts" ? header?.menu_item_active_color : header?.menu_item_color }}>
                            My Account
                          </DropdownMenuLabel>
                        </Link>
                      ) : null}
                      <DropdownMenuItem
                        onClick={() => setLogoutModalOpen(true)}
                        className="text-[#DB0000] cursor-pointer"
                      >
                        Log Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href="/sign-up"
                    className="p-1 rounded text-white px-4 py-2 bg-[#0253F7] hover:bg-[#0253F7]"
                  >
                    Sign In
                  </Link>
                )}
              </div>

              <ThemeToggle />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="lg"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 dark:text-black" size={40} />
                ) : (
                  <Menu className="dark:text-black" size={40} />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Nav */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t py-4">
              <nav className="flex flex-col space-y-4">
                {staticMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium"
                    style={{
                      color:
                        pathName === item.href
                          ? header?.menu_item_active_color
                          : header?.menu_item_color,
                    }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {categories.map((category) => {
                  const isActive = isCategoryActive(category.category_id);
                  return (
                    <div key={category.category_id} className="space-y-2">
                      <span className="text-sm font-medium" style={{
                        color: isActive
                          ? header?.menu_item_active_color
                          : header?.menu_item_color,
                      }}>
                        {category.category_name.toUpperCase()}
                      </span>
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={`/${category.category_id}/${sub.id}`}
                          className="block pl-4 text-sm"
                          style={{
                            color:
                              pathName === `/${category.category_id}/${sub.id}`
                                ? header?.menu_item_active_color
                                : header?.menu_item_color,
                          }}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  );
                })}

                {/* Mobile Shopping Cart and User Menu */}
                {token && role !== "admin" && (
                  <div className="flex items-center space-x-4 mt-4 sm:hidden">
                    <ShoppingCart className="text-black" size={30} />
                  </div>
                )}

                <div className="mt-2 sm:hidden">
                  {token ? (
                    <div className="flex flex-col space-y-2">
                      {["admin", "editor", "author"].includes(role ?? "") ? (
                        <Link href="/dashboard" className="text-base font-semibold">
                          Dashboard
                        </Link>
                      ) : (role ?? "") === "user" ? (
                        <Link href="/accounts" className="text-base font-semibold">
                          My Account
                        </Link>
                      ) : null}
                      <button
                        onClick={() => setLogoutModalOpen(true)}
                        className="text-[#DB0000] font-semibold text-base text-left"
                      >
                        Log Out
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/sign-up"
                      className="block p-2 rounded text-white bg-[#0253F7] text-center mt-2"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Logout Modal */}
      {logoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setLogoutModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => {
                setLogoutModalOpen(false);
                handLogout();
              }} className="flex-1">
                Log Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
