import { LoginResponse } from './../interfaces/responses/LoginResponse';
import { User } from './../interfaces/User';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: BehaviorSubject<string | null> = new BehaviorSubject(localStorage.getItem('token'))
  user: User | null = null

  constructor(private http: HttpClient) {
    this.loadProfile()
  }

  signup(username: string, password: string) {
    this.http.post<User>(environment.baseAPIPath + '/signup', { username, password }).subscribe(response => console.log(response))
  }

  login(username: string, password: string) {
    this.http.post<LoginResponse>(environment.baseAPIPath + '/login', { username, password }).subscribe(response => {
      this.token.next(response.token)
      localStorage.setItem('token', response.token)
      this.loadProfile()
    })
  }

  logout() {
    this.token.next(null)
    localStorage.removeItem('token')
  }

  loadProfile() {
    if (this.token.value != null) this.http.get<User>(environment.baseAPIPath + '/profile').subscribe(user => this.user = user)
  }

}
