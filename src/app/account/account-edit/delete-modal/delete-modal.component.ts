import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';
import { LoginUser } from 'src/app/models/loginUser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AccountEndPoints } from 'src/app/services/const';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  credentials: LoginUser = new LoginUser();
  passwordForm!: FormGroup;
  show: boolean = false;
  errorMessage: string = "Invalid password, please try again";

  constructor(private activeModal: NgbActiveModal, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.passwordForm = this.formBuilder.group({
        password:   ['', [Validators.required]]
    });
  }

  get password() {
    return this.passwordForm?.get('password');
  }

  public togglePass(){
    this.show = !this.show;
  }

  cancel(){
    this.activeModal.dismiss();
  }

  submit() {
    console.log("Confirmed");
    this.credentials.username = this.authService.getUsername();
    this.authService.redirectUrl = AccountEndPoints.MAIN;
    if (this.passwordForm.valid){
      this.authService.login(this.credentials);
    }
    if (!this.authService.loginError){
      //this.acctService.
      this.activeModal.close(true);
    }
  }


}

