import { Category } from './category';

export class Product {
  id: number;
  name: string;
  email: string;
  description: string;
  price: number;
  isActive: boolean;
  category: Category;

  constructor(num:number, name:string, email:string, description: string, price: number, isActive: boolean, category: Category) {
    this.id = num;
    this.name = name;
    this.email = email;
    this.description = description;
    this.price = price;
    this.isActive = isActive;
    this.category = category;
  }

}
