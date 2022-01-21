import { User } from './../interfaces/User';
import { LoginResponse } from './../interfaces/responses/LoginResponse';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: BehaviorSubject<string | null> = new BehaviorSubject(localStorage.getItem('token'))

  constructor(private http: HttpClient) {}

  signup(username: string, password: string) {
    this.http.post<User>(environment.baseAPIPath + '/signup', { username, password }).subscribe(response => console.log(response))
  }

  login(username: string, password: string) {
    this.http.post<LoginResponse>(environment.baseAPIPath + '/login', { username, password }).subscribe(response => {
      this.token.next(response.token)
      localStorage.setItem('token', response.token)
    })
  }

  logout() {
    this.token.next(null)
    localStorage.removeItem('token')
  }

}
