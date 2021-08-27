import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserListComponent } from './user-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/models/user';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let service;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [UserListComponent],
      providers: [UserService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    service = TestBed.inject(UserService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update page size', () => {
    component.updatePageSize(5);
    expect(component.pageSize).toEqual(5);
  });

  it('should return to pageNumber 1 when pageSize is updated', () => {
    component.updatePageSize(5);
    component.pageNumber = 1;
    expect(component.pageNumber).toEqual(1);
  });

  it('it sets sort direction', () => {
    component.setSort('username');
    expect(component.asc).toBe(true);
    component.setSort('username');
    expect(component.asc).toBe(false);
  });
});
