import { getTreeControlFunctionsMissingError } from '@angular/cdk/tree';
import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { ValidationService } from './validation.service';

describe('ValidationService', () => {
  let service: ValidationService;
  let form: FormGroup;
  let fb: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[],
      providers: [ValidationService, FormBuilder],
      declarations: [],
    });
    service = TestBed.inject(ValidationService);
    fb = new FormBuilder();
    form = fb.group({
      control: [,],
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('validate email', () => {
    form.setValue({"control": "realemail@gmail.com"});
    expect(ValidationService.emailValidator(form.get('control'))).toBeNull();
  });

  it('not validate bad email', () => {
    form.setValue({"control": "realemailgmail.com"});
    expect(ValidationService.emailValidator(form.get('control'))).toEqual({ 'invalidEmailAddress': true });
  });

  it('validate admin email', () => {
    form.setValue({"control": "realemail@smoothstack.com"});
    expect(ValidationService.adminEmailValidator(form.get('control'))).toBeNull();
  });

  it('not validate bad admin email', () => {
    form.setValue({"control": "realemailsmoothstack.com"});
    expect(ValidationService.adminEmailValidator(form.get('control'))).toEqual({ 'invalidAdminEmailAddress': true });
  });

  it('not validate email, as admin', () => {
    form.setValue({"control": "realemailsmoothstack.com"});
    expect(ValidationService.adminEmailValidator(form.get('control'))).toEqual({ 'invalidAdminEmailAddress': true });
  });

  it('not validate password', () => {
    form.setValue({"control": "securepassword"});
    expect(ValidationService.passwordValidator(form.get('control'))).toEqual({ 'invalidPassword': true });
  });

  it('validate password', () => {
    form.setValue({"control": "S3cureP@ssw0rd"});
    expect(ValidationService.passwordValidator(form.get('control'))).toBeNull();
  });

  it('appropriate age', () => {
    form.setValue({"control": (Date.parse((new Date().getFullYear()-25)+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()))});
    expect(ValidationService.birthdateValidator(form.get('control'))).toBeNull();
  });

});
