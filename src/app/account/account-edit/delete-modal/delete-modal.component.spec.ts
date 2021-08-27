import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'src/app/services/account/account.service';
import { HttpService } from 'src/app/services/http/http.service';

import { DeleteModalComponent } from './delete-modal.component';

class HttpClientStub {
  HttpClientTestingModule: HttpClientTestingModule;
}

class HttpHandlerStub {
  HttpHandlerTestingModule: HttpClientTestingModule;
}

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;
  let service: AccountService;
  let serviceDependency: HttpService;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteModalComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers: [FormBuilder, HttpService, AccountService, NgbActiveModal,
        {provide: HttpClient, userClass: HttpClientTestingModule},
        {provide: HttpHandler, userClass: HttpClientTestingModule}]
    })
    .compileComponents();


    service = TestBed.get(AccountService);
    serviceDependency = TestBed.get(HttpService)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fb = new FormBuilder();
    component.passwordForm = fb.group({
      password:      ['', []],
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
