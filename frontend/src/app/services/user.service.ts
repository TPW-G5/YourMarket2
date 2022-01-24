import { User } from './../interfaces/User';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: BehaviorSubject<string | null> = new BehaviorSubject(localStorage.getItem('token'))
  user: User | null = null

  constructor() { }

  setToken(token: string | null) {
    this.token.next(token)
    if (token == null) this.setUser(null)
  }

  setUser(user: User | null) {
    this.user = user
  }
}
