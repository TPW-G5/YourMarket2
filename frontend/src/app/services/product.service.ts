import { environment } from './../../environments/environment';
import { Product } from './../interfaces/Product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Product[]>(environment.baseAPIPath + '/product')
  }

  getOne(id: number) {
    return this.http.get<Product>(environment.baseAPIPath + '/product/' + id)
  }
}
