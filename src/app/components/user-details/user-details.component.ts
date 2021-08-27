import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDetailsDto } from 'src/app/dto/user-details-dto';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { UserDetailsModalComponent } from '../user-details-modal/user-details-modal.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  currentUser: User;
  editUser: UserDetailsDto;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe((user) => {
      this.currentUser = user;
    });
  }

  onOpenModal(currentUser: User): void {
    const editModal = this.modal.open(UserDetailsModalComponent);
    editModal.componentInstance.currentUser = this.currentUser;
    editModal.result.then(() => this.getUser());
  }
}
