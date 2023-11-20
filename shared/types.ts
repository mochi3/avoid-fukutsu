export interface Category extends tableList {
  id: number;
  name: string;
}

export interface Food extends tableList {
  id: string;
  name: string;
  categoryId: number;
  categoryName: string;
}

export interface Review {
  id: string;
  food: Food;
  condition: number;
  expired: Expired;
  message: string;
}

export interface Expired {
  value: number,
  type: number
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

export const createFoodCategoryKey = (categoryId: number, foodId: string) => [
  KeyPrefix.FoodsByCategory,
  categoryId,
  foodId,
];

export const enum Url {
  Category = "/category",
  Food = "/food",
  Categories = "/categories",
  Foods = "/foods",
  ApiCategories = "/api/categories",
  ApiFoods = "/api/foods",
}

export interface tableList {
  [key: string]: string | number;
}

export type DbKey = (string | number)[]