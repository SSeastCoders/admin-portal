import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from 'src/app/models/account';
import { AccountType } from 'src/app/models/const';
import { UpdateAccount } from 'src/app/models/updateAccount';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account/account.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { UserSearchModalComponent } from '../../user-search-modal/user-search-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  updateAccount!: UpdateAccount;
  accounts = [AccountType.CHECKING, AccountType.SAVING];
  hasBeenTouched = false;
  usersOnAccount : User[];
  accountEdit : Account;

  @Input() account: Account;
  @ViewChild('accountForm2', { static: true }) accountForm: FormGroup;

  constructor(
    public acctService: AccountService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private modalService: NgbModal) { }


  ngOnInit() {
    this.hasBeenTouched = false;
    this.acctService.clear();
    this.updateAccount = new UpdateAccount();
    this.acctService.clear();
    this.accountEdit = this.account;
    this.buildForm(this.account);
    this.accountEdit.users = this.account.users;
  }

  removeUserNew(user: number) {
    this.accountEdit.users.splice(user, 1);
    console.log(this.accountEdit.users)
  }

  addUserNew(user: User) {
    if((this.accountEdit.users.find(u => u.id == user.id)) == undefined ){
      this.accountEdit.users.push(user);
    }
  }

  buildForm(account: Account) {
    this.hasBeenTouched = false;
    this.accountForm = this.formBuilder.group({
        accountType:      ['', ],
        nickName: ['', ValidationService.nickNameValidator]
    });
    this.accountForm.patchValue(
      {'accountType' : account.accountType,
      'nickName' : account.nickName});
  }

  removeDuplicate(array: number[]): number[]{
    let tempSet = (new Set(array));
    return [...tempSet];
  }

  get accountType() {
    return this.accountForm?.get('accountType');
  }

  changeType(e) {
    this.accountType.setValue(e.target.value);
    this.updateAccount.accountType = (e.target.value);
    this.hasBeenTouched = !this.hasBeenTouched ;
  }

  submit() {
    if (this.accountForm.valid){
      this.activeModal.close(this.generateAccount());
    }
  }

  cancel(){
    this.activeModal.dismiss();
  }

  get nickName() {
    return this.accountForm?.get('nickName');
  }

  generateAccount() {
    this.updateAccount.nickName = this.accountForm.get('nickName').value;
    this.updateAccount.id = this.account.id;
    let tempNumArray = [];
    for (let i = 0; i <  this.accountEdit.users.length; i++) {
      tempNumArray.push((this.accountEdit.users[i].id));
    }
    this.updateAccount.usersIds = this.removeDuplicate(tempNumArray);
    return this.updateAccount;
  }

  searchUsers() {
    const modalRef = this.modalService.open(UserSearchModalComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.addUserNew(result);
      }});
  }

}
