import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUser } from '../observables/createUser';
import { UserService } from '../services/user.service';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { CreateUserSchema } from './createUserSchema';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Role } from './role';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConfirmedValidator } from './validators/passwordConfirmation';
import { CheckBirthdate } from './validators/birthdateChecker';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, OnDestroy{

  user: CreateUser = new CreateUser();
  redirectToUrl: string = '/login';
  allRoles = [
    new Role(1, 'Admin'),
    new Role(2, 'Customer'),
  ]
  today = new Date(); 
  minorCutOff: string = (this.today.getFullYear()-18)+'-'+( this.today.getMonth()+1)+'-'+ this.today.getDate();
  //takenUsernames = this.userService.findAllUsernames();
  show: boolean = false;
  form = new FormGroup({});
  serverError = false;
  serverErrorMessage: string;


  constructor(public userService: UserService, private router: Router, private fb: FormBuilder,private modalService: NgbModal) {

    this.form = fb.group({
        username: ['', {validators: [Validators.required, Validators.pattern("[a-z0-9A-Z]+"), Validators.minLength(5), Validators.maxLength(20)]}],
        //asyncValidators: [thi.usernameValidator()]}),
        password: ['', {validators: [Validators.required, Validators.minLength(7), Validators.maxLength(20), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/)]}],
        //confirmPassword: ['', {validators: [Validators.required]}],
        email: ['', {validators: [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$/)]}],    
        role: [''],
        firstName: [''],
        lastName: [''],
        phone:['', {validators: [Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)]}],
        dob: ['']
      }, {
      //validators: [ConfirmedValidator('password', 'confirmPassword')],
       });
   }

  ngOnDestroy(): void {
    
  }

    // Form validator
    //const { register, handleSubmit, getValues, formState: { errors: formErrors } } = useForm<FormValues>({
     // resolver: yupResolver(schema)
    //});

  ngOnInit(): void {
    this.form.get('role').valueChanges.pipe(
      tap((role: string) => {
        if (role == 'Admin') {
          this.form.get('email').setValidators([Validators.required, Validators.email, Validators.pattern(/^[A-Za-z0-9](\.?|_?[A-Za-z0-9]){5,}@smoothstack\.com$/)])
        }
        this.form.get('email').updateValueAndValidity();
      })
    ).subscribe()
  }

  get username() {
    return this.form.get("username");
  }

  get password() {
    return this.form.get("password");
  }

  get confirmPassword() {
    return this.form.get("confirmPassword");
  }

  get email() {
    return this.form.get("email");
  }
  
  get phone() {
    return this.form.get("phone");
  }

  public createUser(): void {
    if (this.form.valid) {

      this.user = this.createUserFromForm();

      this.userService.createUser(this.user);

      //.subscribe(
        //(res) => {
        //  this.serverError = false;
          //this.router.navigate([this.redirectToUrl]);
        //}, (err: HttpErrorResponse) => {
        //  this.serverError = true;
         // this.serverErrorMessage = err.error.message;
        //}
      //);
    }
  }



    //this.router.navigate([this.redirectToUrl]);
  

  public createUserFromForm() {
    this.user.password = this.form.get('password').value;
    this.user.username = this.form.get('username').value;
    this.user.email = this.form.get('email').value;
    if (this.form.get('role').value) {this.user.role = this.form.get('role').value.roleTitle;}
    if (this.form.get('firstName').value) {this.user.firstName = this.form.get('firstName').value;}
    if (this.form.get('lastName').value) {this.user.lastName = this.form.get('lastName').value;}
    if (this.form.get('phone').value) {this.user.phone = this.form.get('phone').value.replace(/[()-\s]/g,'');}
    if (this.form.get('dob').value) {this.user.dob = this.form.get('dob').value;}//.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
    //this.user.dob.replace(/[()-\s]/g,'');
    return this.user;
  }

  checkPasswords(fGroup: FormGroup) {
    return fGroup.get('password').value === fGroup.get('confirmPassword').value
      ? null : {'mismatch': true};
  }

  checkBirthdate(fGroup: FormGroup) {
    try{
      const inputDate = Date.parse(fGroup.get('dob').value);
      const minorCutOff = Date.parse(this.minorCutOff);
      const tooOld = Date.parse('1900-01-01');

      if (inputDate < minorCutOff){
        return true;
      } else if (inputDate > tooOld){
        return true;
      }
      else{
        return false;
      }
    }catch(err) {
      return false;
    }
  }

  public togglePass(){
    this.show = !this.show;
  }

  public redirect(){
    this.router.navigate(['/users']);
  }

}



