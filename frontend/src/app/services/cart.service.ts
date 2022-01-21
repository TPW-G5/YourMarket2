import { CartProduct } from './../interfaces/CartProduct';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<CartProduct[]>(environment.baseAPIPath + '/cart/').subscribe(items => console.log(items))
  }

  add(product: number, amount: number) {
    return this.http.post<CartProduct>(environment.baseAPIPath + '/cart/', { product, amount }).subscribe(item => console.log(item))
  }
}
