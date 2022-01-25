import { Router } from '@angular/router';
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

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders():void {
    this.orderService.getAll().subscribe(orders => this.orders = orders);
  }

  changeState(orderId: number):void {
    console.log("BOtao mudar o estado pressionado")
    this.orders.forEach(order => {
      if (order.id == orderId) {
        this.orderService.changeState(order)
        window.location.reload();
      }
    });

  }

}
