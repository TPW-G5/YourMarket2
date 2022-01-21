import { ProductService } from './../../services/product.service';
import { Product } from '../../classes/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
    console.log("Produtos: ");
    for (let a of this.products) {
      console.log(a.show());
    }
  }

}
