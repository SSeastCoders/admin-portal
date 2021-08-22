import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account/account.service';
import { AccountType } from 'src/app/models/const';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { UpdateAccount } from 'src/app/models/updateAccount';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@Component({
  selector: 'account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  account!: Account;
  updateAccount!: UpdateAccount;
  errorMessage: string;
  deleteMessageEnabled: boolean;
  accounts = [AccountType.CHECKING, AccountType.SAVING];
  hasBeenTouched = false;
  //defaultState : FormGroup;
  //defaultState: FormGroup;
  @ViewChild('accountForm2', { static: true }) accountForm: FormGroup;

  constructor(private router: Router,
    public acctService: AccountService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.hasBeenTouched = false;
    this.acctService.clear();
    this.updateAccount = new UpdateAccount();
    this.acctService.clear();
    this.route.parent.params.subscribe((params: Params) => {
      const id = + params['id'];
      if (id) {
        this.getAccount(id);
      }
    });
  }

  buildForm(account: Account) {
    this.hasBeenTouched = false;
    this.accountForm = this.formBuilder.group({
        accountType:      ['', ],
        users:   this.formBuilder.array([]),
        nickName: ['', ValidationService.nickNameValidator]
    });
    this.accountForm.patchValue(
      {'accountType' : account.accountType,
      'nickName' : account.nickName});
    //console.log(account.users);
    account.users.forEach((user) => {
      //console.log(user.id);
      this.users().push(this.newUserWithValue(user.id));
    });
    //this.defaultState = this.accountForm;
  }

  users() {
    return this.accountForm.get('users') as FormArray;
  }

  newUser() {
    return this.formBuilder.group({
      //why cant user validationservice?
      user: ['', [Validators.required, Validators.pattern(/^[0-9]{1,15}$/)]]
    })
  }

  newUserWithValue(number) {
    let tempUser = this.newUser();
    tempUser.patchValue({'user' : number});
    return tempUser;
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

  removeDuplicate(array: number[]): number[]{
    let tempSet = (new Set(array));
    return [...tempSet];
  }

  get accountType() {
    return this.accountForm.get('accountType');
  }

  changeType(e) {
    this.accountType.setValue(e.target.value);
    this.updateAccount.accountType = (e.target.value);
    this.hasBeenTouched = !this.hasBeenTouched ;
  }

  getAccount(id: number) {
    this.acctService.find(id).subscribe((account: Account) => {
      this.account = account;
      //console.log("acct" + account);
      this.buildForm(account);
    });
  }

  submit() {
    if (this.accountForm.valid){
      this.generateAccount();
      this.acctService.updateAccount(this.updateAccount);
    }
  }

  cancel(event: Event) {
    event.preventDefault();
    //this.setDefaultValues();
    this.buildForm(this.account);
  }

	setDefaultValues() {
    let temp = {
      //accountType = this.account.accountType
      //usersIds = this.account.users.forEach((user) => {return user.id}),
      //nickName = this.account.nickName
    }
		this.accountForm.setValue(temp);
	}

  delete(event: Event) {
    event.preventDefault();

    this.modalService.open(DeleteModalComponent).result.then((result) => {
      if (result) {
        console.log(result);
        this.acctService.delete(this.account.id);
      }});
   // this.acctService.delete(this.account.id)
   //   .subscribe();
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.accountForm.dirty) {
      return true;
    }
    else {
      return false;
    }
  }

  get nickName() {
    return this.accountForm.get('nickName');
  }

  generateAccount() {
    this.updateAccount.nickName = this.accountForm.get('nickName').value;
    this.updateAccount.id = this.account.id;
    let tempArray = this.accountForm.get('users').value;
    let tempNumArray = [];
    for (let i = 0; i <  tempArray.length; i++) {
      //console.log(tempArray.at(i).user);
      tempNumArray.push(Number(tempArray.at(i).user));
    }
    this.updateAccount.usersIds = this.removeDuplicate(tempNumArray);
    return this.updateAccount;
  }



/*     // Dirty show display modal dialog to user to confirm leaving
    const modalContent: ModalContent = {
      header: 'Lose Unsaved Changes?',
      body: 'You have unsaved changes! Would you like to leave the page and lose them?',
      cancelButtonText: 'Cancel',
      OKButtonText: 'Leave'
    };
    return this.modalService.show(modalContent);
  } */

}
