import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
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
  show: boolean = false;


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
    if (loginForm){
      this.isAuthLoading = true;
      this.authService
        .login(this.credentials)
        .pipe(
          finalize(() => {
            this.isAuthLoading = false;
          })
        )
        .subscribe(response => {
          console.log(response);
          if (response instanceof HttpErrorResponse) {
            console.log('error');
            const validationErrors = response.error;

            if(response.status == 401) {
              Object.keys(validationErrors).forEach(prop => {
                const formControl = this.loginForm.get(prop);
                if (formControl) {
                  // activate the error message
                  formControl.setErrors({
                    serverError: validationErrors[prop]
                  });
                }
              });
            }
          }
        });
    //console.log("username " + this.credentials.username);
    //console.log("password " + this.credentials.password);
    //this.authService.login(this.credentials);
      }
    }
}