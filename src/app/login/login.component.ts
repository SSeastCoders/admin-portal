import { HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { Component, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { catchError, finalize } from 'rxjs/operators';
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
  public serverError = false;
  show: boolean = false;
  errorMessage: "invalid credentials"


  constructor(
    private authService: AuthService, 
    private renderer: Renderer2,
    ) { }


  ngOnInit(): void{
  this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
  });
  }

  public togglePass(){
    this.show = !this.show;
  }

  public login(loginForm) {
    if (this.loginForm.valid){
      if(this.authService
        .login(this.credentials)){}
      else{
        this.serverError = true;
      } /* => {
          (x => console.log('success'),
          err => {this.serverError = true;
          console.log('error');}
        )//; */
    };
  }

  public login2(loginForm, next: HttpHandler) {
    if (this.loginForm.valid){
      this.authService
        .login(this.credentials)
    }   
  }
}