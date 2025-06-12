// export type AllContentResponse = {
//   status: boolean;
//   data: Content[];
//   meta: {
//     current_page: number;
//     per_page: number;
//     total_items: number;
//     total_pages: number;
//   };
// };

// export type Content = {
//   id: number;
//   heading: string;
//   sub_heading: string; // HTML content as string
//   author: string;
//   date: string; // ISO date string (e.g., "2025-06-09")
//   body1: string; // HTML content as string
//   tags: string[];
//   category_name: string;
//   sub_category_name: string;
//   image1: string | null | undefined;
//   advertising_image: string | null | undefined ;
//   advertisingLink: string | null | undefined ;
//   imageLink: string | null | undefined ;
// };





export type Content = {
  id: number;
  heading: string;
  sub_heading: string;
  author: string;
  date: string;
  body1: string;
  tags: string[];
  category_name: string;
  sub_category_name: string;
  image1: string;
  advertising_image: string;
  advertisingLink: string | null;
  imageLink: string | null;
};

export type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type AllContentResponse = {
  success: boolean;
  data: {
    current_page: number;
    data: Content[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
  current_page: number;
  total_pages: number;
  per_page: number;
  total: number;
};