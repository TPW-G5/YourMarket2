import { environment } from './../../environments/environment';
import { Category } from './../interfaces/Category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Category[]>(environment.baseAPIPath + '/category')
  }
}
