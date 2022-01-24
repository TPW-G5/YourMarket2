import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-staff',
  templateUrl: './app-staff.component.html',
  styleUrls: ['./app-staff.component.css']
})
export class AppStaffComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (!this.userService.user?.is_staff) this.router.navigateByUrl('/')
  }

}
