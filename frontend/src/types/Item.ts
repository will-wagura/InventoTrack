export interface Item {
  itemName: string;
  quantity: number;
  unit?: string;
  price: number;
  currency?: string;
  paymentStatus: string;
  stockStatus: string;
}
