import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { classToPlain, plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { UserDetailsDto } from '../../dto/user-details-dto';
import { RoleTitle } from '../../models/const';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  exportAs: 'editUserForm',
})
export class EditUserComponent implements OnInit {
  public radioGroupForm: FormGroup;
  public currentUser!: User;
  public editUser!: UserDetailsDto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe((user) => {
      this.currentUser = user;
    });
  }

  onUpdateUser(editUserForm: NgForm): any {
    console.log('in on update user');
    this.editUser.activeStatus = editUserForm['activeStatus'].value;
    console.dir(editUserForm);
    this.editUser = editUserForm.value;

    this.userService
      .updateUser(this.editUser)
      .subscribe((res) => console.log(res));
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.router.navigate(['/users', id]);
  }
}
