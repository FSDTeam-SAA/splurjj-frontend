

// export type Content = {
//   id: number;
//   heading: string;
//   sub_heading: string;
//   author: string;
//   date: string;
//   body1: string;
//   tags: string[];
//   category_name: string;
//   sub_category_name: string;
//   image1: string;
//   advertising_image: string;
//   advertisingLink: string | null;
//   imageLink: string | null;
//   status: 'pending' | 'active';
// };

// export type PaginationLink = {
//   url: string | null;
//   label: string;
//   active: boolean;
// };

// export type AllContentResponse = {
//   success: boolean;
//   data: {
//     current_page: number;
//     data: Content[];
//     first_page_url: string;
//     from: number;
//     last_page: number;
//     last_page_url: string;
//     links: PaginationLink[];
//     next_page_url: string | null;
//     path: string;
//     per_page: number;
//     prev_page_url: string | null;
//     to: number;
//     total: number;
//   };
//   current_page: number;
//   total_pages: number;
//   per_page: number;
//   total: number;
// };




export interface ContentDashboardResponse {
  success: boolean;
  data: ContentDashboardData;
  current_page: number;
  total_pages: number;
  per_page: number;
  total: number;
}

export interface ContentDashboardData {
  current_page: number;
  data: ContentItem[];
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
}

export interface ContentItem {
  id: number;
  heading: string;
  sub_heading: string;
  author: string;
  date: string;
  body1: string;
  tags: string[];
  category_id: number;
  subcategory_id: number;
  category_name: string;
  sub_category_name: string;
  image1: string | null;
  image2: string | null; // NOTE: JSON stringified array
  advertising_image: string | null;
  advertisingLink: string | null;
  image2_url: string[];
  imageLink: string | null;
  status: 'Approved' | 'Draft' | string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}