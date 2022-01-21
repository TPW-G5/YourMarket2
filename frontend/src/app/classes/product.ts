export class Product {
  id: number;
  name: string;
  email: string;
  description: string;
  price: number;
  isActive: boolean;
  category: number;

  constructor(num:number, name:string, email:string, description: string, price: number, isActive: boolean, category: number) {
    this.id = num;
    this.name = name;
    this.email = email;
    this.description = description;
    this.price = price;
    this.isActive = isActive;
    this.category = category;
  }

  show(){
    return "Product: Name = " + this.name + ", category = " + this.category;
  }

}
