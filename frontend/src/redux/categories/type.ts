export interface CategoryState {
  categories: Category[];
  selectedCategory: number;
}

export interface Category {
  id: number;
  name: string;
}
