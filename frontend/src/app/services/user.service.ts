import { Router } from '@angular/router';
import { User } from './../interfaces/User';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: BehaviorSubject<string | null> = new BehaviorSubject(localStorage.getItem('token'))
  user: User | null = null

  constructor(private router: Router) { }

  setToken(token: string | null) {
    this.token.next(token)
    if (token == null) this.setUser(null)
  }

  setUser(user: User | null) {
    this.user = user

    if (user?.is_staff) this.router.navigateByUrl('/system/dashboard')
  }
}
