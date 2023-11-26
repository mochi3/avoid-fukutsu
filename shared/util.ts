import { KeyPrefix } from "./types.ts";

export const createCategoryKey = (id?: number) => {
  const key: (number | KeyPrefix)[] = [KeyPrefix.Categories];
  if (id) key.push(id);
  return key;
};

export const createFoodKey = (id?: string) => {
  const key: (string | KeyPrefix)[] = [KeyPrefix.Foods];
  if (id) key.push(id);
  return key;
};

export const createFoodCategoryKey = (categoryId: number, foodId?: string) => {
  const key: (number | KeyPrefix | string)[] = [
    KeyPrefix.FoodsByCategory,
    categoryId,
  ];
  if (foodId) key.push(foodId);
  return key;
};

export const createReviewKey = (id?: string) => {
  const key: (string | KeyPrefix)[] = [KeyPrefix.Reviews];
  if (id) key.push(id);
  return key;
};

export const createReviewFoodKey = (foodId: string, reviewId?: string) => {
  const key = [KeyPrefix.ReviewsByFood, foodId];
  if (reviewId) key.push(reviewId);
  return key;
};
