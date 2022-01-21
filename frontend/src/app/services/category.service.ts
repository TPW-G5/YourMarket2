import { Injectable } from '@angular/core';
import { Category } from './../classes/category';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8000/api/v1/category/';

  constructor(private http: HttpClient) { }

  getCategory(id: number): Observable<Category> {
    const url = this.baseUrl + '/' + id;
    return this.http.get<Category>(url);
  }
}
