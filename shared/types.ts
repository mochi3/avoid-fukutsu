export interface Category extends TableList {
  id: number;
  name: string;
}

export interface Food extends TableList {
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
  value: number;
  type: number;
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

export interface TableList {
  [key: string]: string | number;
}

export type DbKey = (string | number)[];

export interface Condition {
  id: number;
  message: string;
  color: string;
}

export const conditionList: Condition[] = [
  { id: 0, message: "美味しい", color: "green" },
  { id: 1, message: "食べれる", color: "yellowgreen" },
  { id: 2, message: "まずい", color: "orange" },
  { id: 3, message: "危険", color: "red" },
];

export interface ExpiredType {
  id: number;
  name: string;
}

export const expiredTypeList: ExpiredType[] = [
  { id: 0, name: "日" },
  { id: 1, name: "週間" },
  { id: 2, name: "ヶ月" },
  { id: 3, name: "年" },
];
