import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from '../observables/user';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  exportAs: 'editUserForm',
})
export class EditUserComponent implements OnInit {
  public editUser!: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe((user) => (this.editUser = user));
  }

  onUpdateUser(editUserForm: NgForm): void {
    console.log('in on update user');
    console.log(editUserForm);
    this.editUser.firstName = editUserForm['firstName'];
    this.editUser.lastName = editUserForm['lastName'];
    this.editUser.email = editUserForm['email'];
    this.editUser.phone = editUserForm['phone'];
    this.editUser.username = editUserForm['username'];
    console.dir(this.editUser);
    this.userService
      .updateUser(this.editUser)
      .subscribe((res) => console.log(res));
  }
}
