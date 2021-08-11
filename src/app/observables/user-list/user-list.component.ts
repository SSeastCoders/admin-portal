import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users!: User[];

  totalUsers!: number;
  pageSize: number = 10;
  pageNumber: number = 1;
  totalElements!: number;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    this.handleUsersList();
  }

  handleUsersList() {
    this.userService
      .getUsersPage(this.pageNumber - 1, this.pageSize)
      .subscribe(this.processResult());
  }

  processResult() {
    return (data) => {
      console.log(data);
      this.users = data.content;
      this.pageNumber = data.pageable.pageNumber + 1;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    };
  }

  updatePageSize(pageSize: number) {
    try {
      this.pageSize = pageSize;
      this.pageNumber = 1;
      this.listUsers();
    } catch {
      throw new Error("couldn't update page size");
    }
  }
}
