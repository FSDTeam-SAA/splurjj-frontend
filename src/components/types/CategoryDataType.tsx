export type CategoryApiResponse = {
  success: boolean;
  data: Category[];
  pagination: CategoryPagination;
};

export type Category = {
  category_id: number;
  category_name: string;
  subcategories: Subcategory[];
};

export type Subcategory = {
  id: number;
  name: string;
};

export type CategoryPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};
