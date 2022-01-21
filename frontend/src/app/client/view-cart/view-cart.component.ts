import { CartService } from './../../services/cart.service';
import { CartProduct } from './../../interfaces/CartProduct';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  items: CartProduct[] = []

  constructor(private cartService: CartService) { }

  updateItems = () => this.cartService.getAll().subscribe(items => this.items = items)
  deleteItem = (id: number) => this.cartService.delete(id).subscribe(() => this.updateItems())
  updateItem = (id: number) => this.cartService.add(id, parseInt((<HTMLInputElement>document.getElementById('amount-'+id)).value)).subscribe()

  ngOnInit(): void {
    this.updateItems()
  }

}
