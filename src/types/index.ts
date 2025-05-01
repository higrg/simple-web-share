
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  country: string;
  address: string;
}

export type Category = 'Action' | 'Adventure' | 'RPG' | 'Strategy';
