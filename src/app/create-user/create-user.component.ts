import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateUser } from '../observables/createUser';
import { UserService } from '../services/user-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: CreateUser = new CreateUser();
  redirectToUrl: string = '/login';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  public createUser(): void {
    this.userService.createUser(this.user);
    this.router.navigate([this.redirectToUrl]);
  }

}
