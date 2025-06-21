"use client";

import ThemeToggle from "@/app/theme-toggle";
import { Input } from "@/components/ui/input";
import { ChevronDown, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";
import LogoutModal from "../modals/LogoutModal";

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

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLLIElement>(null); // Ref for dropdown
  const pathName = usePathname();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const session = useSession();
  const token = (session?.data?.user as { token: string })?.token;
  const role = session?.data?.user?.role;

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`
      );
      const data: ApiResponse = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const toggleDropdown = (categoryId: number) => {
    setOpenDropdown(openDropdown === categoryId ? null : categoryId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest("button")
      ) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('button[aria-label="Search"]')
      ) {
        closeSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const handLogout = () => {
    try {
      toast.success("Logout successful!");
      setTimeout(async () => {
        await signOut({
          callbackUrl: "/",
        });
      }, 1000);
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="w-full h-[16px] bg-[#131313]" />
      <div className="bg-white shadow-[0px_4px_48px_0px_#0000000F]">
        <div className="container py-[15px] md:py-[17px] lg:py-[19px]">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center gap-4 md:gap-6 lg:gap-[30px]">
                <Link href="/" className="text-xl font-bold">
                  LOGO
                </Link>

                <ul className="flex items-center gap-4 lg:gap-6">
                  <li>
                    <Link
                      href="/"
                      className={`text-base md:text-lg lg:text-xl leading-[120%] uppercase font-manrope tracking-[0%] hover:text-black transition-colors ${
                        pathName === "/"
                          ? "text-primary font-extrabold"
                          : "text-black font-medium"
                      }`}
                    >
                      LATEST
                    </Link>
                  </li>

                  {/* Dynamic Categories */}
                  {categories.map((category) => (
                    <li
                      key={category.category_id}
                      className="group relative"
                      ref={dropdownRef} // Attach ref to the li
                    >
                      <button
                        onClick={() => toggleDropdown(category.category_id)}
                        className={`flex items-center gap-[10px] text-base md:text-lg lg:text-xl leading-[120%] uppercase font-manrope tracking-[0%] hover:text-black transition-colors ${
                          openDropdown === category.category_id
                            ? "text-primary font-extrabold"
                            : "text-black font-medium"
                        }`}
                      >
                        {category.category_name}
                        {category.subcategories.length > 0 && (
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${
                              openDropdown === category.category_id
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        )}
                      </button>

                      {/* Dropdown Menu */}
                      {category.subcategories.length > 0 &&
                        openDropdown === category.category_id && (
                          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                            <div className="py-2">
                              {category.subcategories.map((subcategory) => (
                                <Link
                                  key={subcategory.id}
                                  href={`/${category.category_id}/${subcategory.id}`}
                                  className={`block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 transition-colors ${
                                    pathName ===
                                    `/${category.category_id}/${subcategory.id}`
                                      ? "text-primary font-bold"
                                      : "text-black"
                                  }`}
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {subcategory.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4">
                <div
                  ref={searchContainerRef}
                  className="relative flex items-center"
                >
                  <button
                    onClick={toggleSearch}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Search"
                  >
                    {isSearchOpen ? (
                      <X size={30} className="text-black" />
                    ) : (
                      <Search size={30} className="text-black" />
                    )}
                  </button>

                  <div
                    className={`absolute right-0 top-0 transition-all duration-300 ease-in-out ${
                      isSearchOpen
                        ? "translate-x-[-40px] w-[240px]"
                        : "w-0 opacity-0"
                    }`}
                  >
                    <Input
                      ref={inputRef}
                      placeholder="Search..."
                      className={`border border-gray-300 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 pl-2 w-full ${
                        isSearchOpen ? "block" : "hidden"
                      }`}
                    />
                  </div>
                </div>

                {/* ShoppingCart Button */}
                {token && role !== "admin" && (
                  <div>
                    <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                      <ShoppingCart className="text-black w-[33px] h-[33px]" />
                    </button>
                  </div>
                )}

                <div>
                  {token ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-1 rounded-full hover:bg-gray-100 transition-colors border-none outline-none ring-0">
                        <User className="text-black w-[33px] h-[33px]" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white w-[130px]">
                        {["admin", "editor", "author"].includes(role ?? "") ? (
                          <Link href="/dashboard">
                            <DropdownMenuLabel
                              className={`text-base md:text-[17px] lg:text-lg font-semibold leading-[120%] tracking-[0%] ${
                                pathName === "/dashboard"
                                  ? "text-[#0253F7] bold"
                                  : "text-[#131313] hover:text-[#0253F7]"
                              }`}
                            >
                              Dashboard
                            </DropdownMenuLabel>
                          </Link>
                        ) : (role ?? "") === "user" ? (
                          <Link href="/accounts">
                            <DropdownMenuLabel
                              className={`text-base md:text-[17px] lg:text-lg font-semibold leading-[120%] tracking-[0%] ${
                                pathName === "/accounts"
                                  ? "text-[#0253F7] bold"
                                  : "text-[#131313] hover:text-[#0253F7]"
                              }`}
                            >
                              My Account
                            </DropdownMenuLabel>
                          </Link>
                        ) : null}

                        <DropdownMenuItem
                          onClick={() => setLogoutModalOpen(true)}
                          className="text-base md:text-[17px] lg:text-lg font-semibold leading-[120%] tracking-[0%] text-[#DB0000] cursor-pointer"
                        >
                          Log Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href="/sign-up"
                      className="p-1 rounded text-white px-4 bg-[#0253F7] hover:bg-[#0253F7] transition-colors"
                    >
                      Sign In
                    </Link>
                  )}
                </div>

                {/* theme toggle */}
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="block md:hidden">
            <div className="w-full flex items-center justify-between">
              <Link href="/" className="text-xl font-bold">
                LOGO
              </Link>
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleSearch}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} className="text-gray-600" />
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {isMobileMenuOpen ? (
                    <X size={20} className="text-gray-600" />
                  ) : (
                    <Menu size={20} className="text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            {isSearchOpen && (
              <div className="mt-3">
                <Input
                  ref={inputRef}
                  placeholder="Search..."
                  className="w-full"
                  onBlur={closeSearch}
                />
              </div>
            )}

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="mt-4 space-y-3">
                <Link
                  href="/"
                  className="block py-2 px-1 text-lg font-medium text-gray-600 hover:text-black transition-colors"
                >
                  LATEST
                </Link>

                {/* Dynamic Categories */}
                {categories.map((category) => (
                  <div key={category.category_id}>
                    <button
                      onClick={() => toggleDropdown(category.category_id)}
                      className="flex items-center justify-between w-full py-2 px-1 text-lg font-medium text-gray-600 hover:text-black transition-colors"
                    >
                      {category.category_name}
                      {category.subcategories.length > 0 && (
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            openDropdown === category.category_id
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      )}
                    </button>

                    {/* Mobile Subcategories */}
                    {category.subcategories.length > 0 &&
                      openDropdown === category.category_id && (
                        <div className="ml-4 mt-2 space-y-2">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.id}
                              href={`/dashboard/all-content/${category.category_id}/${subcategory.id}`}
                              className="block py-1 px-2 text-sm text-gray-600 hover:text-black transition-colors"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                ))}

                {/* ShoppingCart Button */}
                {token && role !== "admin" && (
                  <div>
                    <button className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                      <ShoppingCart className="text-black w-[33px] h-[33px]" />
                    </button>
                  </div>
                )}

                <div>
                  {token ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-1 rounded-full hover:bg-gray-100 transition-colors border-none outline-none ring-0">
                        <User className="text-black w-[33px] h-[33px]" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white w-[130px]">
                        {["admin", "editor", "author"].includes(role ?? "") ? (
                          <Link href="/dashboard">
                            <DropdownMenuLabel
                              className={`text-base md:text-[17px] lg:text-lg font-semibold leading-[120%] tracking-[0%] ${
                                pathName === "/dashboard"
                                  ? "text-[#0253F7] bold"
                                  : "text-[#131313] hover:text-[#0253F7]"
                              }`}
                            >
                              Dashboard
                            </DropdownMenuLabel>
                          </Link>
                        ) : role === "user" ? (
                          <Link href="/accounts">
                            <DropdownMenuLabel
                              className={`text-base md:text-[17px] lg:text-lg font-semibold leading-[120%] tracking-[0%] ${
                                pathName === "/accounts"
                                  ? "text-[#0253F7] bold"
                                  : "text-[#131313] hover:text-[#0253F7]"
                              }`}
                            >
                              My Account
                            </DropdownMenuLabel>
                          </Link>
                        ) : null}

                        <DropdownMenuItem
                          onClick={() => setLogoutModalOpen(true)}
                          className="text-base md:text-[17px] lg:text-lg font-semibold leading-[120%] tracking-[0%] text-[#DB0000] cursor-pointer"
                        >
                          Log Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href="/sign-up"
                      className="p-1 rounded text-white px-4 bg-[#0253F7] hover:bg-[#0253F7] transition-colors"
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* logout modal */}
          {logoutModalOpen && (
            <LogoutModal
              isOpen={logoutModalOpen}
              onClose={() => setLogoutModalOpen(false)}
              onConfirm={handLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;