import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http/http.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

import { UserSearchModalComponent } from './user-search-modal.component';

describe('UserSearchModalComponent', () => {
  let service: UserService;
  let component: UserSearchModalComponent;
  let fixture: ComponentFixture<UserSearchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSearchModalComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [HttpService, UserService, NgbActiveModal, RouterTestingModule]
    })
    .compileComponents();
    service = TestBed.get(UserService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
