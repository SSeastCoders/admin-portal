import { TestBed } from '@angular/core/testing';
import { User } from '../observables/user';

import { UserService } from './user-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UserService], imports : [HttpClientTestingModule, RouterTestingModule] });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
