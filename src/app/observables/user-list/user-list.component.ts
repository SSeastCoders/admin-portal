import { Component, OnInit } from '@angular/core';
import { User} from '../../models/user'
import { UserService } from 'src/app/services/user.service';
//import { fa-pencil } from '@fortawesome/free-solid-svg-icons';

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
  asc: boolean = false;
  sort: string;

  fields = [
    { name: 'id', displayName: '#', class: 'col-1' },
    { name: 'role', displayName: 'Role', class: 'col-1' },
    { name: 'firstName', displayName: 'First Name', class: 'col-1' },
    { name: 'lastName', displayName: 'Last Name', class: 'col-2' },
    { name: 'credential.username', displayName: 'Username', class: 'col-3' },
    { name: 'email', displayName: 'Email', class: 'col-3' },

    { name: 'activeStatus', displayName: 'Status', class: 'col-3' },
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    this.handleUsersList();
  }

  handleUsersList() {
    this.userService
      .getUsersPage(this.pageNumber - 1, this.pageSize, this.sort, this.asc)
      .subscribe(this.processResult());
  }

  processResult() {
    console.log('this is the data in process result');
    return (data) => {
      console.log('this is the data in process result');
      console.log(data);
      this.users = data.content;
      //this.pageNumber = data.pageable.pageNumber + 1;
      this.pageSize = data.pageable.pageSize;
      //this.totalElements = data.totalElements;
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

  setSort(property: string) {
    if (this.asc && this.sort === property) {
      this.asc = false;
    } else {
      this.sort = property;
      this.asc = true;
    }
    this.listUsers();
  }
}
