import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUser } from '../observables/createUser';
import { UserService } from '../services/user-service.service';
import * as Yup from "yup";
import { FormControl, FormGroup } from "@angular/forms";
import { CreateUserSchema } from './createUserSchema';
import { createYupValidator } from "./validator";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: CreateUser = new CreateUser();
  redirectToUrl: string = '/login';


  form = new FormGroup(
    {
      username: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),    
    },
    {
      asyncValidators: createYupValidator({
        schema: CreateUserSchema
        // context: () => this.data
      })
    }
  );

  constructor(private userService: UserService, private router: Router) { }

    // Form validator
    //const { register, handleSubmit, getValues, formState: { errors: formErrors } } = useForm<FormValues>({
     // resolver: yupResolver(schema)
    //});

  ngOnInit(): void {
  }

  public createUser(): void {
    this.userService.createUser(this.user);
    //this.router.navigate([this.redirectToUrl]);
  }

}
