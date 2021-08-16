import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpService } from '../services/http/http.service';
import { UserService } from '../services/user/user.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: UserService;
  let serviceDependency: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers: [FormBuilder, HttpService, UserService,
        {provide: HttpClient, userClass: HttpClientTestingModule},
        {provide: HttpHandler, userClass: HttpClientTestingModule},],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
    service = TestBed.get(UserService);
    serviceDependency = TestBed.get(HttpService)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
