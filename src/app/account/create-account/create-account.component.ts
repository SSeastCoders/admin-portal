import {  Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AccountInterest, AccountType } from 'src/app/models/const';
import { CreateAccount } from 'src/app/models/createAccount';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account/account.service';
import { ConstraintError } from 'src/app/services/const';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { UserSearchModalComponent } from '../user-search-modal/user-search-modal.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  account: CreateAccount = new CreateAccount();
  usersOnAccount: User[] = [];
  usersAdd = [new User()];
  accountForm!: FormGroup;
  errorMessage?: string;
  errorMessages = ValidationService.getValidatorErrorMessage;
  serverErrorMessages = ConstraintError;
  accounts = [AccountType.CHECKING, AccountType.SAVING];
  errorSubscription: Subscription;
  userSearch : User[];


  constructor(private formBuilder: FormBuilder,
    public acctService: AccountService,
    private userService: UserService,
    private modalService: NgbModal){}

  ngOnInit(): void {
    this.acctService.clear();
    this.buildForm();
  }

  buildForm() {
    this.accountForm = this.formBuilder.group({
        accountType:      ['', [ Validators.required]],
        nickName: ['', ValidationService.nickNameValidator]
    });
  }

  get accountType() {
    return this.accountForm.get('accountType');
  }

  get nickName() {
    return this.accountForm.get('nickName');
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

  searchUsers() {
    const modalRef = this.modalService.open(UserSearchModalComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.addUserNew(result);
      }
    });
  }

  generateAccount() {
    this.account.interestRate =  AccountInterest.SAVING //? AccountInterest.SAVING : AccountInterest.CHECKING;
    this.account.openDate = Date.parse((new Date().getFullYear())+'-'+(new Date().getMonth())+'-'+new Date().getDate()) ;
    this.account.balance = 0;
    this.account.activeStatus = true;
    this.account.nickName = this.accountForm.get('nickName').value;
    let tempNumArray = [];
    for (let i = 0; i <  this.usersOnAccount.length; i++) {
      //console.log(tempArray.at(i).user);
      console.log(this.usersOnAccount.slice(i,i+1)[0].id);
      tempNumArray.push(this.usersOnAccount.slice(i,i+1)[0].id);
    }
    this.account.usersIds = this.removeDuplicate(tempNumArray);
    console.log(this.account)
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

  addUserNew(user: User) {
    if((this.usersOnAccount.find(u => u.id == user.id)) == undefined ){
      this.usersOnAccount.push(user);
    }
  }

  removeUserNew(user: number) {
    this.usersOnAccount.splice(user, 1);
  }

  logValue() {
    console.log(this.usersAdd);
  }

}
