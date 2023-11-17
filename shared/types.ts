export interface Category {
  id: number,
  name: string,
}

export const enum KeyPrefix {
  Categories = "categories",
}

export const createCategoryKey = (id: number) => [
  KeyPrefix.Categories,
  id
]

export interface Food {
  id: number,
  name: string,
  category_id: number,
  category_name: string,
}
