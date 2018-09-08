export interface IOrderedItem {
  id?: string;
  catalogItemId?: number;
  name?: string;
  price?: number;
  quantity?: number;
}

export const defaultValue: Readonly<IOrderedItem> = {};
