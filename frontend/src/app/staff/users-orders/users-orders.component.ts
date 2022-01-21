import { Order } from './../../interfaces/Order';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-orders',
  templateUrl: './users-orders.component.html',
  styleUrls: ['./users-orders.component.css']
})
export class UsersOrdersComponent implements OnInit {
  orders:Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders():void {
    this.orderService.getAll().subscribe(orders => this.orders = this.orders);
  }

}
