import { Input, Output, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsDto } from 'src/app/dto/user-details-dto';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.css'],
})
export class UserDetailsModalComponent {
  @Output() editUser: UserDetailsDto;
  @Input() currentUser: User;
  constructor(
    private userService: UserService,
    private activeModal: NgbActiveModal
  ) {}

  onUpdateUser(editUserForm: NgForm): any {
    console.dir(editUserForm);
    this.editUser = editUserForm.value;
    console.log(this.editUser);
    this.editUser.id = this.currentUser.id;
    return this.userService
      .updateUser(this.editUser)

      .subscribe(
        (res) => {
          this.onSubmit();
          console.log('User updated');
          alert('User Updated');
        },
        (err) => {
          console.log(err);
          console.log('User could not be updated');
        }
      );
  }

  onCloseModal() {
    this.activeModal.close();
  }

  onSubmit() {
    this.activeModal.close();
  }
}
