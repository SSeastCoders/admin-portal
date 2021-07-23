import { Component, OnInit } from '@angular/core';
import { CreateUser } from '../observables/createUser';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: CreateUser = new CreateUser();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  public createUser(): void {
    this.userService.createUser(this.user);
  }

}
