import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountInterest, AccountType } from 'src/app/models/const';
import { CreateAccount } from 'src/app/models/createAccount';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account/account.service';
import { ConstraintError } from 'src/app/services/const';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  account: CreateAccount = new CreateAccount();
  usersAdd = [new User()];
  accountForm!: FormGroup;
  errorMessage?: string;
  errorMessages = ValidationService.getValidatorErrorMessage;
  serverErrorMessages = ConstraintError;
  accounts = [AccountType.CHECKING, AccountType.SAVING];
  errorSubscription: Subscription;


  constructor(private formBuilder: FormBuilder,
    public acctService: AccountService){}

  ngOnInit(): void {
    this.acctService.clear();
    this.buildForm();
    this.users().push(this.newUser());
  }

  buildForm() {
    this.accountForm = this.formBuilder.group({
        accountType:      ['', [ Validators.required]],
        users:   this.formBuilder.array([]),
        nickName: ['', ValidationService.nickNameValidator]
    });
  }

  get accountType() {
    return this.accountForm.get('accountType');
  }

  get nickName() {
    return this.accountForm.get('nickName');
  }

  users() {
    return this.accountForm.get('users') as FormArray;
  }

  changeType(e) {
    this.accountType.setValue(e.target.value);
    this.account.accountType = (e.target.value).slice(3);
  }

  submit() {
    if (this.accountForm.valid){
      this.generateAccount();
      this.acctService.createAccount(this.account);
    }
  }

  generateAccount() {
    this.account.interestRate =  AccountInterest.SAVING //? AccountInterest.SAVING : AccountInterest.CHECKING;
    this.account.openDate = Date.parse((new Date().getFullYear())+'-'+(new Date().getMonth())+'-'+new Date().getDate()) ;
    this.account.balance = 0;
    this.account.activeStatus = true;
    this.account.nickName = this.accountForm.get('nickName').value;
    let tempArray = this.accountForm.get('users').value;
    let tempNumArray = [];
    for (let i = 0; i <  tempArray.length; i++) {
      //console.log(tempArray.at(i).user);
      tempNumArray.push(tempArray.at(i).user);
    }
    this.account.usersIds = this.removeDuplicate(tempNumArray);
    return this.account;
  }

  removeDuplicate(array: number[]): number[]{
    let tempSet = (new Set(array));
    return [...tempSet];
  }

  newUser() {
    return this.formBuilder.group({
      user: ['', [Validators.required, ValidationService.userValidator]]
    })
  }

  addUser() {
    if (this.accountForm.valid){
      this.users().push(this.newUser());
    }
  }

  removeUser(i: number) {
    if(this.users().length > 1){
      this.users().removeAt(i);
    }
  }

  logValue() {
    console.log(this.usersAdd);
  }

}
