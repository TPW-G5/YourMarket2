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
  name = ""
  
  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    console.log("NOME; " , this.name)
    this.productService.getAll(this.name).subscribe(products => this.products = products)
  }

  update_search(name: string):void {
    console.log("NOME update; " , this.name)
    this.productService.getAll(this.name).subscribe(products => this.products = products)
  }
}
