import { CartService } from './../../services/cart.service';
import { Product } from './../../interfaces/Product';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = []

  constructor(private productService: ProductService, private cartService: CartService) { }

  addToCart = (id: number) => this.cartService.add(id, 1)

  ngOnInit(): void {
    this.productService.getAll().subscribe(products => this.products = products)
  }

}
