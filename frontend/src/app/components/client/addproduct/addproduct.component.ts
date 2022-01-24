import { UserService } from './../../../services/user.service';
import { CartService } from './../../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddProductComponent implements OnInit {

  @Input() productId: number | null = null
  amount: number = 1

  save = () => this.cartService.add(this.productId!, this.amount).subscribe()

  constructor(private cartService: CartService, public userService: UserService) { }

  ngOnInit(): void {
  }

}
