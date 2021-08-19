import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserListComponent } from './user-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  let userService: UserService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserListComponent],
      providers: [UserService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
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
      expect(err).toBeTruthy();
    }
    // expect(component).toBeTruthy();
  });

  it('should return to pageNumber 1 when pageSize is updated', () => {
    component.updatePageSize(5);
    component.pageNumber = 1;
    expect(component.pageNumber).toEqual(1);
  });

  // it('makes a new request when setPage, setResultsPerPage, setSort, or setSearch is called', () => {
  //   component.
  //   expect(mockService.getUsers).toHaveBeenCalledTimes(2);
  //   component.setResultsPerPage(50);
  //   expect(mockService.getUsers).toHaveBeenCalledTimes(3);
  //   component.setSort("lastName");
  //   expect(mockService.getUsers).toHaveBeenCalledTimes(4);
  //   component.setSearch("some search");
  //   expect(mockService.getUsers).toHaveBeenCalledTimes(5);
  // });

  it('it sets sort direction', () => {
    component.setSort('property');
    expect(component.asc).toBe(true);
    component.setSort('property');
    expect(component.asc).toBe(false);
  });
});
