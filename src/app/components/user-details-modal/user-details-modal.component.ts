import { Input, Output, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  NgbActiveModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsDto } from 'src/app/dto/user-details-dto';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.css'],
})
export class UserDetailsModalComponent implements OnInit {
  @Output() editUser: UserDetailsDto;
  @Input() currentUser: User;
  userDetailsForm!: FormGroup;
  constructor(
    private userService: UserService,
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  //onUpdateUser(editUserForm: NgForm): any {
  onSubmit() {
    console.log(this.currentUser.id);
    console.log(this.userDetailsForm.value);
    console.log(this.editUser);
    //this.editUser = this.userDetailsForm;
    return this.userService
      .updateUser(this.userDetailsForm.value, this.currentUser.id)

      .subscribe(
        (res) => {
          //this.onSubmit();
          console.log(res);
          alert('User Updated');
          this.activeModal.close();
        },
        (err) => {
          console.log(err);
          console.log('User could not be updated');
        }
      );
  }

  // onCloseModal() {
  //   this.activeModal.close();
  // }

  cancel() {
    this.activeModal.dismiss();
  }

  //onSubmit() {
  //this.onUpdateUser();
  //this.activeModal.close();
  // console.log('User updated');
  // alert('User Updated');
  //this.userService.clear();
  //}

  ngOnInit(): void {
    console.log('onInit');
    console.log(this.activeModal);
    console.log(this.currentUser);
    this.userService.clear();

    this.userDetailsForm = this.formBuilder.group({
      firstName: new FormControl(this.currentUser.firstName, [
        Validators.required,
        ValidationService.notOnlyWhitespace,
      ]),
      lastName: new FormControl(this.currentUser.lastName, [
        Validators.required,
        ValidationService.notOnlyWhitespace,
      ]),
      email: new FormControl(this.currentUser.email, [
        Validators.required,
        ValidationService.emailValidator,
        ValidationService.notOnlyWhitespace,
      ]),
      username: new FormControl(this.currentUser.username, [
        Validators.required,
        ValidationService.usernameValidator,
        ValidationService.notOnlyWhitespace,
      ]),

      phone: [
        this.currentUser.phone,
        [Validators.pattern, ValidationService.notOnlyWhitespace],
      ],
      activeStatus: [this.currentUser.activeStatus, Validators.required],
    });
  }

  get firstName() {
    return this.userDetailsForm.get('firstName');
  }

  get lastName() {
    return this.userDetailsForm.get('lastName');
  }

  get email() {
    return this.userDetailsForm.get('email');
  }

  get username() {
    return this.userDetailsForm.get('username');
  }

  get phone() {
    return this.userDetailsForm.get('phone');
  }

  get activeStatus() {
    return this.userDetailsForm.get('activeStatus');
  }
}
