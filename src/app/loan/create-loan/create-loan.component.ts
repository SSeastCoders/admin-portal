import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserSearchModalComponent } from 'src/app/account/user-search-modal/user-search-modal.component';
import { CreateCredit } from 'src/app/models/createCard';
import { User } from 'src/app/models/user';
import { CardService } from 'src/app/services/card/card.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.css']
})
export class CreateLoanComponent implements OnInit {

  card: CreateCredit = new CreateCredit();
  usersOnCard: User[] = [];
  cardForm!: FormGroup;
  userSearch : User[];

  constructor(private formBuilder: FormBuilder, public cardService: CardService, private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cardService.creationError = false;
    this.buildForm();
  }

  buildForm() {
    this.cardForm = this.formBuilder.group({
      nickName: ['', ValidationService.nickNameValidator]
    })
  }

  get nickName() {
    return this.cardForm.get('nickName');
  }

  searchUsers() {
    const modalRef = this.modalService.open(UserSearchModalComponent);
    (<UserSearchModalComponent>modalRef.componentInstance).keyword = (<HTMLInputElement>(document.getElementById("userSearch"))).value;
    modalRef.result.then((result) => {
      if (result) {
        this.addUserNew(result);
      }});
    this.userService.searchUsers((<HTMLInputElement>(document.getElementById("userSearch"))).value, 1).subscribe((res) => {
      this.userSearch = res;
      console.log(res);
      console.log()
    });
  }

  addUserNew(user: User) {
    if((this.usersOnCard.find(u => u.id == user.id)) == undefined ){
      this.usersOnCard.push(user);
    }
  }

  removeUserNew(user: number) {
    this.usersOnCard.splice(user, 1);
  }

  removeDuplicate(array: number[]): number[]{
    let tempSet = (new Set(array));
    return [...tempSet];
  }

  generateCard() {
    this.card.nickName = this.cardForm.get('nickName').value;
    let tempNumArray = [];
    for (let i = 0; i <  this.usersOnCard.length; i++) {
      console.log(this.usersOnCard.slice(i,i+1)[0].id);
      tempNumArray.push(this.usersOnCard.slice(i,i+1)[0].id);
    }
    this.card.users = this.removeDuplicate(tempNumArray);
    console.log(this.card)
    return this.card;
  }

  submit() {
    if (this.cardForm.valid) {
      this.generateCard();
      this.cardService.createCard(this.card);
    }
  }

}
