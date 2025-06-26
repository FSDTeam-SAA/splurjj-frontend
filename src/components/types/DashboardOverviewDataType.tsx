export type DashboardOverviewDataTypeResponse = {
  success: boolean;
  data: {
    total_content: number;
    total_pending_content: number;
    total_author: number;
    total_user: number;
    total_subscriber: number;
    recent_content: DashboardOverviewDataType[];
  };
};

export type DashboardOverviewDataType = {
  id: number;
  category_id: number;
  subcategory_id: number;
  heading: string; // HTML string
  author: string;
  date: string; // ISO or YYYY-MM-DD
  sub_heading: string; // HTML string
  body1: string; // HTML string
  image1: string;
  advertising_image: string | null;
  tags: string[]; // The current data seems malformed, see note below
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
  imageLink: string | null;
  advertisingLink: string | null;
  user_id: number;
  status: "active" | "pending" | "inactive" | string;
};
