import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { PageEvent } from '@angular/material/paginator';
import { UserPage } from './models/userPage';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
//export class AppComponent implements OnInit {
//public users: User[];
// public fakers = [
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
//   { faker: 'faker17' },
// ];
//public pageSlice = this.users.slice(0, 10);
// constructor(private userService: UserService) {
//   this.users = [];
// }
//ngOnInit() {
//this.getUsers();
//}
// public getUsers(): void {
//   console.log('in app comp getUsers');
//   this.userService.getUsers(page, size)
//     (response: <UserPage<User>>) => {
//       console.log(response);
//       this.users = response;
//     },
//     (error: HttpErrorResponse) => {
//       alert(error.message);
//     }
//   );
// }
//}
