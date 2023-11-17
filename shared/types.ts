export interface Category extends Sig {
  id: number;
  name: string;
}

export interface Food extends Sig {
  id: string;
  name: string;
  categoryId: number;
  categoryName: string;
}

export const enum KeyPrefix {
  Categories = "categories",
  Foods = "foods",
  FoodsByCategory = "foods_by_category",
}

export const createCategoryKey = (id: number) => [
  KeyPrefix.Categories,
  id,
];

export const createFoodKey = (id: string) => [
  KeyPrefix.Foods,
  id,
];

export const createFoodCategoryKey = (id: number) => [
  KeyPrefix.FoodsByCategory,
  id,
];

export const enum Url {
  ApiCategories = "/api/categories",
  ApiFoods = "/api/foods",
}

export interface Sig {
  [key: string]: string | number;
}
