import { Product } from './../../interfaces/Product';
import { UserService } from './../../services/user.service';
import { User } from './../../interfaces/User';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  products: Product[] = [];

  staff_count: number = 0
  user_count: number = 0
  product_count: number = 0

  constructor(private UserService:UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.UserService.getAllStaff().subscribe(users => {
      this.users = users
      this.staff_count = this.users.length
    })
    this.UserService.getAllUsers().subscribe(users => {
      this.users = users
      this.user_count = this.users.length
    })
    this.productService.getProducts().subscribe(products => {
      this.products = products
      this.product_count = this.products.length
    });

  }

}
