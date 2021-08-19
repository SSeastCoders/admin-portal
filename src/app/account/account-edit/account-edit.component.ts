import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account/account.service';
import { AccountType } from 'src/app/models/const';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  account!: Account;
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText = 'Insert';
  accounts = [AccountType.CHECKING, AccountType.SAVING];
  @ViewChild('accountForm', { static: true }) accountForm: NgForm;
  @ViewChild('accountForm2', { static: true }) accountForm2: FormGroup;


  constructor(private router: Router,
    public acctService: AccountService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    // replace with subscription to get active account
        //this.getAccount(1);
    this.acctService.clear();
    this.route.parent.params.subscribe((params: Params) => {
      const id = +params['id'];
      if (id) {
        this.getAccount(id);
      }
    });

    this.buildForm();
    this.users().push(this.newUser());

    //this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }

  buildForm() {
    this.accountForm2 = this.formBuilder.group({
        accountType:      ['', ],
        users:   this.formBuilder.array([]),
        nickName: ['', ValidationService.nickNameValidator]
    });
    //this.accountForm2.patchValue({'accountType' : this.account.accountType});
    //this.accountForm2.patchValue({'nickName' : this.account.nickName});

    //this.setUsers();
  }

  setUsers() {
    this.account.usersIds.forEach(user => {
      this.users().push(this.newUserWithValue(user));
    });
  }

  users() {
    return this.accountForm2.get('users') as FormArray;
  }

  newUser() {
    return this.formBuilder.group({
      user: ['', [ValidationService.userValidator]]
    })
  }

  newUserWithValue(number) {
    let tempUser = this.newUser();
    tempUser.patchValue(number);
    return tempUser;
  }

  addUser() {
    if (this.accountForm2.valid){
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
    //return this.accountForm.getControl('accountType');
    return this.accountForm2.get('accountType');
  }

  changeType(e) {
    this.accountType.setValue(e.target.value);
    this.account.accountType = (e.target.value).slice(3);
  }

  getAccount(id: number) {
    this.acctService.find(id).subscribe((account: Account) => {
      this.account = account;
    });
  }

  submit() {
  }

  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/accounts']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.acctService.delete(this.account.id)
      .subscribe();
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.accountForm.dirty) {
      return true;
    }
    else {
      return false;
    }
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
