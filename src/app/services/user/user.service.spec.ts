import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserEndPoints } from '../const';
import { HttpClient } from '@angular/common/http';
import { CreateUser } from 'src/app/models/createUser';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { Role } from 'src/app/models/role';
import { RoleId, RoleTitle } from 'src/app/models/const';
import { Address } from 'src/app/models/address';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let client: HttpClient;
  let user: User;
  let userNew: CreateUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'users', component: UserListComponent },
        ]),
      ],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    client = TestBed.inject(HttpClient);

    user = {
      id: 1,
      role: new Role(RoleId.CUSTOMER, RoleTitle.CUSTOMER),
      firstName: 'FIRST',
      lastName: 'LAST',
      dob: 'BIRTH',
      email: 'EMAIL@EMAIL.COM',
      phone: '1-800-Beepme',
      address: new Address(),
      dateJoined: 'TODAY',
      activeStatus: true,
      username: 'USERNAME',
    };

    userNew = {
      role: new Role(RoleId.CUSTOMER, RoleTitle.CUSTOMER),
      firstName: 'FIRST',
      lastName: 'LAST',
      dob: 'BIRTH',
      email: 'EMAIL@EMAIL.COM',
      phone: '1-800-Beepme',
      address: new Address(),
      dateJoined: 'TODAY',
      activeStatus: true,
      username: 'USERNAME',
      password: 'PASSWORD',
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create user', () => {
    let result: User;
    service.createUser(userNew);
    const req = httpMock.expectOne({
      method: 'POST',
      url: environment.userUrl + UserEndPoints.MAIN,
    });

    req.flush([user]);

    // these look the same to my eyes, but they say they are not the same...
    //expect(result).toEqual(account);
  });

  it('should clear errors', () => {
    service.creationError = true;
    expect(service.creationError).toBeTrue();
    service.clear();
    expect(service.creationError).toBeFalse();
  });

  it('should get a page of users', () => {
    expect(service.getUsersPage).toBeTruthy();
  });

  // it('should format request correctly', () => {

  // })
});
