import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUser } from '../observables/createUser';
import { UserService } from '../services/user-service.service';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors } from "@angular/forms";
import { CreateUserSchema } from './createUserSchema';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Role } from './role';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: CreateUser = new CreateUser();
  redirectToUrl: string = '/login';
  allRoles = [
    new Role(1, 'Admin'),
    new Role(2, 'Customer'),
  ]
  today = new Date(); 
  minorCutOff: string = (this.today.getFullYear()-18)+'-'+( this.today.getMonth()+1)+'-'+ this.today.getDate();
  takenUsernames = this.userService.findAllUsernames();

  form = new FormGroup(
    {
      username: new FormControl('', {validators: [Validators.required, Validators.pattern("[a-z0-9A-Z]+"), Validators.minLength(1), Validators.maxLength(20)]}),
      //asyncValidators: [this.usernameValidator()]}),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required, Validators.email]),    
      role: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      phone: new FormControl('', [Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)]),
      dob: new FormControl()
    },
  );

  constructor(private userService: UserService, private router: Router) { }

    // Form validator
    //const { register, handleSubmit, getValues, formState: { errors: formErrors } } = useForm<FormValues>({
     // resolver: yupResolver(schema)
    //});

  ngOnInit(): void {
  }

  get username() {
    return this.form.get("username");
  }

  get password() {
    return this.form.get("password");
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
    //this.router.navigate([this.redirectToUrl]);
    }
  }

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

  public checkIfUsernameExists(username: string): Observable<boolean> {
    if (this.takenUsernames) {
      return of(this.takenUsernames.includes(username));
    }
    return new Observable<false>();
  }

  usernameValidator(): AsyncValidatorFn {
    return (control): Observable<ValidationErrors | null> => {
      return this.checkIfUsernameExists(control.value).pipe(
        map(res => {
          // if res is true, username exists, return true
          return res ? { usernameExists: true } : null;
          // NB: Return null if there is no error
        })
      );
    };
  }


}
