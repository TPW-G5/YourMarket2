export class Category {
  id: number;
  name: string;
  isActive: boolean;

  constructor(num:number, name:string, email:string, isActive: boolean) {
    this.id = num;
    this.name = name;
    this.isActive = isActive;
  }
}

