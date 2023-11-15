export interface Category {
  id: number,
  name: string,
}

export const enum CategoryKey {
  Primary1 = "categories",
  Primary2Property = "id",
}

export interface Food {
  id: number,
  name: string,
  category_id: number,
  category_name: string,
}
