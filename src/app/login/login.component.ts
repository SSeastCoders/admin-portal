import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from '../models/loginUser';
import { AuthService } from '../services/authNew/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  credentials: LoginUser = new LoginUser();
  loginForm!: FormGroup;
  errorMessage: string = "Invalid Login Credentials, please try again";
  show: boolean = false;

  constructor(private formBuilder: FormBuilder,
    public authService: AuthService,){}


  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
        username:      ['', [ Validators.required]],
        password:   ['', [ Validators.required]]
    });
  }

  public togglePass(){
    this.show = !this.show;
  }

  submit() {
    if (this.loginForm.valid){
      this.authService.login(this.credentials);
    }
  }

}
