import { Component, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginUserClass } from '../observables/loginUserClass';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  credentials: LoginUserClass = new LoginUserClass('','');
  @HostBinding('class') class = 'login-box';
  public loginForm: FormGroup;
  public isAuthLoading = false;

  constructor(
    private authService: AuthService, 
    private renderer: Renderer2
    ) { }


  ngOnInit(): void{
  this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
  });
  }

  public login(): void {
    //console.log("username " + this.credentials.username);
    //console.log("password " + this.credentials.password);
    this.authService.login(this.credentials);
  }

}


