import { Router } from '@angular/router';
import { User } from './../interfaces/User';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: BehaviorSubject<string | null> = new BehaviorSubject(localStorage.getItem('token'))
  user: User | null = null

  constructor(private router: Router, private http: HttpClient) { }


  setToken(token: string | null) {
    this.token.next(token)
    if (token == null) this.setUser(null)
  }

  setUser(user: User | null) {
    this.user = user

    if (user?.is_staff) this.router.navigateByUrl('/system/dashboard')
  }

  getAll() {
    return this.http.get<User[]>(environment.baseAPIPath + '/staff')
  }

  createUser(username: string, password:string) {
    this.http.post<User>(environment.baseAPIPath + "/staff/", { "username":username, "password": password }, httpOptions).subscribe(response => console.log(response))
  }
}
