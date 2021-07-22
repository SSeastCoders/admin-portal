import { Component, OnInit } from '@angular/core';
import { LoginUserClass } from '../observables/loginUserClass';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  credentials: LoginUserClass = new LoginUserClass('','');

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.authService.login(this.credentials);
  }

}
