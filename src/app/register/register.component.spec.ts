import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '../services/http/http.service';
import { UserService } from '../services/user/user.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: UserService;
  let serviceDependency: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers: [FormBuilder, HttpService, UserService,
        {provide: HttpClient, userClass: HttpClientTestingModule},
        {provide: HttpHandler, userClass: HttpClientTestingModule},],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  service = TestBed.get(UserService);
  serviceDependency = TestBed.get(HttpService)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
