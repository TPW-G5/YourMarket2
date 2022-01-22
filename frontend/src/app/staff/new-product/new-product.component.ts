import { ProductService } from './../../services/product.service';
import { Product } from './../../interfaces/Product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  product!: Product;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  createProduct():void {
    this.productService.createProduct(this.product);
  }

}
