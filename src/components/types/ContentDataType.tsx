export type ContentDataTypeResponse = {
  id: number | string;
  heading: string;
  sub_heading: string;
  author: string;
  date: string;
  body1: string;
  tags: string[];
  category_name: string;
  sub_category_name: string;
  image1?: string | null;
  advertising_image?: string | null;
  advertisingLink?: string | null;
  imageLink?: string | null;
};

export type ContentAllDataTypeResponse = {
  status: boolean;
  data: ContentDataTypeResponse[];
  meta: {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
  };
};
