import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUserComponent } from 'src/app/create-user/create-user.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

import 'bootstrap/dist/js/bootstrap.bundle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {}

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public createUserForm(): void {}
}
