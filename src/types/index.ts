
export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  country: string;
  address: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export interface Order {
  id: number;
  items: Product[];
  date: string;
  total: number;
  address: string;
  phoneNumber: string;
}
