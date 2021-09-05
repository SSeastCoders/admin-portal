import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let service;
  let modal: NgbModal;
  //let mockModalRef: MockNgbModalRef = new MockNgbModalRef();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [UserDetailsComponent],
      providers: [UserService, FormsModule],
      //schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    service = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal', () => {
    expect(component.onOpenModal(null)).toBeTruthy();
  });
});
