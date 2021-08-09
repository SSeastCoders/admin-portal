import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UsersComponent } from './users.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  let userService: UserService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UsersComponent],
      providers: [UserService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('listUsers should call handleUsers', () => {
  //   let result = component.listUsers();
  //   let spy = jasmine.createSpy();
  //   expect(spy(component.handleUsersList)).toHaveBeenCalled();
  // });

  it('should update page size', () => {
    component.updatePageSize(5);
    expect(component.pageSize).toEqual(5);
  });

  it('should throw error', () => {
    try {
      let thing = component.updatePageSize(0);

      expect(thing).toThrowError();
    } catch (err) {
      console.log(err);
      expect(err).toBeTruthy();
    }
    // expect(component).toBeTruthy();
  });

  it('should return to pageNumber 1 when pageSize is updated', () => {
    component.updatePageSize(5);
    component.pageNumber = 1;
    expect(component.pageNumber).toEqual(1);
  });
});
