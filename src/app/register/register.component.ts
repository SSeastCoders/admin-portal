import { Component, OnChanges, OnDestroy, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { RoleId, RoleTitle } from "../models/const";
import { CreateUser } from "../models/createUser";
import { UserService } from "../services/user/user.service";
import { ValidationService } from "../services/validation/validation.service";
import { ConstraintError } from "../services/const";
import { Role } from "../models/role";

@Component({
  selector: 'cm-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})

export class RegisterComponent implements OnInit, OnChanges, OnDestroy{
    register: CreateUser = new CreateUser();
    registerForm!: FormGroup;
    errorMessage?: string;
    show: boolean = false;
    roles = [new Role(RoleId.ADMIN, RoleTitle.ADMIN),new Role(RoleId.CUSTOMER, RoleTitle.CUSTOMER),];
    minorCutOff = Date.parse((new Date().getFullYear()-18)+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate());
    errorMessages = ValidationService.getValidatorErrorMessage;
    serverErrorMessages = ConstraintError;
    roleSubscription: Subscription;

    constructor(private formBuilder: FormBuilder,
                public userService: UserService){}


    ngOnInit() {
        this.buildForm();
        this.roleSubscription = this.registerForm.get('role').valueChanges.pipe(
          tap((role: string) => {
            if (role == 'Admin') {
              this.registerForm.get('email').setValidators([Validators.required, ValidationService.adminEmailValidator])
            }
            if (role == 'Customer') {
              this.registerForm.get('email').setValidators([Validators.required, ValidationService.emailValidator])
            }
            this.registerForm.get('email').updateValueAndValidity();
          })
        ).subscribe();
    }

    ngOnChanges() {}

    ngOnDestroy() {
      this.roleSubscription.unsubscribe;
    }

    buildForm() {
        this.registerForm = this.formBuilder.group({
            username:      ['', [ Validators.required, ValidationService.usernameValidator]],
            password:   ['', [ Validators.required, ValidationService.passwordValidator]],
            confirmPassword: ['', [ Validators.required, ValidationService.confirmPasswordValidator]],
            email:      ['', [ Validators.required, ValidationService.emailValidator]],
            role:      ['', []],
            firstName:      ['', []],
            lastName:      ['', []],
            phone:      ['', []],
            dob:      ['', [ValidationService.birthdateValidator]],
        });
    }

    submit() {
      if (this.registerForm.valid){
        this.generateUser();
        this.userService.createUser(this.register);
      }
    }

    public togglePass(){
      this.show = !this.show;
    }

    get username() {
      return this.registerForm.get("username");
    }

    get password() {
      return this.registerForm.get("password");
    }

    get confirmPassword() {
      return this.registerForm.get("confirmPassword");
    }

    get email() {
      return this.registerForm.get("email");
    }

    get phone() {
      return this.registerForm.get("phone");
    }

    get role() {
      return this.registerForm.get('role');
    }

    get dob() {
      return this.registerForm.get('dob');
    }

    changeRole(e) {
      this.role.setValue(e.target.value, {
        onlySelf: true
      });
      this.register.role = e.target.value;
    }

    myConfirm() {
      let txt;
      let r = confirm("Please confirm creating a new user:");
      if (r == true) {
        txt = "You pressed OK!";
      } else {
        txt = "You pressed Cancel!";
      }
      return txt;
    }

    generateUser() {
      this.register.password = this.registerForm.get('password').value;
      this.register.username = this.registerForm.get('username').value;
      this.register.email = this.registerForm.get('email').value;
      if (this.registerForm.get('firstName').value) {this.register.firstName = this.registerForm.get('firstName').value;}
      if (this.registerForm.get('lastName').value) {this.register.lastName = this.registerForm.get('lastName').value;}
      if (this.registerForm.get('phone').value) {this.register.phone = this.registerForm.get('phone').value.replace(/[()-\s]/g,'');}
      if (this.registerForm.get('dob').value) {this.register.dob = this.registerForm.get('dob').value;}
      return this.register;
    }

}
