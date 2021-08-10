import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UsersComponent } from '../users/users.component';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error', () => {
    console.log('error occured');
    expect(service.getUsersPage(-1, -1)).toThrowError;
    console.log('error occured');
  });
});
