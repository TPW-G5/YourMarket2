import { environment } from './../../environments/environment';
import { Order } from './../interfaces/Order';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Order[]>(environment.baseAPIPath + '/order/')
  }

  create() {
    return this.http.post<Order>(environment.baseAPIPath + '/order/', {})
  }
}
