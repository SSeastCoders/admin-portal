import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  NgbActiveModal,
  NgbModal,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';

import { UserDetailsModalComponent } from './user-details-modal.component';

describe('UserDetailsModalComponent', () => {
  let component: UserDetailsModalComponent;
  let fixture: ComponentFixture<UserDetailsModalComponent>;
  let service;
  let modal: NgbActiveModal;
  //let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NgbModule,
        FormsModule,
      ],
      declarations: [UserDetailsModalComponent],
      providers: [UserService, NgForm, NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsModalComponent);
    service = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should close modal', () => {
  //   spyOn(modal, 'onCloseModal');

  //   expect(component.onCloseModal).toHaveBeenCalled();
  // });
});
