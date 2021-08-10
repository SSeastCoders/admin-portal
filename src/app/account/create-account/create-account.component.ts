import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'src/app/create-user/role';
import { CreateAccount } from 'src/app/observables/createAccount';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  account: CreateAccount = new CreateAccount();
  redirectToUrl: string = '/login';
  allRoles = [
    new Role(1, 'Admin'),
    new Role(2, 'Customer'),
  ]
  today = new Date(); 
  show: boolean = false;
  form = new FormGroup({});
  serverError = false;
  serverErrorMessage: string;

  constructor(public accountService: AccountService, private router: Router, private fb: FormBuilder,private modalService: NgbModal) { 
    this.form = fb.group({
      accountType: ['', {validators: [Validators.required]}]});
  }

  ngOnInit(): void {
  }

}
