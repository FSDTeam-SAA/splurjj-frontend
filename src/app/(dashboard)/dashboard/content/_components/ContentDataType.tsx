export type AllContentResponse = {
  status: boolean;
  data: Content[];
  meta: {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
  };
};

export type Content = {
  id: number;
  heading: string;
  sub_heading: string; // HTML content as string
  author: string;
  date: string; // ISO date string (e.g., "2025-06-09")
  body1: string; // HTML content as string
  tags: string[];
  category_name: string;
  sub_category_name: string;
  image1: string | null | undefined;
  advertising_image: string | null | undefined ;
  advertisingLink: string | null | undefined ;
  imageLink: string | null | undefined ;
};
