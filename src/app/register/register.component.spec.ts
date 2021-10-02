import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '../services/http/http.service';
import { UserService } from '../services/user/user.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let service: UserService;
  let serviceDependency: HttpService;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        FormBuilder,
        HttpService,
        UserService,
        { provide: HttpClient, userClass: HttpClientTestingModule },
        { provide: HttpHandler, userClass: HttpClientTestingModule },
      ],
      declarations: [RegisterComponent],
    }).compileComponents();
    service = TestBed.inject(UserService);
    serviceDependency = TestBed.inject(HttpService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fb = new FormBuilder();
    component.registerForm = fb.group({
      username: ['', []],
      password: ['', []],
      confirmPassword: ['', []],
      email: ['', []],
      role: ['', []],
      firstName: ['', []],
      lastName: ['', []],
      phone: ['', []],
      dob: ['', []],
    });

    component.registerForm.patchValue({ username: 'USERNAME' });
    component.registerForm.patchValue({ password: 'PASSw0rd' });
    component.registerForm.patchValue({ confirmPassword: 'PASSw0rd' });
    component.registerForm.patchValue({ email: 'email@smoothstack.com' });
    component.registerForm.patchValue({ role: 'Admin' });
    component.registerForm.patchValue({ firstName: 'FIRST' });
    component.registerForm.patchValue({ lastName: 'LAST' });
    component.registerForm.patchValue({ phone: '206-557-0334' });
    component.registerForm.patchValue({ dob: 'somedate' });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate user fields', () => {
    component.register = component.generateUser();
    expect(component.register.password).toEqual(
      component.registerForm.get('password').value
    );
    expect(component.register.username).toEqual(
      component.registerForm.get('username').value
    );
    expect(component.register.email).toEqual(
      component.registerForm.get('email').value
    );
    expect(component.register.firstName).toEqual(
      component.registerForm.get('firstName').value
    );
    expect(component.register.lastName).toEqual(
      component.registerForm.get('lastName').value
    );
  });

  it('should submit', () => {
    //component.submit();//to do: finish with spy object
  });
});
