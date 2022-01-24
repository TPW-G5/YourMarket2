import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Product } from './../interfaces/Product';
import { Category } from '../interfaces/Category';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.baseAPIPath + '/product';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    const url = this.baseUrl;
    return this.http.get<Product[]>(url);
  }

  getAll() {
    return this.http.get<Product[]>(environment.baseAPIPath + '/product')
  }

  getOne(id: number) {
    return this.http.get<Product>(environment.baseAPIPath + '/product/' + id)
  }

  createProduct(category:Category, name: string, description: string, price: number) {
    console.log(category)
    console.log(name)
    console.log(description)
    console.log(price)
    this.http.post<Product>(this.baseUrl + "/", {  "category": { "name": category.name, "isActive": category.isActive}, "name": name, "description": description, "price": price,"isActive": false}, httpOptions).subscribe(response => console.log(response))
  }
}
