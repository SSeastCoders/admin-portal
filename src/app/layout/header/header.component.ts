import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import 'bootstrap/dist/js/bootstrap.bundle';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    public userService: UserService
  ) {}


  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
