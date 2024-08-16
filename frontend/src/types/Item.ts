export interface Item {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  expiry_date: string;
  store: {
    name: string;
    location: string;
  };
  store_id: number;
  user: {
    name: string;
    role: string;
  };
}
