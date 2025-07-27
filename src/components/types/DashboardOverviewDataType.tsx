// export type DashboardOverviewDataTypeResponse = {
//   success: boolean;
//   data: {
//     total_content: number;
//     total_pending_content: number;
//     total_author: number;
//     total_user: number;
//     total_subscriber: number;
//     recent_content: DashboardOverviewDataType[];
//   };
// };

// export type DashboardOverviewDataType = {
//   id: number;
//   category_id: number;
//   subcategory_id: number;
//   heading: string; // HTML string
//   author: string;
//   date: string; // ISO or YYYY-MM-DD
//   sub_heading: string; // HTML string
//   body1: string; // HTML string
//   image1: string;
//   advertising_image: string | null;
//   tags: string[]; // The current data seems malformed, see note below
//   created_at: string; // ISO datetime string
//   updated_at: string; // ISO datetime string
//   imageLink: string | null;
//   advertisingLink: string | null;
//   user_id: number;
//   status: "active" | "pending" | "inactive" | string;
// };

export interface DashboardOverviewResponse {
  success: boolean;
  data: {
    total_content: number;
    total_pending_content: number;
    total_author: number;
    total_user: number;
    total_subscriber: number;
    recent_content: {
      current_page: number;
      data: RecentContentItem[];
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
  };
}

export interface RecentContentItem {
  id: number;
  category_id: number;
  subcategory_id: number;
  heading: string;
  author: string;
  date: string;
  sub_heading: string;
  body1: string;
  image1: string | null;
  advertising_image: string | null;
  tags: string[]; // Some items have this wrongly stringified like `["[\"tag\"]"]`
  created_at: string;
  updated_at: string;
  imageLink: string | null;
  advertisingLink: string | null;
  user_id: number;
  status:
    | "Draft"
    | "Review"
    | "Approved"
    | "Published"
    | "Archived"
    | "Revision"
    | "Rejected"
    | string;
  image2: string | null; // stored as a stringified array or null
  image2_url: string | null;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}
